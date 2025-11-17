import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center fade-in-up">
        {/* 타이틀 */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            🎮 너는 무슨<br />게임 캐릭터? 🎮
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-bold">
            10가지 질문으로 알아보는<br />
            나의 진짜 캐릭터 타입!
          </p>
        </div>

        {/* 설명 박스 */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border-2 border-purple-500/30">
          <p className="text-lg text-slate-200 mb-4">
            ✨ RPG 게임 속 주인공이 된 당신!<br />
            과연 어떤 직업과 성격을 가졌을까?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-6">
            <div className="bg-gradient-to-br from-red-900/40 to-orange-900/40 rounded-lg p-4 border border-red-500/30">
              <div className="text-3xl mb-2">👑</div>
              <div className="font-bold text-red-300">주인공력</div>
              <div className="text-xs text-slate-400 mt-1">메인 주인공? 엑스트라?</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-lg p-4 border border-blue-500/30">
              <div className="text-3xl mb-2">🤝</div>
              <div className="font-bold text-blue-300">사회성</div>
              <div className="text-xs text-slate-400 mt-1">인싸? 아싸?</div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg p-4 border border-purple-500/30">
              <div className="text-3xl mb-2">🎲</div>
              <div className="font-bold text-purple-300">혼돈 지수</div>
              <div className="text-xs text-slate-400 mt-1">계획적? 랜덤?</div>
            </div>
          </div>
        </div>

        {/* 시작 버튼 */}
        <button
          onClick={onStart}
          className="w-full md:w-auto px-12 py-5 text-2xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600"
        >
          시작하기 🚀
        </button>

        <p className="mt-6 text-sm text-slate-500">
          ⚡ 소요시간: 약 2분 | 총 10문항
        </p>
      </div>
    </div>
  );
};

export default StartScreen;
