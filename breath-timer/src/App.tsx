import { useState, useEffect, useRef } from 'react';
import './App.css';

type GameState = 'setup' | 'ready' | 'running' | 'result';

interface Result {
  targetTime: number;
  actualTime: number;
  difference: number;
  message: string;
  emoji: string;
}

interface BestRecord {
  difference: number;
  targetTime: number;
  date: string;
}

function App() {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [targetTime, setTargetTime] = useState(10);
  const [startTime, setStartTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [bestRecord, setBestRecord] = useState<BestRecord | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);

  const animationFrameRef = useRef<number | null>(null);
  const lastHideTime = useRef<number>(0);

  // localStorage에서 기록 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('breathTimerBest');
    if (saved) {
      setBestRecord(JSON.parse(saved));
    }
    const savedAttempts = localStorage.getItem('breathTimerAttempts');
    if (savedAttempts) {
      setAttempts(parseInt(savedAttempts));
    }
    const savedStreak = localStorage.getItem('breathTimerStreak');
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }
  }, []);

  // 타이머 업데이트
  useEffect(() => {
    if (gameState === 'running') {
      const updateTimer = () => {
        const elapsed = (performance.now() - startTime) / 1000;
        setCurrentTime(elapsed);

        // 타이머가 목표 시간 - 3초를 넘으면 숨김
        if (elapsed >= targetTime - 3) {
          lastHideTime.current = elapsed;
        }

        animationFrameRef.current = requestAnimationFrame(updateTimer);
      };

      animationFrameRef.current = requestAnimationFrame(updateTimer);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [gameState, startTime, targetTime]);

  const handleStart = () => {
    setGameState('ready');
    setTimeout(() => {
      setGameState('running');
      setStartTime(performance.now());
      setCurrentTime(0);
      lastHideTime.current = 0;
    }, 1000);
  };

  const handleStop = () => {
    if (gameState !== 'running') return;

    const finalTime = currentTime;
    const difference = Math.abs(finalTime - targetTime);

    // 메시지 생성
    const { message, emoji } = generateMessage(difference, finalTime, targetTime);

    setResult({
      targetTime,
      actualTime: finalTime,
      difference,
      message,
      emoji,
    });

    // 기록 업데이트
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    localStorage.setItem('breathTimerAttempts', newAttempts.toString());

    // 연속 성공
    if (difference <= 0.1) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('breathTimerStreak', newStreak.toString());
    } else {
      setStreak(0);
      localStorage.setItem('breathTimerStreak', '0');
    }

    // 최고 기록 업데이트
    if (!bestRecord || difference < bestRecord.difference) {
      const newRecord = {
        difference,
        targetTime,
        date: new Date().toLocaleDateString(),
      };
      setBestRecord(newRecord);
      localStorage.setItem('breathTimerBest', JSON.stringify(newRecord));
    }

    setGameState('result');
  };

  const handleReset = () => {
    setGameState('setup');
    setResult(null);
    setCurrentTime(0);
  };

  // 배경색 계산 (시간 경과에 따라)
  const getBackgroundColor = () => {
    if (gameState !== 'running') {
      return 'from-slate-900 to-slate-800';
    }

    const progress = currentTime / targetTime;

    if (progress < 0.3) {
      return 'from-blue-900 to-blue-800';
    } else if (progress < 0.6) {
      return 'from-pink-900 to-pink-800';
    } else if (progress < 0.9) {
      return 'from-red-900 to-red-800';
    } else {
      return 'from-purple-900 to-purple-800';
    }
  };

  // 화면 흔들림 여부
  const shouldShake = gameState === 'running' && currentTime / targetTime >= 0.9;

  // 타이머 숨김 여부 (마지막 3초)
  const shouldHideTimer = gameState === 'running' && currentTime >= targetTime - 3;

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-br ${getBackgroundColor()} transition-all duration-1000 flex items-center justify-center p-4 ${
        shouldShake ? 'animate-shake' : ''
      }`}
      onClick={handleStop}
      onTouchEnd={handleStop}
    >
      <div className="max-w-2xl w-full">
        {/* 설정 화면 */}
        {gameState === 'setup' && (
          <div className="text-center space-y-8" onClick={(e) => e.stopPropagation()}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              🫁 숨참기
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              목표 시간을 정확히 맞춰보세요
            </p>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 space-y-6">
              <div>
                <label className="text-white text-lg block mb-4">
                  목표 시간: {targetTime}초
                </label>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={targetTime}
                  onChange={(e) => setTargetTime(Number(e.target.value))}
                  className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>5초</span>
                  <span>60초</span>
                </div>
              </div>

              <button
                onClick={handleStart}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-2xl font-bold py-6 rounded-2xl transition-all transform hover:scale-105 active:scale-95"
              >
                시작하기
              </button>
            </div>

            {/* 기록 */}
            {(bestRecord || attempts > 0) && (
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 space-y-3 text-white">
                <h3 className="text-xl font-bold mb-4">📊 기록</h3>
                {bestRecord && (
                  <div className="flex justify-between">
                    <span>🥇 최고 기록</span>
                    <span className="font-bold text-yellow-400">
                      ±{bestRecord.difference.toFixed(3)}초
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>🎯 시도 횟수</span>
                  <span className="font-bold">{attempts}회</span>
                </div>
                {streak > 0 && (
                  <div className="flex justify-between">
                    <span>🔥 연속 성공</span>
                    <span className="font-bold text-orange-400">{streak}회</span>
                  </div>
                )}
              </div>
            )}

            <p className="text-gray-400 text-sm">
              💡 마지막 3초는 타이머가 숨겨집니다
            </p>
          </div>
        )}

        {/* 준비 화면 */}
        {gameState === 'ready' && (
          <div className="text-center" onClick={(e) => e.stopPropagation()}>
            <div className="text-9xl animate-pulse-slow">3</div>
            <p className="text-2xl text-white mt-8">준비하세요...</p>
          </div>
        )}

        {/* 게임 중 */}
        {gameState === 'running' && (
          <div className="text-center pointer-events-none">
            {/* 폐 아이콘 */}
            <div className="text-9xl animate-heartbeat mb-8">
              🫁
            </div>

            {/* 타이머 */}
            {!shouldHideTimer ? (
              <div className="text-6xl md:text-8xl font-bold text-white tabular-nums">
                {currentTime.toFixed(3)}
              </div>
            ) : (
              <div className="text-6xl md:text-8xl font-bold text-white/20">
                ???
              </div>
            )}

            <div className="text-xl text-white/60 mt-4">
              목표: {targetTime}초
            </div>

            <div className="mt-12 text-2xl text-white/80 animate-pulse">
              화면을 터치하세요!
            </div>
          </div>
        )}

        {/* 결과 화면 */}
        {gameState === 'result' && result && (
          <div className="text-center space-y-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-9xl mb-4">
              {result.emoji}
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white">
              {result.message}
            </h2>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 space-y-4">
              <div className="text-white">
                <div className="text-sm text-gray-400 mb-1">목표 시간</div>
                <div className="text-4xl font-bold">{result.targetTime.toFixed(3)}초</div>
              </div>

              <div className="text-white">
                <div className="text-sm text-gray-400 mb-1">실제 시간</div>
                <div className="text-4xl font-bold">{result.actualTime.toFixed(3)}초</div>
              </div>

              <div className="text-white">
                <div className="text-sm text-gray-400 mb-1">오차</div>
                <div className={`text-5xl font-bold ${
                  result.difference <= 0.01 ? 'text-yellow-400' :
                  result.difference <= 0.05 ? 'text-green-400' :
                  result.difference <= 0.1 ? 'text-blue-400' :
                  'text-red-400'
                }`}>
                  ±{result.difference.toFixed(3)}초
                </div>
              </div>

              {bestRecord && result.difference === bestRecord.difference && (
                <div className="text-yellow-400 text-xl font-bold animate-pulse">
                  🎉 신기록!
                </div>
              )}
            </div>

            <button
              onClick={handleReset}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-2xl font-bold py-6 rounded-2xl transition-all transform hover:scale-105 active:scale-95"
            >
              다시 도전
            </button>

            <button
              onClick={() => {
                const text = `나는 ${result.targetTime}초를 ${result.difference.toFixed(3)}초 차이로 맞췄어요! 🫁\n\n숨참기 게임: ${window.location.href}`;
                if (navigator.share) {
                  navigator.share({ text });
                } else {
                  navigator.clipboard.writeText(text);
                  alert('링크가 복사되었습니다!');
                }
              }}
              className="w-full bg-white/10 hover:bg-white/20 text-white text-lg font-bold py-4 rounded-2xl transition-all"
            >
              📤 공유하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// 메시지 생성 함수
function generateMessage(difference: number, actualTime: number, targetTime: number): { message: string; emoji: string } {
  const ratio = actualTime / targetTime;

  // 너무 빨리
  if (ratio < 0.5) {
    return {
      message: '아직 반도 안갔는데요?',
      emoji: '🤣',
    };
  }

  // 너무 늦게
  if (ratio > 1.5) {
    return {
      message: '그새 점심시간 지났습니다',
      emoji: '⏰',
    };
  }

  // 정확도에 따른 메시지
  if (difference <= 0.001) {
    const messages = [
      '뭐야... 인간이 아니잖아?',
      '컴퓨터세요?',
      '손가락에 원자시계 달았나',
      '치트키 쓰셨죠?',
      'NASA에서 연락올듯',
    ];
    return {
      message: messages[Math.floor(Math.random() * messages.length)],
      emoji: '😱',
    };
  }

  if (difference <= 0.01) {
    return {
      message: '와... 진짜?',
      emoji: '🤯',
    };
  }

  if (difference <= 0.05) {
    return {
      message: '거의 다 왔어요',
      emoji: '😲',
    };
  }

  if (difference <= 0.1) {
    return {
      message: '나쁘지 않은데?',
      emoji: '👏',
    };
  }

  if (difference <= 0.3) {
    return {
      message: '아깝다!',
      emoji: '😅',
    };
  }

  if (difference <= 0.5) {
    return {
      message: '집중력 어디갔어',
      emoji: '🥲',
    };
  }

  if (difference <= 1) {
    return {
      message: '다시 ㄱㄱ',
      emoji: '😭',
    };
  }

  return {
    message: '숨 참다가 시계도 못봤나',
    emoji: '💀',
  };
}

export default App;
