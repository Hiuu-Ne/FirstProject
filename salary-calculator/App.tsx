
import React, { useState } from 'react';
import SalaryInputForm from './components/SalaryInputForm';
import ResultsDisplay from './components/ResultsDisplay';
import Header from './components/Header';

const App: React.FC = () => {
  const [salary, setSalary] = useState<number | null>(null);

  const handleCalculate = (newSalary: number) => {
    setSalary(newSalary);
  };

  const handleReset = () => {
    setSalary(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 font-sans">
      <Header />
      <main className="w-full max-w-7xl flex-grow">
        {salary === null ? (
          <SalaryInputForm onCalculate={handleCalculate} />
        ) : (
          <ResultsDisplay salary={salary} onReset={handleReset} />
        )}
      </main>
    </div>
  );
};

export default App;
