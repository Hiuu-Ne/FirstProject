import { useState } from 'react';
import './App.css';

type ViewMode = 'input' | 'exhibition';

interface Preset {
  id: string;
  name: string;
  emoji: string;
  hoursPerDay: number;
  color: string;
}

interface Exhibition {
  preset: Preset;
  months: number;
  totalHours: number;
}

const PRESETS: Preset[] = [
  { id: 'sns', name: 'SNS 스크롤', emoji: '📱', hoursPerDay: 2, color: 'from-pink-600 to-rose-600' },
  { id: 'youtube', name: '유튜브', emoji: '📺', hoursPerDay: 3, color: 'from-red-600 to-red-700' },
  { id: 'game', name: '게임', emoji: '🎮', hoursPerDay: 4, color: 'from-purple-600 to-indigo-600' },
  { id: 'netflix', name: '넷플릭스', emoji: '🍿', hoursPerDay: 2.5, color: 'from-red-600 to-pink-600' },
  { id: 'meeting', name: '쓸데없는 회의', emoji: '💼', hoursPerDay: 2, color: 'from-gray-600 to-slate-600' },
  { id: 'commute', name: '출퇴근', emoji: '🚇', hoursPerDay: 2, color: 'from-blue-600 to-cyan-600' },
  { id: 'chat', name: '카톡 / 메신저', emoji: '💬', hoursPerDay: 1.5, color: 'from-yellow-500 to-amber-600' },
  { id: 'tiktok', name: '틱톡 / 쇼츠', emoji: '🎵', hoursPerDay: 3, color: 'from-cyan-500 to-blue-600' },
];

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('input');
  const [selectedPresets, setSelectedPresets] = useState<Preset[]>([]);
  const [months, setMonths] = useState(12);
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);

  const handlePresetClick = (preset: Preset) => {
    if (selectedPresets.find(p => p.id === preset.id)) {
      setSelectedPresets(selectedPresets.filter(p => p.id !== preset.id));
    } else {
      if (selectedPresets.length < 5) {
        setSelectedPresets([...selectedPresets, preset]);
      }
    }
  };

  const handleCreateExhibition = () => {
    const newExhibitions = selectedPresets.map(preset => ({
      preset,
      months,
      totalHours: preset.hoursPerDay * 30 * months,
    }));
    setExhibitions(newExhibitions);
    setViewMode('exhibition');
  };

  const getTotalHours = () => {
    return exhibitions.reduce((sum, ex) => sum + ex.totalHours, 0);
  };

  const getLifePercentage = () => {
    const avgLifeHours = 85 * 365 * 24; // 85세 기준
    return ((getTotalHours() / avgLifeHours) * 100).toFixed(2);
  };

  const getThiefLevel = () => {
    const total = getTotalHours();
    if (total < 100) return { level: 'Lv.1 초보 도둑', emoji: '🤏', color: 'text-green-400' };
    if (total < 500) return { level: 'Lv.2 숙련 도둑', emoji: '👌', color: 'text-blue-400' };
    if (total < 1000) return { level: 'Lv.3 전문 도둑', emoji: '🤟', color: 'text-purple-400' };
    if (total < 5000) return { level: 'Lv.4 마스터 도둑', emoji: '🦹', color: 'text-orange-400' };
    return { level: 'Lv.5 시간의 신', emoji: '💀', color: 'text-red-500' };
  };

  const handleReset = () => {
    setViewMode('input');
    setSelectedPresets([]);
    setExhibitions([]);
  };

  const handleShare = () => {
    const text = `나는 인생의 ${getLifePercentage()}%를 이것들에 썼습니다 💀\n\n시간 도둑 등급: ${getThiefLevel().level}\n\n[ 내가 버린 시간 박물관 ]`;

    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('링크가 복사되었습니다!');
    }
  };

  // 환산 계산 함수들
  const getConversions = (hours: number) => {
    return {
      ramen: Math.floor(hours / 0.05), // 3분 = 0.05시간
      coffee: Math.floor(hours / 0.17), // 10분
      movies: Math.floor(hours / 2),
      books: Math.floor(hours / 5),
      ktx: Math.floor(hours / 2.5), // 서울-부산
      guitar: hours >= 50 ? '기초 가능' : hours >= 300 ? '중급 실력' : hours >= 1000 ? '전문가 수준' : '아직 멀었음',
      heartbeats: Math.floor(hours * 3600 * 1.2), // 초당 1.2회
      breaths: Math.floor(hours * 3600 * 0.3), // 초당 0.3회
    };
  };

  if (viewMode === 'input') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
              🏛️ 내가 버린 시간 박물관
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              당신이 흘려보낸 시간이 전시되었습니다.
            </p>
          </div>

          {/* 프리셋 카드들 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-200">
              무엇을 전시하시겠습니까? <span className="text-sm text-gray-500">({selectedPresets.length}/5)</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PRESETS.map((preset) => {
                const isSelected = selectedPresets.find(p => p.id === preset.id);
                return (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetClick(preset)}
                    className={`
                      relative p-6 rounded-2xl transition-all transform
                      ${isSelected
                        ? `bg-gradient-to-br ${preset.color} scale-105 shadow-2xl ring-4 ring-white/20`
                        : 'bg-gray-800/50 hover:bg-gray-800 hover:scale-105'
                      }
                    `}
                  >
                    <div className="text-5xl mb-3">{preset.emoji}</div>
                    <div className="text-sm font-medium text-white">{preset.name}</div>
                    <div className="text-xs text-gray-300 mt-1">하루 {preset.hoursPerDay}시간</div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <span className="text-sm">✓</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 기간 슬라이더 */}
          {selectedPresets.length > 0 && (
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-3xl p-8 mb-8 animate-scale-in">
              <h2 className="text-2xl font-bold mb-6 text-gray-200">
                이 생활을 얼마나 했나요?
              </h2>
              <div className="mb-6">
                <div className="text-center mb-4">
                  <span className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                    {months}개월
                  </span>
                  <span className="text-xl text-gray-400 ml-3">
                    ({(months / 12).toFixed(1)}년)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="120"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>1개월</span>
                  <span>10년</span>
                </div>
              </div>

              {/* 미리보기 */}
              <div className="bg-black/30 rounded-2xl p-6 space-y-3">
                <div className="text-gray-400 text-sm mb-3">📊 전시 예상:</div>
                {selectedPresets.map((preset) => {
                  const hours = preset.hoursPerDay * 30 * months;
                  return (
                    <div key={preset.id} className="flex justify-between text-gray-300">
                      <span>{preset.emoji} {preset.name}</span>
                      <span className="font-bold text-yellow-400">{hours.toLocaleString()}시간</span>
                    </div>
                  );
                })}
                <div className="border-t border-gray-700 pt-3 flex justify-between font-bold text-white">
                  <span>총 합계</span>
                  <span className="text-red-400">
                    {selectedPresets.reduce((sum, p) => sum + p.hoursPerDay * 30 * months, 0).toLocaleString()}시간
                  </span>
                </div>
              </div>

              <button
                onClick={handleCreateExhibition}
                className="w-full mt-8 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xl font-bold py-6 rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
              >
                💀 전시하기
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 전시 화면
  const thiefLevel = getThiefLevel();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 헤더 */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-lg border-b border-gray-800 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">🏛️ 내가 버린 시간 박물관</h1>
          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              📤 공유
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              🔄 다시 만들기
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* 입장 메시지 */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-3xl md:text-4xl font-bold text-gray-300 mb-4">
            당신의 전시물이 도착했습니다.
          </p>
          <p className="text-xl text-gray-500">
            천천히 둘러보세요. 이 시간들은... 다시 오지 않습니다.
          </p>
        </div>

        {/* 전시물들 */}
        {exhibitions.map((exhibition, index) => {
          const conversions = getConversions(exhibition.totalHours);
          const scale = Math.min(1 + (exhibition.totalHours / 1000) * 0.5, 2); // 시간에 비례한 크기

          return (
            <div
              key={exhibition.preset.id}
              className="exhibit-card bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12 border border-gray-800 shadow-2xl animate-slide-up"
              style={{
                animationDelay: `${index * 0.2}s`,
                transform: `scale(${scale})`,
                transformOrigin: 'center',
              }}
            >
              {/* 전시물 번호 */}
              <div className="text-sm text-gray-600 mb-4">전시물 #{index + 1}</div>

              {/* 이모지 + 제목 */}
              <div className="text-center mb-8">
                <div className="text-8xl mb-6 animate-float">{exhibition.preset.emoji}</div>
                <h2 className="text-4xl font-bold mb-3">{exhibition.preset.name}</h2>
                <div className="text-6xl font-black bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  {exhibition.totalHours.toLocaleString()}시간
                </div>
                <div className="text-xl text-gray-500 mt-2">
                  ({exhibition.months}개월 동안)
                </div>
              </div>

              {/* 환산 */}
              <div className="bg-black/50 rounded-2xl p-6 space-y-4 mb-8">
                <div className="text-xl font-bold text-gray-300 mb-4">💀 이 시간이면...</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400">
                  <div>🍜 라면 <span className="text-yellow-400 font-bold">{conversions.ramen.toLocaleString()}개</span> 끓이기</div>
                  <div>☕ 커피 <span className="text-yellow-400 font-bold">{conversions.coffee.toLocaleString()}잔</span> 마시기</div>
                  <div>🎬 영화 <span className="text-yellow-400 font-bold">{conversions.movies.toLocaleString()}편</span> 보기</div>
                  <div>📚 책 <span className="text-yellow-400 font-bold">{conversions.books.toLocaleString()}권</span> 읽기</div>
                  <div>🚄 서울↔부산 KTX <span className="text-yellow-400 font-bold">{conversions.ktx.toLocaleString()}번</span></div>
                  <div>🎸 기타 실력: <span className="text-yellow-400 font-bold">{conversions.guitar}</span></div>
                </div>
              </div>

              {/* 충격 메시지 */}
              <div className="bg-red-950/30 border border-red-900/50 rounded-2xl p-6 text-center">
                <p className="text-lg text-red-400 mb-2">
                  "당신은 이 시간 동안"
                </p>
                <p className="text-2xl font-bold text-red-300">
                  💓 {conversions.heartbeats.toLocaleString()}번 심장이 뛰었고
                </p>
                <p className="text-2xl font-bold text-red-300">
                  🫁 {conversions.breaths.toLocaleString()}번 숨을 쉬었습니다
                </p>
              </div>
            </div>
          );
        })}

        {/* 총 통계 */}
        <div className="bg-gradient-to-br from-red-950 to-black rounded-3xl p-12 border-4 border-red-900 shadow-2xl animate-scale-in">
          <h2 className="text-4xl font-bold text-center mb-8 text-red-400">
            📊 전시 요약
          </h2>

          <div className="space-y-6">
            <div className="text-center">
              <div className="text-lg text-gray-400 mb-2">총 전시물</div>
              <div className="text-5xl font-black text-white">{exhibitions.length}개</div>
            </div>

            <div className="text-center">
              <div className="text-lg text-gray-400 mb-2">총 버린 시간</div>
              <div className="text-6xl font-black bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                {getTotalHours().toLocaleString()}시간
              </div>
              <div className="text-2xl text-gray-500 mt-2">
                = {Math.floor(getTotalHours() / 24).toLocaleString()}일
                = {(getTotalHours() / 24 / 365).toFixed(1)}년
              </div>
            </div>

            <div className="bg-black/50 rounded-2xl p-6 text-center">
              <div className="text-2xl text-red-400 mb-3">
                당신 인생의 <span className="text-5xl font-black text-red-500">{getLifePercentage()}%</span>
              </div>
              <div className="text-gray-400">
                (평균 수명 85세 기준)
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-950 to-indigo-950 rounded-2xl p-8 text-center border-2 border-purple-700">
              <div className="text-xl text-purple-300 mb-3">🏆 시간 도둑 등급</div>
              <div className={`text-6xl font-black ${thiefLevel.color} mb-2`}>
                {thiefLevel.emoji}
              </div>
              <div className={`text-3xl font-bold ${thiefLevel.color}`}>
                {thiefLevel.level}
              </div>
            </div>

            <div className="bg-black/50 rounded-2xl p-6 space-y-3 text-gray-400 text-center">
              <p className="text-2xl font-bold text-red-400">⚠️ 경고</p>
              <p className="text-lg">
                "이 속도로 10년을 더 산다면,<br />
                인생의 <span className="text-red-400 font-bold">{(parseFloat(getLifePercentage()) * 10 / (exhibitions[0]?.months / 12 || 1)).toFixed(1)}%</span>를 이것에 쓰게 됩니다."
              </p>
              <p className="text-sm text-gray-600 mt-4">
                ...하지만 괜찮아요. 당신이 선택한 삶이니까요. 💀
              </p>
            </div>
          </div>
        </div>

        {/* 공유 버튼 */}
        <div className="text-center space-y-4">
          <button
            onClick={handleShare}
            className="px-12 py-6 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-2xl font-bold rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
          >
            📤 내 전시 자랑하기
          </button>
          <p className="text-gray-600 text-sm">
            (친구들도 충격받게 하세요)
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
