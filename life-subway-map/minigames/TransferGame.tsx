import { useState } from 'react';
import { MiniGameProps } from '../types';
import { STATION_POOL } from '../data';

export default function TransferGame({ onComplete }: MiniGameProps) {
  const [slots, setSlots] = useState(['?', '?', '?']);
  const [stopped, setStopped] = useState([false, false, false]);
  const [currentSlot, setCurrentSlot] = useState(0);

  const options = ['이직', '연애', '이사', '창업', '퇴사', '유학'];

  const handleStop = () => {
    if (currentSlot >= 3) return;

    const newSlots = [...slots];
    newSlots[currentSlot] = options[Math.floor(Math.random() * options.length)];
    setSlots(newSlots);

    const newStopped = [...stopped];
    newStopped[currentSlot] = true;
    setStopped(newStopped);

    if (currentSlot === 2) {
      // 결과 판정
      setTimeout(() => {
        let station;
        const unique = new Set(newSlots).size;
        if (unique === 1) station = STATION_POOL.transfer[0]; // 전설
        else if (unique === 2) station = STATION_POOL.transfer[1];
        else station = STATION_POOL.transfer[2];

        onComplete({ line: 'transfer', score: unique === 1 ? 100 : unique === 2 ? 50 : 0, station });
      }, 1000);
    } else {
      setCurrentSlot(currentSlot + 1);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '20px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>🔄 환승역</h2>
      <p style={{ fontSize: '16px', marginBottom: '20px', opacity: 0.9 }}>
        인생의 전환점입니다
      </p>

      <div style={{ fontSize: '80px', marginBottom: '40px' }}>🎰</div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
        {slots.map((slot, idx) => (
          <div
            key={idx}
            style={{
              width: '100px',
              height: '120px',
              background: stopped[idx] ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              animation: stopped[idx] ? 'none' : 'pulse 0.5s infinite',
            }}
          >
            {slot}
          </div>
        ))}
      </div>

      {currentSlot < 3 && (
        <button
          onClick={handleStop}
          onTouchStart={handleStop}
          style={{
            padding: '20px 60px',
            fontSize: '24px',
            background: '#F59E0B',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          STOP
        </button>
      )}

      {currentSlot >= 3 && (
        <div style={{ fontSize: '20px', opacity: 0.9 }}>
          인생이 {slots.join(' → ')} 중...
        </div>
      )}

      <div style={{ marginTop: '30px', opacity: 0.7, fontSize: '14px' }}>
        타이밍 맞춰 STOP!
      </div>
    </div>
  );
}
