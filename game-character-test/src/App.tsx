import { useState } from 'react';
import StartScreen from './components/StartScreen';
import QuestionCard from './components/QuestionCard';
import ResultPage from './components/ResultPage';
import { QUESTIONS } from './constants/questions';
import type { Answer, CharacterResult } from './types';
import { calculateCharacterResult } from './utils/calculateResult';

type GameState = 'start' | 'quiz' | 'result';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<CharacterResult | null>(null);

  const handleStart = () => {
    setGameState('quiz');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      // 다음 질문으로
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 모든 질문 완료 - 결과 계산
      const characterResult = calculateCharacterResult(newAnswers);
      setResult(characterResult);
      setGameState('result');
    }
  };

  const handleRestart = () => {
    setGameState('start');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen">
      {gameState === 'start' && <StartScreen onStart={handleStart} />}

      {gameState === 'quiz' && (
        <QuestionCard
          question={QUESTIONS[currentQuestionIndex]}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={QUESTIONS.length}
          onAnswer={handleAnswer}
        />
      )}

      {gameState === 'result' && result && (
        <ResultPage result={result} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
