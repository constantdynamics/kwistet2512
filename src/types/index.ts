// Category Types
export type Category =
  | 'geschiedenis'
  | 'wetenschap'
  | 'sport'
  | 'entertainment'
  | 'kunst-cultuur'
  | 'spelling'
  | 'biologie'
  | 'geografie';

export const CATEGORIES: Category[] = [
  'geschiedenis',
  'wetenschap',
  'sport',
  'entertainment',
  'kunst-cultuur',
  'spelling',
  'biologie',
  'geografie',
];

export const CATEGORY_LABELS: Record<Category, string> = {
  geschiedenis: 'Geschiedenis',
  wetenschap: 'Wetenschap',
  sport: 'Sport',
  entertainment: 'Entertainment',
  'kunst-cultuur': 'Kunst & Cultuur',
  spelling: 'Spelling',
  biologie: 'Biologie',
  geografie: 'Geografie',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  geschiedenis: '📜',
  wetenschap: '🔬',
  sport: '⚽',
  entertainment: '🎬',
  'kunst-cultuur': '🎨',
  spelling: '📝',
  biologie: '🧬',
  geografie: '🌍',
};

// Fact Types
export interface Fact {
  id: string;
  category: Category;
  title: string;
  content: string;
  source?: string;
  imageUrl?: string;
  createdAt: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ViewedFact {
  factId: string;
  viewedAt: string;
  category: Category;
}

// Quiz Types
export type QuizFormat =
  | 'multiple-choice'
  | 'true-false'
  | 'multiple-correct'
  | 'best-answer'
  | 'closest-estimate'
  | 'complete-statement'
  | 'definition-matching'
  | 'cause-effect'
  | 'exception-finding'
  | 'category-classification'
  | 'timeline-sort'
  | 'before-after'
  | 'size-ordering'
  | 'image-recognition'
  | 'image-zoom'
  | 'drag-drop-sort';

export interface QuizQuestion {
  id: string;
  factId: string;
  category: Category;
  format: QuizFormat;
  question: string;
  options: QuizOption[];
  correctAnswer: number | number[];
  explanation?: string;
  imageUrl?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number;
}

export interface QuizOption {
  id: string;
  text: string;
  imageUrl?: string;
}

export interface QuizSession {
  id: string;
  questions: QuizQuestion[];
  currentIndex: number;
  answers: QuizAnswer[];
  startedAt: string;
  completedAt?: string;
  score: number;
  perfectScore: boolean;
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: number | number[];
  isCorrect: boolean;
  answeredAt: string;
  timeSpent: number;
}

// Gamification Types
export interface UserStats {
  totalPoints: number;
  level: number;
  currentLevelProgress: number;
  pointsToNextLevel: number;
  factsViewed: number;
  factsViewedToday: number;
  quizzesCompleted: number;
  quizzesPerfect: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  categoryStats: Record<Category, CategoryStats>;
}

export interface CategoryStats {
  factsViewed: number;
  quizCorrect: number;
  quizTotal: number;
  accuracy: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
  category?: Category;
}

export const BADGE_DEFINITIONS: Badge[] = [
  { id: 'first-steps', name: 'Eerste Stappen', description: 'Bekijk je eerste feitje', icon: '👶' },
  { id: 'quiz-master', name: 'Quiz Master', description: 'Voltooi je eerste quiz', icon: '🎯' },
  { id: 'perfect-score', name: 'Perfecte Score', description: 'Haal 100% op een quiz', icon: '💯' },
  { id: 'streak-3', name: 'Streak Starter', description: '3 dagen op rij actief', icon: '🔥' },
  { id: 'streak-7', name: 'Streak Master', description: '7 dagen op rij actief', icon: '🏆' },
  { id: 'streak-30', name: 'Streak Legend', description: '30 dagen op rij actief', icon: '👑' },
  { id: 'knowledge-seeker', name: 'Kenniszoeker', description: 'Bekijk 100 feitjes', icon: '📚' },
  { id: 'knowledge-master', name: 'Kennismeester', description: 'Bekijk 500 feitjes', icon: '🎓' },
  { id: 'expert-geschiedenis', name: 'Geschiedenis Expert', description: '25 correcte antwoorden in Geschiedenis', icon: '📜', category: 'geschiedenis' },
  { id: 'expert-wetenschap', name: 'Wetenschap Expert', description: '25 correcte antwoorden in Wetenschap', icon: '🔬', category: 'wetenschap' },
  { id: 'expert-sport', name: 'Sport Expert', description: '25 correcte antwoorden in Sport', icon: '⚽', category: 'sport' },
  { id: 'expert-entertainment', name: 'Entertainment Expert', description: '25 correcte antwoorden in Entertainment', icon: '🎬', category: 'entertainment' },
  { id: 'expert-kunst-cultuur', name: 'Kunst & Cultuur Expert', description: '25 correcte antwoorden in Kunst & Cultuur', icon: '🎨', category: 'kunst-cultuur' },
  { id: 'expert-spelling', name: 'Spelling Expert', description: '25 correcte antwoorden in Spelling', icon: '📝', category: 'spelling' },
  { id: 'expert-biologie', name: 'Biologie Expert', description: '25 correcte antwoorden in Biologie', icon: '🧬', category: 'biologie' },
  { id: 'expert-geografie', name: 'Geografie Expert', description: '25 correcte antwoorden in Geografie', icon: '🌍', category: 'geografie' },
];

// Level Thresholds
export const LEVEL_THRESHOLDS = [
  { level: 1, minPoints: 0, maxPoints: 500 },
  { level: 2, minPoints: 500, maxPoints: 1200 },
  { level: 3, minPoints: 1200, maxPoints: 2500 },
  { level: 4, minPoints: 2500, maxPoints: 5000 },
  { level: 5, minPoints: 5000, maxPoints: 10000 },
];

export const getLevel = (points: number): number => {
  if (points >= 10000) {
    return 6 + Math.floor((points - 10000) / 10000);
  }
  const threshold = LEVEL_THRESHOLDS.find(t => points >= t.minPoints && points < t.maxPoints);
  return threshold?.level ?? 1;
};

export const getLevelProgress = (points: number): { current: number; max: number; percentage: number } => {
  if (points >= 10000) {
    const overBase = points - 10000;
    const current = overBase % 10000;
    return { current, max: 10000, percentage: (current / 10000) * 100 };
  }
  const threshold = LEVEL_THRESHOLDS.find(t => points >= t.minPoints && points < t.maxPoints);
  if (!threshold) return { current: 0, max: 500, percentage: 0 };
  const current = points - threshold.minPoints;
  const max = threshold.maxPoints - threshold.minPoints;
  return { current, max, percentage: (current / max) * 100 };
};

// Points Configuration
export const POINTS = {
  FACT_VIEW: 10,
  QUIZ_CORRECT: 50,
  QUIZ_PERFECT_BONUS: 200,
  DAILY_STREAK: 25,
  HINT_PENALTY: -15,
};

// User Preferences
export interface UserPreferences {
  selectedCategories: Category[];
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  theme: 'dark' | 'light';
  dailyGoal: number;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  selectedCategories: [...CATEGORIES],
  soundEnabled: true,
  notificationsEnabled: false,
  theme: 'dark',
  dailyGoal: 5,
};

// Quiz Availability
export interface QuizAvailability {
  canTakeQuiz: boolean;
  reason?: string;
  nextAvailableAt?: string;
  factsNeeded?: number;
}

export const QUIZ_REQUIREMENTS = {
  MIN_LIFETIME_FACTS: 100,
  COOLDOWN_HOURS: 8,
  FACTS_PER_QUIZ: 10,
};
