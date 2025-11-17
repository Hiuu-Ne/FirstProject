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

  const handleNewItem = (result: Item) => {
    setCraftCount(prev => prev + 1);

    // 이미 발견한 아이템인지 확인
    const alreadyDiscovered = discoveredItems.some(item => item.id === result.id);

    if (!alreadyDiscovered) {
      // 새로운 발견!
      result.discovered = true;
      setDiscoveredItems(prev => [...prev, result]);
      setNewItem(result);
    } else {
      // 이미 발견한 아이템 - 간단한 알림만
      // 모달 안 띄워도 됨
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
    <div className="h-screen flex overflow-hidden">
      {/* 왼쪽: 캔버스 (70%) */}
      <div className="flex-1 h-full">
        <Canvas onNewItem={handleNewItem} />
      </div>

      {/* 오른쪽: 사이드바 (30%) */}
      <div className="w-96 h-full">
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
