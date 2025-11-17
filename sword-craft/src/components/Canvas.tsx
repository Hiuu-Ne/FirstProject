import React, { useState } from 'react';
import type { Item } from '../types';
import { combineItems } from '../utils/combineItems';
import PlacedItem from './PlacedItem';

interface PlacedItemData {
  item: Item;
  x: number;
  y: number;
  id: string;
}

interface CanvasProps {
  onNewItem: (item: Item) => void;
}

const Canvas: React.FC<CanvasProps> = ({ onNewItem }) => {
  const [placedItems, setPlacedItems] = useState<PlacedItemData[]>([]);
  const [draggedItem, setDraggedItem] = useState<PlacedItemData | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const itemData = e.dataTransfer.getData('item');
    if (!itemData) return;

    try {
      const item: Item = JSON.parse(itemData);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - 40; // 중심으로 조정
      const y = e.clientY - rect.top - 40;

      const newPlacedItem: PlacedItemData = {
        item,
        x: Math.max(0, Math.min(x, rect.width - 80)),
        y: Math.max(0, Math.min(y, rect.height - 80)),
        id: `placed-${Date.now()}-${Math.random()}`,
      };

      setPlacedItems(prev => [...prev, newPlacedItem]);
    } catch (e) {
      console.error('Failed to parse item data:', e);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleItemDragStart = (placedItem: PlacedItemData) => {
    setDraggedItem(placedItem);
  };

  const handleItemDrop = (targetItem: PlacedItemData) => {
    if (!draggedItem || draggedItem.id === targetItem.id) {
      setDraggedItem(null);
      return;
    }

    // 두 아이템 조합
    const result = combineItems(draggedItem.item, targetItem.item);
    if (result) {
      // 새 아이템을 캔버스에 추가 (두 아이템 사이 위치)
      const newX = (draggedItem.x + targetItem.x) / 2;
      const newY = (draggedItem.y + targetItem.y) / 2;

      const newPlacedItem: PlacedItemData = {
        item: result,
        x: newX,
        y: newY,
        id: `placed-${Date.now()}-${Math.random()}`,
      };

      setPlacedItems(prev => [...prev, newPlacedItem]);
      onNewItem(result);
    }

    setDraggedItem(null);
  };

  const handleRemoveItem = (id: string) => {
    setPlacedItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearAll = () => {
    if (confirm('캔버스의 모든 아이템을 제거하시겠습니까?')) {
      setPlacedItems([]);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* 상단 툴바 */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b-2 border-purple-500/30 p-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            🎨 조합 캔버스
          </h2>
          <p className="text-sm text-slate-400">아이템을 드래그해서 놓고, 서로 겹쳐서 조합하세요!</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-slate-900/50 px-4 py-2 rounded-lg border-2 border-slate-700">
            <span className="text-sm text-slate-400">캔버스 아이템: </span>
            <span className="text-lg font-black text-purple-300">{placedItems.length}</span>
          </div>
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-900/50 hover:bg-red-800/50 border-2 border-red-500/30 rounded-lg font-bold transition-all duration-300"
          >
            🗑️ 전체 삭제
          </button>
        </div>
      </div>

      {/* 캔버스 영역 */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex-1 relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      >
        {placedItems.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-slate-600">
              <div className="text-6xl mb-4 animate-bounce-slow">👈</div>
              <p className="text-xl font-bold">오른쪽 사이드바에서<br />아이템을 드래그해서<br />여기에 놓아보세요!</p>
            </div>
          </div>
        )}

        {placedItems.map(placedItem => (
          <PlacedItem
            key={placedItem.id}
            placedItem={placedItem}
            onDragStart={handleItemDragStart}
            onDrop={handleItemDrop}
            onRemove={handleRemoveItem}
            isDragging={draggedItem?.id === placedItem.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
