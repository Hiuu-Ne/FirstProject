import { useState, useEffect } from 'react';
import type { Item } from './types';
import { BASE_ITEMS, TOTAL_DISCOVERABLE_ITEMS } from './constants/baseItems';
import { combineItems } from './utils/combineItems';
import CraftingArea from './components/CraftingArea';
import ItemList from './components/ItemList';
import NewItemModal from './components/NewItemModal';

function App() {
  const [discoveredItems, setDiscoveredItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item | null>(null);
  const [craftCount, setCraftCount] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  // localStorage에서 데이터 로드
  useEffect(() => {
    const saved = localStorage.getItem('sword-craft-discovered');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDiscoveredItems(parsed);
      } catch (e) {
        // 파싱 실패 시 기본 아이템으로 시작
        setDiscoveredItems([...BASE_ITEMS]);
      }
    } else {
      setDiscoveredItems([...BASE_ITEMS]);
    }

    const savedCount = localStorage.getItem('sword-craft-count');
    if (savedCount) {
      setCraftCount(parseInt(savedCount));
    }
  }, []);

  // localStorage에 저장
  useEffect(() => {
    if (discoveredItems.length > 0) {
      localStorage.setItem('sword-craft-discovered', JSON.stringify(discoveredItems));
    }
  }, [discoveredItems]);

  useEffect(() => {
    localStorage.setItem('sword-craft-count', craftCount.toString());
  }, [craftCount]);

  const handleCraft = (item1: Item, item2: Item) => {
    const result = combineItems(item1, item2);
    if (result) {
      setCraftCount(prev => prev + 1);

      // 이미 발견한 아이템인지 확인
      const alreadyDiscovered = discoveredItems.some(item => item.id === result.id);

      if (!alreadyDiscovered) {
        // 새로운 발견!
        result.discovered = true;
        setDiscoveredItems(prev => [...prev, result]);
        setNewItem(result);
      } else {
        // 이미 발견한 아이템
        // 알림만 표시 (선택적)
        const existingItem = discoveredItems.find(item => item.id === result.id);
        if (existingItem) {
          setNewItem({ ...existingItem, discovered: true });
        }
      }
    }
  };

  const handleReset = () => {
    if (confirm('정말로 모든 발견 기록을 초기화하시겠습니까?')) {
      setDiscoveredItems([...BASE_ITEMS]);
      setCraftCount(0);
      localStorage.removeItem('sword-craft-discovered');
      localStorage.removeItem('sword-craft-count');
    }
  };

  const discoveryRate = Math.round((discoveredItems.length / TOTAL_DISCOVERABLE_ITEMS) * 100);
  const swordCount = discoveredItems.filter(i => i.type === 'sword').length;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <header className="mb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            🗡️ 칼 조합 연금술 🗡️
          </h1>
          <p className="text-xl text-slate-300 mb-6">
            재료를 조합해서 전설의 검을 만들어보세요!
          </p>

          {/* 통계 */}
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl px-6 py-3 border-2 border-purple-500/30">
              <div className="text-sm text-slate-400">발견한 아이템</div>
              <div className="text-2xl font-black text-purple-300">
                {discoveredItems.length} / {TOTAL_DISCOVERABLE_ITEMS}
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl px-6 py-3 border-2 border-yellow-500/30">
              <div className="text-sm text-slate-400">발견한 검</div>
              <div className="text-2xl font-black text-yellow-300">
                ⚔️ {swordCount}
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl px-6 py-3 border-2 border-blue-500/30">
              <div className="text-sm text-slate-400">조합 횟수</div>
              <div className="text-2xl font-black text-blue-300">
                🔨 {craftCount}
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl px-6 py-3 border-2 border-green-500/30">
              <div className="text-sm text-slate-400">발견율</div>
              <div className="text-2xl font-black text-green-300">
                📊 {discoveryRate}%
              </div>
            </div>
          </div>

          {/* 버튼들 */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold transition-all duration-300"
            >
              {showInfo ? '❌ 닫기' : '❓ 도움말'}
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-red-900/50 hover:bg-red-800/50 border-2 border-red-500/30 rounded-xl font-bold transition-all duration-300"
            >
              🔄 초기화
            </button>
          </div>

          {/* 도움말 */}
          {showInfo && (
            <div className="mt-4 bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border-2 border-blue-500/30 text-left max-w-2xl mx-auto">
              <h3 className="text-xl font-black mb-3 text-blue-300">📖 게임 방법</h3>
              <ul className="space-y-2 text-slate-300">
                <li>✅ 아이템을 드래그해서 조합소에 놓으세요</li>
                <li>✅ 두 아이템을 조합하면 새로운 아이템이 생성됩니다</li>
                <li>✅ 재료 + 재료 = 중급 재료 or 검</li>
                <li>✅ 재료 + 검 = 강화된 검</li>
                <li>✅ 검 + 검 = 전설의 검!</li>
                <li>✅ 같은 조합도 여러 번 시도해보세요 (랜덤 요소 있음!)</li>
                <li>✅ 목표: 500개 이상의 아이템 발견! 🎯</li>
              </ul>
              <div className="mt-4 p-4 bg-purple-900/30 rounded-lg border-2 border-purple-500/30">
                <p className="font-bold text-purple-300 mb-2">💡 꿀팁!</p>
                <p className="text-sm text-slate-300">
                  • <span className="font-bold">오크코딱지검</span>을 만들려면? 오크 + 오크 = 오크코딱지 → 오크코딱지 + 철 = 오크코딱지검!
                  <br />• <span className="font-bold">동정파이어볼발사검</span>을 만들려면? 빛 + 빛 = 순수함 → 순수함 + 철 = 순결검 → 순결검 + 불 = 동정파이어볼검 → 동정파이어볼검 + 번개!
                  <br />• 특별 조합 200개 + 자동 생성 수천 개 = 무한한 가능성!
                </p>
              </div>
            </div>
          )}
        </header>

        {/* 조합 영역 */}
        <div className="mb-8">
          <CraftingArea onCraft={handleCraft} />
        </div>

        {/* 아이템 목록 */}
        <ItemList items={discoveredItems} title="📦 발견한 아이템" />

        {/* 새 아이템 모달 */}
        <NewItemModal item={newItem} onClose={() => setNewItem(null)} />
      </div>
    </div>
  );
}

export default App;
