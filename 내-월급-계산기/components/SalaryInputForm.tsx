
import React, { useState } from 'react';

interface SalaryInputFormProps {
  onCalculate: (salary: number) => void;
}

const SalaryInputForm: React.FC<SalaryInputFormProps> = ({ onCalculate }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const rawValue = e.target.value.replace(/,/g, '');
    if (!/^\d*$/.test(rawValue)) return;

    const numValue = Number(rawValue);
    if (numValue > 10000000000) {
      setError('숫자가 너무 큽니다. 100억 이하로 입력해주세요.');
      return;
    }
    setValue(numValue.toLocaleString('ko-KR'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const salary = parseInt(value.replace(/,/g, ''), 10);
    if (isNaN(salary) || salary <= 0) {
      setError('유효한 월급을 입력해주세요.');
      return;
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
