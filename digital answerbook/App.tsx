import React, { useState, useCallback } from 'react';
import { ANSWERS } from './constants/answers';
import BookCover from './components/BookCover';
import AnswerPage from './components/AnswerPage';

const App: React.FC = () => {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');

  const openBook = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * ANSWERS.length);
    setCurrentAnswer(ANSWERS[randomIndex]);
    setIsBookOpen(true);
  }, []);

  const askAgain = useCallback(() => {
    setIsBookOpen(false);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 perspective">
      <div className={`book w-[300px] h-[450px] sm:w-[350px] sm:h-[525px] md:w-[400px] md:h-[600px] relative ${isBookOpen ? 'open' : ''}`}>
        <div 
          className="book-cover absolute w-full h-full bg-indigo-900 border-4 border-yellow-400 rounded-lg rounded-l-none"
          style={{ zIndex: isBookOpen ? 10 : 30 }}
        >
          {!isBookOpen && <BookCover onOpen={openBook} />}
        </div>
        <div 
            className="book-page absolute w-full h-full bg-gray-100 border-4 border-gray-300 rounded-lg"
            style={{ zIndex: 20 }}
        >
           {isBookOpen && <AnswerPage answer={currentAnswer} onAskAgain={askAgain} />}
        </div>
      </div>
    </div>
  );
};

export default App;
