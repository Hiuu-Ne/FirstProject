import { useState, useEffect, useRef } from 'react';
import { MiniGameProps } from '../types';
import { STATION_POOL } from '../data';

export default function OverworkGame({ onComplete }: MiniGameProps) {
  const [playerX, setPlayerX] = useState(50);
  const [obstacles, setObstacles] = useState<{ x: number; y: number; emoji: string }[]>([]);
  const [collisions, setCollisions] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 장애물 생성
    const interval = setInterval(() => {
      const emojis = ['😤', '📊', '🐛', '📞'];
      setObstacles((prev) => [
        ...prev.filter((o) => o.y < 100),
        { x: Math.random() * 80 + 10, y: -5, emoji: emojis[Math.floor(Math.random() * emojis.length)] },
      ]);
    }, 1000);

    // 장애물 이동
    const moveInterval = setInterval(() => {
      setObstacles((prev) =>
        prev.map((o) => ({ ...o, y: o.y + 2 })).filter((o) => o.y < 105)
      );
    }, 50);

    // 충돌 감지
    const collisionInterval = setInterval(() => {
      setObstacles((prev) => {
        const remaining = prev.filter((o) => {
          const distance = Math.abs(o.x - playerX);
          if (o.y > 80 && o.y < 95 && distance < 8) {
            setCollisions((c) => c + 1);
            return false;
          }
          return true;
        });
        return remaining;
      });
    }, 100);

    // 타이머
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          clearInterval(moveInterval);
          clearInterval(collisionInterval);
          clearInterval(timer);

          // 결과 계산
          let station;
          if (collisions === 0) station = STATION_POOL.overwork[0]; // 전설
          else if (collisions <= 3) station = STATION_POOL.overwork[1];
          else if (collisions <= 7) station = STATION_POOL.overwork[2];
          else station = STATION_POOL.overwork[3];

          setTimeout(() => onComplete({ line: 'overwork', score: 30 - collisions, station }), 500);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(moveInterval);
      clearInterval(collisionInterval);
      clearInterval(timer);
    };
  }, [collisions, playerX, onComplete]);

  const handleMove = (direction: 'left' | 'right') => {
    setPlayerX((x) => Math.max(10, Math.min(90, x + (direction === 'left' ? -5 : 5))));
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleMove('left');
      if (e.key === 'ArrowRight') handleMove('right');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '20px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>💼 야근 라인</h2>
      <p style={{ fontSize: '16px', marginBottom: '20px', opacity: 0.9 }}>
        퇴근 시간! 장애물을 피하세요
      </p>
      <div style={{ fontSize: '20px', marginBottom: '20px' }}>⏰ {timeLeft}초 | 충돌: {collisions}회</div>

      <div
        ref={gameRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '400px',
          height: '500px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {/* 플레이어 */}
        <div
          style={{
            position: 'absolute',
            left: `${playerX}%`,
            bottom: '10%',
            transform: 'translateX(-50%)',
            fontSize: '40px',
            transition: 'left 0.1s',
          }}
        >
          🏃
        </div>

        {/* 장애물 */}
        {obstacles.map((obs, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: `${obs.x}%`,
              top: `${obs.y}%`,
              transform: 'translateX(-50%)',
              fontSize: '30px',
            }}
          >
            {obs.emoji}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        <button
          onTouchStart={() => handleMove('left')}
          onClick={() => handleMove('left')}
          style={{
            padding: '20px 40px',
            fontSize: '24px',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          ←
        </button>
        <button
          onTouchStart={() => handleMove('right')}
          onClick={() => handleMove('right')}
          style={{
            padding: '20px 40px',
            fontSize: '24px',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          →
        </button>
      </div>

      <div style={{ marginTop: '20px', opacity: 0.7, fontSize: '14px' }}>
        키보드 ←→ 또는 버튼 클릭
      </div>
    </div>
  );
}
