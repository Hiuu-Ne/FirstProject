import { useState, useCallback, useEffect } from 'react';
import { DestructibleObject, Particle, GameStats, ObjectType } from './types';
import { createParticles, vibrate, calculateScore } from './utils';
import DestructibleObjectComponent from './components/DestructibleObject';
import ParticleSystem from './components/ParticleSystem';

const OBJECT_TEMPLATES = [
  { type: 'glass' as ObjectType, name: '유리컵', emoji: '🥃', maxHealth: 100 },
  { type: 'glass' as ObjectType, name: '유리병', emoji: '🍾', maxHealth: 150 },
  { type: 'ceramic' as ObjectType, name: '도자기', emoji: '🏺', maxHealth: 200 },
  { type: 'ceramic' as ObjectType, name: '접시', emoji: '🍽️', maxHealth: 180 },
  { type: 'wall' as ObjectType, name: '벽돌', emoji: '🧱', maxHealth: 300 },
  { type: 'wall' as ObjectType, name: '콘크리트', emoji: '⬜', maxHealth: 350 },
  { type: 'paper' as ObjectType, name: '종이', emoji: '📄', maxHealth: 50 },
  { type: 'paper' as ObjectType, name: '박스', emoji: '📦', maxHealth: 80 },
];

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [objects, setObjects] = useState<DestructibleObject[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    combo: 0,
    totalDestroyed: 0,
    maxCombo: 0,
  });
  const [lastHitTime, setLastHitTime] = useState(0);
  const [scorePopups, setScorePopups] = useState<{ id: string; x: number; y: number; score: number }[]>([]);

  // 콤보 리셋 타이머
  useEffect(() => {
    if (stats.combo > 0) {
      const timer = setTimeout(() => {
        const now = Date.now();
        if (now - lastHitTime > 2000) {
          setStats((prev) => ({ ...prev, combo: 0 }));
        }
      }, 2100);

      return () => clearTimeout(timer);
    }
  }, [lastHitTime, stats.combo]);

  // 오브젝트 생성
  const spawnObjects = useCallback(() => {
    const newObjects: DestructibleObject[] = [];
    const count = 6;

    for (let i = 0; i < count; i++) {
      const template = OBJECT_TEMPLATES[Math.floor(Math.random() * OBJECT_TEMPLATES.length)];
      newObjects.push({
        id: `obj-${Date.now()}-${i}`,
        type: template.type,
        name: template.name,
        emoji: template.emoji,
        maxHealth: template.maxHealth,
        currentHealth: template.maxHealth,
        position: {
          x: 20 + (i % 3) * 30 + Math.random() * 10,
          y: 30 + Math.floor(i / 3) * 35 + Math.random() * 10,
        },
        destroyed: false,
      });
    }

    setObjects(newObjects);
  }, []);

  // 게임 시작
  const startGame = () => {
    setGameStarted(true);
    setStats({ score: 0, combo: 0, totalDestroyed: 0, maxCombo: 0 });
    spawnObjects();
  };

  // 오브젝트 타격
  const handleHit = useCallback(
    (objectId: string, x: number, y: number) => {
      const now = Date.now();
      const timeSinceLastHit = now - lastHitTime;

      setObjects((prev) =>
        prev.map((obj) => {
          if (obj.id === objectId && !obj.destroyed) {
            const newHealth = Math.max(0, obj.currentHealth - 20);

            // 콤보 증가 (2초 이내)
            if (timeSinceLastHit < 2000) {
              setStats((s) => ({
                ...s,
                combo: s.combo + 1,
                maxCombo: Math.max(s.maxCombo, s.combo + 1),
              }));
            } else {
              setStats((s) => ({ ...s, combo: 1 }));
            }

            setLastHitTime(now);

            // 진동
            vibrate(30);

            // 작은 파티클 효과
            if (newHealth > 0) {
              const hitParticles = createParticles(x, y, obj.type, 8);
              setParticles((p) => [...p, ...hitParticles]);
            }

            return { ...obj, currentHealth: newHealth };
          }
          return obj;
        })
      );
    },
    [lastHitTime]
  );

  // 오브젝트 파괴
  const handleDestroy = useCallback(
    (objectId: string, x: number, y: number) => {
      const obj = objects.find((o) => o.id === objectId);
      if (!obj) return;

      // 큰 파티클 폭발
      const explosionParticles = createParticles(x, y, obj.type, 40);
      setParticles((p) => [...p, ...explosionParticles]);

      // 점수 계산
      const score = calculateScore(obj.type, stats.combo);
      setStats((prev) => ({
        ...prev,
        score: prev.score + score,
        totalDestroyed: prev.totalDestroyed + 1,
      }));

      // 점수 팝업
      setScorePopups((prev) => [...prev, { id: `popup-${Date.now()}`, x, y, score }]);
      setTimeout(() => {
        setScorePopups((prev) => prev.filter((p) => p.id !== `popup-${Date.now()}`));
      }, 1000);

      // 강한 진동
      vibrate(100);

      // 오브젝트 제거
      setObjects((prev) => prev.map((o) => (o.id === objectId ? { ...o, destroyed: true } : o)));

      // 모든 오브젝트 파괴시 새로운 오브젝트 생성
      const remainingObjects = objects.filter((o) => !o.destroyed && o.id !== objectId);
      if (remainingObjects.length === 0) {
        setTimeout(() => spawnObjects(), 500);
      }
    },
    [objects, stats.combo, spawnObjects]
  );

  if (!gameStarted) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🔨</h1>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
          스트레스 파괴 실험실
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '40px', maxWidth: '400px' }}>
          당신의 스트레스를 물리적으로 파괴하세요!
          <br />
          클릭만으로 유리를 깨고, 도자기를 부수고, 벽을 무너뜨립니다.
        </p>

        <button
          onClick={startGame}
          style={{
            padding: '16px 48px',
            fontSize: '20px',
            fontWeight: 'bold',
            background: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s',
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
          onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          파괴 시작하기
        </button>

        <div style={{ marginTop: '60px', opacity: 0.7, fontSize: '14px' }}>
          <p>💡 팁: 빠르게 연타하면 콤보가 올라갑니다!</p>
          <p>💎 오브젝트마다 점수가 다릅니다</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* 점수판 */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          right: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <div style={{ background: 'rgba(0,0,0,0.5)', padding: '16px', borderRadius: '12px', color: 'white' }}>
          <div style={{ fontSize: '14px', opacity: 0.8 }}>점수</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.score.toLocaleString()}</div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.5)', padding: '16px', borderRadius: '12px', color: 'white' }}>
          <div style={{ fontSize: '14px', opacity: 0.8 }}>파괴</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.totalDestroyed}</div>
        </div>
      </div>

      {/* 콤보 표시 */}
      {stats.combo > 1 && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '80px',
            fontWeight: 'bold',
            color: 'white',
            textShadow: '0 4px 8px rgba(0,0,0,0.5)',
            zIndex: 50,
            pointerEvents: 'none',
            animation: 'explode 0.5s ease-out',
          }}
        >
          {stats.combo}x COMBO!
        </div>
      )}

      {/* 점수 팝업 */}
      {scorePopups.map((popup) => (
        <div
          key={popup.id}
          style={{
            position: 'fixed',
            left: popup.x,
            top: popup.y,
            transform: 'translate(-50%, -50%)',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#fbbf24',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            zIndex: 60,
            pointerEvents: 'none',
            animation: 'explode 1s ease-out forwards',
          }}
        >
          +{popup.score}
        </div>
      ))}

      {/* 오브젝트들 */}
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        {objects.map((obj) => (
          <DestructibleObjectComponent
            key={obj.id}
            object={obj}
            onHit={handleHit}
            onDestroy={handleDestroy}
          />
        ))}
      </div>

      {/* 파티클 시스템 */}
      <ParticleSystem particles={particles} onUpdate={setParticles} />

      {/* 리셋 버튼 */}
      <button
        onClick={() => {
          setGameStarted(false);
          setObjects([]);
          setParticles([]);
        }}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 24px',
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          zIndex: 10,
        }}
      >
        🔄 다시 시작
      </button>
    </div>
  );
}
