import { useState, useEffect } from 'react';
import './App.css';

type ViewMode = 'intro' | 'selection' | 'loading' | 'reveal' | 'final';

interface Memory {
  id: number;
  emoji: string;
  category: string;
  hint: string;
  stage1: string;
  stage2: string;
  fullText: string;
  year?: string;
}

const MEMORIES: Memory[] = [
  {
    id: 1,
    emoji: '☀️',
    category: '어린 시절',
    hint: '여름날...',
    stage1: '여름방학 첫날',
    stage2: '1998년 여름방학 첫날 오전 10시',
    fullText: '아무것도 안 해도 되는 자유.\n\nTV에서 나오는 만화 소리.\n선풍기 바람과 매미 소리.\n\n두 달이 영원처럼 느껴졌던\n그 순간.',
    year: '1998',
  },
  {
    id: 2,
    emoji: '🛏️',
    category: '어린 시절',
    hint: '할머니 집...',
    stage1: '할머니 댁 이불',
    stage2: '1995년 겨울, 시골 할머니 집 방',
    fullText: '오래된 이불 특유의 냄새.\n\n낮잠 자고 일어나면\n어느새 저녁이었고,\n밖은 이미 어두웠다.\n\n안전하고 따뜻했던 그 시간.',
    year: '1995',
  },
  {
    id: 3,
    emoji: '🍽️',
    category: '학교',
    hint: '급식실...',
    stage1: '급식실 쟁반 소리',
    stage2: '2002년, 초등학교 급식실',
    fullText: '스테인레스 쟁반이\n짤그랑거리는 소리.\n\n급식 냄새가 복도까지 나고,\n줄 서있던 그 시간.\n\n매일 반복되었지만\n특별했던 일상.',
    year: '2002',
  },
  {
    id: 4,
    emoji: '🌙',
    category: '밤의 기억',
    hint: '새벽...',
    stage1: '새벽 3시에 깬 순간',
    stage2: '새벽 3시, 이유 없이 눈이 떠진 순간',
    fullText: '너무 조용했다.\n\n다시 자야 한다는 압박감.\n시계만 째깍거리고,\n\n다시 잠들기까지\n영원처럼 긴 시간.',
  },
  {
    id: 5,
    emoji: '💧',
    category: '밤의 기억',
    hint: '밤에...',
    stage1: '밤에 혼자 물 마시러',
    stage2: '어렸을 때, 밤에 혼자 부엌으로',
    fullText: '집이 너무 조용했고,\n냉장고 불빛만 환했다.\n\n혼자인 게 무서워서\n빨리 방으로 돌아갔던 기억.\n\n지금 생각하면 왜 그랬을까.',
  },
  {
    id: 6,
    emoji: '🚽',
    category: '밤의 기억',
    hint: '무서운...',
    stage1: '어렸을 때 밤 화장실',
    stage2: '초등학생 때, 밤에 화장실 가기',
    fullText: '무서워서 뛰어갔고,\n불 끄고 나올 때의 공포.\n\n침대까지 전력질주.\n이불 속으로 숨었던 기억.\n\n지금도 가끔 그런 기분이 든다.',
  },
  {
    id: 7,
    emoji: '🚌',
    category: '이동 중',
    hint: '버스...',
    stage1: '버스 창가에 머리 기대기',
    stage2: '비 오는 날, 버스 창가',
    fullText: '덜컹거리는 진동.\n빗물 흐르는 창문.\n\n아무 생각 없이 멍때리고,\n음악을 들으며\n흘러가는 풍경을 봤다.\n\n평화로웠던 순간.',
  },
  {
    id: 8,
    emoji: '🚗',
    category: '이동 중',
    hint: '차 안에서...',
    stage1: '차 뒷좌석에서 잠들었다 깨면',
    stage2: '어렸을 때, 차 안에서 잠들기',
    fullText: '언제 잠들었는지 모르게\n어느새 집 앞.\n\n아빠가 끄는 시동 소리.\n일어날까 말까 고민하다가,\n\n결국 안고 들어가달라고\n조르던 기억.',
  },
  {
    id: 9,
    emoji: '📚',
    category: '학교',
    hint: '수업 끝나고...',
    stage1: '수업 끝나고 정리하는 5분',
    stage2: '중학교, 수업 종 치고 난 후',
    fullText: '다들 웅성거리는 소리.\n책가방 싸는 소리.\n\n창밖을 보며\n다음 시간을 기다리던\n그 짧은 순간.\n\n특별할 것 없지만\n생생한 기억.',
  },
  {
    id: 10,
    emoji: '🪞',
    category: '일상',
    hint: '엘리베이터...',
    stage1: '엘리베이터 거울 속 내 모습',
    stage2: '갑자기 낯설게 보였던 순간',
    fullText: '거울에 비친 내 얼굴이\n갑자기 낯설었다.\n\n"이게 나야?" 싶었던\n5초간의 이질감.\n\n그리고 다시 일상으로.',
  },
  {
    id: 11,
    emoji: '🪟',
    category: '일상',
    hint: '창문...',
    stage1: '창문에 비친 낯선 얼굴',
    stage2: '밤에 창문에 비친 반사',
    fullText: '누군가 있는 줄 알고\n깜짝 놀랐는데,\n\n아, 내 반사였구나.\n그 1초의 놀람.\n\n아직도 가끔 그런다.',
  },
  {
    id: 12,
    emoji: '⏰',
    category: '학교',
    hint: '시험...',
    stage1: '시험 끝나고 종 울릴 때',
    stage2: '다 못 풀었는데 종이 울린 순간',
    fullText: '다 못 풀었는데\n종이 울렸을 때의 절망.\n\n그래도 끝났다는 안도.\n\n복잡한 감정이\n한꺼번에 밀려왔던 기억.',
  },
  {
    id: 13,
    emoji: '👋',
    category: '학교',
    hint: '복도...',
    stage1: '복도에서 선생님과 마주침',
    stage2: '수업 아닌 시간, 복도에서',
    fullText: '어색한 인사.\n빨리 지나가고 싶었던\n3초의 정적.\n\n왜 그렇게 긴장했을까.\n지금 생각하면 웃긴다.',
  },
  {
    id: 14,
    emoji: '🏫',
    category: '학교',
    hint: '방학식...',
    stage1: '방학식 날 텅 빈 복도',
    stage2: '1999년 여름, 방학식 날 오후',
    fullText: '햇빛이 창문으로 들어오고,\n복도는 텅 비어있었다.\n\n왁스 냄새가 났고,\n운동화 소리만 울렸다.\n\n너무 조용해서 무서웠지만,\n동시에 자유로웠다.',
    year: '1999',
  },
  {
    id: 15,
    emoji: '📺',
    category: '일상',
    hint: 'TV...',
    stage1: 'TV 켜진 채로 잠들어서',
    stage2: '소파에서 TV 보다 잠든 기억',
    fullText: '언제 잠들었는지 모르게\n눈을 떴을 때,\n\nTV는 여전히 켜져있고\n새벽 프로그램이 나오고 있었다.\n\n목이 뻐근했던 기억.',
  },
  {
    id: 16,
    emoji: '🌧️',
    category: '학교',
    hint: '비 오는 날...',
    stage1: '비 오는 날 학교 창문',
    stage2: '수업 중, 창밖의 빗소리',
    fullText: '수업 중인데\n창밖만 보게 되던 날.\n\n빗소리가 졸리게 만들고,\n창문에 빗방울이 흘러내렸다.\n\n멍하니 보다가\n선생님한테 걸렸던 기억.',
  },
  {
    id: 17,
    emoji: '🍜',
    category: '혼자',
    hint: '라면...',
    stage1: '라면 끓이는 소리만',
    stage2: '2004년, 혼자 집에서 라면',
    fullText: '엄마가 마트 간 사이\n혼자 집에서 라면 끓이기.\n\n물이 끓는 소리만 들리고\n시계 초침 소리가 너무 컸다.\n\n갑자기 무서워서\nTV를 켰던 기억.',
    year: '2004',
  },
  {
    id: 18,
    emoji: '🪑',
    category: '학교',
    hint: '청소시간...',
    stage1: '혼자 남겨진 교실',
    stage2: '청소 끝나고 혼자 남은 교실',
    fullText: '친구들은 다 가고\n나만 남았을 때.\n\n텅 빈 교실의 정적.\n의자가 책상 위에 올려져있고,\n\n뭔가 쓸쓸하면서도\n평화로웠던 순간.',
  },
  {
    id: 19,
    emoji: '📱',
    category: '밤의 기억',
    hint: '어두운 방에서...',
    stage1: '어두운 방에서 핸드폰',
    stage2: '새벽, 불 끄고 핸드폰만',
    fullText: '불 끄고 누워서\n핸드폰만 보던 시간.\n\n화면 밝기를 최소로 해도\n눈이 부셨다.\n\n"이제 자야지" 하면서도\n계속 보던 기억.',
  },
  {
    id: 20,
    emoji: '🏠',
    category: '특별한 순간',
    hint: '친구 집에서...',
    stage1: '친구 집에서 자고 일어날 때',
    stage2: '초등학생 때, 친구 집에서 아침',
    fullText: '낯선 천장을 보며\n눈을 떴을 때.\n\n"여기가 어디지?" 하다가\n아, 친구 집이구나.\n\n어색하면서도 신나던\n그 아침의 기억.',
  },
];

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('intro');
  const [selectedMemories, setSelectedMemories] = useState<Memory[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [revealStage, setRevealStage] = useState(0);
  const [empathyCount, setEmpathyCount] = useState(0);
  const [hasEmpathized, setHasEmpathized] = useState(false);

  useEffect(() => {
    if (viewMode === 'selection') {
      // 랜덤 3개 선택
      const shuffled = [...MEMORIES].sort(() => Math.random() - 0.5);
      setSelectedMemories(shuffled.slice(0, 3));
    }
  }, [viewMode]);

  useEffect(() => {
    if (viewMode === 'loading') {
      const timer = setTimeout(() => {
        setViewMode('reveal');
        setRevealStage(1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [viewMode]);

  useEffect(() => {
    if (viewMode === 'reveal') {
      if (revealStage === 1) {
        setTimeout(() => setRevealStage(2), 1500);
      } else if (revealStage === 2) {
        setTimeout(() => setViewMode('final'), 1500);
      }
    }
  }, [viewMode, revealStage]);

  useEffect(() => {
    if (selectedMemory) {
      // localStorage에서 공감 수 불러오기
      const saved = localStorage.getItem(`memory-${selectedMemory.id}-empathy`);
      if (saved) {
        setEmpathyCount(parseInt(saved));
      } else {
        const randomBase = Math.floor(Math.random() * 5000) + 1000;
        setEmpathyCount(randomBase);
        localStorage.setItem(`memory-${selectedMemory.id}-empathy`, randomBase.toString());
      }

      // 이미 공감했는지 확인
      const empathized = localStorage.getItem(`memory-${selectedMemory.id}-user-empathy`);
      setHasEmpathized(empathized === 'true');
    }
  }, [selectedMemory]);

  const handleSelectMemory = (memory: Memory) => {
    setSelectedMemory(memory);
    setViewMode('loading');
  };

  const handleEmpathy = () => {
    if (!selectedMemory || hasEmpathized) return;

    const newCount = empathyCount + 1;
    setEmpathyCount(newCount);
    setHasEmpathized(true);
    localStorage.setItem(`memory-${selectedMemory.id}-empathy`, newCount.toString());
    localStorage.setItem(`memory-${selectedMemory.id}-user-empathy`, 'true');
  };

  const handleReset = () => {
    setViewMode('selection');
    setSelectedMemory(null);
    setRevealStage(0);
  };

  const handleShare = () => {
    if (!selectedMemory) return;

    const text = `이 기억... 나만 있는 거 아니었어? 💭\n\n기억 #${selectedMemory.id}: ${selectedMemory.stage1}\n\n${empathyCount.toLocaleString()}명이 '나도 있어요' 했어요\n\n[ 기억 파편 생성기 ]`;

    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('링크가 복사되었습니다!');
    }
  };

  // 인트로 화면
  if (viewMode === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black flex items-center justify-center p-4">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="text-7xl mb-6">💭</div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-200 mb-4">
            기억 파편
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            "잊혀진 순간들이<br />
            당신을 기다립니다"
          </p>
          <button
            onClick={() => setViewMode('selection')}
            className="px-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xl font-bold rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
          >
            기억 수집 시작
          </button>
        </div>
      </div>
    );
  }

  // 선택 화면
  if (viewMode === 'selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-300 mb-4">
              하나를 선택하세요
            </h2>
            <p className="text-gray-500">
              기억이 당신을 기다리고 있습니다...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedMemories.map((memory, index) => (
              <button
                key={memory.id}
                onClick={() => handleSelectMemory(memory)}
                className="group relative p-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-2 border-gray-700 hover:border-gray-500 transition-all transform hover:scale-105 active:scale-95 animate-fade-in sepia"
                style={{ animationDelay: `${index * 0.2}s`, filter: 'blur(8px) brightness(0.7)' }}
              >
                <div className="text-6xl mb-4 opacity-40">{memory.emoji}</div>
                <div className="text-xl text-gray-400 opacity-60">{memory.hint}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl pointer-events-none"></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 로딩 화면
  if (viewMode === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        <div className="tv-noise"></div>
        <div className="text-center space-y-8 relative z-10">
          <div className="text-6xl animate-glitch">{selectedMemory?.emoji}</div>
          <div className="text-2xl text-gray-400 animate-pulse">
            기억을 복원하는 중...
          </div>
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse" style={{ width: '72%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // 점진적 구체화 화면
  if (viewMode === 'reveal' && selectedMemory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4">
        <div className="max-w-3xl w-full text-center space-y-8">
          <div className="text-8xl mb-8 animate-fade-in">{selectedMemory.emoji}</div>

          {revealStage >= 1 && (
            <div className="text-3xl md:text-4xl font-bold text-gray-300 animate-blur-to-clear">
              {selectedMemory.stage1}
            </div>
          )}

          {revealStage >= 2 && (
            <div className="text-xl md:text-2xl text-gray-500 animate-fade-in-slow mt-6">
              {selectedMemory.stage2}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 최종 기억 카드
  if (viewMode === 'final' && selectedMemory) {
    return (
      <div className="min-h-screen bg-black text-white overflow-y-auto">
        <div className="sticky top-0 bg-black/80 backdrop-blur-lg border-b border-gray-800 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">💭 기억 파편</h1>
            <div className="flex gap-3">
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm"
              >
                📤 공유
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm"
              >
                🔄 다른 기억
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12 border border-gray-800 shadow-2xl grain sepia animate-fade-in">
            {/* 헤더 */}
            <div className="text-sm text-gray-600 mb-4 flex justify-between items-center">
              <span>기억 #{selectedMemory.id}</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-xs">{selectedMemory.category}</span>
            </div>

            {/* 이모지 */}
            <div className="text-9xl mb-8 text-center">{selectedMemory.emoji}</div>

            {/* 제목 */}
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-200">
              {selectedMemory.stage1}
            </h2>

            {selectedMemory.year && (
              <div className="text-xl text-gray-500 mb-8 text-center">
                {selectedMemory.year}
              </div>
            )}

            {/* 본문 */}
            <div className="bg-black/30 rounded-2xl p-8 mb-8">
              <p className="text-xl md:text-2xl leading-relaxed text-gray-300 whitespace-pre-line text-center">
                {selectedMemory.fullText}
              </p>
            </div>

            {/* 공감 섹션 */}
            <div className="bg-gradient-to-r from-indigo-950 to-purple-950 rounded-2xl p-8 border-2 border-indigo-800">
              <div className="text-center space-y-6">
                <p className="text-lg text-gray-400">
                  이 기억, 당신만 갖고 있나요?
                </p>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={handleEmpathy}
                    disabled={hasEmpathized}
                    className={`px-8 py-4 rounded-xl font-bold text-lg transition-all transform ${
                      hasEmpathized
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:scale-105 active:scale-95'
                    }`}
                  >
                    😭 나도 있어요
                  </button>
                </div>

                <div className="text-3xl font-bold text-indigo-400">
                  {empathyCount.toLocaleString()}명
                </div>

                {hasEmpathized && (
                  <p className="text-sm text-gray-500 animate-fade-in">
                    당신도 이 기억을 가지고 있군요...
                  </p>
                )}
              </div>
            </div>

            {/* 하단 메시지 */}
            <div className="mt-8 text-center text-gray-600 text-sm">
              이 순간은 다시 오지 않지만,<br />
              기억은 영원히 남습니다.
            </div>
          </div>

          {/* 공유 버튼 (하단) */}
          <div className="text-center mt-8 space-y-4">
            <button
              onClick={handleShare}
              className="px-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xl font-bold rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
            >
              📤 이 기억 공유하기
            </button>
            <p className="text-gray-600 text-sm">
              (친구들도 같은 기억이 있을지도...)
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
