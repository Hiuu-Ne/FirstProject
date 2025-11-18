import React, { useEffect, useState, useRef } from 'react';
import { LifeStats } from '../types';
import { formatNumber } from '../utils';

interface Chapter1Props {
  stats: LifeStats;
}

const Chapter1: React.FC<Chapter1Props> = ({ stats }) => {
  const [visible, setVisible] = useState(false);
  const [liveHeartbeats, setLiveHeartbeats] = useState(stats.heartbeats);
  const sectionRef = useRef<HTMLDivElement>(null);

  // 스크롤 트리거
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 실시간 심장박동 카운터
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveHeartbeats((prev) => prev + 1.2); // 1초에 1.2회 (72회/분)
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={sectionRef} className="section bg-gradient-to-b from-black via-red-950/20 to-black">
      <div className="max-w-4xl mx-auto text-center">
        {/* 타이틀 */}
        <div className={`mb-16 ${visible ? 'reveal active' : 'reveal'}`}>
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
            Chapter 1
          </h2>
          <p className="text-3xl font-bold text-gray-300">원자적 당신</p>
        </div>

        {/* 심장박동 */}
        <div className={`mb-24 ${visible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '0.2s' }}>
          <div className="text-8xl mb-8 heartbeat">💓</div>
          <p className="text-2xl text-gray-300 mb-4">지금 이 순간도...</p>
          <p className="text-xl text-gray-400 mb-8">당신의 심장은 뛰고 있습니다</p>

          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-red-500/30 mb-8">
            <div className="text-7xl md:text-8xl font-black text-red-400 mb-4 count-up">
              {formatNumber(liveHeartbeats)}
            </div>
            <p className="text-xl text-gray-300 mb-6">심장 박동 횟수</p>

            <div className="space-y-4 text-left max-w-2xl mx-auto">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-gray-300">
                  = 1초에 1번씩 세면 <span className="text-red-400 font-bold">{formatNumber(stats.heartbeats / 86400)}일</span>이 걸립니다
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-gray-300">
                  = 10원짜리 동전으로 쌓으면 <span className="text-red-400 font-bold">에베레스트</span> 높이입니다
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-gray-300">
                  = 당신의 심장은 <span className="text-red-400 font-bold">지구에서 달까지</span> 갈 정도로 피를 펌핑했습니다
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 호흡 */}
        <div className={`mb-24 ${visible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '0.4s' }}>
          <div className="text-8xl mb-8">🫁</div>
          <p className="text-2xl text-gray-300 mb-8">숨</p>

          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-cyan-500/30">
            <div className="text-7xl md:text-8xl font-black text-cyan-400 mb-4">
              {formatNumber(stats.breaths)}
            </div>
            <p className="text-xl text-gray-300 mb-6">호흡 횟수</p>

            <div className="space-y-3 text-gray-300">
              <p>= 풍선 <span className="text-cyan-400 font-bold">{formatNumber(stats.breaths / 1000000)}만개</span></p>
              <p>= 열기구 <span className="text-cyan-400 font-bold">{formatNumber(stats.breaths / 5000)}</span>개</p>
              <p>= 경기장을 가득 채울 공기</p>
            </div>
          </div>
        </div>

        {/* 눈 깜빡임 */}
        <div className={`mb-16 ${visible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '0.6s' }}>
          <div className="text-8xl mb-8">👁️</div>
          <p className="text-2xl text-gray-300 mb-8">눈 깜빡임</p>

          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-yellow-500/30">
            <div className="text-7xl md:text-8xl font-black text-yellow-400 mb-4">
              {formatNumber(stats.blinks)}
            </div>
            <p className="text-xl text-gray-300 mb-6">깜빡인 횟수</p>

            <div className="bg-yellow-500/10 rounded-xl p-6 border border-yellow-500/30">
              <p className="text-2xl font-bold text-yellow-300 mb-2">
                인생의 10%를
              </p>
              <p className="text-xl text-gray-300">
                눈 감고 살았습니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter1;
