import { useState, useEffect } from 'react';
import { MiniGameProps } from '../types';
import { STATION_POOL } from '../data';

export default function AlcoholGame({ onComplete }: MiniGameProps) {
  const [tilt, setTilt] = useState(0);
  const [lastPress, setLastPress] = useState<'left' | 'right'>('left');
  const [successRate, setSuccessRate] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [presses, setPresses] = useState(0);

  useEffect(() => {
    // 타이머
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);

          const rate = (successRate / Math.max(presses, 1)) * 100;
          let station;
          if (rate >= 80) station = STATION_POOL.alcohol[0];
          else if (rate >= 50) station = STATION_POOL.alcohol[1];
          else station = STATION_POOL.alcohol[2];

          setTimeout(() => onComplete({ line: 'alcohol', score: rate, station }), 500);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    // 기울기 자동 증가
    const tiltInterval = setInterval(() => {
      setTilt((t) => {
        if (t > 50 || t < -50) {
          clearInterval(timer);
          clearInterval(tiltInterval);
          setTimeout(() => onComplete({ line: 'alcohol', score: 0, station: STATION_POOL.alcohol[2] }), 300);
        }
        return t + (Math.random() > 0.5 ? 0.5 : -0.5);
      });
    }, 100);

    return () => {
      clearInterval(timer);
      clearInterval(tiltInterval);
    };
  }, [successRate, presses, onComplete]);

  const handlePress = (side: 'left' | 'right') => {
    setPresses((p) => p + 1);

    if (side !== lastPress) {
      setSuccessRate((s) => s + 1);
      setTilt((t) => t + (side === 'left' ? -3 : 3));
    }
    setLastPress(side);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '20px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>🍺 술자리 라인</h2>
      <p style={{ fontSize: '16px', marginBottom: '20px', opacity: 0.9 }}>
        술에 취했습니다. 넘어지지 마세요!
      </p>

      <div style={{ fontSize: '20px', marginBottom: '30px' }}>⏰ {timeLeft}초</div>

      <div style={{ fontSize: '80px', marginBottom: '40px', transform: `rotate(${tilt}deg)`, transition: 'transform 0.1s' }}>
        🚶
      </div>

      <div
        style={{
          width: '200px',
          height: '10px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '5px',
          position: 'relative',
          marginBottom: '40px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: `${50 + tilt}%`,
            top: '-5px',
            width: '20px',
            height: '20px',
            background: Math.abs(tilt) > 30 ? '#EF4444' : '#10B981',
            borderRadius: '50%',
            transform: 'translateX(-50%)',
            transition: 'left 0.1s, background 0.3s',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <button
          onClick={() => handlePress('left')}
          onTouchStart={() => handlePress('left')}
          style={{
            padding: '20px 40px',
            fontSize: '24px',
            background: lastPress === 'left' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          ←
        </button>
        <button
          onClick={() => handlePress('right')}
          onTouchStart={() => handlePress('right')}
          style={{
            padding: '20px 40px',
            fontSize: '24px',
            background: lastPress === 'right' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)',
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
        좌우를 빠르게 번갈아 누르세요!
      </div>
    </div>
  );
}
