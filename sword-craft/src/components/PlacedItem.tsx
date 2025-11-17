import React, { useState } from 'react';
import type { PlacedItemData } from './Canvas';
import { getRarityColor, getRarityGlow } from '../utils/combineItems';

interface PlacedItemProps {
  placedItem: PlacedItemData;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDrop: (targetId: string, e: React.DragEvent) => void;
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

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();

    // 투명한 드래그 이미지 설정 (잔상 제거)
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);

    // 캔버스 아이템 ID 설정
    e.dataTransfer.setData('placedItemId', placedItem.id);
    onDragStart(placedItem.id);
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

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    onDrop(placedItem.id, e);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(placedItem.id);
  };

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDoubleClick={handleDoubleClick}
      className={`
        absolute w-20 h-24
        cursor-grab active:cursor-grabbing
        select-none
        transition-all duration-150
        ${isDragging ? 'opacity-40 scale-95' : 'opacity-100 scale-100'}
        ${isDragOver ? 'scale-110 z-50' : 'z-10'}
        hover:z-20 hover:scale-105
      `}
      style={{
        left: `${placedItem.x}px`,
        top: `${placedItem.y}px`,
      }}
      title={`드래그해서 조합 | 더블클릭 제거`}
    >
      <div
        className={`
          w-full h-full
          ${getRarityColor(placedItem.item.rarity)}
          ${getRarityGlow(placedItem.item.rarity)}
          rounded-lg border-2
          flex flex-col items-center justify-center
          transition-all duration-150
          ${isDragOver ? 'ring-4 ring-yellow-400' : ''}
        `}
      >
        <div className="text-3xl mb-1 pointer-events-none">{placedItem.item.emoji}</div>
        <div className="text-[10px] font-bold text-white text-center px-1 leading-tight line-clamp-2 pointer-events-none">
          {placedItem.item.name}
        </div>
        {placedItem.item.type === 'sword' && (
          <div className="absolute -bottom-1 bg-yellow-500 text-[10px] px-1.5 py-0.5 rounded-full text-black font-bold pointer-events-none">
            ⚔️
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacedItem;
