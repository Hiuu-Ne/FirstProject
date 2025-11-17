import React, { useState, useEffect } from 'react';
import type { CharacterResult } from '../types';

interface ResultPageProps {
  result: CharacterResult;
  onRestart: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ result, onRestart }) => {
  const [showCopied, setShowCopied] = useState(false);
  const [testCount, setTestCount] = useState(0);

  useEffect(() => {
    // 테스트 횟수 카운트
    const count = parseInt(localStorage.getItem('gameCharacterTestCount') || '0') + 1;
    setTestCount(count);
    localStorage.setItem('gameCharacterTestCount', count.toString());
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(result.shareText).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  const getStatBar = (value: number, max: number = 20) => {
    const percentage = ((value + max) / (max * 2)) * 100;
    return Math.max(0, Math.min(100, percentage));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full fade-in-up">
        {/* 결과 발표 */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            🎉 결과 발표! 🎉
          </h2>
          <p className="text-slate-300 text-lg">당신의 게임 캐릭터는...</p>
        </div>

        {/* 메인 결과 카드 */}
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border-4 border-purple-500/50 mb-6">
          {/* 레벨과 타이틀 */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-2 rounded-full mb-4">
              <span className="text-2xl font-black text-slate-900">Lv.{result.level}</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-2">
              {result.adjective}
            </h3>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              {result.job}
            </h1>
          </div>

          {/* 스탯 표시 */}
          <div className="space-y-6 mb-8">
            {/* 주인공력 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold text-red-300 flex items-center gap-2">
                  👑 주인공력
                </span>
                <span className="text-sm font-mono text-slate-400">
                  {result.stats.main > 0 ? '+' : ''}{result.stats.main}
                </span>
              </div>
              <div className="h-6 bg-slate-700 rounded-full overflow-hidden border-2 border-slate-600">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-1000 flex items-center justify-end pr-2"
                  style={{ width: `${getStatBar(result.stats.main)}%` }}
                >
                  {result.stats.main > 10 && <span className="text-xs font-bold">⭐</span>}
                </div>
              </div>
            </div>

            {/* 사회성 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold text-blue-300 flex items-center gap-2">
                  🤝 사회성
                </span>
                <span className="text-sm font-mono text-slate-400">
                  {result.stats.social > 0 ? '+' : ''}{result.stats.social}
                </span>
              </div>
              <div className="h-6 bg-slate-700 rounded-full overflow-hidden border-2 border-slate-600">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-1000 flex items-center justify-end pr-2"
                  style={{ width: `${getStatBar(result.stats.social)}%` }}
                >
                  {result.stats.social > 10 && <span className="text-xs font-bold">⭐</span>}
                </div>
              </div>
            </div>

            {/* 혼돈 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold text-purple-300 flex items-center gap-2">
                  🎲 혼돈 지수
                </span>
                <span className="text-sm font-mono text-slate-400">
                  {result.stats.chaos > 0 ? '+' : ''}{result.stats.chaos}
                </span>
              </div>
              <div className="h-6 bg-slate-700 rounded-full overflow-hidden border-2 border-slate-600">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 flex items-center justify-end pr-2"
                  style={{ width: `${getStatBar(result.stats.chaos)}%` }}
                >
                  {result.stats.chaos > 10 && <span className="text-xs font-bold">⭐</span>}
                </div>
              </div>
            </div>
          </div>

          {/* 설명 */}
          <div className="bg-slate-800/50 rounded-xl p-6 border-2 border-purple-500/30">
            <h4 className="text-xl font-bold text-purple-300 mb-3">📝 캐릭터 분석</h4>
            <div className="text-slate-200 leading-relaxed whitespace-pre-line">
              {result.description}
            </div>
          </div>
        </div>

        {/* 버튼들 */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <button
            onClick={handleShare}
            className="flex-1 px-8 py-4 text-xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            {showCopied ? '✅ 복사 완료!' : '🔗 결과 공유하기'}
          </button>
          <button
            onClick={onRestart}
            className="flex-1 px-8 py-4 text-xl font-black bg-slate-700 hover:bg-slate-600 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-slate-600"
          >
            🔄 다시하기
          </button>
        </div>

        {/* 통계 */}
        <div className="text-center">
          <p className="text-sm text-slate-500">
            💫 지금까지 <span className="text-purple-400 font-bold">{testCount.toLocaleString()}번</span> 테스트를 완료했어요!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
