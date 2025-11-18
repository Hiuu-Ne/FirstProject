import React, { useEffect, useState } from 'react';
import type { Item } from '../types';
import { getRarityText } from '../utils/combineItems';

interface NewItemModalProps {
  item: Item | null;
  onClose: () => void;
}

const NewItemModal: React.FC<NewItemModalProps> = ({ item, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (item) {
      setShow(true);
    }
  }, [item]);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  if (!item) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* 모달 컨텐츠 */}
      <div
        className={`relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-md w-full mx-4 border-4 border-purple-500 shadow-2xl transition-all duration-500 ${
          show ? 'scale-100 rotate-0' : 'scale-50 rotate-12'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 반짝이는 효과 */}
        <div className="absolute -top-10 -right-10 text-8xl animate-bounce-slow">✨</div>
        <div className="absolute -bottom-10 -left-10 text-8xl animate-bounce-slow" style={{ animationDelay: '0.5s' }}>✨</div>

        {/* 제목 */}
        <h2 className="text-3xl font-black text-center mb-6 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
          ✨ 새로운 발견! ✨
        </h2>

        {/* 아이템 표시 */}
        <div className="flex flex-col items-center mb-6">
          <div className="text-8xl mb-4 animate-float">{item.emoji}</div>
          <h3 className="text-2xl font-black text-white mb-2">{item.name}</h3>
          <div className="flex gap-2 items-center">
            <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-sm font-bold">
              {getRarityText(item.rarity)}
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-bold">
              {item.type === 'sword' ? '⚔️ 검' : '📦 재료'}
            </span>
          </div>
        </div>

        {/* 설명 */}
        {item.description && (
          <div className="bg-slate-700/50 rounded-xl p-4 mb-6">
            <p className="text-slate-200 text-center leading-relaxed">
              {item.description}
            </p>
          </div>
        )}

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-slate-700 text-slate-300 rounded-md text-xs font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-xl font-black text-lg transition-all duration-300 hover:scale-105"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default NewItemModal;
