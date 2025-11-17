import React from 'react';
import type { Item } from '../types';
import { getRarityColor, getRarityGlow } from '../utils/combineItems';

interface ItemCardProps {
  item: Item;
  size?: 'small' | 'medium' | 'large';
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  size = 'medium',
}) => {
  const sizeClasses = {
    small: 'w-16 h-20 text-xl',
    medium: 'w-20 h-24 text-2xl',
    large: 'w-24 h-28 text-3xl',
  };

  const handleDragStart = (e: React.DragEvent) => {
    // 투명한 드래그 이미지 설정 (잔상 제거)
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);

    // 아이템 데이터 설정
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('item', JSON.stringify(item));
  };

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      className={`
        ${sizeClasses[size]}
        ${getRarityColor(item.rarity)}
        ${getRarityGlow(item.rarity)}
        flex flex-col items-center justify-center
        rounded-lg border-2
        cursor-grab active:cursor-grabbing
        transition-all duration-150 hover:scale-105
        select-none
        relative
      `}
      title={item.description || item.name}
    >
      <div className="text-center mb-0.5 pointer-events-none">{item.emoji}</div>
      <div className="text-[10px] font-bold text-white text-center px-1 leading-tight line-clamp-2 pointer-events-none">
        {item.name}
      </div>
      {item.type === 'sword' && (
        <div className="absolute -bottom-1 bg-yellow-500 text-[9px] px-1 py-0.5 rounded-full text-black font-bold pointer-events-none">
          ⚔️
        </div>
      )}
    </div>
  );
};

export default ItemCard;
