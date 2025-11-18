import React, { useState, useEffect } from 'react';
import { LOADING_MESSAGES } from '../constants';

const LoadingScreen: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8 fade-in">
        {/* 로딩 애니메이션 */}
        <div className="relative">
          <div className="text-8xl pulse-animation">🔥</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
          </div>
        </div>

        {/* 로딩 메시지 */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
            분석 중...
          </h2>
          <p className="text-lg text-gray-300 min-h-[3rem] transition-all duration-300">
            {LOADING_MESSAGES[messageIndex]}
          </p>
        </div>

        {/* 로딩 바 */}
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse"
               style={{ width: '100%' }} />
        </div>

        <p className="text-sm text-gray-400">
          잠시만 기다려주세요 ⏳
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
