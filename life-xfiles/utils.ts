import { UserData, LifeStats } from './types';

// 생년월일로 UserData 계산
export function calculateUserData(birthDate: Date): UserData {
  const now = new Date();
  const ageInMs = now.getTime() - birthDate.getTime();

  const ageInSeconds = Math.floor(ageInMs / 1000);
  const ageInMinutes = Math.floor(ageInSeconds / 60);
  const ageInHours = Math.floor(ageInMinutes / 60);
  const ageInDays = Math.floor(ageInHours / 24);
  const currentAge = Math.floor(ageInDays / 365.25);

  return {
    birthDate,
    currentAge,
    ageInDays,
    ageInHours,
    ageInMinutes,
    ageInSeconds,
  };
}

// 인생 통계 계산
export function calculateLifeStats(userData: UserData): LifeStats {
  const { ageInDays, ageInHours, ageInMinutes, ageInSeconds, currentAge } = userData;

  // 원자적 통계
  const heartbeats = ageInMinutes * 72; // 분당 72회
  const breaths = ageInMinutes * 16; // 분당 16회
  const blinks = ageInMinutes * 17; // 분당 17회

  // 시간 통계 (평균 기준)
  const sleepYears = (ageInDays * 8) / 365 / 24; // 하루 8시간
  const workYears = (ageInDays * 8) / 365 / 24 * 0.6; // 인생의 60% 일함
  const phoneYears = (ageInDays * 5) / 365 / 24; // 하루 5시간
  const eatingYears = (ageInDays * 2) / 365 / 24; // 하루 2시간
  const commuteYears = (ageInDays * 1) / 365 / 24; // 하루 1시간
  const bathroomYears = (ageInDays * 0.5) / 365 / 24; // 하루 30분

  // 남은 시간 (80세 기준)
  const lifeExpectancyDays = 80 * 365;
  const remainingDays = Math.max(0, lifeExpectancyDays - ageInDays);
  const remainingHours = remainingDays * 24;
  const remainingMinutes = remainingHours * 60;
  const remainingSeconds = remainingMinutes * 60;

  // 물리적 통계
  const mealsEaten = ageInDays * 3; // 하루 3끼
  const waterDrankLiters = ageInDays * 2; // 하루 2L
  const distanceWalkedKm = ageInDays * 5; // 하루 5km (약 6000보)

  // 디지털 통계
  const scrollDistanceKm = (ageInDays * 150) / 1000; // 하루 150m 스크롤
  const tapsClicks = ageInDays * 2500; // 하루 2500번 클릭/탭

  return {
    heartbeats,
    breaths,
    blinks,
    sleepYears,
    workYears,
    phoneYears,
    eatingYears,
    commuteYears,
    bathroomYears,
    remainingDays,
    remainingHours,
    remainingMinutes,
    remainingSeconds,
    mealsEaten,
    waterDrankLiters,
    distanceWalkedKm,
    scrollDistanceKm,
    tapsClicks,
  };
}

// 숫자 포맷팅 (천단위 콤마)
export function formatNumber(num: number): string {
  return Math.floor(num).toLocaleString('ko-KR');
}

// 소수점 포맷팅
export function formatDecimal(num: number, decimals: number = 1): string {
  return num.toFixed(decimals);
}
