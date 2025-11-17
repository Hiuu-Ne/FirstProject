import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { QuizOption } from '../types';

interface QuizScreenProps {
  onComplete: (totalScore: number) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  const handleOptionClick = (option: QuizOption, index: number) => {
    setSelectedOption(index);

    setTimeout(() => {
      const newAnswers = [...answers, option.score];
      setAnswers(newAnswers);

      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        // 마지막 질문 완료
        const totalScore = newAnswers.reduce((sum, score) => sum + score, 0);
        onComplete(totalScore);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* 진행률 바 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">
              {currentQuestionIndex + 1} / {QUESTIONS.length}
            </span>
            <span className="text-sm text-gray-300">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-red-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 질문 카드 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 slide-in">
          {/* 이모지 */}
          <div className="text-6xl md:text-7xl mb-6 text-center">
            {currentQuestion.emoji}
          </div>

          {/* 질문 */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* 선택지 */}
          <div className="space-y-3 md:space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option, index)}
                className={`w-full text-left p-5 md:p-6 rounded-2xl font-medium text-base md:text-lg transition-all duration-200 transform
                  ${selectedOption === index
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white scale-105 shadow-2xl'
                    : 'bg-white/10 hover:bg-white/20 text-gray-100 hover:scale-102 border border-white/10 hover:border-white/30'
                  }
                `}
              >
                <span className="flex items-center justify-between">
                  <span>{option.text}</span>
                  {option.emoji && <span className="text-2xl ml-2">{option.emoji}</span>}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 하단 힌트 */}
        <p className="text-center text-sm text-gray-400 mt-6">
          💡 솔직하게 답변할수록 정확해요!
        </p>
      </div>
    </div>
  );
};

export default QuizScreen;
