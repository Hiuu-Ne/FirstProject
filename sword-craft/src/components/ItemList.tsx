import React, { useState } from 'react';
import type { Item } from '../types';
import ItemCard from './ItemCard';

interface ItemListProps {
  items: Item[];
  title: string;
}

const ItemList: React.FC<ItemListProps> = ({ items, title }) => {
  const [filter, setFilter] = useState<'all' | 'material' | 'sword'>('all');
  const [rarityFilter, setRarityFilter] = useState<string>('all');

  const filteredItems = items.filter(item => {
    if (filter !== 'all' && item.type !== filter) return false;
    if (rarityFilter !== 'all' && item.rarity !== rarityFilter) return false;
    return true;
  });

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-500/30">
      <h2 className="text-2xl font-black mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
        {title}
      </h2>

      {/* 필터 */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
            filter === 'all'
              ? 'bg-purple-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          전체 ({items.length})
        </button>
        <button
          onClick={() => setFilter('material')}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
            filter === 'material'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          재료 ({items.filter(i => i.type === 'material').length})
        </button>
        <button
          onClick={() => setFilter('sword')}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
            filter === 'sword'
              ? 'bg-yellow-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          검 ({items.filter(i => i.type === 'sword').length})
        </button>

        <div className="border-l-2 border-slate-600 mx-2"></div>

        <select
          value={rarityFilter}
          onChange={(e) => setRarityFilter(e.target.value)}
          className="px-4 py-2 rounded-lg font-bold text-sm bg-slate-700 text-slate-300 border-none cursor-pointer hover:bg-slate-600"
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

      {/* 아이템 그리드 */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 max-h-96 overflow-y-auto p-2">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} size="small" />
          ))
        ) : (
          <div className="col-span-full text-center text-slate-500 py-8">
            <div className="text-6xl mb-2">🔍</div>
            <p>아이템이 없습니다</p>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500 mt-4 text-center">
        💡 아이템을 드래그해서 조합소로 옮겨보세요!
      </p>
    </div>
  );
};

export default ItemList;
