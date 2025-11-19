import { useState } from 'react';
import { MiniGameProps } from '../types';
import { STATION_POOL } from '../data';

export default function HobbyGame({ onComplete }: MiniGameProps) {
  const [count, setCount] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(1);

  const videos = [
    '🎮 게임 영상',
    '🎵 음악 영상',
    '🍔 먹방 영상',
    '🐱 고양이 영상',
    '😂 웃긴 영상',
    '💃 춤 영상',
  ];

  const handleNext = () => {
    const newCount = count + 1;
    setCount(newCount);
    setCurrentVideo((currentVideo % videos.length) + 1);

    if (newCount >= 50) finish(newCount);
  };

  const handleStop = () => {
    finish(count);
  };

  const finish = (finalCount: number) => {
    let station;
    if (finalCount < 5) station = STATION_POOL.hobby[0];
    else if (finalCount < 15) station = STATION_POOL.hobby[1];
    else if (finalCount < 30) station = STATION_POOL.hobby[2];
    else station = STATION_POOL.hobby[3];

    setTimeout(() => onComplete({ line: 'hobby', score: finalCount, station }), 300);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '20px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>🎮 취미 몰입선</h2>
      <p style={{ fontSize: '16px', marginBottom: '20px', opacity: 0.9 }}>
        숏폼을 보고 있습니다...
      </p>

      <div style={{ fontSize: '20px', marginBottom: '30px' }}>시청: {count}개</div>

      <div
        style={{
          width: '100%',
          maxWidth: '350px',
          height: '500px',
          background: 'rgba(0,0,0,0.5)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '20px',
          padding: '40px',
        }}
      >
        <div style={{ fontSize: '80px' }}>
          {videos[currentVideo - 1].split(' ')[0]}
        </div>
        <div style={{ fontSize: '20px' }}>{videos[currentVideo - 1]}</div>

        <button
          onClick={handleNext}
          onTouchStart={handleNext}
          style={{
            marginTop: '40px',
            padding: '16px 48px',
            fontSize: '18px',
            background: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          다음 →
        </button>

        <button
          onClick={handleStop}
          onTouchStart={handleStop}
          style={{
            padding: '12px 36px',
            fontSize: '16px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid white',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          그만보기
        </button>
      </div>

      <div style={{ marginTop: '20px', opacity: 0.7, fontSize: '14px' }}>
        언제까지 볼 건가요?
      </div>
    </div>
  );
}
