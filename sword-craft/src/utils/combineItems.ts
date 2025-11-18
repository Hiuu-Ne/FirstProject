import type { Item, Rarity } from '../types';
import { SPECIAL_RECIPES, SPECIAL_ITEMS } from '../constants/recipes';

// 컨셉 변환 - 특정 태그 조합이 나타나면 완전히 새로운 컨셉으로 변환
interface ConceptTransformation {
  requiredTags: string[]; // 반드시 있어야 하는 태그들
  resultName: string; // 변환 후 이름
  resultTags: string[]; // 변환 후 태그들
  resultType: 'material' | 'sword';
  emoji: string;
  rarity?: Rarity;
}

const CONCEPT_TRANSFORMATIONS: ConceptTransformation[] = [
  // 바람 + 빠른 = 태풍
  { requiredTags: ['wind', 'fast'], resultName: '태풍', resultTags: ['typhoon', 'wind', 'powerful'], resultType: 'material', emoji: '🌪️' },

  // 태풍 + 빛 = 썬더스톰
  { requiredTags: ['typhoon', 'light'], resultName: '썬더스톰', resultTags: ['thunderstorm', 'lightning', 'powerful'], resultType: 'material', emoji: '⚡' },
  { requiredTags: ['typhoon', 'lightning'], resultName: '썬더스톰', resultTags: ['thunderstorm', 'lightning', 'powerful'], resultType: 'material', emoji: '⚡' },

  // 썬더스톰 + 뜨거운 = 볼케이노 or 태풍 + 빛 + 뜨거운 = 볼케이노
  { requiredTags: ['thunderstorm', 'hot'], resultName: '볼케이노', resultTags: ['volcano', 'fire', 'earth'], resultType: 'material', emoji: '🌋' },
  { requiredTags: ['typhoon', 'light', 'hot'], resultName: '볼케이노', resultTags: ['volcano', 'fire', 'earth'], resultType: 'material', emoji: '🌋' },
  { requiredTags: ['lightning', 'hot', 'earth'], resultName: '볼케이노', resultTags: ['volcano', 'fire', 'earth'], resultType: 'material', emoji: '🌋' },

  // 볼케이노 + 물 = 마운틴
  { requiredTags: ['volcano', 'water'], resultName: '마운틴', resultTags: ['mountain', 'earth', 'stone'], resultType: 'material', emoji: '⛰️' },

  // 추가 변환들 - 재미있고 논리적인 조합
  { requiredTags: ['fire', 'water'], resultName: '증기', resultTags: ['steam', 'hot'], resultType: 'material', emoji: '💨' },
  { requiredTags: ['steam', 'cold'], resultName: '구름', resultTags: ['cloud', 'water', 'wind'], resultType: 'material', emoji: '☁️' },
  { requiredTags: ['cloud', 'ice'], resultName: '눈', resultTags: ['snow', 'ice', 'cold'], resultType: 'material', emoji: '❄️' },

  { requiredTags: ['fire', 'ice'], resultName: '온도개념', resultTags: ['chaos', 'unstable'], resultType: 'material', emoji: '🌀' },
  { requiredTags: ['light', 'dark'], resultName: '황혼', resultTags: ['twilight', 'balance'], resultType: 'material', emoji: '🌅' },

  { requiredTags: ['earth', 'fire'], resultName: '용암', resultTags: ['lava', 'fire', 'earth', 'hot'], resultType: 'material', emoji: '🔥' },
  { requiredTags: ['lava', 'water'], resultName: '흑요석', resultTags: ['obsidian', 'stone', 'sharp'], resultType: 'material', emoji: '⬛' },

  { requiredTags: ['water', 'wind'], resultName: '폭풍', resultTags: ['storm', 'water', 'wind', 'powerful'], resultType: 'material', emoji: '🌊' },
  { requiredTags: ['storm', 'ice'], resultName: '블리자드', resultTags: ['blizzard', 'ice', 'wind', 'cold'], resultType: 'material', emoji: '🌨️' },

  { requiredTags: ['lightning', 'water'], resultName: '플라즈마', resultTags: ['plasma', 'lightning', 'energy'], resultType: 'material', emoji: '⚡' },

  // 신성/악마 조합
  { requiredTags: ['holy', 'cursed'], resultName: '타락', resultTags: ['fallen', 'dark', 'holy'], resultType: 'material', emoji: '😈' },
  { requiredTags: ['divine', 'evil'], resultName: '신마', resultTags: ['god-demon', 'divine', 'demon', 'chaos'], resultType: 'material', emoji: '👿' },
  { requiredTags: ['angel', 'demon'], resultName: '네피림', resultTags: ['nephilim', 'angel', 'demon', 'powerful'], resultType: 'material', emoji: '😇' },

  // 드래곤 조합
  { requiredTags: ['dragon', 'fire'], resultName: '화룡', resultTags: ['fire-dragon', 'dragon', 'fire', 'legendary'], resultType: 'material', emoji: '🐉' },
  { requiredTags: ['dragon', 'ice'], resultName: '빙룡', resultTags: ['ice-dragon', 'dragon', 'ice', 'legendary'], resultType: 'material', emoji: '🐉' },
  { requiredTags: ['dragon', 'light'], resultName: '성룡', resultTags: ['holy-dragon', 'dragon', 'light', 'legendary'], resultType: 'material', emoji: '🐉' },

  // 마운틴 관련 조합
  { requiredTags: ['mountain', 'metal'], resultName: '광맥', resultTags: ['ore', 'metal', 'earth'], resultType: 'material', emoji: '⛏️' },
  { requiredTags: ['ore', 'fire'], resultName: '정제된 광석', resultTags: ['refined-ore', 'metal', 'iron', 'steel'], resultType: 'material', emoji: '💎' },

  // 검 변환 (금속 + 강력한 원소)
  { requiredTags: ['metal', 'fire-dragon'], resultName: '화룡검', resultTags: ['dragon', 'fire', 'legendary'], resultType: 'sword', emoji: '🐉⚔️', rarity: 'legendary' },
  { requiredTags: ['metal', 'ice-dragon'], resultName: '빙룡검', resultTags: ['dragon', 'ice', 'legendary'], resultType: 'sword', emoji: '🐉⚔️', rarity: 'legendary' },
  { requiredTags: ['steel', 'volcano'], resultName: '볼케이노검', resultTags: ['fire', 'earth', 'powerful'], resultType: 'sword', emoji: '🌋⚔️', rarity: 'epic' },
  { requiredTags: ['metal', 'thunderstorm'], resultName: '뇌전검', resultTags: ['lightning', 'powerful'], resultType: 'sword', emoji: '⚡⚔️', rarity: 'epic' },
  { requiredTags: ['obsidian', 'metal'], resultName: '흑요석검', resultTags: ['dark', 'sharp', 'powerful'], resultType: 'sword', emoji: '⬛⚔️', rarity: 'rare' },

  // 기믹 변환
  { requiredTags: ['chaos', 'unstable', 'metal'], resultName: '개념상실검', resultTags: ['chaos', 'random'], resultType: 'sword', emoji: '🌀⚔️', rarity: 'rare' },
];

// 태그 조합으로 희귀도 결정
function calculateRarity(tags: string[]): Rarity {
  const tagCount = tags.length;
  const hasLegendaryTag = tags.some(t => ['divine', 'god', 'ultimate', 'mythical', 'creation', 'destruction', 'fire-dragon', 'ice-dragon', 'holy-dragon'].includes(t));
  const hasEpicTag = tags.some(t => ['dragon', 'archangel', 'legendary', 'ancient', 'powerful', 'volcano', 'thunderstorm'].includes(t));
  const hasRareTag = tags.some(t => ['holy', 'curse', 'electric', 'plasma', 'void', 'typhoon', 'blizzard'].includes(t));

  if (hasLegendaryTag || tagCount >= 6) return 'mythic';
  if (hasEpicTag || tagCount >= 5) return 'legendary';
  if (hasRareTag || tagCount >= 4) return 'epic';
  if (tagCount >= 3) return 'rare';
  if (tagCount >= 2) return 'uncommon';
  return 'common';
}

// 태그 우선순위 (높을수록 중요)
const TAG_PRIORITY: Record<string, number> = {
  // 신성/악마
  divine: 100,
  god: 100,
  'god-demon': 98,
  holy: 90,
  angel: 90,
  demon: 85,
  cursed: 85,
  evil: 80,
  nephilim: 88,
  fallen: 85,

  // 전설급
  ultimate: 95,
  legendary: 90,
  mythical: 90,
  ancient: 85,
  dragon: 85,
  archangel: 90,

  // 드래곤 변종
  'fire-dragon': 95,
  'ice-dragon': 95,
  'holy-dragon': 95,

  // 자연 현상 (변환된 컨셉들)
  volcano: 85,
  mountain: 82,
  thunderstorm: 83,
  typhoon: 80,
  blizzard: 78,
  storm: 75,
  lava: 77,
  obsidian: 76,
  cloud: 65,
  snow: 68,
  steam: 65,

  // 원소
  fire: 70,
  water: 70,
  earth: 70,
  wind: 70,
  lightning: 75,
  ice: 75,
  light: 75,
  dark: 75,

  // 특수
  void: 80,
  chaos: 80,
  plasma: 75,
  poison: 70,
  twilight: 73,
  balance: 68,
  unstable: 65,
  energy: 72,

  // 재료
  metal: 50,
  steel: 55,
  iron: 50,
  wood: 45,
  stone: 45,
  ore: 58,
  'refined-ore': 62,

  // 기본
  sword: 40,
  sharp: 60,
  powerful: 70,
  fast: 55,
  heavy: 50,
  hot: 60,
  cold: 60,
  random: 50,
};

// 태그로 이름 생성 (자동 조합) - 개선 버전
function generateName(tags: string[], type: 'material' | 'sword'): string {
  // 태그를 우선순위별로 정렬하고 상위 2개만 선택
  const sortedTags = [...tags]
    .filter(t => TAG_PRIORITY[t] !== undefined)
    .sort((a, b) => (TAG_PRIORITY[b] || 0) - (TAG_PRIORITY[a] || 0))
    .slice(0, 2);

  // 특수 조합 규칙
  const tagSet = new Set(sortedTags);

  // 상반되는 조합
  if (tagSet.has('fire') && tagSet.has('water')) return type === 'sword' ? '증기검' : '증기';
  if (tagSet.has('fire') && tagSet.has('ice')) return type === 'sword' ? '온도개념상실검' : '온도개념';
  if (tagSet.has('light') && tagSet.has('dark')) return type === 'sword' ? '혼돈검' : '황혼';
  if (tagSet.has('holy') && tagSet.has('cursed')) return type === 'sword' ? '타락한 성검' : '타락';
  if (tagSet.has('divine') && tagSet.has('evil')) return type === 'sword' ? '신마검' : '신마';

  // 신성 계열
  if (tagSet.has('divine') || tagSet.has('god')) {
    if (type === 'sword') return '신의 검';
    return '신성';
  }

  if (tagSet.has('holy') && tagSet.has('light')) {
    if (type === 'sword') return '대천사검';
    return '신성한 빛';
  }

  // 전설급
  if (tagSet.has('dragon') && tagSet.has('fire')) {
    if (type === 'sword') return '화룡검';
    return '화룡';
  }

  if (tagSet.has('dragon') && tagSet.has('ice')) {
    if (type === 'sword') return '빙룡검';
    return '빙룡';
  }

  // 원소 조합
  if (tagSet.has('fire') && tagSet.has('lightning')) {
    if (type === 'sword') return '뇌화검';
    return '플라즈마';
  }

  if (tagSet.has('water') && tagSet.has('wind')) {
    if (type === 'sword') return '폭풍검';
    return '폭풍';
  }

  if (tagSet.has('earth') && tagSet.has('fire')) {
    if (type === 'sword') return '용암검';
    return '용암';
  }

  // 일반 조합 (최대 2개 형용사)
  const adjectives: Record<string, string> = {
    divine: '신의',
    god: '신의',
    'god-demon': '신마',
    holy: '성스러운',
    angel: '천사의',
    demon: '악마의',
    cursed: '저주받은',
    evil: '사악한',
    nephilim: '네피림',
    fallen: '타락한',

    ultimate: '궁극의',
    legendary: '전설의',
    mythical: '신화의',
    ancient: '고대의',
    dragon: '용의',
    archangel: '대천사의',

    'fire-dragon': '화룡',
    'ice-dragon': '빙룡',
    'holy-dragon': '성룡',

    // 자연 현상
    volcano: '볼케이노',
    mountain: '마운틴',
    thunderstorm: '썬더스톰',
    typhoon: '태풍',
    blizzard: '블리자드',
    storm: '폭풍',
    lava: '용암',
    obsidian: '흑요석',
    cloud: '구름',
    snow: '눈',
    steam: '증기',

    fire: '화염',
    water: '물의',
    earth: '대지의',
    wind: '바람의',
    lightning: '뇌전의',
    ice: '빙설의',
    light: '광명의',
    dark: '암흑의',
    void: '공허한',
    chaos: '혼돈의',
    plasma: '플라즈마',
    poison: '맹독의',
    twilight: '황혼',
    balance: '균형의',
    unstable: '불안정한',
    energy: '에너지',

    metal: '금속',
    steel: '강철',
    iron: '철',
    ore: '광맥',
    'refined-ore': '정제된',
    sharp: '날카로운',
    powerful: '강력한',
    fast: '신속한',
    heavy: '중량',
    hot: '작열하는',
    cold: '극한의',
    random: '무작위',
  };

  const selectedAdjectives = sortedTags
    .filter(t => adjectives[t])
    .map(t => adjectives[t])
    .slice(0, 2); // 최대 2개

  if (selectedAdjectives.length === 0) {
    return type === 'sword' ? '신비한 검' : '신비한 재료';
  }

  const adjectiveStr = selectedAdjectives.join(' ');
  return type === 'sword' ? `${adjectiveStr}검` : adjectiveStr;
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
    divine: '👑',
    void: '⚫',

    // 변환된 컨셉들
    volcano: '🌋',
    mountain: '⛰️',
    thunderstorm: '⚡',
    typhoon: '🌪️',
    blizzard: '🌨️',
    storm: '🌊',
    lava: '🔥',
    obsidian: '⬛',
    cloud: '☁️',
    snow: '❄️',
    steam: '💨',
    'fire-dragon': '🐉',
    'ice-dragon': '🐉',
    'holy-dragon': '🐉',
    'god-demon': '👿',
    nephilim: '😇',
    fallen: '😈',
    plasma: '⚡',
    twilight: '🌅',
    ore: '⛏️',
    'refined-ore': '💎',
  };

  // 우선순위가 높은 태그의 이모지 선택
  const sortedTags = [...tags]
    .filter(t => emojiMap[t])
    .sort((a, b) => (TAG_PRIORITY[b] || 0) - (TAG_PRIORITY[a] || 0));

  const mainEmoji = sortedTags[0] ? emojiMap[sortedTags[0]] : '❓';
  return type === 'sword' ? `${mainEmoji}⚔️` : mainEmoji;
}

// 컨셉 변환 체크 함수
function checkConceptTransformation(tags: string[]): ConceptTransformation | null {
  // 가장 많은 태그가 매칭되는 변환을 찾기 (더 구체적인 변환 우선)
  const sortedTransformations = [...CONCEPT_TRANSFORMATIONS].sort(
    (a, b) => b.requiredTags.length - a.requiredTags.length
  );

  for (const transformation of sortedTransformations) {
    const hasAllRequired = transformation.requiredTags.every(tag => tags.includes(tag));
    if (hasAllRequired) {
      return transformation;
    }
  }
  return null;
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

  // 2. 컨셉 변환 체크 - 태그 조합으로 완전히 새로운 아이템 생성
  const combinedTags = [...new Set([...item1.tags, ...item2.tags])]; // 중복 제거
  const transformation = checkConceptTransformation(combinedTags);

  if (transformation) {
    // 컨셉 변환이 있으면 새로운 컨셉으로 변환
    const rarity = transformation.rarity || calculateRarity(transformation.resultTags);
    const sortedTags = [...transformation.resultTags].sort().join('-');
    const id = `concept-${transformation.resultType}-${sortedTags}`;

    return {
      id,
      name: transformation.resultName,
      emoji: transformation.emoji,
      type: transformation.resultType,
      rarity,
      tags: transformation.resultTags,
      description: `${item1.name}과(와) ${item2.name}이(가) 결합하여 ${transformation.resultName}이(가) 탄생했습니다!`,
      discovered: false,
    };
  }

  // 3. 태그 기반 자동 생성 (일반 조합)
  // 태그가 너무 많으면 상위 4개만 선택
  const selectedTags = [...combinedTags]
    .sort((a, b) => (TAG_PRIORITY[b] || 0) - (TAG_PRIORITY[a] || 0))
    .slice(0, 4);

  const hasAnyMetal = selectedTags.some(t => ['metal', 'iron', 'steel', 'sword'].includes(t));

  let resultType: 'material' | 'sword';
  if (item1.type === 'sword' || item2.type === 'sword') {
    resultType = 'sword';
  } else if (hasAnyMetal && selectedTags.length >= 2) {
    resultType = 'sword'; // 금속 포함 + 2개 이상 태그 = 검
  } else {
    resultType = 'material';
  }

  const name = generateName(selectedTags, resultType);
  const emoji = generateEmoji(selectedTags, resultType);
  const rarity = calculateRarity(selectedTags);

  // 고유 ID 생성 (태그 정렬 후 조합)
  const sortedTags = [...selectedTags].sort().join('-');
  const id = `auto-${resultType}-${sortedTags}`;

  return {
    id,
    name,
    emoji,
    type: resultType,
    rarity,
    tags: selectedTags,
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
