import React, { useEffect, useState, useRef } from 'react';
import { UserData } from '../types';
import { formatNumber } from '../utils';

interface Chapter3Props {
  userData: UserData;
}

const Chapter3: React.FC<Chapter3Props> = ({ userData }) => {
  const [visible, setVisible] = useState(false);
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

  const earthAge = 4600000000; // 46억년
  const universeAge = 13800000000; // 138억년
  const atoms = 7e27; // 700경개
  const milkyWayStars = 1e11; // 1000억개

  const earthPercentage = (userData.currentAge / earthAge) * 100;
  const universePercentage = (userData.currentAge / universeAge) * 100;

  return (
    <div ref={sectionRef} className="section bg-gradient-to-b from-black via-purple-950/30 to-black">
      <div className="max-w-4xl mx-auto text-center">
        {/* 타이틀 */}
        <div className={`mb-16 ${visible ? 'reveal active' : 'reveal'}`}>
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Chapter 3
          </h2>
          <p className="text-3xl font-bold text-gray-300">우주적 관점</p>
        </div>

        <div className={`mb-16 ${visible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '0.2s' }}>
          <p className="text-2xl text-gray-300 mb-12">
            당신이라는 존재를<br />
            우주적 관점에서 보면...
          </p>
        </div>

        {/* 지구 나이 비교 */}
        <div className={`mb-16 ${visible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '0.3s' }}>
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-blue-500/30">
            <div className="text-7xl mb-6">🌍</div>
            <p className="text-2xl text-gray-300 mb-4">지구는 46억살</p>
            <p className="text-xl text-gray-400 mb-8">당신: {userData.currentAge}살</p>

            <div className="bg-blue-500/10 rounded-xl p-6">
              <p className="text-lg text-gray-300">
                당신은 지구 나이의
              </p>
              <p className="text-5xl font-black text-blue-400 my-4">
                0.00000{earthPercentage.toFixed(3).split('.')[1].substring(0, 3)}%
              </p>
              <p className="text-sm text-gray-500">
                지구에게 당신은 눈 깜빡일 순간입니다
              </p>
            </div>
          </div>
        </div>

        {/* 우주 나이 비교 */}
        <div className={`mb-16 ${visible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '0.4s' }}>
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-purple-500/30">
            <div className="text-7xl mb-6">⭐️</div>
            <p className="text-2xl text-gray-300 mb-4">우주는 138억살</p>

            <div className="bg-purple-500/10 rounded-xl p-6">
              <p className="text-lg text-gray-300">
                당신은 우주 나이의
              </p>
              <p className="text-5xl font-black text-purple-400 my-4">
                0.00000{universePercentage.toFixed(3).split('.')[1].substring(0, 3)}%
              </p>
              <p className="text-sm text-gray-500">
                우주에게 당신은 찰나의 순간입니다
              </p>
            </div>
          </div>
        </div>

        {/* 원자 */}
        <div className={`mb-16 ${visible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '0.5s' }}>
          <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 backdrop-blur-lg rounded-3xl p-12 border border-pink-500/30">
            <div className="text-7xl mb-6">✨</div>
            <p className="text-2xl text-gray-300 mb-8">당신은...</p>

            <div className="space-y-6">
              <div className="bg-white/5 rounded-xl p-6">
                <p className="text-xl text-gray-300">
                  원자 <span className="text-pink-400 font-black text-4xl">{formatNumber(atoms)}</span>개로
                </p>
                <p className="text-xl text-gray-300">
                  이루어져 있습니다
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  = 은하수 별의 7,000배
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <p className="text-xl text-gray-300">
                  당신의 원자들은
                </p>
                <p className="text-3xl font-bold text-yellow-400 my-2">
                  별에서 만들어졌습니다
                </p>
                <p className="text-lg text-gray-400">
                  당신은 별의 먼지입니다 ⭐️
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter3;
