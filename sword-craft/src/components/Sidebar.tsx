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
  const [rarityFilter, setRarityFilter] = useState<string>('all');
  const [showInfo, setShowInfo] = useState(false);

  const filteredItems = discoveredItems.filter(item => {
    if (filter !== 'all' && item.type !== filter) return false;
    if (rarityFilter !== 'all' && item.rarity !== rarityFilter) return false;
    return true;
  });

  const swordCount = discoveredItems.filter(i => i.type === 'sword').length;
  const discoveryRate = Math.round((discoveredItems.length / totalItems) * 100);

  return (
    <div className="h-full flex flex-col bg-slate-900/50 border-l-2 border-purple-500/30">
      {/* 헤더 */}
      <div className="p-6 border-b-2 border-purple-500/30">
        <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          🗡️ 칼 조합 연금술
        </h1>
        <p className="text-sm text-slate-400">재료를 조합해서 전설의 검을 만드세요!</p>
      </div>

      {/* 통계 */}
      <div className="p-4 space-y-3 border-b-2 border-purple-500/30">
        <div className="bg-slate-800/50 rounded-lg px-4 py-2 border-2 border-purple-500/30">
          <div className="text-xs text-slate-400">발견한 아이템</div>
          <div className="text-xl font-black text-purple-300">
            {discoveredItems.length} / {totalItems}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-800/50 rounded-lg px-3 py-2 border-2 border-yellow-500/30">
            <div className="text-xs text-slate-400">검</div>
            <div className="text-lg font-black text-yellow-300">⚔️ {swordCount}</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg px-3 py-2 border-2 border-blue-500/30">
            <div className="text-xs text-slate-400">조합 횟수</div>
            <div className="text-lg font-black text-blue-300">🔨 {craftCount}</div>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-lg px-4 py-2 border-2 border-green-500/30">
          <div className="text-xs text-slate-400">발견율</div>
          <div className="text-xl font-black text-green-300">📊 {discoveryRate}%</div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="p-4 flex gap-2 border-b-2 border-purple-500/30">
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold text-sm transition-all duration-300"
        >
          {showInfo ? '❌' : '❓'}
        </button>
        <button
          onClick={onReset}
          className="flex-1 px-3 py-2 bg-red-900/50 hover:bg-red-800/50 border-2 border-red-500/30 rounded-lg font-bold text-sm transition-all duration-300"
        >
          🔄 초기화
        </button>
      </div>

      {/* 도움말 */}
      {showInfo && (
        <div className="p-4 bg-slate-800/70 border-b-2 border-blue-500/30 text-xs">
          <h3 className="font-black mb-2 text-blue-300">📖 사용법</h3>
          <ul className="space-y-1 text-slate-300">
            <li>✅ 아이템을 왼쪽으로 드래그</li>
            <li>✅ 아이템끼리 겹쳐서 조합</li>
            <li>✅ 더블클릭으로 제거</li>
          </ul>
        </div>
      )}

      {/* 필터 */}
      <div className="p-4 space-y-2 border-b-2 border-purple-500/30">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 px-2 py-1 rounded text-xs font-bold transition-all ${
              filter === 'all' ? 'bg-purple-600' : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setFilter('material')}
            className={`flex-1 px-2 py-1 rounded text-xs font-bold transition-all ${
              filter === 'material' ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            재료
          </button>
          <button
            onClick={() => setFilter('sword')}
            className={`flex-1 px-2 py-1 rounded text-xs font-bold transition-all ${
              filter === 'sword' ? 'bg-yellow-600' : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            검
          </button>
        </div>
        <select
          value={rarityFilter}
          onChange={(e) => setRarityFilter(e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-xs font-bold bg-slate-700 border-none cursor-pointer hover:bg-slate-600"
        >
          <option value="all">모든 등급</option>
          <option value="common">⚪ 일반</option>
          <option value="uncommon">🟢 고급</option>
          <option value="rare">🔵 희귀</option>
          <option value="epic">🟣 영웅</option>
          <option value="legendary">🟠 전설</option>
          <option value="mythic">🔴 신화</option>
        </select>
      </div>

      {/* 아이템 목록 */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-sm font-black text-purple-300 mb-3">
          📦 발견한 아이템 ({filteredItems.length})
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} size="small" showRarity={false} />
          ))}
        </div>
        {filteredItems.length === 0 && (
          <div className="text-center text-slate-500 py-8">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-xs">아이템이 없습니다</p>
          </div>
        )}
        <p className="text-xs text-slate-500 mt-4 text-center">
          💡 드래그해서 왼쪽으로!
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
