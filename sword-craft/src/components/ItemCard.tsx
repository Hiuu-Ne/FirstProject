import React from 'react';
import type { Item } from '../types';
import { getRarityColor, getRarityGlow, getRarityText } from '../utils/combineItems';

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
  showRarity = true,
}) => {
  const sizeClasses = {
    small: 'w-16 h-20 text-2xl',
    medium: 'w-20 h-24 text-3xl',
    large: 'w-24 h-28 text-4xl',
  };

  const handleDragStart = (e: React.DragEvent) => {
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
        transition-all duration-200 hover:scale-110 hover:z-10
        drag-none select-none
        relative
      `}
      title={item.description || item.name}
    >
      <div className="text-center mb-1">{item.emoji}</div>
      <div className="text-xs font-bold text-white text-center px-1 leading-tight">
        {item.name}
      </div>
      {showRarity && (
        <div className="absolute -top-2 -right-2 bg-slate-900 text-xs px-1.5 py-0.5 rounded-full border border-slate-700 text-slate-300">
          {getRarityText(item.rarity)}
        </div>
      )}
      {item.type === 'sword' && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-xs px-2 py-0.5 rounded-full text-black font-bold">
          ⚔️
        </div>
      )}
    </div>
  );
};

export default ItemCard;
