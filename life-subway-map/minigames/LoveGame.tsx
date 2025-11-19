import { useState, useEffect } from 'react';
import { MiniGameProps } from '../types';
import { STATION_POOL } from '../data';

export default function LoveGame({ onComplete }: MiniGameProps) {
  const [heartSize, setHeartSize] = useState(50);
  const [round, setRound] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (round >= 5) {
      // 평균 계산
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      let station;
      if (avg >= 70) station = STATION_POOL.love[0];
      else if (avg >= 40) station = STATION_POOL.love[1];
      else if (avg >= 20) station = STATION_POOL.love[2];
      else station = STATION_POOL.love[3];

      setTimeout(() => onComplete({ line: 'love', score: avg, station }), 1000);
      return;
    }

    const interval = setInterval(() => {
      setHeartSize((s) => {
        const newSize = s + direction * 3;
        if (newSize >= 100 || newSize <= 20) {
          setDirection((d) => -d);
        }
        return Math.max(20, Math.min(100, newSize));
      });
    }, 50);

    return () => clearInterval(interval);
  }, [round, direction, scores, onComplete]);

  const handleClick = () => {
    setScores([...scores, heartSize]);
    setRound(round + 1);

    if (heartSize >= 70) setMessage('완벽! 💗');
    else if (heartSize >= 40) setMessage('괜찮아요 ❤️');
    else setMessage('아쉽... 💔');

    setTimeout(() => setMessage(''), 500);
  };

  if (round >= 5) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <div style={{ fontSize: '48px' }}>💌</div>
        <div style={{ fontSize: '24px', marginTop: '20px' }}>분석 중...</div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '20px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>💔 연애 멸망선</h2>
      <p style={{ fontSize: '16px', marginBottom: '20px', opacity: 0.9 }}>
        💬 "밥 먹었어?" <br />
        하트가 클 때 답장하세요!
      </p>

      <div style={{ fontSize: '18px', marginBottom: '30px' }}>라운드: {round + 1}/5</div>

      {message && (
        <div style={{ fontSize: '24px', marginBottom: '20px', animation: 'fadeIn 0.3s' }}>
          {message}
        </div>
      )}

      <button
        onClick={handleClick}
        onTouchStart={handleClick}
        style={{
          fontSize: `${heartSize * 1.5}px`,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          transition: 'font-size 0.05s',
        }}
      >
        💗
      </button>

      <div style={{ marginTop: '40px', opacity: 0.7 }}>
        타이밍을 맞춰 클릭하세요!
      </div>
    </div>
  );
}
