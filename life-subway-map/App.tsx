import { useState } from 'react';
import { GameResult, SubwayMapData } from './types';
import { LIFE_TYPES, LINE_NAMES, LINE_COLORS } from './data';
import OverworkGame from './minigames/OverworkGame';
import LoveGame from './minigames/LoveGame';
import ParttimeGame from './minigames/ParttimeGame';
import HobbyGame from './minigames/HobbyGame';
import AlcoholGame from './minigames/AlcoholGame';
import BurnoutGame from './minigames/BurnoutGame';
import TransferGame from './minigames/TransferGame';
import EmotionGame from './minigames/EmotionGame';
import ResultScreen from './components/ResultScreen';

type GameState = 'intro' | 'playing' | 'generating' | 'result';

const GAMES = [
  { component: OverworkGame, name: '야근 라인' },
  { component: LoveGame, name: '연애 멸망선' },
  { component: ParttimeGame, name: '알바 지옥선' },
  { component: HobbyGame, name: '취미 몰입선' },
  { component: AlcoholGame, name: '술자리 라인' },
  { component: BurnoutGame, name: '번아웃선' },
  { component: TransferGame, name: '환승역' },
  { component: EmotionGame, name: '감정 라인' },
];

export default function App() {
  const [state, setState] = useState<GameState>('intro');
  const [currentGame, setCurrentGame] = useState(0);
  const [results, setResults] = useState<GameResult[]>([]);
  const [mapData, setMapData] = useState<SubwayMapData | null>(null);

  const handleStart = () => {
    setState('playing');
    setCurrentGame(0);
    setResults([]);
  };

  const handleGameComplete = (result: GameResult) => {
    const newResults = [...results, result];
    setResults(newResults);

    if (currentGame < GAMES.length - 1) {
      setCurrentGame(currentGame + 1);
    } else {
      // 모든 게임 완료 - 노선도 생성
      setState('generating');
      setTimeout(() => {
        const generatedMap = generateMap(newResults);
        setMapData(generatedMap);
        setState('result');
      }, 3000);
    }
  };

  const generateMap = (gameResults: GameResult[]): SubwayMapData => {
    const stations = gameResults.map((r) => r.station);

    // 노선별로 그룹화
    const lineGroups = new Map();
    stations.forEach((station) => {
      if (!lineGroups.has(station.line)) {
        lineGroups.set(station.line, []);
      }
      lineGroups.get(station.line).push(station);
    });

    const lines = Array.from(lineGroups.entries()).map(([lineType, stationsInLine]) => ({
      type: lineType as import('./types').LineType,
      name: LINE_NAMES[lineType as import('./types').LineType],
      color: LINE_COLORS[lineType as import('./types').LineType],
      stations: stationsInLine,
    }));

    // 인생 타입 결정 (랜덤 or 로직 기반)
    const legendaryCount = stations.filter((s) => s.rarity === 'legendary').length;
    const rareCount = stations.filter((s) => s.rarity === 'rare').length;

    let lifeType;
    if (legendaryCount >= 2) {
      lifeType = '전설의 인생 라인';
    } else if (rareCount >= 4) {
      lifeType = '희귀한 인생 라인';
    } else {
      lifeType = LIFE_TYPES[Math.floor(Math.random() * LIFE_TYPES.length)];
    }

    return {
      stations,
      lines,
      lifeType,
      totalStations: stations.length,
      totalLines: lines.length,
      transfers: lines.length - 1, // 노선 수 - 1
    };
  };

  const handleRestart = () => {
    setState('intro');
    setCurrentGame(0);
    setResults([]);
    setMapData(null);
  };

  if (state === 'intro') {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🚇</div>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>
          인생 지하철 노선도
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '40px', maxWidth: '500px', lineHeight: '1.6' }}>
          당신의 지저분한 인생을
          <br />
          아름다운 지하철 노선도로 만들어드립니다
        </p>

        <div style={{ marginBottom: '40px', opacity: 0.8, fontSize: '14px', maxWidth: '400px' }}>
          <p>8가지 미니게임을 통해</p>
          <p>당신만의 인생 노선을 생성합니다</p>
        </div>

        <button
          onClick={handleStart}
          style={{
            padding: '20px 60px',
            fontSize: '20px',
            fontWeight: 'bold',
            background: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          }}
        >
          출발하기 🚀
        </button>

        <div style={{ marginTop: '60px', opacity: 0.6, fontSize: '12px' }}>
          <p>💡 모바일에서도 플레이 가능</p>
          <p>⏱️ 약 3-5분 소요</p>
        </div>
      </div>
    );
  }

  if (state === 'generating') {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '20px',
        }}
      >
        <div style={{ fontSize: '80px', marginBottom: '30px', animation: 'pulse 1.5s infinite' }}>
          🚇
        </div>
        <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>노선도 생성 중...</h2>
        <p style={{ fontSize: '16px', opacity: 0.8 }}>당신의 인생을 분석하고 있습니다</p>

        <div style={{ marginTop: '40px', width: '200px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              background: 'white',
              animation: 'slideIn 3s ease-out',
              width: '100%',
            }}
          />
        </div>
      </div>
    );
  }

  if (state === 'result' && mapData) {
    return <ResultScreen data={mapData} onRestart={handleRestart} />;
  }

  // Playing state
  const CurrentGameComponent = GAMES[currentGame].component;
  const progress = ((currentGame) / GAMES.length) * 100;

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* 진행바 */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'rgba(255,255,255,0.2)',
          zIndex: 1000,
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'white',
            width: `${progress}%`,
            transition: 'width 0.5s',
          }}
        />
      </div>

      {/* 진행 상태 */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          color: 'white',
          fontSize: '14px',
          opacity: 0.8,
          zIndex: 999,
        }}
      >
        {currentGame + 1} / {GAMES.length}
      </div>

      {/* 현재 게임 */}
      <CurrentGameComponent onComplete={handleGameComplete} />
    </div>
  );
}
