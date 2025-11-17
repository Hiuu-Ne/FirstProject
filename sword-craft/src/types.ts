export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';

export type ItemType = 'material' | 'sword';

export interface Item {
  id: string;
  name: string;
  emoji: string;
  type: ItemType;
  rarity: Rarity;
  tags: string[];
  description?: string;
  discovered: boolean;
}

export interface Recipe {
  ingredients: [string, string]; // [itemId1, itemId2]
  result: string; // resultItemId
  tags?: string[]; // 결과물의 태그
}

export interface CraftingSlot {
  item: Item | null;
}

export interface GameState {
  discoveredItems: Map<string, Item>;
  inventory: Item[];
  totalItemsCount: number;
  craftCount: number;
}
