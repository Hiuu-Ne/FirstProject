import React from 'react';

interface AnswerPageProps {
  answer: string;
  onAskAgain: () => void;
}

const AnswerPage: React.FC<AnswerPageProps> = ({ answer, onAskAgain }) => {
  // 랜덤 캡슐 색상
  const capsuleColors = [
    'from-red-400 to-red-600',
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-yellow-400 to-yellow-600',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-600',
    'from-orange-400 to-orange-600',
  ];
  const randomColor = capsuleColors[Math.floor(Math.random() * capsuleColors.length)];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100"></div>

      {/* 반짝이는 별 효과 */}
      <div className="absolute top-10 left-10 text-4xl animate-ping">✨</div>
      <div className="absolute top-20 right-16 text-3xl animate-ping" style={{animationDelay: '0.3s'}}>⭐</div>
      <div className="absolute bottom-20 left-20 text-3xl animate-ping" style={{animationDelay: '0.6s'}}>💫</div>
      <div className="absolute bottom-16 right-12 text-4xl animate-ping" style={{animationDelay: '0.9s'}}>✨</div>

      {/* 캡슐 디자인 */}
      <div className="relative z-10 flex flex-col items-center">
        {/* 캡슐 상단 */}
        <div className={`w-32 h-16 bg-gradient-to-b ${randomColor} rounded-t-full border-4 border-white shadow-2xl opacity-0 animate-[slideDown_0.5s_ease-out_forwards]`}></div>

        {/* 캡슐 하단 (열린 상태) */}
        <div className="relative w-48 mt-2 opacity-0 animate-[fadeIn_0.8s_ease-out_0.5s_forwards]">
          {/* 종이쪽지 효과 */}
          <div className="bg-white rounded-lg p-6 shadow-2xl border-4 border-gray-200 transform rotate-1">
            <div className="absolute -top-2 -right-2 text-3xl">📜</div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 leading-relaxed min-h-[80px] flex items-center justify-center">
              {answer}
            </p>
          </div>
        </div>

        {/* 버튼들 */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 opacity-0 animate-[fadeIn_0.8s_ease-out_1s_forwards]">
          <button
            onClick={onAskAgain}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            🎰 다시 뽑기
          </button>
          <button
            onClick={() => {
              const shareText = `🎰 디지털 운세 뽑기 결과:\n\n"${answer}"\n\n너도 운세 뽑아봐! 👉 [링크 삽입]`;
              navigator.clipboard.writeText(shareText);
              alert('클립보드에 복사되었습니다! 친구에게 공유해보세요 😊');
            }}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold rounded-full hover:from-pink-600 hover:to-rose-700 transition-all transform hover:scale-105 shadow-lg"
          >
            📤 공유하기
          </button>
        </div>

        {/* 하단 문구 */}
        <p className="mt-6 text-sm text-gray-600 opacity-0 animate-[fadeIn_0.8s_ease-out_1.2s_forwards]">
          💝 친구에게도 공유하면 더 재밌어요!
        </p>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default AnswerPage;
