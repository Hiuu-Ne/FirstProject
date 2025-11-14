
import React, { useState } from 'react';

interface SalaryInputFormProps {
  onCalculate: (salary: number) => void;
}

const SalaryInputForm: React.FC<SalaryInputFormProps> = ({ onCalculate }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [easterEgg, setEasterEgg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setEasterEgg('');
    const rawValue = e.target.value.replace(/,/g, '');
    if (!/^\d*$/.test(rawValue)) return;

    const numValue = Number(rawValue);
    if (numValue > 10000000000) {
      setError('숫자가 너무 큽니다. 100억 이하로 입력해주세요.');
      return;
    }
    setValue(numValue.toLocaleString('ko-KR'));
  };

  const checkEasterEgg = (salary: number): string | null => {
    // 특정 금액에 대한 재밌는 메시지들
    if (salary === 1004000) return "😇 천사월급! 당신은 천사입니다!";
    if (salary === 6900000) return "😏 Nice.";
    if (salary === 420000) return "🌿 It's 4:20 somewhere...";
    if (salary === 777000 || salary === 7777777) return "🎰 럭키세븐! 오늘 복권 사보세요!";
    if (salary === 1000000) return "💯 백만장자의 꿈!";
    if (salary === 100000000) return "🤑 억대연봉...? 아니 억대 월급!?";
    if (salary === 9999999) return "😈 거의 천만원! 아쉽...!";
    if (salary === 3000000) return "🎯 한국 평균 월급이라던데?";
    if (salary === 209) return "🏛️ 대한민국 최저시급 (시간당)";
    if (salary === 1) return "🥲 시작이 반이다... 힘내세요!";
    if (salary === 1234567) return "🔢 연속된 숫자! 비밀번호 아니죠?";
    if (salary === 5000000) return "💪 오백만 클럽 입성!";
    if (salary >= 10000000) return "🚀 천만원 이상!? 자랑하고 싶으시죠?";
    if (salary === 250000) return "🍗 치킨 12마리 값이네요!";

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const salary = parseInt(value.replace(/,/g, ''), 10);
    if (isNaN(salary) || salary <= 0) {
      setError('유효한 월급을 입력해주세요.');
      return;
    }

    // 이스터 에그 체크
    const egg = checkEasterEgg(salary);
    if (egg) {
      setEasterEgg(egg);
      setTimeout(() => setEasterEgg(''), 3000); // 3초 후 사라짐
    }

    onCalculate(salary);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto mt-20">
      <form onSubmit={handleSubmit} className="w-full p-8 bg-slate-700 rounded-xl shadow-2xl">
        <label htmlFor="salary" className="block text-lg font-medium text-slate-300 mb-2">
          월 실수령액 (세후)
        </label>
        <div className="relative">
          <input
            type="text"
            id="salary"
            value={value}
            onChange={handleChange}
            placeholder="예: 3,500,000"
            className="w-full px-4 py-3 text-2xl text-right bg-slate-800 border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            inputMode="numeric"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-slate-400">₩</span>
        </div>
        <p className="mt-2 text-sm text-slate-400">실수령액 기준으로 입력해주세요.</p>
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        {easterEgg && (
          <div className="mt-3 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400 rounded-lg animate-bounce">
            <p className="text-center text-lg font-bold text-purple-300">{easterEgg}</p>
          </div>
        )}
        <button
          type="submit"
          className="w-full mt-6 py-3 text-xl font-bold bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-700 focus:ring-indigo-500 transition-transform transform hover:scale-105"
        >
          계산하기
        </button>
      </form>
    </div>
  );
};

export default SalaryInputForm;
