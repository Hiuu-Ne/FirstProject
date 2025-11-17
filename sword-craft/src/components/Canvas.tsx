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
  const [isCanvasDragOver, setIsCanvasDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCanvasDragOver(false);

    const itemData = e.dataTransfer.getData('item');
    if (!itemData) return;

    try {
      const item: Item = JSON.parse(itemData);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - 40;
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
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    setIsCanvasDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsCanvasDragOver(false);
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
      // 새 아이템 위치 (두 아이템 중간)
      const newX = (draggedItem.x + targetItem.x) / 2;
      const newY = (draggedItem.y + targetItem.y) / 2;

      const newPlacedItem: PlacedItemData = {
        item: result,
        x: newX,
        y: newY,
        id: `placed-${Date.now()}-${Math.random()}`,
      };

      // ⭐ 중요: 원본 두 아이템 제거하고 새 아이템만 추가
      setPlacedItems(prev =>
        prev
          .filter(item => item.id !== draggedItem.id && item.id !== targetItem.id)
          .concat(newPlacedItem)
      );

      onNewItem(result);
    }

    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setIsCanvasDragOver(false);
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
    <div className="h-full flex flex-col bg-slate-900">
      {/* 상단 툴바 - 간소화 */}
      <div className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-slate-200">🎨 조합 캔버스</h2>
          <span className="text-sm text-slate-400">
            아이템 {placedItems.length}개
          </span>
        </div>
        <button
          onClick={handleClearAll}
          disabled={placedItems.length === 0}
          className="px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 rounded-lg font-bold transition-all"
        >
          🗑️ 전체 삭제
        </button>
      </div>

      {/* 캔버스 영역 */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex-1 relative transition-all ${
          isCanvasDragOver ? 'bg-purple-900/20' : 'bg-slate-900'
        }`}
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(100, 100, 120, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* 안내 메시지 */}
        {placedItems.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-7xl mb-4 opacity-30">👉</div>
              <p className="text-slate-500 text-lg">
                오른쪽에서 아이템을 드래그하세요
              </p>
              <p className="text-slate-600 text-sm mt-2">
                아이템끼리 겹치면 조합됩니다!
              </p>
            </div>
          </div>
        )}

        {/* 배치된 아이템들 */}
        {placedItems.map(placedItem => (
          <PlacedItem
            key={placedItem.id}
            placedItem={placedItem}
            onDragStart={handleItemDragStart}
            onDragEnd={handleDragEnd}
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
