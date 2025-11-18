import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import Chapter1 from './components/Chapter1';
import Chapter2 from './components/Chapter2';
import Chapter3 from './components/Chapter3';
import EndingScreen from './components/EndingScreen';
import { UserData, LifeStats } from './types';
import { calculateUserData, calculateLifeStats } from './utils';

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [stats, setStats] = useState<LifeStats | null>(null);

  const handleStart = (birthDate: Date) => {
    const data = calculateUserData(birthDate);
    const lifeStats = calculateLifeStats(data);

    setUserData(data);
    setStats(lifeStats);
    setStarted(true);

    // 스크롤을 부드럽게 다음 섹션으로
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }, 300);
  };

  const handleRestart = () => {
    setStarted(false);
    setUserData(null);
    setStats(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <StartScreen onStart={handleStart} />

      {started && userData && stats && (
        <>
          <Chapter1 stats={stats} />
          <Chapter2 userData={userData} stats={stats} />
          <Chapter3 userData={userData} />
          <EndingScreen stats={stats} onRestart={handleRestart} />
        </>
      )}
    </div>
  );
};

export default App;
