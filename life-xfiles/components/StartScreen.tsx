import React, { useState } from 'react';

interface StartScreenProps {
  onStart: (birthDate: Date) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const y = parseInt(year);
    const m = parseInt(month);
    const d = parseInt(day);

    if (!y || !m || !d) {
      setError('모든 값을 입력해주세요');
      return;
    }

    if (y < 1900 || y > new Date().getFullYear()) {
      setError('올바른 연도를 입력해주세요');
      return;
    }

    if (m < 1 || m > 12) {
      setError('올바른 월을 입력해주세요');
      return;
    }

    if (d < 1 || d > 31) {
      setError('올바른 날짜를 입력해주세요');
      return;
    }

    const birthDate = new Date(y, m - 1, d);
    if (birthDate > new Date()) {
      setError('미래 날짜는 입력할 수 없습니다');
      return;
    }

    onStart(birthDate);
  };

  return (
    <div className="section bg-gradient-to-b from-black via-purple-950 to-black">
      <div className="max-w-4xl mx-auto text-center fade-in">
        {/* 메인 타이틀 */}
        <div className="mb-12">
          <div className="text-8xl mb-8 pulse">🔬</div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            인생 X파일
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-4">
            당신의 인생을 기괴하게 분해합니다
          </p>
          <p className="text-lg text-gray-500">
            당신은 스스로에 대해 얼마나 알고 있나요?
          </p>
        </div>

        {/* 입력 폼 */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10 mb-8">
          <h2 className="text-2xl font-bold mb-8 text-gray-200">
            생년월일을 입력하세요
          </h2>

          <div className="flex gap-4 justify-center mb-6">
            <div className="flex-1 max-w-[120px]">
              <label className="block text-sm text-gray-400 mb-2">년</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="1990"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center text-xl font-bold focus:outline-none focus:border-purple-500 transition-colors"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
            <div className="flex-1 max-w-[100px]">
              <label className="block text-sm text-gray-400 mb-2">월</label>
              <input
                type="number"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="6"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center text-xl font-bold focus:outline-none focus:border-purple-500 transition-colors"
                min="1"
                max="12"
              />
            </div>
            <div className="flex-1 max-w-[100px]">
              <label className="block text-sm text-gray-400 mb-2">일</label>
              <input
                type="number"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="15"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center text-xl font-bold focus:outline-none focus:border-purple-500 transition-colors"
                min="1"
                max="31"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm mb-4">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl font-black py-4 px-8 rounded-full transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl"
          >
            분석 시작 🚀
          </button>
        </div>

        {/* 안내 메시지 */}
        <div className="text-sm text-gray-500 space-y-2">
          <p>⚠️ 입력한 정보는 저장되지 않습니다</p>
          <p>📊 평균 데이터 기반으로 계산됩니다</p>
          <p>🎭 재미로만 봐주세요</p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
