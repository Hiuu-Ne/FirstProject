import { LineType, Station } from './types';

// 노선별 색상
export const LINE_COLORS: Record<LineType, string> = {
  overwork: '#6B7280',   // 회색
  love: '#EF4444',       // 빨강
  parttime: '#10B981',   // 초록
  hobby: '#3B82F6',      // 파랑
  alcohol: '#F59E0B',    // 주황
  burnout: '#1F2937',    // 검정
  transfer: '#8B5CF6',   // 보라
  emotion: '#EC4899',    // 핑크
};

// 노선 이름
export const LINE_NAMES: Record<LineType, string> = {
  overwork: '💼 야근 라인',
  love: '💔 연애 멸망선',
  parttime: '💰 알바 지옥선',
  hobby: '🎮 취미 몰입선',
  alcohol: '🍺 술자리 라인',
  burnout: '😴 번아웃선',
  transfer: '🔄 환승역',
  emotion: '😊 감정 라인',
};

// 각 라인별 가능한 역들
export const STATION_POOL: Record<LineType, Station[]> = {
  overwork: [
    {
      id: 'overwork-1',
      name: '정시퇴근역',
      line: 'overwork',
      description: '전설의 그 역. 본 사람이 거의 없다고 전해집니다.',
      rarity: 'legendary',
      percentage: 3,
    },
    {
      id: 'overwork-2',
      name: '야근초보역',
      line: 'overwork',
      description: '가끔 야근하는 정도. 아직은 괜찮습니다.',
      rarity: 'common',
      percentage: 35,
    },
    {
      id: 'overwork-3',
      name: '새벽퇴근역',
      line: 'overwork',
      description: '택시비가 아깝지 않은 순간입니다.',
      rarity: 'common',
      percentage: 47,
    },
    {
      id: 'overwork-4',
      name: '회사가집역',
      line: 'overwork',
      description: '이불을 가져올까 고민 중입니다.',
      rarity: 'rare',
      percentage: 15,
    },
  ],
  love: [
    {
      id: 'love-1',
      name: '적절한답장역',
      line: 'love',
      description: '밀당의 고수. 타이밍이 완벽합니다.',
      rarity: 'rare',
      percentage: 18,
    },
    {
      id: 'love-2',
      name: '밀당역',
      line: 'love',
      description: '적당한 거리 유지 중입니다.',
      rarity: 'common',
      percentage: 40,
    },
    {
      id: 'love-3',
      name: '읽씹역',
      line: 'love',
      description: '파란 글씨가 너무 오래 남아있습니다.',
      rarity: 'common',
      percentage: 32,
    },
    {
      id: 'love-4',
      name: '관심없음역',
      line: 'love',
      description: '답장? 그게 뭐죠?',
      rarity: 'common',
      percentage: 10,
    },
  ],
  parttime: [
    {
      id: 'parttime-1',
      name: '편의점신역',
      line: 'parttime',
      description: '손님 처리 속도가 빛의 속도입니다.',
      rarity: 'legendary',
      percentage: 5,
    },
    {
      id: 'parttime-2',
      name: '알바고수역',
      line: 'parttime',
      description: '이제 좀 적응했습니다.',
      rarity: 'rare',
      percentage: 25,
    },
    {
      id: 'parttime-3',
      name: '평범한알바생역',
      line: 'parttime',
      description: '그냥 평범하게 일합니다.',
      rarity: 'common',
      percentage: 50,
    },
    {
      id: 'parttime-4',
      name: '알바첫날역',
      line: 'parttime',
      description: '손이 너무 느립니다. 다시 연습이 필요합니다.',
      rarity: 'common',
      percentage: 20,
    },
  ],
  hobby: [
    {
      id: 'hobby-1',
      name: '가벼운시청역',
      line: 'hobby',
      description: '적당히 즐기고 나갑니다.',
      rarity: 'rare',
      percentage: 12,
    },
    {
      id: 'hobby-2',
      name: '중독초기역',
      line: 'hobby',
      description: '조금 더... 조금만 더...',
      rarity: 'common',
      percentage: 35,
    },
    {
      id: 'hobby-3',
      name: '시간도둑역',
      line: 'hobby',
      description: '어? 벌써 이 시간이?',
      rarity: 'common',
      percentage: 43,
    },
    {
      id: 'hobby-4',
      name: '해뜬줄몰랐역',
      line: 'hobby',
      description: '창문 밖이 밝습니다. 새벽인 줄 알았는데...',
      rarity: 'rare',
      percentage: 10,
    },
  ],
  alcohol: [
    {
      id: 'alcohol-1',
      name: '주량ㅎㄷㄷ역',
      line: 'alcohol',
      description: '술고래. 비틀거림이 없습니다.',
      rarity: 'rare',
      percentage: 15,
    },
    {
      id: 'alcohol-2',
      name: '적당히취함역',
      line: 'alcohol',
      description: '기분 좋은 상태입니다.',
      rarity: 'common',
      percentage: 50,
    },
    {
      id: 'alcohol-3',
      name: '필름끊김역',
      line: 'alcohol',
      description: '어제 뭐했더라... 기억이 안 납니다.',
      rarity: 'common',
      percentage: 35,
    },
  ],
  burnout: [
    {
      id: 'burnout-1',
      name: '퇴사직전역',
      line: 'burnout',
      description: '손가락이 "퇴사"만 기억합니다.',
      rarity: 'rare',
      percentage: 20,
    },
    {
      id: 'burnout-2',
      name: '번아웃역',
      line: 'burnout',
      description: '모든 게 귀찮습니다.',
      rarity: 'common',
      percentage: 45,
    },
    {
      id: 'burnout-3',
      name: '참고견딤역',
      line: 'burnout',
      description: '아직... 괜찮습니다... 아마도...',
      rarity: 'common',
      percentage: 30,
    },
    {
      id: 'burnout-4',
      name: '현실타협역',
      line: 'burnout',
      description: '이게 인생이지 뭐.',
      rarity: 'common',
      percentage: 5,
    },
  ],
  transfer: [
    {
      id: 'transfer-1',
      name: '대박전환역',
      line: 'transfer',
      description: '인생이 180도 바뀌었습니다!',
      rarity: 'legendary',
      percentage: 8,
    },
    {
      id: 'transfer-2',
      name: '중간전환역',
      line: 'transfer',
      description: '뭔가... 바뀐 것 같기도?',
      rarity: 'common',
      percentage: 52,
    },
    {
      id: 'transfer-3',
      name: '복잡한인생역',
      line: 'transfer',
      description: '이것도 저것도... 정신없습니다.',
      rarity: 'common',
      percentage: 40,
    },
  ],
  emotion: [
    {
      id: 'emotion-happy',
      name: '긍정에너지역',
      line: 'emotion',
      description: '오늘도 행복한 하루!',
      rarity: 'common',
      percentage: 20,
    },
    {
      id: 'emotion-sad',
      name: 'ㅠㅠ역',
      line: 'emotion',
      description: '오늘따라 눈물이...',
      rarity: 'common',
      percentage: 15,
    },
    {
      id: 'emotion-angry',
      name: '화남주의역',
      line: 'emotion',
      description: '건들면 폭발합니다.',
      rarity: 'common',
      percentage: 10,
    },
    {
      id: 'emotion-tired',
      name: '피곤한인생역',
      line: 'emotion',
      description: '...자고싶다...',
      rarity: 'common',
      percentage: 30,
    },
    {
      id: 'emotion-anxious',
      name: '불안역',
      line: 'emotion',
      description: '뭔가... 불안합니다...',
      rarity: 'common',
      percentage: 15,
    },
    {
      id: 'emotion-thinking',
      name: '고민중역',
      line: 'emotion',
      description: '음... 고민되네요...',
      rarity: 'common',
      percentage: 10,
    },
  ],
};

// 인생 타입 목록
export const LIFE_TYPES = [
  '고생 끝 고생 또 시작 라인',
  '평범한 듯 평범한 라인',
  '파란만장 롤러코스터 라인',
  '야근 특화 라인',
  '연애 재능 0 라인',
  '취미가 인생인 라인',
  '술이 인생인 라인',
  '번아웃 전문 라인',
  '긍정 에너지 충만 라인',
  '혼돈의 카오스 라인',
];
