import React from 'react';
import type { Item } from '../types';
import { getRarityColor, getRarityGlow } from '../utils/combineItems';

interface ItemCardProps {
  item: Item;
  onDragStart?: (item: Item) => void;
  onClick?: (item: Item) => void;
  size?: 'small' | 'medium' | 'large';
  showRarity?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onDragStart,
  onClick,
  size = 'medium',
}) => {
  const sizeClasses = {
    small: 'w-16 h-20 text-xl',
    medium: 'w-20 h-24 text-2xl',
    large: 'w-24 h-28 text-3xl',
  };

  const handleDragStart = (e: React.DragEvent) => {
    // 🔥 드래그 이미지를 투명하게 만들어서 잔상 제거
    const dragImage = document.createElement('div');
    dragImage.style.opacity = '0';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-9999px';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    setTimeout(() => document.body.removeChild(dragImage), 0);

    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('item', JSON.stringify(item));

    if (onDragStart) {
      onDragStart(item);
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onClick?.(item)}
      className={`
        ${sizeClasses[size]}
        ${getRarityColor(item.rarity)}
        ${getRarityGlow(item.rarity)}
        flex flex-col items-center justify-center
        rounded-lg border-2 cursor-grab active:cursor-grabbing
        transition-all duration-150 hover:scale-105
        select-none
        relative
      `}
      title={item.description || item.name}
    >
      <div className="text-center mb-0.5">{item.emoji}</div>
      <div className="text-[10px] font-bold text-white text-center px-1 leading-tight line-clamp-2">
        {item.name}
      </div>
      {item.type === 'sword' && (
        <div className="absolute -bottom-1 bg-yellow-500 text-[9px] px-1 py-0.5 rounded-full text-black font-bold">
          ⚔️
        </div>
      )}
    </div>
  );
};

export default ItemCard;
