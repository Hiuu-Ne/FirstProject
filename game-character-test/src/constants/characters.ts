// 직업 목록 - 주인공력 기반
export const JOBS = {
  veryHigh: ['전설의 용사', '선택받은 자', '세계의 구원자', '운명의 주인공'],
  high: ['용감한 전사', '현명한 마법사', '민첩한 도적', '카리스마 리더'],
  medium: ['모험가', '탐험가', '상인', '장인'],
  low: ['마을 주민 A', '떠돌이 방랑자', '무직 백수', '평범한 농부'],
  veryLow: ['NPC', '튜토리얼 희생자', '몹 A', '배경 엑스트라']
};

// 형용사 - 사회성 + 혼돈 조합
export const ADJECTIVES = {
  // 높은 사회성 + 낮은 혼돈
  socialOrderly: ['친절한', '따뜻한', '모범적인', '믿음직한', '성실한'],

  // 높은 사회성 + 높은 혼돈
  socialChaotic: ['텐션 높은', '랜덤한', '4차원', '예측불가', '자유로운'],

  // 낮은 사회성 + 낮은 혼돈
  lonelyOrderly: ['냉정한', '과묵한', '신중한', '고독한', '철학적인'],

  // 낮은 사회성 + 높은 혼돈
  lonelyChaotic: ['병맛', '뻔뻔한', '제멋대로인', '또라이', '민폐']
};

// 캐릭터 설명 템플릿
export const DESCRIPTIONS = {
  veryHigh: [
    "전설 속에서나 나올법한 완벽한 주인공상! 당신이 있는 곳이 곧 메인 스토리입니다 🌟",
    "모두가 당신을 따르고, 세상은 당신을 중심으로 돌아갑니다. 주인공 체질 인증 완료 👑",
    "당신의 인생이 곧 영화. 그것도 블록버스터급! 주연은 당연히 당신 ⭐",
  ],
  high: [
    "왠지 모를 주인공 기운이 솔솔~ 당신 주변에선 항상 뭔가 일어나죠? 🔥",
    "평범한 듯하지만 결정적 순간에는 빛나는 타입! 히든 주인공 인증 ✨",
    "친구들 사이에서 은근 중심 역할 하는 거 티 남 ㅋㅋ 인싸력 충전 완료! 🎯",
  ],
  medium: [
    "딱 조연 포지션! 가끔 주인공 도와주고 분량 챙기는 맛으로 사는 인생 😎",
    "평범하지만 그게 또 매력이에요~ 주인공 옆에서 빛나는 타입! 🌙",
    "메인은 아니어도 나름 개성 있는 캐릭터! 서브 스토리 주인공감? 🎭",
  ],
  low: [
    "주인공 지나갈 때 '어? 저 사람 누구야?' 하는 역할... 하지만 그것도 중요해요! 🙃",
    "배경 인물인 줄 알았는데 의외로 스토리에 한 번쯤 등장! 그정도면 됐죠 뭐 ㅋㅋ 😅",
    "NPC 레벨까진 아니고... 그냥 평범하게 살래요 별 탈 없이... 🍃",
  ],
  veryLow: [
    "완전 NPC... 주인공이 대화 걸어도 같은 대사만 반복할 것 같아요 ㅋㅋㅋ 🤖",
    "게임 시작하고 5분 안에 죽는 튜토리얼 캐릭터 느낌 ㅠㅠ 부활 가능? 💀",
    "당신의 존재감... 투명 망토 쓴 거 아니에요? 진짜 안 보임 👻",
  ]
};

// 사회성 관련 코멘트
export const SOCIAL_COMMENTS = {
  veryHigh: [
    "개인싸! 단톡방 분위기 메이커 인증 ✨",
    "혼자 놀 수가 없는 타입 ㅋㅋ 친구가 곧 생명줄 💕",
  ],
  high: [
    "은근 인싸력 있음! 친구들이 꽤 챙겨주는 편 😊",
    "필요할 때 연락할 사람 있는 거 보면 성공한 인생 아닐까요? 🎉",
  ],
  medium: [
    "딱 적당한 사회생활! 너무 안 튀고 너무 묻히지도 않고 👌",
    "필요할 때만 사람 만나는 현대인의 정석 ㅋㅋ 🏙️",
  ],
  low: [
    "혼자가 편한 타입... 사람은 피곤해요 진짜 😑",
    "친구 3명만 있으면 됨! 양보단 질! (이라 쓰고 귀차니즘) 🤷",
  ],
  veryLow: [
    "완전 아싸 인증... 혼밥 혼술 혼영 올클 각 😭",
    "단톡방에서 혼자만 읽씹당하는 거 실화냐고 ㅋㅋㅋ 💔",
  ]
};

// 혼돈 관련 코멘트
export const CHAOS_COMMENTS = {
  veryHigh: [
    "완전 랜덤박스 인간 ㅋㅋㅋ 무슨 짓 할지 본인도 모름 🎲",
    "예측 불가 인생! 오늘 기분에 따라 내일이 바뀜 🌪️",
  ],
  high: [
    "가끔 친구들 놀라게 하는 행동 하는 거 인정? ㅋㅋ 🎪",
    "4차원 매력 있다는 소리 들어봤죠? 맞죠? 🪐",
  ],
  medium: [
    "딱 적당히 재미있는 사람! 심심하진 않음 ㅎㅎ 🎨",
    "가끔 장난 치지만 선은 지킴! 이게 진짜 어른 👔",
  ],
  low: [
    "안정적인 삶을 추구하는 스타일! 계획대로 되는 게 최고죠 📋",
    "변수는 싫어요... 예상 가능한 인생이 좋아요... 🗺️",
  ],
  veryLow: [
    "혼돈의 반대편에 서 있는 질서의 화신! 규칙 지킴이 인증 📏",
    "계획표 없이는 못 사는 타입... 즉흥이 제일 무서움 ㅠㅠ 📅",
  ]
};

export function getJobByScore(mainScore: number): string {
  if (mainScore >= 15) return JOBS.veryHigh[Math.floor(Math.random() * JOBS.veryHigh.length)];
  if (mainScore >= 8) return JOBS.high[Math.floor(Math.random() * JOBS.high.length)];
  if (mainScore >= 0) return JOBS.medium[Math.floor(Math.random() * JOBS.medium.length)];
  if (mainScore >= -8) return JOBS.low[Math.floor(Math.random() * JOBS.low.length)];
  return JOBS.veryLow[Math.floor(Math.random() * JOBS.veryLow.length)];
}

export function getAdjectiveByScores(socialScore: number, chaosScore: number): string {
  const isHighSocial = socialScore >= 5;
  const isHighChaos = chaosScore >= 5;

  let pool: string[];
  if (isHighSocial && !isHighChaos) {
    pool = ADJECTIVES.socialOrderly;
  } else if (isHighSocial && isHighChaos) {
    pool = ADJECTIVES.socialChaotic;
  } else if (!isHighSocial && !isHighChaos) {
    pool = ADJECTIVES.lonelyOrderly;
  } else {
    pool = ADJECTIVES.lonelyChaotic;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

export function getDescriptionByScore(mainScore: number): string {
  if (mainScore >= 15) return DESCRIPTIONS.veryHigh[Math.floor(Math.random() * DESCRIPTIONS.veryHigh.length)];
  if (mainScore >= 8) return DESCRIPTIONS.high[Math.floor(Math.random() * DESCRIPTIONS.high.length)];
  if (mainScore >= 0) return DESCRIPTIONS.medium[Math.floor(Math.random() * DESCRIPTIONS.medium.length)];
  if (mainScore >= -8) return DESCRIPTIONS.low[Math.floor(Math.random() * DESCRIPTIONS.low.length)];
  return DESCRIPTIONS.veryLow[Math.floor(Math.random() * DESCRIPTIONS.veryLow.length)];
}

export function getSocialCommentByScore(socialScore: number): string {
  if (socialScore >= 12) return SOCIAL_COMMENTS.veryHigh[Math.floor(Math.random() * SOCIAL_COMMENTS.veryHigh.length)];
  if (socialScore >= 6) return SOCIAL_COMMENTS.high[Math.floor(Math.random() * SOCIAL_COMMENTS.high.length)];
  if (socialScore >= 0) return SOCIAL_COMMENTS.medium[Math.floor(Math.random() * SOCIAL_COMMENTS.medium.length)];
  if (socialScore >= -6) return SOCIAL_COMMENTS.low[Math.floor(Math.random() * SOCIAL_COMMENTS.low.length)];
  return SOCIAL_COMMENTS.veryLow[Math.floor(Math.random() * SOCIAL_COMMENTS.veryLow.length)];
}

export function getChaosCommentByScore(chaosScore: number): string {
  if (chaosScore >= 12) return CHAOS_COMMENTS.veryHigh[Math.floor(Math.random() * CHAOS_COMMENTS.veryHigh.length)];
  if (chaosScore >= 6) return CHAOS_COMMENTS.high[Math.floor(Math.random() * CHAOS_COMMENTS.high.length)];
  if (chaosScore >= 0) return CHAOS_COMMENTS.medium[Math.floor(Math.random() * CHAOS_COMMENTS.medium.length)];
  if (chaosScore >= -6) return CHAOS_COMMENTS.low[Math.floor(Math.random() * CHAOS_COMMENTS.low.length)];
  return CHAOS_COMMENTS.veryLow[Math.floor(Math.random() * CHAOS_COMMENTS.veryLow.length)];
}
