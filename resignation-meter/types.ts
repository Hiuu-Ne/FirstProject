export interface QuizOption {
  text: string;
  score: number;
  emoji?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  emoji: string;
  options: QuizOption[];
}

export interface ResultData {
  percentage: number;
  title: string;
  message: string;
  emoji: string;
  color: string;
  advice: string;
}
