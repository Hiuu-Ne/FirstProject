import type { Item, Recipe } from '../types';

// 특별 조합 레시피 - 재미있고 다양한 조합들
export const SPECIAL_RECIPES: Recipe[] = [
  // === 기본 재료 조합 (중급 재료 생성) ===
  { ingredients: ['fire', 'water'], result: 'steam' },
  { ingredients: ['fire', 'earth'], result: 'lava' },
  { ingredients: ['water', 'wind'], result: 'storm' },
  { ingredients: ['light', 'dark'], result: 'twilight' },
  { ingredients: ['metal', 'fire'], result: 'steel' },
  { ingredients: ['poison', 'dark'], result: 'curse' },
  { ingredients: ['light', 'lightning'], result: 'thunder' },
  { ingredients: ['water', 'ice'], result: 'glacier' },
  { ingredients: ['fire', 'lightning'], result: 'plasma' },
  { ingredients: ['earth', 'water'], result: 'mud' },
  { ingredients: ['wind', 'water'], result: 'mist' },
  { ingredients: ['earth', 'fire'], result: 'magma' },
  { ingredients: ['wood', 'fire'], result: 'ash' },
  { ingredients: ['metal', 'lightning'], result: 'electromagnet' },
  { ingredients: ['ice', 'wind'], result: 'blizzard' },
  { ingredients: ['poison', 'water'], result: 'acid' },
  { ingredients: ['light', 'fire'], result: 'sun' },
  { ingredients: ['dark', 'ice'], result: 'void' },
  { ingredients: ['stone', 'fire'], result: 'obsidian' },
  { ingredients: ['metal', 'dark'], result: 'shadow-metal' },

  // === 기본 검 (재료 + 재료) ===
  { ingredients: ['metal', 'metal'], result: 'basic-sword' },
  { ingredients: ['fire', 'metal'], result: 'flame-sword' },
  { ingredients: ['water', 'metal'], result: 'water-sword' },
  { ingredients: ['earth', 'metal'], result: 'earth-sword' },
  { ingredients: ['wind', 'metal'], result: 'wind-sword' },
  { ingredients: ['light', 'metal'], result: 'holy-sword' },
  { ingredients: ['dark', 'metal'], result: 'dark-sword' },
  { ingredients: ['lightning', 'metal'], result: 'thunder-sword' },
  { ingredients: ['ice', 'metal'], result: 'ice-sword' },
  { ingredients: ['poison', 'metal'], result: 'poison-sword' },
  { ingredients: ['wood', 'metal'], result: 'wooden-sword' },
  { ingredients: ['stone', 'metal'], result: 'stone-sword' },

  // === 중급 검 (강화 재료) ===
  { ingredients: ['steel', 'fire'], result: 'steel-flame-sword' },
  { ingredients: ['steam', 'metal'], result: 'steam-sword' },
  { ingredients: ['lava', 'metal'], result: 'lava-sword' },
  { ingredients: ['storm', 'metal'], result: 'storm-sword' },
  { ingredients: ['twilight', 'metal'], result: 'twilight-sword' },
  { ingredients: ['curse', 'metal'], result: 'cursed-sword' },
  { ingredients: ['thunder', 'metal'], result: 'god-thunder-sword' },
  { ingredients: ['glacier', 'metal'], result: 'glacier-sword' },
  { ingredients: ['plasma', 'metal'], result: 'plasma-sword' },
  { ingredients: ['blizzard', 'metal'], result: 'blizzard-sword' },
  { ingredients: ['acid', 'metal'], result: 'acid-sword' },
  { ingredients: ['sun', 'metal'], result: 'sun-sword' },
  { ingredients: ['void', 'metal'], result: 'void-sword' },
  { ingredients: ['obsidian', 'metal'], result: 'obsidian-sword' },

  // === 검 + 검 조합 (미친 검들) ===
  { ingredients: ['flame-sword', 'water-sword'], result: 'steam-explosion-sword' },
  { ingredients: ['holy-sword', 'dark-sword'], result: 'chaos-sword' },
  { ingredients: ['thunder-sword', 'lava-sword'], result: 'apocalypse-sword' },
  { ingredients: ['holy-sword', 'holy-sword'], result: 'archangel-sword' },
  { ingredients: ['ice-sword', 'flame-sword'], result: 'temperature-concept-loss-sword' },
  { ingredients: ['poison-sword', 'curse'], result: 'plague-sword' },
  { ingredients: ['lightning', 'lightning'], result: 'double-lightning' },
  { ingredients: ['thunder-sword', 'wind-sword'], result: 'hurricane-sword' },
  { ingredients: ['void-sword', 'dark-sword'], result: 'abyss-sword' },
  { ingredients: ['sun-sword', 'holy-sword'], result: 'divine-sun-sword' },

  // === 병맛 조합 시작 ===
  { ingredients: ['mud', 'metal'], result: 'dirty-sword' },
  { ingredients: ['ash', 'metal'], result: 'cigarette-ash-sword' },
  { ingredients: ['mist', 'dark'], result: 'vision-loss-sword' },
  { ingredients: ['wooden-sword', 'wooden-sword'], result: 'chopstick-sword' },
  { ingredients: ['stone-sword', 'stone-sword'], result: 'dull-sword' },

  // === 오크 시리즈 ===
  { ingredients: ['earth', 'poison'], result: 'orc' },
  { ingredients: ['orc', 'metal'], result: 'orc-sword' },
  { ingredients: ['orc', 'orc'], result: 'orc-booger' },
  { ingredients: ['orc-booger', 'metal'], result: 'orc-booger-sword' },
  { ingredients: ['orc-sword', 'holy-sword'], result: 'orc-purification-sword' },

  // === 개념 시리즈 ===
  { ingredients: ['chaos-sword', 'void-sword'], result: 'concept-loss-sword' },
  { ingredients: ['concept-loss-sword', 'concept-loss-sword'], result: 'complete-concept-loss-sword' },
  { ingredients: ['temperature-concept-loss-sword', 'void'], result: 'existence-concept-loss-sword' },

  // === 동정/순결 시리즈 (순수함의 변질) ===
  { ingredients: ['light', 'light'], result: 'purity' },
  { ingredients: ['purity', 'metal'], result: 'virgin-sword' },
  { ingredients: ['virgin-sword', 'fire'], result: 'virgin-fireball-sword' },
  { ingredients: ['virgin-fireball-sword', 'lightning'], result: 'virgin-fireball-launch-sword' },
  { ingredients: ['purity', 'dark'], result: 'corrupted-purity' },

  // === 치킨 시리즈 ===
  { ingredients: ['fire', 'wood'], result: 'chicken' },
  { ingredients: ['chicken', 'metal'], result: 'chicken-sword' },
  { ingredients: ['chicken', 'fire'], result: 'fried-chicken' },
  { ingredients: ['fried-chicken', 'metal'], result: 'hungry-chicken-sword' },
  { ingredients: ['chicken', 'ice'], result: 'frozen-chicken-sword' },

  // === 직장인 시리즈 ===
  { ingredients: ['sun', 'dark'], result: 'morning' },
  { ingredients: ['morning', 'curse'], result: 'monday-morning' },
  { ingredients: ['monday-morning', 'metal'], result: 'dont-want-work-sword' },
  { ingredients: ['dark', 'work-time'], result: 'overtime' },
  { ingredients: ['overtime', 'metal'], result: 'overtime-sword' },
  { ingredients: ['overtime', 'curse'], result: 'eternal-overtime-sword' },
  { ingredients: ['wind', 'metal'], result: 'salary' },
  { ingredients: ['salary', 'void'], result: 'salary-thief-sword' },
  { ingredients: ['salary', 'fire'], result: 'burning-salary-sword' },

  // === 편의점/라면 시리즈 ===
  { ingredients: ['water', 'fire'], result: 'hot-water' },
  { ingredients: ['hot-water', 'metal'], result: 'ramen' },
  { ingredients: ['ramen', 'metal'], result: 'ramen-cooking-sword' },
  { ingredients: ['ramen', 'curse'], result: 'instant-ramen-sword' },
  { ingredients: ['ice', 'metal'], result: 'convenience-store' },
  { ingredients: ['convenience-store', 'metal'], result: 'convenience-store-lunchbox-sword' },
  { ingredients: ['convenience-store', 'ramen'], result: 'convenience-store-king-sword' },

  // === 엄마 시리즈 ===
  { ingredients: ['light', 'earth'], result: 'mother' },
  { ingredients: ['mother', 'fire'], result: 'angry-mother' },
  { ingredients: ['angry-mother', 'metal'], result: 'scolded-by-mom-sword' },
  { ingredients: ['mother', 'metal'], result: 'mom-love-sword' },
  { ingredients: ['angry-mother', 'rolling-pin'], result: 'ultimate-fear-sword' },

  // === 게임/폰 시리즈 ===
  { ingredients: ['lightning', 'metal'], result: 'phone' },
  { ingredients: ['phone', 'fire'], result: 'hot-phone' },
  { ingredients: ['hot-phone', 'metal'], result: 'phone-battery-explosion-sword' },
  { ingredients: ['phone', 'curse'], result: 'phone-addiction-sword' },
  { ingredients: ['wind', 'lightning'], result: 'game' },
  { ingredients: ['game', 'metal'], result: 'game-sword' },
  { ingredients: ['game', 'curse'], result: 'game-addiction-sword' },

  // === 커피/음료 시리즈 ===
  { ingredients: ['water', 'dark'], result: 'coffee' },
  { ingredients: ['coffee', 'metal'], result: 'coffee-sword' },
  { ingredients: ['coffee', 'curse'], result: 'caffeine-addiction-sword' },
  { ingredients: ['coffee', 'ice'], result: 'iced-americano-sword' },
  { ingredients: ['water', 'light'], result: 'milk' },
  { ingredients: ['milk', 'metal'], result: 'milk-sword' },

  // === 전설급 조합 ===
  { ingredients: ['archangel-sword', 'light'], result: 'archangel-finger-sword' },
  { ingredients: ['divine-sun-sword', 'holy-sword'], result: 'god-sword' },
  { ingredients: ['god-sword', 'god-sword'], result: 'creation-sword' },
  { ingredients: ['abyss-sword', 'void-sword'], result: 'destruction-sword' },
  { ingredients: ['creation-sword', 'destruction-sword'], result: 'universe-sword' },

  // === 특이한 조합들 ===
  { ingredients: ['stone', 'stone'], result: 'rock' },
  { ingredients: ['rock', 'metal'], result: 'rock-sword' },
  { ingredients: ['rock', 'scissors'], result: 'paper' },
  { ingredients: ['wind', 'paper'], result: 'flying-paper-sword' },

  { ingredients: ['water', 'metal'], result: 'rust' },
  { ingredients: ['rust', 'metal'], result: 'rusty-sword' },
  { ingredients: ['rusty-sword', 'time'], result: 'ancient-rusty-sword' },

  { ingredients: ['ice', 'ice'], result: 'absolute-zero' },
  { ingredients: ['absolute-zero', 'metal'], result: 'absolute-zero-sword' },
  { ingredients: ['absolute-zero', 'void'], result: 'heat-death-sword' },

  // === 음식 시리즈 확장 ===
  { ingredients: ['fire', 'metal'], result: 'cooking' },
  { ingredients: ['cooking', 'water'], result: 'soup' },
  { ingredients: ['soup', 'metal'], result: 'soup-sword' },
  { ingredients: ['fire', 'earth'], result: 'bread' },
  { ingredients: ['bread', 'metal'], result: 'bread-sword' },
  { ingredients: ['bread', 'sword-base'], result: 'baguette-sword' },

  // === 동물 시리즈 ===
  { ingredients: ['earth', 'wind'], result: 'bird' },
  { ingredients: ['bird', 'metal'], result: 'bird-sword' },
  { ingredients: ['earth', 'water'], result: 'fish' },
  { ingredients: ['fish', 'metal'], result: 'fish-sword' },
  { ingredients: ['fire', 'earth'], result: 'dragon' },
  { ingredients: ['dragon', 'metal'], result: 'dragon-sword' },
  { ingredients: ['dragon', 'dragon'], result: 'double-dragon-sword' },

  // === 시간/공간 시리즈 ===
  { ingredients: ['void', 'void'], result: 'space' },
  { ingredients: ['space', 'metal'], result: 'space-sword' },
  { ingredients: ['light', 'dark'], result: 'time' },
  { ingredients: ['time', 'metal'], result: 'time-sword' },
  { ingredients: ['time', 'space'], result: 'spacetime' },
  { ingredients: ['spacetime', 'metal'], result: 'spacetime-sword' },

  // === 감정 시리즈 ===
  { ingredients: ['light', 'heart'], result: 'happiness' },
  { ingredients: ['happiness', 'metal'], result: 'happiness-sword' },
  { ingredients: ['dark', 'heart'], result: 'sadness' },
  { ingredients: ['sadness', 'metal'], result: 'depression-sword' },
  { ingredients: ['fire', 'heart'], result: 'anger' },
  { ingredients: ['anger', 'metal'], result: 'rage-sword' },
  { ingredients: ['ice', 'heart'], result: 'loneliness' },
  { ingredients: ['loneliness', 'metal'], result: 'loneliness-sword' },

  // === 인터넷/밈 시리즈 ===
  { ingredients: ['lightning', 'light'], result: 'wifi' },
  { ingredients: ['wifi', 'metal'], result: 'wifi-sword' },
  { ingredients: ['wifi', 'curse'], result: 'slow-wifi-sword' },
  { ingredients: ['phone', 'sadness'], result: 'low-battery' },
  { ingredients: ['low-battery', 'metal'], result: 'low-battery-panic-sword' },

  // === 계절 시리즈 ===
  { ingredients: ['sun', 'fire'], result: 'summer' },
  { ingredients: ['summer', 'metal'], result: 'hot-summer-sword' },
  { ingredients: ['ice', 'wind'], result: 'winter' },
  { ingredients: ['winter', 'metal'], result: 'cold-winter-sword' },
  { ingredients: ['wind', 'light'], result: 'spring' },
  { ingredients: ['spring', 'metal'], result: 'spring-sword' },
  { ingredients: ['wind', 'earth'], result: 'autumn' },
  { ingredients: ['autumn', 'metal'], result: 'autumn-sword' },

  // === 랜덤 병맛 조합들 ===
  { ingredients: ['void', 'metal'], result: 'nothing-sword' },
  { ingredients: ['nothing-sword', 'nothing-sword'], result: 'still-nothing-sword' },
  { ingredients: ['basic-sword', 'basic-sword'], result: 'double-basic-sword' },
  { ingredients: ['stone-sword', 'rust'], result: 'completely-useless-sword' },
  { ingredients: ['chicken', 'sword-base'], result: 'chicken-leg-sword' },
  { ingredients: ['coffee', 'overtime'], result: 'corporate-slave-sword' },
  { ingredients: ['phone', 'void'], result: 'no-signal-sword' },
  { ingredients: ['ramen', 'sadness'], result: 'lonely-ramen-sword' },
  { ingredients: ['money', 'void'], result: 'broke-sword' },

  // === 더 많은 미친 조합들 ===
  { ingredients: ['metal', 'void'], result: 'invisible-sword' },
  { ingredients: ['invisible-sword', 'light'], result: 'transparent-sword' },
  { ingredients: ['fire', 'ice'], result: 'lukewarm-sword' },
  { ingredients: ['holy-sword', 'curse'], result: 'confused-sword' },
  { ingredients: ['dragon', 'chicken'], result: 'chicken-dragon-sword' },
  { ingredients: ['universe-sword', 'void'], result: 'multiverse-sword' },
  { ingredients: ['time', 'curse'], result: 'procrastination-sword' },
  { ingredients: ['procrastination-sword', 'work-time'], result: 'deadline-panic-sword' },
];

// 특별 아이템 정의 (조합으로 만들어지는 것들)
export const SPECIAL_ITEMS: Record<string, Partial<Item>> = {
  'steam': { name: '증기', emoji: '♨️', type: 'material', rarity: 'uncommon', tags: ['steam', 'hot', 'water', 'fire'] },
  'lava': { name: '용암', emoji: '🌋', type: 'material', rarity: 'uncommon', tags: ['lava', 'hot', 'fire', 'earth'] },
  'storm': { name: '폭풍', emoji: '🌪️', type: 'material', rarity: 'uncommon', tags: ['storm', 'wind', 'water', 'chaos'] },
  'twilight': { name: '황혼', emoji: '🌆', type: 'material', rarity: 'uncommon', tags: ['twilight', 'light', 'dark', 'balance'] },
  'steel': { name: '강철', emoji: '⚔️', type: 'material', rarity: 'uncommon', tags: ['steel', 'metal', 'strong', 'sharp'] },
  'curse': { name: '저주', emoji: '💀', type: 'material', rarity: 'rare', tags: ['curse', 'dark', 'evil', 'poison'] },
  'thunder': { name: '천둥', emoji: '⛈️', type: 'material', rarity: 'uncommon', tags: ['thunder', 'light', 'lightning', 'loud'] },
  'glacier': { name: '빙하', emoji: '🏔️', type: 'material', rarity: 'uncommon', tags: ['glacier', 'ice', 'cold', 'heavy'] },
  'plasma': { name: '플라즈마', emoji: '⚡', type: 'material', rarity: 'rare', tags: ['plasma', 'fire', 'lightning', 'energy'] },
  'mud': { name: '진흙', emoji: '🟤', type: 'material', rarity: 'common', tags: ['mud', 'earth', 'water', 'dirty'] },
  'mist': { name: '안개', emoji: '🌫️', type: 'material', rarity: 'common', tags: ['mist', 'wind', 'water', 'obscure'] },
  'magma': { name: '마그마', emoji: '🔴', type: 'material', rarity: 'uncommon', tags: ['magma', 'earth', 'fire', 'hot'] },
  'ash': { name: '재', emoji: '🪔', type: 'material', rarity: 'common', tags: ['ash', 'wood', 'fire', 'gray'] },
  'electromagnet': { name: '전자석', emoji: '🧲', type: 'material', rarity: 'rare', tags: ['electromagnet', 'metal', 'lightning', 'magnetic'] },
  'blizzard': { name: '눈보라', emoji: '❄️', type: 'material', rarity: 'uncommon', tags: ['blizzard', 'ice', 'wind', 'cold'] },
  'acid': { name: '산성', emoji: '🧪', type: 'material', rarity: 'rare', tags: ['acid', 'poison', 'water', 'corrosive'] },
  'sun': { name: '태양', emoji: '☀️', type: 'material', rarity: 'epic', tags: ['sun', 'light', 'fire', 'divine'] },
  'void': { name: '공허', emoji: '⚫', type: 'material', rarity: 'epic', tags: ['void', 'dark', 'ice', 'nothing'] },
  'obsidian': { name: '흑요석', emoji: '◼️', type: 'material', rarity: 'rare', tags: ['obsidian', 'stone', 'fire', 'sharp'] },
  'shadow-metal': { name: '그림자 금속', emoji: '🗡️', type: 'material', rarity: 'rare', tags: ['shadow-metal', 'metal', 'dark', 'evil'] },

  // 기본 검들
  'basic-sword': { name: '기본 검', emoji: '🗡️', type: 'sword', rarity: 'common', tags: ['sword', 'metal', 'basic'] },
  'flame-sword': { name: '화염검', emoji: '🔥⚔️', type: 'sword', rarity: 'uncommon', tags: ['sword', 'fire', 'hot', 'burning'] },
  'water-sword': { name: '물의 검', emoji: '💧⚔️', type: 'sword', rarity: 'uncommon', tags: ['sword', 'water', 'liquid', 'flow'] },
  'earth-sword': { name: '대지의 검', emoji: '🪨⚔️', type: 'sword', rarity: 'uncommon', tags: ['sword', 'earth', 'heavy', 'solid'] },
  'wind-sword': { name: '바람의 검', emoji: '💨⚔️', type: 'sword', rarity: 'uncommon', tags: ['sword', 'wind', 'fast', 'light'] },
  'holy-sword': { name: '성검', emoji: '✨⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'light', 'holy', 'divine'] },
  'dark-sword': { name: '암흑검', emoji: '🌑⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'dark', 'evil', 'cursed'] },
  'thunder-sword': { name: '뇌검', emoji: '⚡⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'lightning', 'fast', 'electric'] },
  'ice-sword': { name: '얼음검', emoji: '🧊⚔️', type: 'sword', rarity: 'uncommon', tags: ['sword', 'ice', 'cold', 'freeze'] },
  'poison-sword': { name: '독검', emoji: '☠️⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'poison', 'toxic', 'deadly'] },
  'wooden-sword': { name: '나무검', emoji: '🪵⚔️', type: 'sword', rarity: 'common', tags: ['sword', 'wood', 'weak', 'natural'] },
  'stone-sword': { name: '돌검', emoji: '🗿⚔️', type: 'sword', rarity: 'common', tags: ['sword', 'stone', 'heavy', 'dull'] },

  // 중급 검들
  'steel-flame-sword': { name: '강철 화염검', emoji: '⚔️🔥', type: 'sword', rarity: 'rare', tags: ['sword', 'steel', 'fire', 'strong'] },
  'steam-sword': { name: '증기검', emoji: '♨️⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'steam', 'hot', 'water'] },
  'lava-sword': { name: '용암검', emoji: '🌋⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'lava', 'fire', 'earth'] },
  'storm-sword': { name: '폭풍검', emoji: '🌪️⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'storm', 'wind', 'chaos'] },
  'twilight-sword': { name: '황혼검', emoji: '🌆⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'twilight', 'balance', 'mystic'] },
  'cursed-sword': { name: '저주받은 검', emoji: '💀⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'curse', 'evil', 'dark'] },
  'god-thunder-sword': { name: '뇌신검', emoji: '⛈️⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'thunder', 'divine', 'lightning'] },
  'glacier-sword': { name: '빙하검', emoji: '🏔️⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'glacier', 'ice', 'massive'] },
  'plasma-sword': { name: '플라즈마 검', emoji: '⚡⚔️', type: 'sword', rarity: 'legendary', tags: ['sword', 'plasma', 'energy', 'modern'] },
  'blizzard-sword': { name: '눈보라 검', emoji: '❄️⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'blizzard', 'ice', 'wind'] },
  'acid-sword': { name: '산성검', emoji: '🧪⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'acid', 'corrosive', 'poison'] },
  'sun-sword': { name: '태양검', emoji: '☀️⚔️', type: 'sword', rarity: 'legendary', tags: ['sword', 'sun', 'light', 'divine'] },
  'void-sword': { name: '공허의 검', emoji: '⚫⚔️', type: 'sword', rarity: 'legendary', tags: ['sword', 'void', 'nothing', 'dark'] },
  'obsidian-sword': { name: '흑요석 검', emoji: '◼️⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'obsidian', 'sharp', 'black'] },

  // 고급 조합 검들
  'steam-explosion-sword': { name: '증기 폭발검', emoji: '💥♨️', type: 'sword', rarity: 'epic', tags: ['sword', 'steam', 'explosion', 'fire', 'water'] },
  'chaos-sword': { name: '카오스 검', emoji: '🌀⚔️', type: 'sword', rarity: 'legendary', tags: ['sword', 'chaos', 'light', 'dark', 'balance'] },
  'apocalypse-sword': { name: '천재지변검', emoji: '🌩️🌋', type: 'sword', rarity: 'legendary', tags: ['sword', 'apocalypse', 'thunder', 'lava', 'destruction'] },
  'archangel-sword': { name: '대천사검', emoji: '👼⚔️', type: 'sword', rarity: 'legendary', tags: ['sword', 'archangel', 'holy', 'divine', 'heaven'] },
  'temperature-concept-loss-sword': { name: '온도개념상실검', emoji: '🔥🧊⚔️', type: 'sword', rarity: 'mythic', tags: ['sword', 'concept-loss', 'ice', 'fire', 'paradox'] },
  'plague-sword': { name: '역병검', emoji: '☠️⚔️', type: 'sword', rarity: 'legendary', tags: ['sword', 'plague', 'poison', 'curse', 'death'] },
  'hurricane-sword': { name: '허리케인 검', emoji: '🌀⚔️', type: 'sword', rarity: 'legendary', tags: ['sword', 'hurricane', 'thunder', 'wind', 'storm'] },
  'abyss-sword': { name: '심연검', emoji: '🕳️⚔️', type: 'sword', rarity: 'mythic', tags: ['sword', 'abyss', 'void', 'dark', 'deep'] },
  'divine-sun-sword': { name: '신성 태양검', emoji: '☀️✨⚔️', type: 'sword', rarity: 'mythic', tags: ['sword', 'divine', 'sun', 'holy', 'ultimate'] },

  // 병맛 시리즈
  'dirty-sword': { name: '더러운 검', emoji: '🟤⚔️', type: 'sword', rarity: 'common', tags: ['sword', 'dirty', 'mud', 'gross'], description: '진흙 묻은 검... 씻어야 하는데' },
  'cigarette-ash-sword': { name: '담배재검', emoji: '🚬⚔️', type: 'sword', rarity: 'uncommon', tags: ['sword', 'ash', 'gray', 'smoke'], description: '흡연은 건강에 해롭습니다' },
  'vision-loss-sword': { name: '시야상실검', emoji: '🌫️⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'mist', 'dark', 'blind'], description: '앞이 안 보여요...' },
  'chopstick-sword': { name: '젓가락검', emoji: '🥢', type: 'sword', rarity: 'uncommon', tags: ['sword', 'wood', 'weak', 'food'], description: '밥먹을 때 쓰는 검' },
  'dull-sword': { name: '무딘검', emoji: '🗿⚔️', type: 'sword', rarity: 'common', tags: ['sword', 'dull', 'useless', 'stone'], description: '베어지지 않는다...' },

  // 오크 시리즈
  'orc': { name: '오크', emoji: '👹', type: 'material', rarity: 'uncommon', tags: ['orc', 'monster', 'ugly', 'green'] },
  'orc-sword': { name: '오크검', emoji: '👹⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'orc', 'brutal', 'green'], description: '오크가 쓰던 검' },
  'orc-booger': { name: '오크 코딱지', emoji: '👹👃', type: 'material', rarity: 'rare', tags: ['orc', 'booger', 'gross', 'green'], description: '으악 더러워!' },
  'orc-booger-sword': { name: '오크코딱지검', emoji: '👹👃⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'orc', 'booger', 'gross', 'disgusting'], description: '전설의 역겨운 검...' },
  'orc-purification-sword': { name: '오크 정화검', emoji: '👹✨⚔️', type: 'sword', rarity: 'legendary', tags: ['sword', 'orc', 'holy', 'purification'], description: '오크를 정화시킨 성스러운 검' },

  // 개념 시리즈
  'concept-loss-sword': { name: '개념상실검', emoji: '🌀⚔️', type: 'sword', rarity: 'mythic', tags: ['sword', 'concept-loss', 'chaos', 'void', 'crazy'], description: '이 검을 휘두르면 개념이 사라진다' },
  'complete-concept-loss-sword': { name: '완전개념상실검', emoji: '🌀🌀⚔️', type: 'sword', rarity: 'mythic', tags: ['sword', 'concept-loss', 'complete', 'insane'], description: '아무것도 이해할 수 없다...' },
  'existence-concept-loss-sword': { name: '존재개념상실검', emoji: '❓⚔️', type: 'sword', rarity: 'mythic', tags: ['sword', 'concept-loss', 'existence', 'void'], description: '이게... 검인가...?' },

  // 순결 시리즈
  'purity': { name: '순수함', emoji: '🤍', type: 'material', rarity: 'rare', tags: ['purity', 'light', 'pure', 'innocent'] },
  'virgin-sword': { name: '순결검', emoji: '🤍⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'virgin', 'pure', 'innocent'], description: '순수한 자만이 쓸 수 있다' },
  'virgin-fireball-sword': { name: '동정파이어볼검', emoji: '🔥🤍⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'virgin', 'fireball', 'magic'], description: '순결한 마법사의 검' },
  'virgin-fireball-launch-sword': { name: '동정파이어볼발사검', emoji: '🔥🤍💥', type: 'sword', rarity: 'legendary', tags: ['sword', 'virgin', 'fireball', 'launch', 'magic'], description: '30살까지 지키면 마법사가 된다더니...' },
  'corrupted-purity': { name: '타락한 순수함', emoji: '🖤', type: 'material', rarity: 'epic', tags: ['corrupted', 'purity', 'dark', 'fallen'] },

  // 치킨 시리즈
  'chicken': { name: '닭', emoji: '🐔', type: 'material', rarity: 'uncommon', tags: ['chicken', 'bird', 'food', 'delicious'] },
  'chicken-sword': { name: '치킨검', emoji: '🐔⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'chicken', 'food', 'hungry'], description: '치킨이 먹고 싶어지는 검' },
  'fried-chicken': { name: '치킨', emoji: '🍗', type: 'material', rarity: 'rare', tags: ['chicken', 'fried', 'food', 'delicious'] },
  'hungry-chicken-sword': { name: '치킨먹고싶은검', emoji: '🍗⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'chicken', 'hungry', 'craving'], description: '이 검을 보면 치킨이 먹고 싶어진다' },
  'frozen-chicken-sword': { name: '냉동치킨검', emoji: '🧊🐔⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'chicken', 'frozen', 'cold'], description: '해동이 필요합니다' },

  // 직장인 시리즈
  'morning': { name: '아침', emoji: '🌅', type: 'material', rarity: 'common', tags: ['morning', 'sun', 'dawn', 'wake'] },
  'monday-morning': { name: '월요일 아침', emoji: '😰🌅', type: 'material', rarity: 'rare', tags: ['monday', 'morning', 'curse', 'terrible'] },
  'dont-want-work-sword': { name: '출근하기싫은검', emoji: '😭⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'work', 'monday', 'hate'], description: '모든 직장인의 마음' },
  'work-time': { name: '근무시간', emoji: '⏰', type: 'material', rarity: 'common', tags: ['work', 'time', 'job'] },
  'overtime': { name: '야근', emoji: '🌙⏰', type: 'material', rarity: 'rare', tags: ['overtime', 'work', 'night', 'tired'] },
  'overtime-sword': { name: '야근검', emoji: '🌙⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'overtime', 'tired', 'work'], description: '칼퇴는 없다...' },
  'eternal-overtime-sword': { name: '영원한야근검', emoji: '🌙💀⚔️', type: 'sword', rarity: 'legendary', tags: ['sword', 'overtime', 'eternal', 'curse'], description: '퇴근이 뭔가요?' },
  'salary': { name: '월급', emoji: '💰', type: 'material', rarity: 'rare', tags: ['salary', 'money', 'work', 'payment'] },
  'salary-thief-sword': { name: '월급루팡검', emoji: '💰🦹⚔️', type: 'sword', rarity: 'legendary', tags: ['sword', 'salary', 'thief', 'lazy'], description: '일은 안 하고 월급만 챙기는 검' },
  'burning-salary-sword': { name: '월급불태우는검', emoji: '💰🔥⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'salary', 'burning', 'waste'], description: '쓸데없는 곳에 돈을 쓴다...' },

  // 편의점/라면 시리즈
  'hot-water': { name: '뜨거운 물', emoji: '♨️💧', type: 'material', rarity: 'common', tags: ['hot-water', 'water', 'hot'] },
  'ramen': { name: '라면', emoji: '🍜', type: 'material', rarity: 'uncommon', tags: ['ramen', 'food', 'instant', 'noodle'] },
  'ramen-cooking-sword': { name: '라면끓이는검', emoji: '🍜⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'ramen', 'cooking', 'food'], description: '이 검으로 라면을 끓인다' },
  'instant-ramen-sword': { name: '즉석라면검', emoji: '🍜💨⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'ramen', 'instant', 'fast'], description: '3분이면 완성' },
  'convenience-store': { name: '편의점', emoji: '🏪', type: 'material', rarity: 'uncommon', tags: ['convenience-store', 'shop', 'food'] },
  'convenience-store-lunchbox-sword': { name: '편의점도시락검', emoji: '🏪🍱⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'convenience-store', 'lunchbox', 'food'], description: '혼자 먹는 점심... 슬프다...' },
  'convenience-store-king-sword': { name: '편의점왕검', emoji: '🏪👑⚔️', type: 'sword', rarity: 'legendary', tags: ['sword', 'convenience-store', 'king', 'ultimate'], description: '편의점 단골 인증' },

  // 엄마 시리즈
  'mother': { name: '엄마', emoji: '👩', type: 'material', rarity: 'epic', tags: ['mother', 'love', 'family', 'care'] },
  'angry-mother': { name: '화난 엄마', emoji: '😠👩', type: 'material', rarity: 'legendary', tags: ['mother', 'angry', 'scary', 'danger'] },
  'scolded-by-mom-sword': { name: '엄마한테혼나는검', emoji: '😭👩⚔️', type: 'sword', rarity: 'legendary', tags: ['sword', 'mother', 'scolded', 'fear'], description: '게임 그만하고 공부해!' },
  'mom-love-sword': { name: '엄마사랑검', emoji: '❤️👩⚔️', type: 'sword', rarity: 'legendary', tags: ['sword', 'mother', 'love', 'warm'], description: '엄마 사랑해요' },
  'rolling-pin': { name: '밀대', emoji: '🥖', type: 'material', rarity: 'rare', tags: ['rolling-pin', 'kitchen', 'weapon'] },
  'ultimate-fear-sword': { name: '궁극공포검', emoji: '😱👩🥖', type: 'sword', rarity: 'mythic', tags: ['sword', 'mother', 'rolling-pin', 'ultimate-fear'], description: '밀대를 든 엄마의 공포...' },

  // 게임/폰 시리즈
  'phone': { name: '핸드폰', emoji: '📱', type: 'material', rarity: 'uncommon', tags: ['phone', 'device', 'modern'] },
  'hot-phone': { name: '뜨거운 폰', emoji: '🔥📱', type: 'material', rarity: 'rare', tags: ['phone', 'hot', 'danger'] },
  'phone-battery-explosion-sword': { name: '폰배터리폭발검', emoji: '💥📱⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'phone', 'battery', 'explosion'], description: '배터리 주의!' },
  'phone-addiction-sword': { name: '핸드폰중독검', emoji: '📱😵⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'phone', 'addiction', 'curse'], description: '핸드폰을 손에서 놓을 수 없다...' },
  'game': { name: '게임', emoji: '🎮', type: 'material', rarity: 'uncommon', tags: ['game', 'fun', 'entertainment'] },
  'game-sword': { name: '게임검', emoji: '🎮⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'game', 'fun', 'entertainment'], description: '게임은 재미있어!' },
  'game-addiction-sword': { name: '게임중독검', emoji: '🎮😵⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'game', 'addiction', 'curse'], description: '한 판만 더...' },

  // 커피 시리즈
  'coffee': { name: '커피', emoji: '☕', type: 'material', rarity: 'uncommon', tags: ['coffee', 'drink', 'caffeine'] },
  'coffee-sword': { name: '커피검', emoji: '☕⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'coffee', 'caffeine', 'energy'], description: '커피 한 잔의 여유' },
  'caffeine-addiction-sword': { name: '카페인중독검', emoji: '☕😵⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'coffee', 'addiction', 'caffeine'], description: '커피 없이는 못 살아...' },
  'iced-americano-sword': { name: '아아검', emoji: '🧊☕⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'coffee', 'ice', 'drink'], description: '아이스 아메리카노의 힘!' },
  'milk': { name: '우유', emoji: '🥛', type: 'material', rarity: 'common', tags: ['milk', 'drink', 'white'] },
  'milk-sword': { name: '우유검', emoji: '🥛⚔️', type: 'sword', rarity: 'uncommon', tags: ['sword', 'milk', 'healthy', 'calcium'], description: '뼈가 튼튼해진다' },

  // 전설급
  'archangel-finger-sword': { name: '대천사손가락검', emoji: '👼👆⚔️', type: 'sword', rarity: 'mythic', tags: ['sword', 'archangel', 'finger', 'divine', 'holy'], description: '대천사가 손가락으로 가리키는 검...' },
  'god-sword': { name: '신의 검', emoji: '⚔️✨', type: 'sword', rarity: 'mythic', tags: ['sword', 'god', 'divine', 'ultimate'], description: '신이 내린 검' },
  'creation-sword': { name: '창조의 검', emoji: '🌟⚔️', type: 'sword', rarity: 'mythic', tags: ['sword', 'creation', 'genesis', 'ultimate'], description: '세상을 창조하는 검' },
  'destruction-sword': { name: '파괴의 검', emoji: '💥⚔️', type: 'sword', rarity: 'mythic', tags: ['sword', 'destruction', 'apocalypse', 'ultimate'], description: '세상을 파괴하는 검' },
  'universe-sword': { name: '우주검', emoji: '🌌⚔️', type: 'sword', rarity: 'mythic', tags: ['sword', 'universe', 'cosmos', 'ultimate'], description: '우주의 힘을 담은 검' },

  // 기타 특이한 것들
  'rock': { name: '바위', emoji: '🪨', type: 'material', rarity: 'common', tags: ['rock', 'stone', 'heavy'] },
  'rock-sword': { name: '바위검', emoji: '🪨⚔️', type: 'sword', rarity: 'uncommon', tags: ['sword', 'rock', 'heavy', 'blunt'] },
  'scissors': { name: '가위', emoji: '✂️', type: 'material', rarity: 'common', tags: ['scissors', 'sharp', 'cut'] },
  'paper': { name: '종이', emoji: '📄', type: 'material', rarity: 'common', tags: ['paper', 'weak', 'light'] },
  'flying-paper-sword': { name: '날아가는종이검', emoji: '📄💨⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'paper', 'flying', 'weak'], description: '바람에 날아간다...' },

  'rust': { name: '녹', emoji: '🟫', type: 'material', rarity: 'common', tags: ['rust', 'corroded', 'old'] },
  'rusty-sword': { name: '녹슨 검', emoji: '🟫⚔️', type: 'sword', rarity: 'common', tags: ['sword', 'rusty', 'old', 'weak'], description: '관리를 안 했나...' },
  'ancient-rusty-sword': { name: '고대녹슨검', emoji: '🏛️🟫⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'ancient', 'rusty', 'old'], description: '오래되어 녹슬었지만 역사가 깃든 검' },

  'absolute-zero': { name: '절대영도', emoji: '❄️⚫', type: 'material', rarity: 'legendary', tags: ['absolute-zero', 'ice', 'cold', 'ultimate'] },
  'absolute-zero-sword': { name: '절대영도검', emoji: '❄️⚫⚔️', type: 'sword', rarity: 'mythic', tags: ['sword', 'absolute-zero', 'ice', 'ultimate'], description: '모든 것을 얼려버린다' },
  'heat-death-sword': { name: '열사검', emoji: '🌡️💀⚔️', type: 'sword', rarity: 'mythic', tags: ['sword', 'heat-death', 'universe', 'end'], description: '우주의 열사를 담은 검' },

  // 음식 시리즈
  'cooking': { name: '요리', emoji: '🍳', type: 'material', rarity: 'common', tags: ['cooking', 'food', 'kitchen'] },
  'soup': { name: '국', emoji: '🍲', type: 'material', rarity: 'common', tags: ['soup', 'food', 'hot'] },
  'soup-sword': { name: '국검', emoji: '🍲⚔️', type: 'sword', rarity: 'uncommon', tags: ['sword', 'soup', 'food', 'liquid'], description: '국물이 흐르는 검...' },
  'bread': { name: '빵', emoji: '🍞', type: 'material', rarity: 'common', tags: ['bread', 'food', 'soft'] },
  'bread-sword': { name: '빵검', emoji: '🍞⚔️', type: 'sword', rarity: 'uncommon', tags: ['sword', 'bread', 'food', 'soft'], description: '말랑말랑한 검' },
  'baguette-sword': { name: '바게트검', emoji: '🥖⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'baguette', 'bread', 'hard'], description: '딱딱한 빵은 무기가 된다' },

  // 동물 시리즈
  'bird': { name: '새', emoji: '🐦', type: 'material', rarity: 'common', tags: ['bird', 'fly', 'animal'] },
  'bird-sword': { name: '새검', emoji: '🐦⚔️', type: 'sword', rarity: 'uncommon', tags: ['sword', 'bird', 'fly', 'light'], description: '날아가는 검' },
  'fish': { name: '물고기', emoji: '🐟', type: 'material', rarity: 'common', tags: ['fish', 'water', 'animal'] },
  'fish-sword': { name: '물고기검', emoji: '🐟⚔️', type: 'sword', rarity: 'uncommon', tags: ['sword', 'fish', 'water', 'slippery'], description: '미끄러운 검' },
  'dragon': { name: '드래곤', emoji: '🐉', type: 'material', rarity: 'legendary', tags: ['dragon', 'mythical', 'powerful'] },
  'dragon-sword': { name: '드래곤 검', emoji: '🐉⚔️', type: 'sword', rarity: 'legendary', tags: ['sword', 'dragon', 'powerful', 'mythical'], description: '드래곤의 힘이 깃든 검' },
  'double-dragon-sword': { name: '쌍룡검', emoji: '🐉🐉⚔️', type: 'sword', rarity: 'mythic', tags: ['sword', 'dragon', 'double', 'ultimate'], description: '두 마리의 드래곤이 깃든 검' },

  // 시간/공간
  'space': { name: '우주', emoji: '🌌', type: 'material', rarity: 'legendary', tags: ['space', 'void', 'cosmos'] },
  'space-sword': { name: '우주검', emoji: '🌌⚔️', type: 'sword', rarity: 'mythic', tags: ['sword', 'space', 'cosmos', 'ultimate'], description: '우주의 힘' },
  'time': { name: '시간', emoji: '⏰', type: 'material', rarity: 'legendary', tags: ['time', 'temporal', 'flow'] },
  'time-sword': { name: '시간검', emoji: '⏰⚔️', type: 'sword', rarity: 'mythic', tags: ['sword', 'time', 'temporal', 'ultimate'], description: '시간을 조종하는 검' },
  'spacetime': { name: '시공간', emoji: '🌌⏰', type: 'material', rarity: 'mythic', tags: ['spacetime', 'ultimate', 'physics'] },
  'spacetime-sword': { name: '시공검', emoji: '🌌⏰⚔️', type: 'sword', rarity: 'mythic', tags: ['sword', 'spacetime', 'ultimate', 'reality'], description: '시공간을 초월하는 검' },

  // 감정
  'heart': { name: '마음', emoji: '💗', type: 'material', rarity: 'uncommon', tags: ['heart', 'emotion', 'feeling'] },
  'happiness': { name: '행복', emoji: '😊', type: 'material', rarity: 'rare', tags: ['happiness', 'joy', 'emotion'] },
  'happiness-sword': { name: '행복검', emoji: '😊⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'happiness', 'joy', 'emotion'], description: '행복한 기분이 드는 검' },
  'sadness': { name: '슬픔', emoji: '😢', type: 'material', rarity: 'rare', tags: ['sadness', 'sorrow', 'emotion'] },
  'depression-sword': { name: '우울검', emoji: '😢⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'depression', 'sadness', 'dark'], description: '우울해지는 검...' },
  'anger': { name: '분노', emoji: '😠', type: 'material', rarity: 'rare', tags: ['anger', 'rage', 'emotion'] },
  'rage-sword': { name: '분노검', emoji: '😠⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'rage', 'anger', 'fire'], description: '화가 나는 검' },
  'loneliness': { name: '외로움', emoji: '😔', type: 'material', rarity: 'rare', tags: ['loneliness', 'alone', 'sad'] },
  'loneliness-sword': { name: '외로움검', emoji: '😔⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'loneliness', 'alone', 'sad'], description: '혼자인 것 같은 검...' },

  // 인터넷/밈
  'wifi': { name: 'WiFi', emoji: '📶', type: 'material', rarity: 'uncommon', tags: ['wifi', 'internet', 'modern'] },
  'wifi-sword': { name: 'WiFi검', emoji: '📶⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'wifi', 'internet', 'modern'], description: '인터넷 연결 필수' },
  'slow-wifi-sword': { name: '느린WiFi검', emoji: '📶🐌⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'wifi', 'slow', 'frustrating'], description: '로딩중... (99%)' },
  'low-battery': { name: '저배터리', emoji: '🪫', type: 'material', rarity: 'uncommon', tags: ['battery', 'low', 'danger'] },
  'low-battery-panic-sword': { name: '저배터리패닉검', emoji: '🪫😰⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'battery', 'panic', 'fear'], description: '배터리 1%의 공포!' },

  // 계절
  'summer': { name: '여름', emoji: '☀️🏖️', type: 'material', rarity: 'uncommon', tags: ['summer', 'hot', 'season'] },
  'hot-summer-sword': { name: '더운여름검', emoji: '☀️😰⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'summer', 'hot', 'sweat'], description: '너무 더워...' },
  'winter': { name: '겨울', emoji: '❄️⛄', type: 'material', rarity: 'uncommon', tags: ['winter', 'cold', 'season'] },
  'cold-winter-sword': { name: '추운겨울검', emoji: '❄️🥶⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'winter', 'cold', 'freeze'], description: '너무 추워...' },
  'spring': { name: '봄', emoji: '🌸', type: 'material', rarity: 'uncommon', tags: ['spring', 'flower', 'season'] },
  'spring-sword': { name: '봄검', emoji: '🌸⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'spring', 'flower', 'beautiful'], description: '꽃이 피는 검' },
  'autumn': { name: '가을', emoji: '🍂', type: 'material', rarity: 'uncommon', tags: ['autumn', 'fall', 'season'] },
  'autumn-sword': { name: '가을검', emoji: '🍂⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'autumn', 'fall', 'beautiful'], description: '낙엽이 지는 검' },

  // 랜덤 병맛
  'nothing-sword': { name: '무(無)검', emoji: '⚫⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'nothing', 'void', 'empty'], description: '아무것도 아닌 검' },
  'still-nothing-sword': { name: '여전히무검', emoji: '⚫⚫⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'nothing', 'still', 'void'], description: '합쳐도 여전히 아무것도 아님' },
  'double-basic-sword': { name: '더블기본검', emoji: '🗡️🗡️', type: 'sword', rarity: 'uncommon', tags: ['sword', 'basic', 'double'], description: '기본 두 배!' },
  'completely-useless-sword': { name: '완전쓸모없는검', emoji: '🗑️⚔️', type: 'sword', rarity: 'common', tags: ['sword', 'useless', 'trash', 'worthless'], description: '진짜 쓸모없다...' },
  'chicken-leg-sword': { name: '치킨다리검', emoji: '🍗⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'chicken', 'leg', 'food'], description: '먹을 수도, 싸울 수도 있다' },
  'corporate-slave-sword': { name: '사축검', emoji: '💼😭⚔️', type: 'sword', rarity: 'legendary', tags: ['sword', 'corporate', 'slave', 'work'], description: '회사의 노예...' },
  'no-signal-sword': { name: '노시그널검', emoji: '📵⚔️', type: 'sword', rarity: 'rare', tags: ['sword', 'no-signal', 'offline', 'isolated'], description: '신호가 안 잡혀...' },
  'lonely-ramen-sword': { name: '혼밥라면검', emoji: '🍜😔⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'ramen', 'lonely', 'sad'], description: '혼자 먹는 라면의 슬픔...' },
  'money': { name: '돈', emoji: '💵', type: 'material', rarity: 'rare', tags: ['money', 'cash', 'wealth'] },
  'broke-sword': { name: '빈털터리검', emoji: '💸⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'broke', 'poor', 'empty'], description: '통장 잔고 0원...' },

  // 더 많은 미친 조합
  'invisible-sword': { name: '투명검', emoji: '👻⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'invisible', 'void', 'transparent'], description: '보이지 않는 검' },
  'transparent-sword': { name: '투명한검', emoji: '💎⚔️', type: 'sword', rarity: 'legendary', tags: ['sword', 'transparent', 'clear', 'invisible'], description: '완전히 투명한 검' },
  'lukewarm-sword': { name: '미지근한검', emoji: '🌡️⚔️', type: 'sword', rarity: 'uncommon', tags: ['sword', 'lukewarm', 'temperature', 'mediocre'], description: '뜨겁지도 차갑지도 않은...' },
  'confused-sword': { name: '혼란검', emoji: '😵⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'confused', 'chaos', 'mixed'], description: '이게 선인지 악인지 모르겠다' },
  'chicken-dragon-sword': { name: '치킨드래곤검', emoji: '🐔🐉⚔️', type: 'sword', rarity: 'legendary', tags: ['sword', 'chicken', 'dragon', 'fusion'], description: '드래곤인가 치킨인가...' },
  'multiverse-sword': { name: '멀티버스검', emoji: '🌌∞⚔️', type: 'sword', rarity: 'mythic', tags: ['sword', 'multiverse', 'ultimate', 'infinite'], description: '무한한 우주의 검' },
  'procrastination-sword': { name: '미루기검', emoji: '⏰😴⚔️', type: 'sword', rarity: 'epic', tags: ['sword', 'procrastination', 'lazy', 'time'], description: '내일 하면 되지 뭐...' },
  'deadline-panic-sword': { name: '마감패닉검', emoji: '⏰😱⚔️', type: 'sword', rarity: 'legendary', tags: ['sword', 'deadline', 'panic', 'work'], description: '마감 5분 전의 공포!' },
  'double-lightning': { name: '이중번개', emoji: '⚡⚡', type: 'material', rarity: 'rare', tags: ['lightning', 'double', 'electric', 'power'] },
  'sword-base': { name: '검 기본형', emoji: '⚔️', type: 'material', rarity: 'common', tags: ['sword', 'base', 'weapon'] },
};
