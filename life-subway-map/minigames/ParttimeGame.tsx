import { useState, useEffect } from 'react';
import { MiniGameProps } from '../types';
import { STATION_POOL } from '../data';

export default function ParttimeGame({ onComplete }: MiniGameProps) {
  const [customers, setCustomers] = useState<{ id: number; x: number; y: number; isBad: boolean }[]>([]);
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    // 손님 생성
    const interval = setInterval(() => {
      const isBad = Math.random() < 0.2; // 20% 진상
      setCustomers((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 70 + 15,
          isBad,
        },
      ]);
    }, 600);

    // 타이머
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          clearInterval(timer);

          let station;
          if (count >= 50) station = STATION_POOL.parttime[0];
          else if (count >= 35) station = STATION_POOL.parttime[1];
          else if (count >= 20) station = STATION_POOL.parttime[2];
          else station = STATION_POOL.parttime[3];

          setTimeout(() => onComplete({ line: 'parttime', score: count, station }), 500);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [count, onComplete]);

  const handleClick = (id: number, isBad: boolean) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    setCount((c) => c + (isBad ? -5 : 1));
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '20px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>💰 알바 지옥선</h2>
      <p style={{ fontSize: '16px', marginBottom: '20px', opacity: 0.9 }}>
        손님이 몰려옵니다! 빠르게 처리하세요
      </p>

      <div style={{ fontSize: '20px', marginBottom: '20px' }}>
        ⏰ {timeLeft}초 | 처리: {count}명
      </div>

      <div
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
        {customers.map((customer) => (
          <div
            key={customer.id}
            onClick={() => handleClick(customer.id, customer.isBad)}
            onTouchStart={() => handleClick(customer.id, customer.isBad)}
            style={{
              position: 'absolute',
              left: `${customer.x}%`,
              top: `${customer.y}%`,
              fontSize: '40px',
              cursor: 'pointer',
              animation: 'fadeIn 0.3s',
            }}
          >
            {customer.isBad ? '😡' : '🛒'}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', opacity: 0.7, fontSize: '14px' }}>
        🛒 클릭하세요! 😡 진상 조심! (-5)
      </div>
    </div>
  );
}
