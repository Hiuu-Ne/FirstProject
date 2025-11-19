import { ObjectType, Particle } from './types';

// 랜덤 숫자 생성
export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// 파티클 생성
export function createParticles(
  x: number,
  y: number,
  type: ObjectType,
  count: number = 30
): Particle[] {
  const particles: Particle[] = [];
  const colors = getParticleColors(type);

  for (let i = 0; i < count; i++) {
    const angle = random(0, Math.PI * 2);
    const speed = random(2, 8);

    particles.push({
      id: `particle-${Date.now()}-${i}`,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: random(3, 10),
      life: 1,
    });
  }

  return particles;
}

// 오브젝트 타입별 파티클 색상
function getParticleColors(type: ObjectType): string[] {
  switch (type) {
    case 'glass':
      return ['#00f0ff', '#0080ff', '#ffffff', '#b0e0ff'];
    case 'ceramic':
      return ['#ffffff', '#f0f0f0', '#e0e0e0', '#ffd700'];
    case 'wall':
      return ['#8b4513', '#a0522d', '#cd853f', '#deb887'];
    case 'paper':
      return ['#ffffff', '#f5f5dc', '#fffaf0'];
    default:
      return ['#ffffff'];
  }
}

// 진동 효과 (모바일)
export function vibrate(duration: number = 50) {
  if ('vibrate' in navigator) {
    navigator.vibrate(duration);
  }
}

// 점수 계산
export function calculateScore(objectType: ObjectType, combo: number): number {
  const baseScore: Record<ObjectType, number> = {
    glass: 100,
    ceramic: 200,
    wall: 300,
    paper: 50,
  };

  const comboMultiplier = 1 + (combo - 1) * 0.5;
  return Math.floor(baseScore[objectType] * comboMultiplier);
}
