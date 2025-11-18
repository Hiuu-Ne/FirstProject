import { QuizQuestion, ResultData } from './types';

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "월요일 아침, 알람이 울리는 순간",
    emoji: "⏰",
    options: [
      { text: "새로운 한 주의 시작! 😊", score: 0 },
      { text: "하... 또 월요일이네", score: 5 },
      { text: "5분만... 제발...", score: 8 },
      { text: "이게 인생인가 싶음", score: 10 }
    ]
  },
  {
    id: 2,
    question: "상사의 '급한 일 있어' 카톡",
    emoji: "💬",
    options: [
      { text: "넵! 바로 확인하겠습니다", score: 0 },
      { text: "심장이 쿵... 내려앉음", score: 6 },
      { text: "읽씹하고 10분 뒤 답장", score: 8 },
      { text: "폰 화장실에 빠뜨린 척", score: 10 }
    ]
  },
  {
    id: 3,
    question: "점심시간 1시간 vs 업무시간 8시간",
    emoji: "⏱️",
    options: [
      { text: "둘 다 빠르게 가는 편", score: 0 },
      { text: "점심은 1분, 업무는 1년", score: 10 },
      { text: "점심만 기다림", score: 7 },
      { text: "시계 안 봄", score: 3 }
    ]
  },
  {
    id: 4,
    question: "칼퇴를 시도할 때 상사의 눈빛",
    emoji: "👀",
    options: [
      { text: "전혀 신경 안 씀", score: 0 },
      { text: "눈치 1도 안 봄", score: 2 },
      { text: "심장이 벌렁벌렁", score: 7 },
      { text: "가방을 다시 내려놓음", score: 10 }
    ]
  },
  {
    id: 5,
    question: "회의 시작 10분 전",
    emoji: "📊",
    options: [
      { text: "자료 준비 완료!", score: 0 },
      { text: "뭐 준비하지...?", score: 5 },
      { text: "화장실 가고 싶어짐", score: 8 },
      { text: "갑자기 배탈 증상", score: 10 }
    ]
  },
  {
    id: 6,
    question: "토요일 오전, 상사 전화벨이 울린다",
    emoji: "📞",
    options: [
      { text: "바로 받음", score: 0 },
      { text: "심호흡 3번 후 받음", score: 6 },
      { text: "무음으로 전환", score: 9 },
      { text: "폰을 벽에 던짐", score: 10 }
    ]
  },
  {
    id: 7,
    question: "연차 쓰겠다고 말할 때",
    emoji: "🌴",
    options: [
      { text: "당당하게 신청", score: 0 },
      { text: "죄송한 마음으로", score: 5 },
      { text: "변명 3개 준비", score: 8 },
      { text: "아픈 척 연기력 발휘", score: 10 }
    ]
  },
  {
    id: 8,
    question: "야근 제안을 받으면",
    emoji: "🌙",
    options: [
      { text: "오케이! 같이 해요", score: 0 },
      { text: "... 네 알겠습니다", score: 7 },
      { text: "약속이 있어서...", score: 9 },
      { text: "이미 퇴근함 (도망)", score: 10 }
    ]
  },
  {
    id: 9,
    question: "월급날 vs 평소",
    emoji: "💰",
    options: [
      { text: "매일이 월급날!", score: 0 },
      { text: "월급날만 기다림", score: 6 },
      { text: "월급날만 살아있음", score: 8 },
      { text: "월급 = 생명 연장", score: 10 }
    ]
  },
  {
    id: 10,
    question: "내년 이맘때 여기 있을 확률",
    emoji: "🔮",
    options: [
      { text: "100%! 여기가 좋아요", score: 0 },
      { text: "50대 50?", score: 5 },
      { text: "20% 미만", score: 8 },
      { text: "다음 달도 모름", score: 10 }
    ]
  },
  {
    id: 11,
    question: "출근길 발걸음의 무게는",
    emoji: "🚶",
    options: [
      { text: "가벼운 스킵", score: 0 },
      { text: "평범한 걸음", score: 4 },
      { text: "납덩이 같음", score: 8 },
      { text: "발이 안 떨어짐", score: 10 }
    ]
  },
  {
    id: 12,
    question: "친구가 '직장 어때?' 물어보면",
    emoji: "👥",
    options: [
      { text: "좋아! 만족해", score: 0 },
      { text: "그냥... 다닐만해", score: 5 },
      { text: "하... (한숨)", score: 8 },
      { text: "1시간 토크쇼 시작", score: 10 }
    ]
  }
];

export const RESULT_DATA: ResultData[] = [
  {
    percentage: 0,
    title: "신입의 열정 🔥",
    message: "아직 회사에 대한 꿈과 희망이 가득!",
    emoji: "🌟",
    color: "from-blue-400 to-cyan-400",
    advice: "이 열정 오래오래 간직하세요... 가능하면..."
  },
  {
    percentage: 20,
    title: "평범한 직장인 모드",
    message: "적당히 일하고 적당히 퇴근하는 중",
    emoji: "😌",
    color: "from-green-400 to-emerald-400",
    advice: "밸런스가 좋네요! 이 정도면 괜찮아요"
  },
  {
    percentage: 40,
    title: "슬슬 피로감 누적",
    message: "주말만 기다리며 사는 중...",
    emoji: "😅",
    color: "from-yellow-400 to-orange-400",
    advice: "휴가 한 번 다녀오시는 건 어때요?"
  },
  {
    percentage: 60,
    title: "위험 구간 진입 ⚠️",
    message: "퇴사 고민이 스멀스멀...",
    emoji: "😰",
    color: "from-orange-400 to-red-400",
    advice: "이직 사이트 구경 정도는 해보는 게..."
  },
  {
    percentage: 80,
    title: "퇴사 충동 심각 🚨",
    message: "마음은 이미 퇴사한 상태",
    emoji: "🔥",
    color: "from-red-500 to-pink-500",
    advice: "진지하게 다른 길을 알아보세요"
  },
  {
    percentage: 95,
    title: "이미 마음은 퇴사",
    message: "출근할 때마다 영혼이 탈출 시도 중",
    emoji: "💥",
    color: "from-purple-600 to-red-600",
    advice: "사표 초안은 이미 작성하셨죠?"
  },
  {
    percentage: 100,
    title: "지금 당장 퇴사 🔥🔥🔥",
    message: "이 앱 하는 것도 근무시간 아까움",
    emoji: "💣",
    color: "from-red-600 to-black",
    advice: "건강 챙기시고... 힘내세요 진짜로"
  }
];

export const LOADING_MESSAGES = [
  "당신의 퇴사 본능을 측정하는 중...",
  "상사의 눈빛 데이터 분석 중...",
  "월급 대비 스트레스 계산 중...",
  "칼퇴 성공률 분석 중...",
  "카톡 알림 트라우마 측정 중...",
  "회의 피로도 분석 중...",
  "잠시만요, 거의 다 됐어요..."
];
