import type { Item, Rarity } from '../types';
import { SPECIAL_RECIPES, SPECIAL_ITEMS } from '../constants/recipes';

// 태그 조합으로 희귀도 결정
function calculateRarity(tags: string[]): Rarity {
  const tagCount = tags.length;
  const hasLegendaryTag = tags.some(t => ['divine', 'god', 'ultimate', 'mythical', 'creation', 'destruction'].includes(t));
  const hasEpicTag = tags.some(t => ['dragon', 'archangel', 'legendary', 'ancient', 'powerful'].includes(t));
  const hasRareTag = tags.some(t => ['holy', 'curse', 'electric', 'plasma', 'void'].includes(t));

  if (hasLegendaryTag || tagCount >= 6) return 'mythic';
  if (hasEpicTag || tagCount >= 5) return 'legendary';
  if (hasRareTag || tagCount >= 4) return 'epic';
  if (tagCount >= 3) return 'rare';
  if (tagCount >= 2) return 'uncommon';
  return 'common';
}

// 태그로 이름 생성 (자동 조합)
function generateName(tags: string[], type: 'material' | 'sword'): string {
  const adjectives: Record<string, string> = {
    fire: '불타는',
    water: '물의',
    earth: '대지의',
    wind: '바람의',
    light: '빛나는',
    dark: '어두운',
    ice: '얼음의',
    lightning: '번개의',
    poison: '독성의',
    holy: '신성한',
    cursed: '저주받은',
    steel: '강철',
    hot: '뜨거운',
    cold: '차가운',
    fast: '빠른',
    slow: '느린',
    heavy: '무거운',
    sharp: '날카로운',
    electric: '전기',
    chaos: '혼돈의',
    divine: '신의',
    void: '공허한',
    ancient: '고대의',
    legendary: '전설의',
    mythical: '신화의',
    powerful: '강력한',
    weak: '약한',
    ultimate: '궁극의',
    dragon: '드래곤',
    demon: '악마의',
    angel: '천사의',
  };

  const nouns: Record<string, string> = {
    material: '재료',
    sword: '검',
    metal: '금속',
    wood: '나무',
    stone: '돌',
  };

  // 태그에서 형용사 찾기
  const foundAdjectives = tags.filter(t => adjectives[t]).map(t => adjectives[t]);
  const adjective = foundAdjectives.length > 0 ? foundAdjectives.join(' ') : '신비한';

  const noun = type === 'sword' ? '검' : nouns[tags.find(t => nouns[t]) || 'material'] || '재료';

  return `${adjective} ${noun}`;
}

// 태그로 이모지 생성
function generateEmoji(tags: string[], type: 'material' | 'sword'): string {
  const emojiMap: Record<string, string> = {
    fire: '🔥',
    water: '💧',
    earth: '🪨',
    wind: '💨',
    light: '✨',
    dark: '🌑',
    ice: '🧊',
    lightning: '⚡',
    poison: '☠️',
    metal: '⚙️',
    wood: '🪵',
    stone: '🗿',
    holy: '✨',
    cursed: '💀',
    dragon: '🐉',
    chaos: '🌀',
  };

  const mainEmoji = tags.map(t => emojiMap[t]).find(e => e) || '❓';
  return type === 'sword' ? `${mainEmoji}⚔️` : mainEmoji;
}

// 두 아이템 조합
export function combineItems(item1: Item, item2: Item): Item | null {
  // 1. 특별 레시피 확인 (양방향)
  const recipe = SPECIAL_RECIPES.find(r =>
    (r.ingredients[0] === item1.id && r.ingredients[1] === item2.id) ||
    (r.ingredients[0] === item2.id && r.ingredients[1] === item1.id)
  );

  if (recipe) {
    // 특별 레시피가 있으면 해당 아이템 생성
    const special = SPECIAL_ITEMS[recipe.result];
    if (special) {
      return {
        id: recipe.result,
        name: special.name!,
        emoji: special.emoji!,
        type: special.type!,
        rarity: special.rarity!,
        tags: special.tags!,
        description: special.description,
        discovered: false,
      };
    }
  }

  // 2. 태그 기반 자동 생성
  // 재료 + 재료 = 새 재료
  // 재료 + 검 = 새 검
  // 검 + 검 = 더 강한 검

  const combinedTags = [...new Set([...item1.tags, ...item2.tags])]; // 중복 제거
  const hasAnyMetal = combinedTags.some(t => ['metal', 'iron', 'steel', 'sword'].includes(t));

  let resultType: 'material' | 'sword';
  if (item1.type === 'sword' || item2.type === 'sword') {
    resultType = 'sword';
  } else if (hasAnyMetal && combinedTags.length >= 2) {
    resultType = 'sword'; // 금속 포함 + 2개 이상 태그 = 검
  } else {
    resultType = 'material';
  }

  const name = generateName(combinedTags, resultType);
  const emoji = generateEmoji(combinedTags, resultType);
  const rarity = calculateRarity(combinedTags);

  // 고유 ID 생성 (태그 정렬 후 조합)
  const sortedTags = [...combinedTags].sort().join('-');
  const id = `auto-${resultType}-${sortedTags}`;

  return {
    id,
    name,
    emoji,
    type: resultType,
    rarity,
    tags: combinedTags,
    description: `${item1.name}과(와) ${item2.name}을(를) 조합하여 만든 ${name}`,
    discovered: false,
  };
}

// 희귀도별 색상
export function getRarityColor(rarity: Rarity): string {
  const colors: Record<Rarity, string> = {
    common: 'bg-slate-600 border-slate-500',
    uncommon: 'bg-green-600 border-green-500',
    rare: 'bg-blue-600 border-blue-500',
    epic: 'bg-purple-600 border-purple-500',
    legendary: 'bg-orange-600 border-orange-500',
    mythic: 'bg-rose-600 border-rose-500',
  };
  return colors[rarity];
}

// 희귀도별 글로우 클래스
export function getRarityGlow(rarity: Rarity): string {
  const glows: Record<Rarity, string> = {
    common: 'glow-common',
    uncommon: 'glow-uncommon',
    rare: 'glow-rare',
    epic: 'glow-epic',
    legendary: 'glow-legendary',
    mythic: 'glow-mythic',
  };
  return glows[rarity];
}

// 희귀도별 텍스트
export function getRarityText(rarity: Rarity): string {
  const texts: Record<Rarity, string> = {
    common: '일반',
    uncommon: '고급',
    rare: '희귀',
    epic: '영웅',
    legendary: '전설',
    mythic: '신화',
  };
  return texts[rarity];
}
