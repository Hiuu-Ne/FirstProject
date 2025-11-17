import React from 'react';
import type { Question, Answer } from '../types';

interface QuestionCardProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (answer: Answer) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full fade-in-up">
        {/* 진행도 바 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-purple-300">
              질문 {currentQuestion} / {totalQuestions}
            </span>
            <span className="text-sm font-bold text-purple-300">
              {Math.round((currentQuestion / totalQuestions) * 100)}%
            </span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border-2 border-purple-500/30">
            <div
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* 질문 카드 */}
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-purple-500/30">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-8 leading-relaxed">
            {question.question}
          </h2>

          {/* 선택지들 */}
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswer(option)}
                className="w-full text-left p-5 bg-slate-700/50 hover:bg-gradient-to-r hover:from-purple-600/40 hover:to-pink-600/40 rounded-xl border-2 border-slate-600 hover:border-purple-400 transition-all duration-300 group hover:scale-102 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/20 border-2 border-purple-400/40 flex items-center justify-center font-bold text-purple-300 group-hover:bg-purple-500/40 group-hover:scale-110 transition-all">
                    {index + 1}
                  </div>
                  <span className="text-lg font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 하단 힌트 */}
        <p className="text-center text-sm text-slate-500 mt-6">
          💡 솔직하게 답할수록 정확해요!
        </p>
      </div>
    </div>
  );
};

export default QuestionCard;
