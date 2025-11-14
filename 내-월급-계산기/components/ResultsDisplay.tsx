import React, { useState, useMemo, useEffect } from 'react';
import { Item, Category } from '../types';
import { ITEMS } from '../constants';
import ItemCard from './ItemCard';

interface ResultsDisplayProps {
  salary: number;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ salary, onReset }) => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.ALL);
  const [sortOrder, setSortOrder] = useState<'name' | 'price-asc' | 'price-desc'>('name');
  const [showCopied, setShowCopied] = useState(false);

  const filteredAndSortedItems = useMemo(() => {
    let items = activeCategory === Category.ALL 
      ? ITEMS 
      : ITEMS.filter(item => item.category === activeCategory);

    return [...items].sort((a, b) => {
      switch (sortOrder) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [activeCategory, sortOrder]);
  
  const handleShare = () => {
      const topItems = ITEMS
        .map(item => ({...item, count: salary / item.price}))
        .sort((a,b) => Math.abs(1 - a.count) - Math.abs(1 - b.count))
        .slice(0, 4);

      const shareText = `
🔮 내 월급 계산기 결과

월급: ${salary.toLocaleString('ko-KR')}원으로...

${topItems.map(item => `${item.emoji} ${item.name} ${item.count < 1 ? item.count.toFixed(2) : Math.floor(item.count).toLocaleString('ko-KR')}${item.unit || '개'}`).join('\n')}

현실은... 그래도 살 만해! 😅

👉 [링크 삽입]
      `.trim();

      navigator.clipboard.writeText(shareText).then(() => {
          setShowCopied(true);
      });
  };

  useEffect(() => {
    if (showCopied) {
      const timer = setTimeout(() => setShowCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showCopied]);


  return (
    <div className="w-full fade-in-up">
      <div className="sticky top-0 bg-slate-800/80 backdrop-blur-sm z-10 py-4 mb-6">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-4">
            {Object.values(Category).map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-colors ${activeCategory === cat ? 'bg-indigo-500 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}
                >
                    {cat}
                </button>
            ))}
        </div>
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm text-slate-400">정렬:</span>
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="bg-slate-700 text-slate-100 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="name">이름순</option>
            <option value="price-asc">가격 낮은순</option>
            <option value="price-desc">가격 높은순</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedItems.map((item, index) => (
          <ItemCard key={item.name} item={item} salary={salary} index={index} />
        ))}
      </div>

      <footer className="sticky bottom-0 w-full flex justify-center py-6 bg-gradient-to-t from-slate-800 to-transparent">
        <div className="flex gap-4">
            <button
            onClick={onReset}
            className="px-6 py-3 font-bold bg-slate-600 rounded-lg hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-400 transition-transform transform hover:scale-105"
            >
            다시 계산하기
            </button>
            <button
            onClick={handleShare}
            className="px-6 py-3 font-bold bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-transform transform hover:scale-105"
            >
            {showCopied ? '복사 완료!' : '친구에게 공유하기'}
            </button>
        </div>
      </footer>
    </div>
  );
};

export default ResultsDisplay;