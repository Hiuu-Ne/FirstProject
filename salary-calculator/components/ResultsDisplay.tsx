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

  // 놀라운 통계 계산
  const amazingStats = useMemo(() => {
    const itemsWithQuantity = ITEMS.map(item => ({
      ...item,
      quantity: salary / item.price
    }));

    const yearSalary = salary * 12;
    const itemsWithYearQuantity = ITEMS.map(item => ({
      ...item,
      quantity: yearSalary / item.price
    }));

    // 가장 많이 살 수 있는 것 TOP 3
    const topAffordable = [...itemsWithQuantity]
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 3);

    // 가장 적게 살 수 있는 것 (하지만 0보다는 큰)
    const leastAffordable = [...itemsWithQuantity]
      .filter(item => item.quantity > 0)
      .sort((a, b) => a.quantity - b.quantity)
      .slice(0, 3);

    // 딱 1개에 가까운 것 (0.8 ~ 1.2 사이)
    const almostOne = [...itemsWithQuantity]
      .filter(item => item.quantity >= 0.8 && item.quantity <= 1.2)
      .sort((a, b) => Math.abs(1 - a.quantity) - Math.abs(1 - b.quantity))
      .slice(0, 3);

    // 1년 모으면 딱 살 수 있는 것들 (0.8 ~ 1.2개)
    const yearGoals = [...itemsWithYearQuantity]
      .filter(item => item.quantity >= 0.8 && item.quantity <= 1.2)
      .sort((a, b) => Math.abs(1 - a.quantity) - Math.abs(1 - b.quantity))
      .slice(0, 3);

    return { topAffordable, leastAffordable, almostOne, yearGoals, yearSalary };
  }, [salary]);
  
  const handleShare = () => {
      // 가장 많이 살 수 있는 것
      const topItem = amazingStats.topAffordable[0];
      // 가장 적게 살 수 있는 것
      const worstItem = amazingStats.leastAffordable[0];
      // 딱 1개에 가까운 것
      const perfectItem = amazingStats.almostOne[0];

      const funnyMessages = [
        "월급날엔 부자, 말일엔 거지 😭",
        "돈은 있는데 왜 이렇게 없지? 🤔",
        "현타 오는 월급 계산기 ㄷㄷ",
        "친구야, 우리 월급 비교해볼래? 😏",
        "이 월급으로 살아남기 챌린지 💪"
      ];

      const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

      let shareText = `
🎯 ${randomMessage}

💰 내 월급: ${salary.toLocaleString('ko-KR')}원

━━━━━━━━━━━━━━━
✨ 놀라운 사실들:

💚 가장 많이 살 수 있는 건?
${topItem.emoji} ${topItem.name}
→ ${topItem.quantity >= 1000000 ? `${(topItem.quantity / 1000000).toFixed(1)}백만${topItem.unit || '개'}` : `${Math.floor(topItem.quantity).toLocaleString('ko-KR')}${topItem.unit || '개'}`} 😎
`;

      if (perfectItem) {
        shareText += `
🎯 딱 1개 살 수 있는 건?
${perfectItem.emoji} ${perfectItem.name}
→ ${perfectItem.quantity.toFixed(2)}${perfectItem.unit || '개'} (완벽!)
`;
      }

      shareText += `
💔 꿈도 못 꾸는 건?
${worstItem.emoji} ${worstItem.name}
→ ${worstItem.quantity < 0.001 ? '0.000...' : worstItem.quantity.toFixed(4)}${worstItem.unit || '개'} 😱

━━━━━━━━━━━━━━━

너도 해봐! 👉 [링크 삽입]
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


  // 랜덤 재밌는 비교 문구
  const funnyComment = useMemo(() => {
    const messages = {
      veryLow: [ // 100만원 이하
        "💪 시작이 반이다! 화이팅!",
        "🌱 작은 월급도 소중해요",
        "😊 희망의 끈을 놓지 마세요!",
        "🎯 다음 달엔 오를 거야!",
      ],
      low: [ // 100만원 ~ 200만원
        "🍜 라면으로 버티는 삶... 익숙하죠?",
        "💰 아껴쓰는 게 미덕입니다",
        "🎓 신입의 설렘!",
        "🌟 곧 오를 거예요!",
      ],
      medium: [ // 200만원 ~ 400만원
        "🎯 대한민국 평균 정도?",
        "😊 그럭저럭 살 만하네요!",
        "💪 중산층의 자부심!",
        "🍗 치킨은 먹을 수 있어요",
      ],
      good: [ // 400만원 ~ 600만원
        "👔 화이트칼라의 여유",
        "😎 나쁘지 않은데요?",
        "🎉 좋습니다! 좋아요!",
        "💼 전문직이신가요?",
      ],
      veryGood: [ // 600만원 ~ 1000만원
        "🤑 오오 부럽습니다!",
        "🏆 상위권이시네요!",
        "😲 이 정도면 성공한 거죠?",
        "💎 자랑하고 싶으시죠?",
      ],
      rich: [ // 1000만원 이상
        "👑 당신은 왕이야 왕!",
        "🚀 달나라 갈 기세!",
        "💰 혹시... 건물주?",
        "🎩 상류층이십니다",
        "😱 부럽... 아니 축하드려요!",
      ]
    };

    let categoryMessages;
    if (salary < 1000000) categoryMessages = messages.veryLow;
    else if (salary < 2000000) categoryMessages = messages.low;
    else if (salary < 4000000) categoryMessages = messages.medium;
    else if (salary < 6000000) categoryMessages = messages.good;
    else if (salary < 10000000) categoryMessages = messages.veryGood;
    else categoryMessages = messages.rich;

    return categoryMessages[Math.floor(Math.random() * categoryMessages.length)];
  }, [salary]);

  return (
    <div className="w-full fade-in-up">
      {/* 랜덤 코멘트 */}
      <div className="mb-4 p-4 bg-gradient-to-r from-pink-900/30 to-purple-900/30 rounded-xl border border-pink-500/20 text-center">
        <p className="text-xl font-bold text-pink-300">{funnyComment}</p>
      </div>

      {/* 놀라운 통계 섹션 */}
      <div className="mb-8 p-6 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-2xl border-2 border-purple-500/30">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          🎯 놀라운 통계
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 가장 많이 살 수 있는 것 */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-lg font-bold text-green-400 mb-3 text-center">💰 가장 많이!</h3>
            {amazingStats.topAffordable.map((item, idx) => (
              <div key={idx} className="mb-2 text-sm">
                <span className="text-slate-300">{item.emoji} {item.name}</span>
                <div className="text-green-400 font-bold">
                  {item.quantity >= 1000000
                    ? `${(item.quantity / 1000000).toFixed(1)}백만${item.unit || '개'}`
                    : `${Math.floor(item.quantity).toLocaleString('ko-KR')}${item.unit || '개'}`}
                </div>
              </div>
            ))}
          </div>

          {/* 딱 1개 살 수 있는 것 */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-lg font-bold text-yellow-400 mb-3 text-center">🎯 딱 1개!</h3>
            {amazingStats.almostOne.length > 0 ? (
              amazingStats.almostOne.map((item, idx) => (
                <div key={idx} className="mb-2 text-sm">
                  <span className="text-slate-300">{item.emoji} {item.name}</span>
                  <div className="text-yellow-400 font-bold">
                    {item.quantity.toFixed(2)}{item.unit || '개'}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-center text-xs">해당 없음</p>
            )}
          </div>

          {/* 가장 적게 살 수 있는 것 */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-lg font-bold text-red-400 mb-3 text-center">😱 꿈도 못 꿔!</h3>
            {amazingStats.leastAffordable.map((item, idx) => (
              <div key={idx} className="mb-2 text-sm">
                <span className="text-slate-300">{item.emoji} {item.name}</span>
                <div className="text-red-400 font-bold">
                  {item.quantity < 0.001
                    ? '0.000...'
                    : item.quantity < 1
                      ? item.quantity.toFixed(4)
                      : item.quantity.toFixed(2)}{item.unit || '개'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 1년 모으면 섹션 */}
        {amazingStats.yearGoals.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-xl border-2 border-emerald-500/30">
            <h3 className="text-xl font-bold text-center mb-3 text-emerald-400">
              💰 1년 모으면 ({amazingStats.yearSalary.toLocaleString('ko-KR')}원)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {amazingStats.yearGoals.map((item, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <div className="text-sm text-slate-300 mb-1">{item.name}</div>
                  <div className="text-emerald-400 font-bold">
                    {item.quantity.toFixed(2)}{item.unit || '개'}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">딱 살 수 있어요!</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

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