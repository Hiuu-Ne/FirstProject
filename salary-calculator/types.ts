export enum Category {
  ALL = "전체",
  LIVING = "생필품",
  ELECTRONICS = "전자기기",
  FASHION = "패션/뷰티",
  EXPERIENCE = "체험/구독",
  REAL_ESTATE = "부동산/차량",
  PEOPLE = "인물/직업",
  EXTREME = "극단적 비교",
}

export interface Item {
  name: string;
  price: number;
  emoji: string;
  category: Category;
  unit?: string;
  messages: {
    under001: string[];
    under1: string[];
    under5: string[];
    under100: string[];
    over100: string[];
    over1000: string[];
  };
}