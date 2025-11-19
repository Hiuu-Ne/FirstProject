import { useState, useEffect } from 'react';
import { MiniGameProps } from '../types';
import { STATION_POOL } from '../data';

export default function BurnoutGame({ onComplete }: MiniGameProps) {
  const [count, setCount] = useState(0);
  const [startTime] = useState(Date.now());
  const [gaveUp, setGaveUp] = useState(false);

  useEffect(() => {
    if (count >= 50 && !gaveUp) {
      finish();
    }
  }, [count, gaveUp]);

  const finish = () => {
    const elapsed = (Date.now() - startTime) / 1000;
    let station;
    if (gaveUp) station = STATION_POOL.burnout[3];
    else if (elapsed < 10) station = STATION_POOL.burnout[0];
    else if (elapsed < 15) station = STATION_POOL.burnout[1];
    else station = STATION_POOL.burnout[2];

    setTimeout(() => onComplete({ line: 'burnout', score: 50 - elapsed, station }), 300);
  };

  const handleGiveUp = () => {
    setGaveUp(true);
    finish();
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '20px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>😴 번아웃선</h2>
      <p style={{ fontSize: '16px', marginBottom: '20px', opacity: 0.9 }}>
        "퇴사"를 빠르게 누르세요
      </p>

      <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '40px' }}>
        {count} / 50
      </div>

      <button
        onClick={() => setCount(count + 1)}
        onTouchStart={() => setCount(count + 1)}
        style={{
          padding: '40px 80px',
          fontSize: '32px',
          background: '#EF4444',
          color: 'white',
          border: 'none',
          borderRadius: '16px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginBottom: '30px',
        }}
      >
        퇴사
      </button>

      <button
        onClick={handleGiveUp}
        onTouchStart={handleGiveUp}
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
        포기하기
      </button>

      <div style={{ marginTop: '30px', opacity: 0.7, fontSize: '14px' }}>
        빠르게 클릭하세요!
      </div>
    </div>
  );
}
