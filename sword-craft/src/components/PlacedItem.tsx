import React, { useState, useRef } from 'react';
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
  onDragEnd: () => void;
  onDrop: (item: PlacedItemData) => void;
  onRemove: (id: string) => void;
  isDragging: boolean;
}

const PlacedItem: React.FC<PlacedItemProps> = ({
  placedItem,
  onDragStart,
  onDragEnd,
  onDrop,
  onRemove,
  isDragging,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const dragImageRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();

    // 🔥 드래그 이미지를 투명하게 만들어서 잔상 제거
    const dragImage = document.createElement('div');
    dragImage.style.opacity = '0';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-9999px';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    setTimeout(() => document.body.removeChild(dragImage), 0);

    onDragStart(placedItem);
  };

  const handleDragEnd = () => {
    setIsDragOver(false);
    onDragEnd();
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
    onRemove(placedItem.id);
  };

  return (
    <div
      ref={dragImageRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDoubleClick={handleDoubleClick}
      className={`
        absolute w-20 h-24 cursor-grab active:cursor-grabbing select-none
        transition-all duration-150
        ${isDragging ? 'opacity-30 scale-90' : 'opacity-100 scale-100'}
        ${isDragOver ? 'scale-110 z-50 animate-pulse' : 'z-10'}
        hover:z-20 hover:scale-105
      `}
      style={{
        left: `${placedItem.x}px`,
        top: `${placedItem.y}px`,
      }}
      title={`드래그해서 조합 | 더블클릭으로 제거`}
    >
      <div
        className={`
          w-full h-full
          ${getRarityColor(placedItem.item.rarity)}
          ${getRarityGlow(placedItem.item.rarity)}
          rounded-lg border-2
          flex flex-col items-center justify-center
          transition-all duration-150
          ${isDragOver ? 'ring-4 ring-yellow-400 ring-opacity-80 border-yellow-400' : ''}
        `}
      >
        <div className="text-3xl mb-1">{placedItem.item.emoji}</div>
        <div className="text-[10px] font-bold text-white text-center px-1 leading-tight line-clamp-2">
          {placedItem.item.name}
        </div>
        {placedItem.item.type === 'sword' && (
          <div className="absolute -bottom-1 bg-yellow-500 text-[10px] px-1.5 py-0.5 rounded-full text-black font-bold">
            ⚔️
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacedItem;
