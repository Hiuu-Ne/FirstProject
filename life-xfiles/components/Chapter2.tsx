import React, { useEffect, useState, useRef } from 'react';
import { LifeStats, UserData } from '../types';
import { formatNumber, formatDecimal } from '../utils';

interface Chapter2Props {
  userData: UserData;
  stats: LifeStats;
}

const Chapter2: React.FC<Chapter2Props> = ({ userData, stats }) => {
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

  // 실시간 남은 시간 카운트다운
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeCategories = [
    { name: '수면', years: stats.sleepYears, emoji: '😴', color: 'blue' },
    { name: '일/학교', years: stats.workYears, emoji: '💼', color: 'purple' },
    { name: '스마트폰', years: stats.phoneYears, emoji: '📱', color: 'pink' },
    { name: '먹기', years: stats.eatingYears, emoji: '🍚', color: 'orange' },
    { name: '이동', years: stats.commuteYears, emoji: '🚗', color: 'green' },
    { name: '화장실', years: stats.bathroomYears, emoji: '🚽', color: 'yellow' },
  ];

  const totalYears = timeCategories.reduce((sum, cat) => sum + cat.years, 0);
  const percentageUsed = (totalYears / userData.currentAge) * 100;

  return (
    <div ref={sectionRef} className="section bg-gradient-to-b from-black via-blue-950/20 to-black">
      <div className="max-w-5xl mx-auto">
        {/* 타이틀 */}
        <div className={`text-center mb-16 ${visible ? 'reveal active' : 'reveal'}`}>
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Chapter 2
          </h2>
          <p className="text-3xl font-bold text-gray-300">시간의 무게</p>
        </div>

        {/* 인생 막대 그래프 */}
        <div className={`mb-24 ${visible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '0.2s' }}>
          <div className="text-center mb-8">
            <p className="text-2xl text-gray-300 mb-4">당신의 인생을 시간으로</p>
            <div className="text-6xl mb-4">⏰</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="space-y-4 mb-8">
              {timeCategories.map((cat, index) => {
                const percentage = (cat.years / userData.currentAge) * 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">
                        {cat.emoji} {cat.name}
                      </span>
                      <span className="text-gray-400">
                        {formatDecimal(cat.years)}년 ({formatDecimal(percentage)}%)
                      </span>
                    </div>
                    <div className="w-full h-8 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-${cat.color}-400 to-${cat.color}-600 transition-all duration-1000`}
                        style={{
                          width: visible ? `${percentage}%` : '0%',
                          transitionDelay: `${index * 0.1}s`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/30">
              <p className="text-xl text-gray-300">
                당신은 인생의 <span className="text-red-400 font-black text-3xl">{formatDecimal(percentageUsed)}%</span>를
              </p>
              <p className="text-xl text-gray-300">
                이미 정해진 활동에 사용했습니다
              </p>
            </div>
          </div>
        </div>

        {/* 앞으로 보낼 시간 */}
        <div className={`mb-24 ${visible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '0.4s' }}>
          <div className="text-center mb-8">
            <p className="text-2xl text-gray-300">앞으로...</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-2xl p-6 border border-blue-500/30">
              <p className="text-lg text-gray-400 mb-2">😴 더 잘 시간</p>
              <p className="text-4xl font-black text-blue-400">
                {formatDecimal((80 - userData.currentAge) * 0.33)}년
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/30">
              <p className="text-lg text-gray-400 mb-2">💼 더 일할 시간</p>
              <p className="text-4xl font-black text-purple-400">
                {formatDecimal((65 - Math.min(userData.currentAge, 65)) * 0.6)}년
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-pink-500/30">
              <p className="text-lg text-gray-400 mb-2">📱 스마트폰 볼 시간</p>
              <p className="text-4xl font-black text-pink-400">
                {formatDecimal((80 - userData.currentAge) * 0.2)}년
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-yellow-500/30">
              <p className="text-lg text-gray-400 mb-2">🚽 화장실 갈 시간</p>
              <p className="text-4xl font-black text-yellow-400">
                {formatDecimal((80 - userData.currentAge) * 30 / 365)}년
              </p>
            </div>
          </div>
        </div>

        {/* 남은 시간 카운트다운 */}
        <div className={`text-center ${visible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '0.6s' }}>
          <div className="bg-gradient-to-br from-red-900/50 to-purple-900/50 backdrop-blur-lg rounded-3xl p-12 border-2 border-red-500/50">
            <p className="text-2xl text-gray-300 mb-8">남은 시간</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div>
                <div className="text-5xl font-black text-red-400">
                  {formatNumber(Math.floor(liveRemaining / 86400))}
                </div>
                <div className="text-sm text-gray-400">일</div>
              </div>
              <div>
                <div className="text-5xl font-black text-orange-400">
                  {formatNumber(Math.floor(liveRemaining / 3600))}
                </div>
                <div className="text-sm text-gray-400">시간</div>
              </div>
              <div>
                <div className="text-5xl font-black text-yellow-400">
                  {formatNumber(Math.floor(liveRemaining / 60))}
                </div>
                <div className="text-sm text-gray-400">분</div>
              </div>
              <div>
                <div className="text-5xl font-black text-white count-up">
                  {formatNumber(liveRemaining)}
                </div>
                <div className="text-sm text-gray-400">초</div>
              </div>
            </div>

            <p className="text-xl text-red-300 font-bold">
              지금도 줄어들고 있습니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter2;
