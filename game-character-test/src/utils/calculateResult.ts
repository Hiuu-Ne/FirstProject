import type { Answer, CharacterResult } from '../types';
import {
  getJobByScore,
  getAdjectiveByScores,
  getDescriptionByScore,
  getSocialCommentByScore,
  getChaosCommentByScore,
} from '../constants/characters';

export function calculateCharacterResult(answers: Answer[]): CharacterResult {
  // 점수 합산
  const totalScores = answers.reduce(
    (acc, answer) => ({
      main: acc.main + answer.scores.main,
      social: acc.social + answer.scores.social,
      chaos: acc.chaos + answer.scores.chaos,
    }),
    { main: 0, social: 0, chaos: 0 }
  );

  // 레벨 계산 (1-99)
  // 절대값 합산 + 랜덤 요소
  const totalAbsScore =
    Math.abs(totalScores.main) +
    Math.abs(totalScores.social) +
    Math.abs(totalScores.chaos);

  const baseLevel = Math.min(Math.floor(totalAbsScore * 2.5), 80);
  const randomBonus = Math.floor(Math.random() * 20);
  const level = Math.max(1, Math.min(99, baseLevel + randomBonus));

  // 직업과 형용사 결정
  const job = getJobByScore(totalScores.main);
  const adjective = getAdjectiveByScores(totalScores.social, totalScores.chaos);

  // 설명 생성
  const mainDescription = getDescriptionByScore(totalScores.main);
  const socialComment = getSocialCommentByScore(totalScores.social);
  const chaosComment = getChaosCommentByScore(totalScores.chaos);

  const description = `${mainDescription}\n\n${socialComment}\n\n${chaosComment}`;

  // 공유 텍스트 생성
  const shareText = `🎮 나는 어떤 게임 캐릭터? 🎮

━━━━━━━━━━━━━━━
✨ ${adjective} ${job} ✨
⚔️ Lv.${level}
━━━━━━━━━━━━━━━

📊 스탯:
👑 주인공력: ${totalScores.main >= 0 ? '★'.repeat(Math.min(5, Math.floor(totalScores.main / 4))) + '☆'.repeat(Math.max(0, 5 - Math.floor(totalScores.main / 4))) : '💀'.repeat(Math.min(3, Math.floor(Math.abs(totalScores.main) / 4)))}
🤝 사회성: ${totalScores.social >= 0 ? '★'.repeat(Math.min(5, Math.floor(totalScores.social / 4))) + '☆'.repeat(Math.max(0, 5 - Math.floor(totalScores.social / 4))) : '💀'.repeat(Math.min(3, Math.floor(Math.abs(totalScores.social) / 4)))}
🎲 혼돈: ${totalScores.chaos >= 0 ? '★'.repeat(Math.min(5, Math.floor(totalScores.chaos / 4))) + '☆'.repeat(Math.max(0, 5 - Math.floor(totalScores.chaos / 4))) : '💀'.repeat(Math.min(3, Math.floor(Math.abs(totalScores.chaos) / 4)))}

${mainDescription.split('\n')[0]}

너도 해봐! 👉 [링크 삽입]`;

  return {
    job,
    adjective,
    level,
    stats: totalScores,
    description,
    shareText,
  };
}
