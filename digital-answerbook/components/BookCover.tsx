import React from 'react';

interface BookCoverProps {
  onOpen: () => void;
}

const BookCover: React.FC<BookCoverProps> = ({ onOpen }) => {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer relative"
      onClick={onOpen}
    >
      {/* 가챠 머신 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-500 to-red-600 rounded-lg"></div>

      {/* 가챠 머신 본체 */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

        {/* 투명 구슬 통 */}
        <div className="relative bg-gradient-to-br from-blue-300/40 to-cyan-200/30 backdrop-blur-sm rounded-full w-48 h-48 sm:w-56 sm:h-56 border-4 border-white/50 shadow-2xl overflow-hidden">
          {/* 반짝이는 효과 */}
          <div className="absolute top-2 left-2 w-12 h-12 bg-white/30 rounded-full blur-xl"></div>

          {/* 랜덤 캡슐들 */}
          <div className="absolute top-8 left-6 w-8 h-8 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '2s'}}></div>
          <div className="absolute top-12 right-8 w-6 h-6 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.3s', animationDuration: '2.5s'}}></div>
          <div className="absolute bottom-16 left-10 w-7 h-7 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.6s', animationDuration: '2.2s'}}></div>
          <div className="absolute bottom-20 right-6 w-8 h-8 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.9s', animationDuration: '2.8s'}}></div>
          <div className="absolute top-20 left-1/2 w-7 h-7 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '1.2s', animationDuration: '2.4s'}}></div>
          <div className="absolute top-28 right-1/4 w-6 h-6 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '2.6s'}}></div>

          {/* 중앙 텍스트 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-2xl sm:text-3xl font-black text-white drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
                운세 뽑기
              </h1>
              <p className="text-sm text-white/90 mt-1">🎰</p>
            </div>
          </div>
        </div>

        {/* 코인 투입구 */}
        <div className="mt-6 bg-yellow-400 rounded-lg px-6 py-2 border-4 border-yellow-500 shadow-lg">
          <p className="text-sm font-bold text-gray-800">INSERT COIN</p>
        </div>

        {/* 손잡이 */}
        <div className="mt-4 relative">
          <div className="w-3 h-8 bg-gray-600 rounded-full"></div>
          <div className="absolute -right-8 top-1 w-16 h-6 bg-red-600 rounded-full border-4 border-red-700 shadow-lg"></div>
        </div>

        {/* 출구 */}
        <div className="mt-2 w-24 h-3 bg-black/80 rounded-b-lg"></div>

        {/* 안내 문구 */}
        <div className="mt-6 text-center">
          <p className="text-white text-sm font-bold drop-shadow-lg">
            질문을 떠올리고
          </p>
          <p className="text-yellow-300 text-lg font-black drop-shadow-lg animate-pulse">
            CLICK!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCover;
