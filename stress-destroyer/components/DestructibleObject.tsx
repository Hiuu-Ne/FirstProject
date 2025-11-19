import { useState } from 'react';
import { DestructibleObject } from '../types';

interface DestructibleObjectProps {
  object: DestructibleObject;
  onHit: (objectId: string, x: number, y: number) => void;
  onDestroy: (objectId: string, x: number, y: number) => void;
}

export default function DestructibleObjectComponent({
  object,
  onHit,
  onDestroy,
}: DestructibleObjectProps) {
  const [isShaking, setIsShaking] = useState(false);
  const [cracks, setCracks] = useState<{ id: string; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX;
    const y = clientY;

    // 흔들림 효과
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 200);

    // 크랙 효과 추가 (파괴되기 전)
    if (object.currentHealth > object.maxHealth * 0.2) {
      const relativeX = ((clientX - rect.left) / rect.width) * 100;
      const relativeY = ((clientY - rect.top) / rect.height) * 100;
      setCracks([...cracks, { id: `crack-${Date.now()}`, x: relativeX, y: relativeY }]);
    }

    onHit(object.id, x, y);

    // 파괴 확인
    if (object.currentHealth <= 0) {
      setTimeout(() => onDestroy(object.id, x, y), 100);
    }
  };

  if (object.destroyed) {
    return null;
  }

  const healthPercentage = (object.currentHealth / object.maxHealth) * 100;
  const opacity = Math.max(0.3, healthPercentage / 100);

  return (
    <div
      onClick={handleClick}
      onTouchStart={handleClick}
      className={`relative cursor-pointer select-none ${isShaking ? 'shaking' : ''}`}
      style={{
        position: 'absolute',
        left: `${object.position.x}%`,
        top: `${object.position.y}%`,
        transform: 'translate(-50%, -50%)',
        opacity: opacity,
        transition: 'opacity 0.1s',
      }}
    >
      {/* 오브젝트 아이콘 */}
      <div
        style={{
          fontSize: '80px',
          filter: healthPercentage < 30 ? 'brightness(0.7)' : 'none',
          position: 'relative',
        }}
      >
        {object.emoji}

        {/* 크랙 효과 */}
        {cracks.map((crack) => (
          <div
            key={crack.id}
            className="cracking"
            style={{
              position: 'absolute',
              left: `${crack.x}%`,
              top: `${crack.y}%`,
              width: '20px',
              height: '20px',
              pointerEvents: 'none',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M10,10 L15,5 M10,10 L5,15 M10,10 L15,15 M10,10 L5,5"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="2"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* 체력바 */}
      <div
        style={{
          width: '60px',
          height: '6px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '3px',
          marginTop: '8px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${healthPercentage}%`,
            height: '100%',
            background:
              healthPercentage > 60
                ? '#4ade80'
                : healthPercentage > 30
                ? '#fbbf24'
                : '#ef4444',
            transition: 'width 0.1s, background 0.3s',
          }}
        />
      </div>

      {/* 오브젝트 이름 */}
      <div
        style={{
          fontSize: '12px',
          color: 'white',
          textAlign: 'center',
          marginTop: '4px',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
        }}
      >
        {object.name}
      </div>
    </div>
  );
}
