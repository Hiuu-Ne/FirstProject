import type { Question } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "친구가 '야 나 오늘 힘들었어...'라고 카톡 보냄. 너의 반응은?",
    options: [
      {
        text: "즉답) 어디야? 지금 갈게!",
        scores: { main: 2, social: 2, chaos: 0 }
      },
      {
        text: "ㅇㅇ 힘내 (읽씹 예정)",
        scores: { main: -2, social: -2, chaos: 1 }
      },
      {
        text: "나도 힘들어 ㅋㅋㅋ (맞받아치기)",
        scores: { main: 0, social: -1, chaos: 2 }
      },
      {
        text: "무슨 일인데? (진심 궁금)",
        scores: { main: 0, social: 1, chaos: -1 }
      }
    ]
  },
  {
    id: 2,
    question: "게임 시작 5분 만에 보스 만남 ㅋㅋㅋ 어떻게 할래?",
    options: [
      {
        text: "일단 박고 본다 (무지성 돌격)",
        scores: { main: 1, social: -1, chaos: 2 }
      },
      {
        text: "도망쳐... (생존이 우선)",
        scores: { main: -1, social: 0, chaos: -2 }
      },
      {
        text: "공략 검색 ㄱㄱ (현타 옴)",
        scores: { main: -1, social: 1, chaos: -1 }
      },
      {
        text: "재접 박고 다른 캐릭 만들기",
        scores: { main: 0, social: -2, chaos: 1 }
      }
    ]
  },
  {
    id: 3,
    question: "단톡방에서 네가 한 드립이 개 미끄러짐... 분위기 쥐죽은듯 😭",
    options: [
      {
        text: "ㅋㅋㅋㅋㅋㅋㅋㅋ (추가 드립으로 돌파)",
        scores: { main: 1, social: -1, chaos: 2 }
      },
      {
        text: "... (타이핑 안 보이게 잠수)",
        scores: { main: -2, social: -1, chaos: 0 }
      },
      {
        text: "아 미안 ㅋㅋ 재미없었나 (솔직히 사과)",
        scores: { main: 0, social: 2, chaos: -1 }
      },
      {
        text: "단톡방 나가기 (새 출발)",
        scores: { main: -1, social: -2, chaos: 1 }
      }
    ]
  },
  {
    id: 4,
    question: "갑자기 초능력 하나 생긴다면?",
    options: [
      {
        text: "텔레포트 (지각 노노)",
        scores: { main: 0, social: 0, chaos: 1 }
      },
      {
        text: "마인드 컨트롤 (세계 정복 ㄱㄱ)",
        scores: { main: 2, social: -1, chaos: 2 }
      },
      {
        text: "투명 인간 (궁금한 게 너무 많아...)",
        scores: { main: -1, social: -2, chaos: 1 }
      },
      {
        text: "시간 정지 (잠 더 자고 싶어요)",
        scores: { main: -1, social: 0, chaos: -1 }
      }
    ]
  },
  {
    id: 5,
    question: "치킨 시켜먹는데 뼈 발견... 어떡함?",
    options: [
      {
        text: "바로 전화해서 항의함 (소비자는 왕)",
        scores: { main: 1, social: 0, chaos: -2 }
      },
      {
        text: "그냥 먹음 ㅋㅋ 단백질이네",
        scores: { main: -1, social: -1, chaos: 2 }
      },
      {
        text: "조용히 빼고 먹음 (그러려니...)",
        scores: { main: -2, social: 1, chaos: -1 }
      },
      {
        text: "친구들 단톡에 사진 찍어 올림 ㄷㄷ",
        scores: { main: 0, social: 1, chaos: 1 }
      }
    ]
  },
  {
    id: 6,
    question: "친구가 '나 고백받았어 ㅋㅋ'라고 자랑함. 너의 반응?",
    options: [
      {
        text: "헐 대박! 누구? 사귀게? (진심 축하)",
        scores: { main: 0, social: 2, chaos: 0 }
      },
      {
        text: "ㅇㅋ (무반응)",
        scores: { main: -1, social: -2, chaos: 0 }
      },
      {
        text: "나 어제 3명한테 받았는데 ㅋ (허언)",
        scores: { main: 0, social: -1, chaos: 2 }
      },
      {
        text: "좋겠다... 나도 사람 만나고 싶다 😭",
        scores: { main: -2, social: 0, chaos: 1 }
      }
    ]
  },
  {
    id: 7,
    question: "RPG 게임에서 파티 구성할 때 네 포지션은?",
    options: [
      {
        text: "탱커 (맞는 게 내 직업)",
        scores: { main: 2, social: 1, chaos: -1 }
      },
      {
        text: "딜러 (데미지가 정의야)",
        scores: { main: 1, social: -1, chaos: 1 }
      },
      {
        text: "힐러 (팀플이 최고지)",
        scores: { main: -1, social: 2, chaos: -2 }
      },
      {
        text: "혼자 게임함 (솔플이 편함)",
        scores: { main: -2, social: -2, chaos: 0 }
      }
    ]
  },
  {
    id: 8,
    question: "갑자기 길에서 100만원 주움 ㄷㄷ 어케할거임?",
    options: [
      {
        text: "즉시 경찰서 ㄱㄱ (정직 빔)",
        scores: { main: 1, social: 0, chaos: -2 }
      },
      {
        text: "내 돈 ㅋ (줍는 사람이 임자)",
        scores: { main: -1, social: -2, chaos: 2 }
      },
      {
        text: "주변에 주인 찾아보고 없으면 경찰서",
        scores: { main: 0, social: 1, chaos: -1 }
      },
      {
        text: "고민하다가 결국 경찰서... (양심 있음)",
        scores: { main: -1, social: 1, chaos: 0 }
      }
    ]
  },
  {
    id: 9,
    question: "좀비 아포칼립스 발생! 제일 먼저 할 일은?",
    options: [
      {
        text: "편의점 털기 (라면 먼저 확보)",
        scores: { main: 1, social: -1, chaos: 1 }
      },
      {
        text: "가족/친구 찾기 (소중한 사람들)",
        scores: { main: 1, social: 2, chaos: -1 }
      },
      {
        text: "집에 박혀서 버티기 (밖은 위험해)",
        scores: { main: -2, social: -1, chaos: -2 }
      },
      {
        text: "좀비 되기 (편한 길 선택)",
        scores: { main: -2, social: -2, chaos: 2 }
      }
    ]
  },
  {
    id: 10,
    question: "내일 지구 멸망한대. 오늘 뭐 할래?",
    options: [
      {
        text: "버킷리스트 올클 도전 (YOLO)",
        scores: { main: 2, social: 0, chaos: 2 }
      },
      {
        text: "가족이랑 시간 보내기 (마지막은 가족)",
        scores: { main: 0, social: 2, chaos: -1 }
      },
      {
        text: "그냥 잠 ㅋㅋ (어차피 망하는데)",
        scores: { main: -2, social: -1, chaos: 0 }
      },
      {
        text: "PC방 가서 게임 (지구 멸망? 몰?루)",
        scores: { main: -1, social: -2, chaos: 1 }
      }
    ]
  }
];
