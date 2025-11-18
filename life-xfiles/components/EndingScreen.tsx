import React, { useEffect, useState, useRef } from 'react';
import { LifeStats } from '../types';
import { formatNumber } from '../utils';

interface EndingScreenProps {
  stats: LifeStats;
  onRestart: () => void;
}

const EndingScreen: React.FC<EndingScreenProps> = ({ stats, onRestart }) => {
  const [visible, setVisible] = useState(false);
  const [liveRemaining, setLiveRemaining] = useState(stats.remainingSeconds);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={sectionRef} className="section bg-gradient-to-b from-black via-blue-950/20 to-black min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        {/* 메인 메시지 */}
        <div className={`space-y-12 mb-16 ${visible ? 'reveal active' : 'reveal'}`}>
          <div className="space-y-6">
            <p className="text-3xl md:text-4xl font-bold text-gray-200">
              하지만...
            </p>
          </div>

          <div className={`${visible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '0.3s' }}>
            <div className="text-8xl mb-8">✨</div>
            <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-8">
              이 우주에서<br />
              당신과 같은 사람은
            </p>
            <p className="text-7xl md:text-8xl font-black text-white mb-12">
              단 한 명
            </p>
            <p className="text-xl text-gray-400">
              입니다
            </p>
          </div>
        </div>

        {/* 요약 메시지 */}
        <div className={`bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-3xl p-12 border border-purple-500/30 mb-12 ${visible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '0.5s' }}>
          <div className="space-y-6 text-2xl md:text-3xl font-medium text-gray-200">
            <p>당신의 인생은</p>
            <p className="text-blue-400">작지만 소중합니다</p>
            <p className="text-purple-400">짧지만 의미있습니다</p>
            <p className="text-pink-400">평범하지만 특별합니다</p>
          </div>
        </div>

        {/* 남은 시간 강조 */}
        <div className={`bg-gradient-to-br from-red-900/40 to-orange-900/40 backdrop-blur-lg rounded-3xl p-12 border-2 border-red-500/50 mb-12 ${visible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '0.7s' }}>
          <p className="text-2xl text-gray-300 mb-6">
            남은 시간을 어떻게 쓸지는
          </p>
          <p className="text-4xl font-black text-white mb-8">
            당신의 선택입니다
          </p>

          <div className="bg-black/30 rounded-2xl p-8">
            <p className="text-lg text-gray-400 mb-4">남은 시간</p>
            <div className="text-7xl font-black text-red-400 count-up">
              {formatNumber(liveRemaining)}
            </div>
            <p className="text-gray-500 mt-2">초</p>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className={`space-y-4 ${visible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '0.9s' }}>
          <button
            onClick={onRestart}
            className="w-full max-w-md mx-auto block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl font-black py-4 px-8 rounded-full transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl"
          >
            🔄 다시 분석하기
          </button>

          <button
            onClick={() => {
              alert('결과를 캡처해서 친구들과 공유하세요! 📸\n\n"내 인생 X파일 분석 결과"');
            }}
            className="w-full max-w-md mx-auto block bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white text-lg font-bold py-3 px-8 rounded-full transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            📱 결과 공유하기
          </button>
        </div>

        {/* 하단 메시지 */}
        <div className="mt-16 text-sm text-gray-600">
          <p>당신의 인생은 특별합니다 ✨</p>
          <p className="mt-2">매 순간을 소중히 보내세요</p>
        </div>
      </div>
    </div>
  );
};

export default EndingScreen;
