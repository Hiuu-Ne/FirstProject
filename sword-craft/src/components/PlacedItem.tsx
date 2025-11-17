import React, { useState } from 'react';
import type { Item } from '../types';
import { getRarityColor, getRarityGlow } from '../utils/combineItems';

interface PlacedItemData {
  item: Item;
  x: number;
  y: number;
  id: string;
}

interface PlacedItemProps {
  placedItem: PlacedItemData;
  onDragStart: (item: PlacedItemData) => void;
  onDrop: (item: PlacedItemData) => void;
  onRemove: (id: string) => void;
  isDragging: boolean;
}

const PlacedItem: React.FC<PlacedItemProps> = ({
  placedItem,
  onDragStart,
  onDrop,
  onRemove,
  isDragging,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    onDragStart(placedItem);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    onDrop(placedItem);
  };

  const handleDoubleClick = () => {
    if (confirm(`"${placedItem.item.name}"을(를) 제거하시겠습니까?`)) {
      onRemove(placedItem.id);
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDoubleClick={handleDoubleClick}
      className={`
        absolute w-24 h-28 cursor-move select-none
        transition-all duration-200
        ${isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
        ${isDragOver ? 'scale-110 z-50' : 'z-10'}
        hover:z-20
      `}
      style={{
        left: `${placedItem.x}px`,
        top: `${placedItem.y}px`,
      }}
      title={`더블클릭하여 제거 | ${placedItem.item.name}`}
    >
      <div
        className={`
          w-full h-full
          ${getRarityColor(placedItem.item.rarity)}
          ${getRarityGlow(placedItem.item.rarity)}
          rounded-xl border-2
          flex flex-col items-center justify-center
          transition-all duration-200
          ${isDragOver ? 'ring-4 ring-yellow-400 ring-opacity-70' : ''}
        `}
      >
        <div className="text-4xl mb-1">{placedItem.item.emoji}</div>
        <div className="text-xs font-bold text-white text-center px-2 leading-tight">
          {placedItem.item.name}
        </div>
        {placedItem.item.type === 'sword' && (
          <div className="absolute -bottom-1 bg-yellow-500 text-xs px-2 py-0.5 rounded-full text-black font-bold">
            ⚔️
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacedItem;
