import React, { useState, useCallback, useEffect } from 'react';
import { ANSWERS } from './constants/answers';
import BookCover from './components/BookCover';
import AnswerPage from './components/AnswerPage';

const App: React.FC = () => {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [pullCount, setPullCount] = useState(() => {
    const saved = localStorage.getItem('pullCount');
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('pullCount', pullCount.toString());
  }, [pullCount]);

  const openBook = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * ANSWERS.length);
    setCurrentAnswer(ANSWERS[randomIndex]);
    setIsBookOpen(true);
    setPullCount(prev => prev + 1);
  }, []);

  const askAgain = useCallback(() => {
    setIsBookOpen(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 perspective bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* 상단 통계 */}
      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border-2 border-white/20">
        <p className="text-white text-sm font-bold">🎰 뽑기 횟수</p>
        <p className="text-yellow-300 text-2xl font-black text-center">{pullCount}</p>
      </div>

      {/* 제목 */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 drop-shadow-lg">
          디지털 운세 뽑기
        </h1>
        <p className="text-white/70 text-sm mt-1">질문을 떠올리고 클릭!</p>
      </div>

      {/* 가챠 머신 */}
      <div className={`book w-[300px] h-[450px] sm:w-[350px] sm:h-[525px] md:w-[400px] md:h-[600px] relative ${isBookOpen ? 'open' : ''}`}>
        <div
          className="book-cover absolute w-full h-full rounded-lg"
          style={{ zIndex: isBookOpen ? 10 : 30 }}
        >
          {!isBookOpen && <BookCover onOpen={openBook} />}
        </div>
        <div
            className="book-page absolute w-full h-full rounded-lg"
            style={{ zIndex: 20 }}
        >
           {isBookOpen && <AnswerPage answer={currentAnswer} onAskAgain={askAgain} />}
        </div>
      </div>

      {/* 하단 정보 */}
      <div className="absolute bottom-4 text-center">
        <p className="text-white/50 text-xs">
          🎁 매일 새로운 운세를 받아보세요
        </p>
      </div>
    </div>
  );
};

export default App;
