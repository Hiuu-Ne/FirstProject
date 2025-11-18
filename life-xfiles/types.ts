export interface UserData {
  birthDate: Date;
  currentAge: number; // 년
  ageInDays: number; // 일
  ageInHours: number; // 시간
  ageInMinutes: number; // 분
  ageInSeconds: number; // 초
}

export interface LifeStats {
  // 원자적 통계
  heartbeats: number;
  breaths: number;
  blinks: number;

  // 시간 통계
  sleepYears: number;
  workYears: number;
  phoneYears: number;
  eatingYears: number;
  commuteYears: number;
  bathroomYears: number;

  // 남은 시간 (80세 기준)
  remainingDays: number;
  remainingHours: number;
  remainingMinutes: number;
  remainingSeconds: number;

  // 물리적 통계
  mealsEaten: number;
  waterDrankLiters: number;
  distanceWalkedKm: number;

  // 디지털 통계
  scrollDistanceKm: number;
  tapsClicks: number;
}
