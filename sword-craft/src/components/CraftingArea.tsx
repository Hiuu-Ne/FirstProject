import React, { useState } from 'react';
import type { Item } from '../types';
import ItemCard from './ItemCard';

interface CraftingAreaProps {
  onCraft: (item1: Item, item2: Item) => void;
}

const CraftingArea: React.FC<CraftingAreaProps> = ({ onCraft }) => {
  const [slot1, setSlot1] = useState<Item | null>(null);
  const [slot2, setSlot2] = useState<Item | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleDrop = (slotNumber: 1 | 2) => (e: React.DragEvent) => {
    e.preventDefault();
    const itemData = e.dataTransfer.getData('item');
    if (itemData) {
      const item: Item = JSON.parse(itemData);
      if (slotNumber === 1) {
        setSlot1(item);
      } else {
        setSlot2(item);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleCraft = () => {
    if (slot1 && slot2) {
      setIsAnimating(true);
      setTimeout(() => {
        onCraft(slot1, slot2);
        setSlot1(null);
        setSlot2(null);
        setIsAnimating(false);
      }, 500);
    }
  };

  const handleClear = () => {
    setSlot1(null);
    setSlot2(null);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-500/30">
      <h2 className="text-2xl font-black text-center mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
        ⚒️ 조합소 ⚒️
      </h2>

      <div className="flex items-center justify-center gap-4 mb-6">
        {/* 슬롯 1 */}
        <div
          onDrop={handleDrop(1)}
          onDragOver={handleDragOver}
          className={`
            w-28 h-32 border-4 border-dashed rounded-xl
            flex items-center justify-center
            transition-all duration-300
            ${slot1 ? 'border-purple-400 bg-purple-900/20' : 'border-slate-600 bg-slate-700/20'}
            ${isAnimating && slot1 ? 'animate-pulse' : ''}
          `}
        >
          {slot1 ? (
            <ItemCard item={slot1} size="medium" showRarity={false} />
          ) : (
            <div className="text-slate-500 text-center text-sm">
              <div className="text-4xl mb-1">📦</div>
              <div>재료 1</div>
            </div>
          )}
        </div>

        {/* + 아이콘 */}
        <div className={`text-4xl font-black text-purple-400 ${isAnimating ? 'animate-spin' : ''}`}>
          +
        </div>

        {/* 슬롯 2 */}
        <div
          onDrop={handleDrop(2)}
          onDragOver={handleDragOver}
          className={`
            w-28 h-32 border-4 border-dashed rounded-xl
            flex items-center justify-center
            transition-all duration-300
            ${slot2 ? 'border-purple-400 bg-purple-900/20' : 'border-slate-600 bg-slate-700/20'}
            ${isAnimating && slot2 ? 'animate-pulse' : ''}
          `}
        >
          {slot2 ? (
            <ItemCard item={slot2} size="medium" showRarity={false} />
          ) : (
            <div className="text-slate-500 text-center text-sm">
              <div className="text-4xl mb-1">📦</div>
              <div>재료 2</div>
            </div>
          )}
        </div>

        {/* = 아이콘 */}
        <div className="text-4xl font-black text-purple-400">=</div>

        {/* 결과 슬롯 (시각적 표현) */}
        <div className="w-28 h-32 border-4 border-dashed border-yellow-600 bg-yellow-900/20 rounded-xl flex items-center justify-center">
          <div className="text-slate-400 text-center text-sm">
            <div className="text-4xl mb-1 animate-bounce-slow">❓</div>
            <div>결과</div>
          </div>
        </div>
      </div>

      {/* 버튼들 */}
      <div className="flex gap-3">
        <button
          onClick={handleCraft}
          disabled={!slot1 || !slot2 || isAnimating}
          className={`
            flex-1 py-3 px-6 rounded-xl font-black text-lg
            transition-all duration-300
            ${
              slot1 && slot2 && !isAnimating
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:scale-105 cursor-pointer'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }
          `}
        >
          {isAnimating ? '⚒️ 조합중...' : '⚒️ 조합하기!'}
        </button>
        <button
          onClick={handleClear}
          disabled={!slot1 && !slot2}
          className={`
            py-3 px-6 rounded-xl font-black text-lg
            transition-all duration-300
            ${
              slot1 || slot2
                ? 'bg-slate-700 hover:bg-slate-600 cursor-pointer'
                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
            }
          `}
        >
          🗑️ 초기화
        </button>
      </div>

      <p className="text-center text-sm text-slate-500 mt-4">
        💡 아이템을 드래그해서 조합하세요!
      </p>
    </div>
  );
};

export default CraftingArea;
