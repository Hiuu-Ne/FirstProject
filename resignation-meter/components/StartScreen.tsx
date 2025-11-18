import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 fade-in">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 타이틀 */}
        <div className="space-y-4">
          <div className="text-7xl mb-4 pulse-animation">🔥</div>
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent leading-tight">
            퇴사 본능 온도계
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-medium">
            오늘 당신의 퇴사 욕구는 몇 %?
          </p>
        </div>

        {/* 설명 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
          <p className="text-lg text-gray-200 mb-4">
            직장인이라면 누구나 느끼는 그 감정! 🫠
          </p>
          <p className="text-gray-300">
            12개의 질문으로 당신의 퇴사 욕구를 정밀 측정합니다
          </p>
          <p className="text-sm text-gray-400 mt-3">
            * 결과는 재미로만 봐주세요 😉
          </p>
        </div>

        {/* 시작 버튼 */}
        <button
          onClick={onStart}
          className="w-full max-w-md mx-auto bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white text-xl md:text-2xl font-bold py-6 px-12 rounded-full shadow-2xl transform transition-all duration-200 hover:scale-105 active:scale-95"
        >
          측정 시작하기 🚀
        </button>

        {/* 하단 텍스트 */}
        <div className="text-sm text-gray-400 space-y-1">
          <p>💼 전국 직장인 공감률 99.9%</p>
          <p>⚡️ 소요시간: 2분</p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
