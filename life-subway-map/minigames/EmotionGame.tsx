import { useState } from 'react';
import { MiniGameProps } from '../types';
import { STATION_POOL } from '../data';

export default function EmotionGame({ onComplete }: MiniGameProps) {
  const [timeLeft, setTimeLeft] = useState(2);
  const [selected, setSelected] = useState(false);

  const emotions = [
    { emoji: '😊', name: '행복', station: STATION_POOL.emotion[0] },
    { emoji: '😢', name: '슬픔', station: STATION_POOL.emotion[1] },
    { emoji: '😡', name: '화남', station: STATION_POOL.emotion[2] },
    { emoji: '😴', name: '피곤', station: STATION_POOL.emotion[3] },
    { emoji: '😰', name: '불안', station: STATION_POOL.emotion[4] },
    { emoji: '🤔', name: '고민', station: STATION_POOL.emotion[5] },
  ];

  const handleSelect = (station: typeof STATION_POOL.emotion[0]) => {
    if (selected) return;
    setSelected(true);
    setTimeout(() => onComplete({ line: 'emotion', score: 50, station }), 500);
  };

  useState(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0.1 && !selected) {
          clearInterval(timer);
          // 우유부단역은 없으니 고민중역으로
          setTimeout(() => onComplete({ line: 'emotion', score: 0, station: emotions[5].station }), 300);
          return 0;
        }
        return t - 0.1;
      });
    }, 100);

    return () => clearInterval(timer);
  });

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '20px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>😊 감정 라인</h2>
      <p style={{ fontSize: '16px', marginBottom: '20px', opacity: 0.9 }}>
        지금 기분이 어때요?
      </p>

      <div style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.7 }}>
        {timeLeft.toFixed(1)}초 남음
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          maxWidth: '400px',
        }}
      >
        {emotions.map((emotion) => (
          <button
            key={emotion.emoji}
            onClick={() => handleSelect(emotion.station)}
            onTouchStart={() => handleSelect(emotion.station)}
            disabled={selected}
            style={{
              padding: '30px',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div style={{ fontSize: '48px' }}>{emotion.emoji}</div>
            <div style={{ fontSize: '14px', color: 'white' }}>{emotion.name}</div>
          </button>
        ))}
      </div>

      <div style={{ marginTop: '30px', opacity: 0.7, fontSize: '14px' }}>
        빠르게 선택하세요!
      </div>
    </div>
  );
}
