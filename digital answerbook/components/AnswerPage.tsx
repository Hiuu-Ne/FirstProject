import React from 'react';

interface AnswerPageProps {
  answer: string;
  onAskAgain: () => void;
}

const AnswerPage: React.FC<AnswerPageProps> = ({ answer, onAskAgain }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-gray-800">
      <p className="text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed flex-grow flex items-center justify-center opacity-0 fade-in answer-text">
        {answer}
      </p>
      <button
        onClick={onAskAgain}
        className="mt-8 px-6 py-2 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-all transform hover:scale-105 opacity-0 fade-in answer-button"
      >
        다시 질문하기
      </button>
    </div>
  );
};

export default AnswerPage;
