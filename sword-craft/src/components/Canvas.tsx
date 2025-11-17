import React, { useState } from 'react';
import type { Item } from '../types';
import { combineItems } from '../utils/combineItems';
import PlacedItem from './PlacedItem';

export interface PlacedItemData {
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
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  // 캔버스 빈 곳에 드롭 (새 아이템 배치)
  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 사이드바에서 드래그한 새 아이템인 경우에만 배치
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

    setDraggedItemId(null);
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // PlacedItem 드래그 시작
  const handlePlacedItemDragStart = (placedItemId: string) => {
    setDraggedItemId(placedItemId);
  };

  // PlacedItem에 드롭 (조합 처리)
  const handlePlacedItemDrop = (targetItemId: string, dropEvent: React.DragEvent) => {
    dropEvent.preventDefault();
    dropEvent.stopPropagation();

    const targetItem = placedItems.find(item => item.id === targetItemId);
    if (!targetItem) return;

    // 1. 캔버스에 이미 있는 아이템끼리 조합
    if (draggedItemId) {
      const draggedItem = placedItems.find(item => item.id === draggedItemId);
      if (!draggedItem || draggedItem.id === targetItemId) {
        setDraggedItemId(null);
        return;
      }

      const result = combineItems(draggedItem.item, targetItem.item);
      if (result) {
        const newX = (draggedItem.x + targetItem.x) / 2;
        const newY = (draggedItem.y + targetItem.y) / 2;

        const newPlacedItem: PlacedItemData = {
          item: result,
          x: newX,
          y: newY,
          id: `placed-${Date.now()}-${Math.random()}`,
        };

        // 원본 두 아이템 제거하고 새 아이템 추가
        setPlacedItems(prev =>
          prev
            .filter(item => item.id !== draggedItem.id && item.id !== targetItem.id)
            .concat(newPlacedItem)
        );

        onNewItem(result);
      }

      setDraggedItemId(null);
      return;
    }

    // 2. 사이드바에서 드래그한 아이템과 조합
    const itemData = dropEvent.dataTransfer.getData('item');
    if (itemData) {
      try {
        const newItem: Item = JSON.parse(itemData);
        const result = combineItems(newItem, targetItem.item);

        if (result) {
          const newPlacedItem: PlacedItemData = {
            item: result,
            x: targetItem.x,
            y: targetItem.y,
            id: `placed-${Date.now()}-${Math.random()}`,
          };

          // 타겟 아이템 제거하고 새 아이템 추가
          setPlacedItems(prev =>
            prev
              .filter(item => item.id !== targetItem.id)
              .concat(newPlacedItem)
          );

          onNewItem(result);
        }
      } catch (e) {
        console.error('Failed to combine items:', e);
      }
    }

    setDraggedItemId(null);
  };

  const handleDragEnd = () => {
    setDraggedItemId(null);
  };

  const handleRemoveItem = (id: string) => {
    setPlacedItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearAll = () => {
    if (placedItems.length > 0 && confirm('캔버스의 모든 아이템을 제거하시겠습니까?')) {
      setPlacedItems([]);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-slate-900">
      {/* 상단 툴바 */}
      <div className="flex-shrink-0 bg-slate-800/80 border-b border-slate-700 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold text-slate-200">🎨 조합 캔버스</h2>
          <span className="text-xs text-slate-500">
            {placedItems.length}개
          </span>
        </div>
        <button
          onClick={handleClearAll}
          disabled={placedItems.length === 0}
          className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 rounded font-bold transition-all"
        >
          🗑️
        </button>
      </div>

      {/* 캔버스 영역 */}
      <div
        onDrop={handleCanvasDrop}
        onDragOver={handleCanvasDragOver}
        className="flex-1 relative overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(100, 100, 120, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        {/* 안내 메시지 */}
        {placedItems.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <div className="text-center">
              <div className="text-6xl mb-3 opacity-20">👉</div>
              <p className="text-slate-600 text-sm">
                오른쪽에서 아이템을 드래그하세요
              </p>
            </div>
          </div>
        )}

        {/* 배치된 아이템들 */}
        {placedItems.map(placedItem => (
          <PlacedItem
            key={placedItem.id}
            placedItem={placedItem}
            onDragStart={handlePlacedItemDragStart}
            onDragEnd={handleDragEnd}
            onDrop={handlePlacedItemDrop}
            onRemove={handleRemoveItem}
            isDragging={draggedItemId === placedItem.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
