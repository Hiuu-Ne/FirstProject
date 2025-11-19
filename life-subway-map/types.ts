// 노선 타입
export type LineType =
  | 'overwork'    // 야근 라인
  | 'love'        // 연애 멸망선
  | 'parttime'    // 알바 지옥선
  | 'hobby'       // 취미 몰입선
  | 'alcohol'     // 술자리 라인
  | 'burnout'     // 번아웃선
  | 'transfer'    // 환승역
  | 'emotion';    // 감정 라인

// 역 정보
export interface Station {
  id: string;
  name: string;
  line: LineType;
  description: string;
  rarity: 'common' | 'rare' | 'legendary'; // 희귀도
  percentage?: number; // 보유율 (예: 47%)
}

// 미니게임 결과
export interface GameResult {
  line: LineType;
  score: number;
  station: Station;
}

// 전체 노선도 데이터
export interface SubwayMapData {
  stations: Station[];
  lines: {
    type: LineType;
    name: string;
    color: string;
    stations: Station[];
  }[];
  lifeType: string; // "고생 끝 고생 또 시작 라인" 같은
  totalStations: number;
  totalLines: number;
  transfers: number;
}

// 미니게임 Props
export interface MiniGameProps {
  onComplete: (result: GameResult) => void;
}
