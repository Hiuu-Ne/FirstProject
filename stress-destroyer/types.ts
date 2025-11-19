export type ObjectType = 'glass' | 'ceramic' | 'wall' | 'paper';

export interface DestructibleObject {
  id: string;
  type: ObjectType;
  name: string;
  emoji: string;
  maxHealth: number;
  currentHealth: number;
  position: { x: number; y: number };
  destroyed: boolean;
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

export interface GameStats {
  score: number;
  combo: number;
  totalDestroyed: number;
  maxCombo: number;
}
