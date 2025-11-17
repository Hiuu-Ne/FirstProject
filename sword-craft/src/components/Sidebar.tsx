import React, { useState } from 'react';
import type { Item } from '../types';
import ItemCard from './ItemCard';

interface SidebarProps {
  discoveredItems: Item[];
  craftCount: number;
  totalItems: number;
  onReset: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  discoveredItems,
  craftCount,
  totalItems,
  onReset,
}) => {
  const [filter, setFilter] = useState<'all' | 'material' | 'sword'>('all');

  const filteredItems = discoveredItems.filter(item => {
    if (filter !== 'all' && item.type !== filter) return false;
    return true;
  });

  const swordCount = discoveredItems.filter(i => i.type === 'sword').length;
  const discoveryRate = Math.round((discoveredItems.length / totalItems) * 100);

  return (
    <div className="h-full flex flex-col bg-slate-900 border-l border-slate-700">
      {/* 헤더 */}
      <div className="px-4 py-4 border-b border-slate-700">
        <h1 className="text-xl font-black text-slate-100 mb-1">
          🗡️ 칼 조합 연금술
        </h1>
        <p className="text-xs text-slate-500">재료를 조합해서 전설의 검을 만드세요</p>
      </div>

      {/* 통계 - 컴팩트하게 */}
      <div className="px-4 py-3 border-b border-slate-700 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">발견</span>
          <span className="font-bold text-purple-400">
            {discoveredItems.length} / {totalItems} ({discoveryRate}%)
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">검</span>
          <span className="font-bold text-yellow-400">⚔️ {swordCount}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">조합</span>
          <span className="font-bold text-blue-400">🔨 {craftCount}</span>
        </div>
      </div>

      {/* 초기화 버튼 */}
      <div className="px-4 py-2 border-b border-slate-700">
        <button
          onClick={onReset}
          className="w-full px-3 py-2 text-xs bg-red-900/30 hover:bg-red-900/50 border border-red-700/50 rounded-lg font-bold transition-all"
        >
          🔄 초기화
        </button>
      </div>

      {/* 필터 */}
      <div className="px-4 py-3 border-b border-slate-700">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 px-2 py-1.5 rounded text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            전체 {discoveredItems.length}
          </button>
          <button
            onClick={() => setFilter('material')}
            className={`flex-1 px-2 py-1.5 rounded text-xs font-bold transition-all ${
              filter === 'material'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            재료 {discoveredItems.filter(i => i.type === 'material').length}
          </button>
          <button
            onClick={() => setFilter('sword')}
            className={`flex-1 px-2 py-1.5 rounded text-xs font-bold transition-all ${
              filter === 'sword'
                ? 'bg-yellow-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            검 {swordCount}
          </button>
        </div>
      </div>

      {/* 아이템 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {filteredItems.map(item => (
              <ItemCard key={item.id} item={item} size="small" showRarity={false} />
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-600 py-12">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-xs">아이템이 없습니다</p>
          </div>
        )}
      </div>

      {/* 힌트 */}
      <div className="px-4 py-3 border-t border-slate-700 bg-slate-800/50">
        <p className="text-[10px] text-slate-500 text-center leading-relaxed">
          💡 드래그해서 왼쪽으로!<br />
          아이템끼리 겹치면 조합됩니다
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
