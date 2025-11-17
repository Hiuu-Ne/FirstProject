import { useState, useEffect } from 'react';
import type { Item } from './types';
import { BASE_ITEMS, TOTAL_DISCOVERABLE_ITEMS } from './constants/baseItems';
import Canvas from './components/Canvas';
import Sidebar from './components/Sidebar';
import NewItemModal from './components/NewItemModal';

function App() {
  const [discoveredItems, setDiscoveredItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item | null>(null);
  const [craftCount, setCraftCount] = useState(0);

  // localStorage에서 데이터 로드
  useEffect(() => {
    const saved = localStorage.getItem('sword-craft-discovered');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDiscoveredItems(parsed);
      } catch (e) {
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

  const handleNewItem = (result: Item) => {
    setCraftCount(prev => prev + 1);

    // 이미 발견한 아이템인지 확인
    const alreadyDiscovered = discoveredItems.some(item => item.id === result.id);

    if (!alreadyDiscovered) {
      // 새로운 발견!
      result.discovered = true;
      setDiscoveredItems(prev => [...prev, result]);
      setNewItem(result);
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

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-slate-900">
      {/* 왼쪽: 캔버스 - flex-1로 남은 공간 전체 사용 */}
      <div className="flex-1 min-w-0">
        <Canvas onNewItem={handleNewItem} />
      </div>

      {/* 오른쪽: 사이드바 - 고정 너비 */}
      <div className="w-80 flex-shrink-0">
        <Sidebar
          discoveredItems={discoveredItems}
          craftCount={craftCount}
          totalItems={TOTAL_DISCOVERABLE_ITEMS}
          onReset={handleReset}
        />
      </div>

      {/* 새 아이템 모달 */}
      <NewItemModal item={newItem} onClose={() => setNewItem(null)} />
    </div>
  );
}

export default App;
