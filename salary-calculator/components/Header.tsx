
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 md:mb-12">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-400">
        💸 내 월급 계산기 💸
      </h1>
      <p className="mt-4 text-lg text-slate-300">
        내 월급으로 과연 몇 개나 살 수 있을까?
      </p>
    </header>
  );
};

export default Header;
