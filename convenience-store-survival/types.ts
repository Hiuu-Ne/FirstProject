export type ItemCategory =
  | 'riceball'    // 삼각김밥
  | 'ramen'       // 라면
  | 'lunchbox'    // 도시락
  | 'snack'       // 과자
  | 'bread'       // 빵
  | 'dairy'       // 유제품
  | 'canned'      // 통조림
  | 'fruit'       // 과일
  | 'candy'       // 사탕/초콜릿
  | 'drink'       // 음료
  | 'alcohol'     // 주류
  | 'supplement'  // 건강식품
  | 'misc';       // 잡화

export interface Item {
  id: string;
  name: string;
  category: ItemCategory;
  emoji: string;

  // 영양 정보 (100g당 또는 1개당)
  calories: number;      // 칼로리 (kcal)
  protein: number;       // 단백질 (g)
  sodium: number;        // 나트륨 (mg)
  sugar: number;         // 당분 (g)
  vitaminC: number;      // 비타민C (mg)
  fiber: number;         // 식이섬유 (g)
  caffeine?: number;     // 카페인 (mg)
  alcohol?: number;      // 알코올 (%)

  // 특수 속성
  expiryDays?: number;   // 유통기한 (일)
  isTrap?: boolean;      // 함정 아이템 여부
  trapEffect?: TrapEffect;

  description?: string;  // 설명
}

export interface TrapEffect {
  type: 'instant_death' | 'penalty' | 'bonus';
  days: number;          // 생존일 증감
  message: string;       // 결과 메시지
}

export interface SelectedItem {
  item: Item;
  quantity: number;
}

export interface NutritionSummary {
  totalCalories: number;
  totalProtein: number;
  totalSodium: number;
  totalSugar: number;
  totalVitaminC: number;
  totalFiber: number;
  totalCaffeine: number;
  totalAlcohol: number;
}

export interface SurvivalResult {
  baseDays: number;           // 기본 생존 일수
  nutritionScore: number;     // 영양 점수 (0-100)
  nutritionBonus: number;     // 영양 보너스 (%)
  trapPenalty: number;        // 함정 페널티 (일)
  finalDays: number;          // 최종 생존 일수
  finalHours: number;         // 최종 생존 시간
  deathReason: string;        // 사망 원인
  grade: string;              // 등급
  gradeEmoji: string;         // 등급 이모지
  evaluation: string;         // 평가
  specialTitle?: string;      // 특수 칭호
  rank: number;               // 상위 %
}
