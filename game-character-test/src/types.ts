export interface Question {
  id: number;
  question: string;
  options: Answer[];
}

export interface Answer {
  text: string;
  scores: {
    main: number;      // 주인공력 (-2 to +2)
    social: number;    // 사회성 (-2 to +2)
    chaos: number;     // 혼돈 지수 (-2 to +2)
  };
}

export interface CharacterResult {
  job: string;        // 직업 (전사, 마법사, 도적 등)
  adjective: string;  // 형용사 (불같은, 냉철한, 뻔뻔한 등)
  level: number;      // 레벨 (1-99)
  stats: {
    main: number;     // 주인공력 스탯
    social: number;   // 사회성 스탯
    chaos: number;    // 혼돈 스탯
  };
  description: string; // 캐릭터 설명
  shareText: string;   // 공유용 텍스트
}
