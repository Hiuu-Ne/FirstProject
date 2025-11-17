import React, { useEffect, useState } from 'react';
import { RESULT_DATA } from '../constants';
import { ResultData } from '../types';

interface ResultScreenProps {
  totalScore: number;
  maxScore: number;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ totalScore, maxScore, onRestart }) => {
  const [showResult, setShowResult] = useState(false);
  const percentage = Math.round((totalScore / maxScore) * 100);

  // 결과 데이터 찾기 (가장 가까운 구간)
  const getResultData = (): ResultData => {
    let closestResult = RESULT_DATA[0];
    let minDiff = Math.abs(percentage - RESULT_DATA[0].percentage);

    for (const result of RESULT_DATA) {
      const diff = Math.abs(percentage - result.percentage);
      if (diff < minDiff) {
        minDiff = diff;
        closestResult = result;
      }
    }

    return { ...closestResult, percentage };
  };

  const result = getResultData();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResult(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // 온도계 색상 결정
  const getThermometerColor = () => {
    if (percentage < 30) return 'from-blue-500 to-cyan-400';
    if (percentage < 50) return 'from-green-500 to-yellow-400';
    if (percentage < 70) return 'from-yellow-500 to-orange-400';
    if (percentage < 90) return 'from-orange-500 to-red-500';
    return 'from-red-600 to-purple-600';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className={`max-w-4xl w-full transition-all duration-1000 ${showResult ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        {/* 결과 타이틀 */}
        <div className="text-center mb-8 space-y-4">
          <div className="text-7xl mb-4 pulse-animation">{result.emoji}</div>
          <h1 className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}>
            {result.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-medium">
            {result.message}
          </p>
        </div>

        {/* 메인 결과 카드 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">

            {/* 온도계 */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* 온도계 본체 */}
                <div className="w-24 h-80 bg-white/20 rounded-full relative overflow-hidden border-4 border-white/30">
                  {/* 채우기 애니메이션 */}
                  <div
                    className={`absolute bottom-0 w-full bg-gradient-to-t ${getThermometerColor()} transition-all duration-2000 ease-out`}
                    style={{
                      height: `${percentage}%`,
                      animation: 'fillThermometer 2s ease-out forwards'
                    }}
                  />

                  {/* 눈금 */}
                  <div className="absolute inset-0 flex flex-col justify-between py-4 px-1">
                    {[100, 75, 50, 25, 0].map((mark) => (
                      <div key={mark} className="flex items-center justify-end">
                        <div className="w-3 h-0.5 bg-white/50" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 온도계 구 */}
                <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br ${getThermometerColor()} border-4 border-white/30 shadow-lg`} />
              </div>

              <div className="text-sm text-gray-400 mt-6 space-y-1">
                <div>100% ━ 폭발</div>
                <div>75% ━ 위험</div>
                <div>50% ━ 주의</div>
                <div>25% ━ 안전</div>
                <div>0% ━ 평화</div>
              </div>
            </div>

            {/* 퍼센트 & 설명 */}
            <div className="flex-1 text-center md:text-left space-y-6">
              <div>
                <div className="text-8xl md:text-9xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
                  {percentage}%
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-200">
                  퇴사 본능 지수
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                <p className="text-lg text-gray-200 leading-relaxed">
                  💬 {result.advice}
                </p>
              </div>

              {/* 통계 (가짜지만 재미로) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-2xl font-bold text-orange-400">
                    {totalScore}점
                  </div>
                  <div className="text-sm text-gray-400">총점</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-2xl font-bold text-purple-400">
                    상위 {100 - percentage}%
                  </div>
                  <div className="text-sm text-gray-400">행복 순위</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={onRestart}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg font-bold py-4 px-8 rounded-2xl shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            🔄 다시 측정하기
          </button>
          <button
            onClick={() => {
              // 결과 공유 기능 (나중에 구현 가능)
              alert('결과를 캡처해서 친구들과 공유하세요! 📸');
            }}
            className="flex-1 bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white text-lg font-bold py-4 px-8 rounded-2xl transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            📱 결과 공유하기
          </button>
        </div>

        {/* 하단 메시지 */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-400">
            💡 이 테스트는 재미로만 봐주세요!
          </p>
          <p className="text-xs text-gray-500">
            진짜 퇴사 고민이 있다면 신중하게 결정하세요 😊
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
