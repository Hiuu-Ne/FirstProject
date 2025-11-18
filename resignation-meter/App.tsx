import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultScreen from './components/ResultScreen';
import { QUESTIONS } from './constants';

type Screen = 'start' | 'quiz' | 'loading' | 'result';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [totalScore, setTotalScore] = useState(0);

  // 최대 점수 계산
  const maxScore = QUESTIONS.reduce((sum, question) => {
    const maxQuestionScore = Math.max(...question.options.map(opt => opt.score));
    return sum + maxQuestionScore;
  }, 0);

  const handleStart = () => {
    setCurrentScreen('quiz');
    setTotalScore(0);
  };

  const handleQuizComplete = (score: number) => {
    setTotalScore(score);
    setCurrentScreen('loading');

    // 로딩 화면 2초 후 결과 표시
    setTimeout(() => {
      setCurrentScreen('result');
    }, 2500);
  };

  const handleRestart = () => {
    setCurrentScreen('start');
    setTotalScore(0);
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'start' && <StartScreen onStart={handleStart} />}
      {currentScreen === 'quiz' && <QuizScreen onComplete={handleQuizComplete} />}
      {currentScreen === 'loading' && <LoadingScreen />}
      {currentScreen === 'result' && (
        <ResultScreen
          totalScore={totalScore}
          maxScore={maxScore}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;
