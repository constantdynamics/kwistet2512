import type { UserStats, UserPreferences, ViewedFact, QuizSession, Badge, Category, DEFAULT_PREFERENCES } from '../types';

const STORAGE_KEYS = {
  USER_STATS: 'kw_user_stats',
  USER_PREFERENCES: 'kw_user_preferences',
  VIEWED_FACTS: 'kw_viewed_facts',
  QUIZ_HISTORY: 'kw_quiz_history',
  LAST_QUIZ_TIME: 'kw_last_quiz_time',
  BADGES: 'kw_badges',
} as const;

// Initialize default stats
const getDefaultStats = (): UserStats => ({
  totalPoints: 0,
  level: 1,
  currentLevelProgress: 0,
  pointsToNextLevel: 500,
  factsViewed: 0,
  factsViewedToday: 0,
  quizzesCompleted: 0,
  quizzesPerfect: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: '',
  categoryStats: {
    geschiedenis: { factsViewed: 0, quizCorrect: 0, quizTotal: 0, accuracy: 0 },
    wetenschap: { factsViewed: 0, quizCorrect: 0, quizTotal: 0, accuracy: 0 },
    sport: { factsViewed: 0, quizCorrect: 0, quizTotal: 0, accuracy: 0 },
    entertainment: { factsViewed: 0, quizCorrect: 0, quizTotal: 0, accuracy: 0 },
    'kunst-cultuur': { factsViewed: 0, quizCorrect: 0, quizTotal: 0, accuracy: 0 },
    spelling: { factsViewed: 0, quizCorrect: 0, quizTotal: 0, accuracy: 0 },
    biologie: { factsViewed: 0, quizCorrect: 0, quizTotal: 0, accuracy: 0 },
    geografie: { factsViewed: 0, quizCorrect: 0, quizTotal: 0, accuracy: 0 },
  },
});

// Generic storage helpers
const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save to localStorage: ${key}`, error);
  }
};

// User Stats
export const getUserStats = (): UserStats => {
  return getItem(STORAGE_KEYS.USER_STATS, getDefaultStats());
};

export const saveUserStats = (stats: UserStats): void => {
  setItem(STORAGE_KEYS.USER_STATS, stats);
};

export const updateUserStats = (updates: Partial<UserStats>): UserStats => {
  const current = getUserStats();
  const updated = { ...current, ...updates };
  saveUserStats(updated);
  return updated;
};

// User Preferences
export const getUserPreferences = (): UserPreferences => {
  const defaultPrefs: UserPreferences = {
    selectedCategories: ['geschiedenis', 'wetenschap', 'sport', 'entertainment', 'kunst-cultuur', 'spelling', 'biologie', 'geografie'],
    soundEnabled: true,
    notificationsEnabled: false,
    theme: 'dark',
    dailyGoal: 5,
  };
  return getItem(STORAGE_KEYS.USER_PREFERENCES, defaultPrefs);
};

export const saveUserPreferences = (prefs: UserPreferences): void => {
  setItem(STORAGE_KEYS.USER_PREFERENCES, prefs);
};

// Viewed Facts
export const getViewedFacts = (): ViewedFact[] => {
  return getItem(STORAGE_KEYS.VIEWED_FACTS, []);
};

export const addViewedFact = (factId: string, category: Category): void => {
  const viewed = getViewedFacts();
  const newViewed: ViewedFact = {
    factId,
    viewedAt: new Date().toISOString(),
    category,
  };
  viewed.push(newViewed);
  setItem(STORAGE_KEYS.VIEWED_FACTS, viewed);
};

export const getRecentViewedFacts = (count: number = 100): ViewedFact[] => {
  const viewed = getViewedFacts();
  return viewed.slice(-count);
};

export const getTodayFactCount = (): number => {
  const viewed = getViewedFacts();
  const today = new Date().toDateString();
  return viewed.filter(v => new Date(v.viewedAt).toDateString() === today).length;
};

// Quiz History
export const getQuizHistory = (): QuizSession[] => {
  return getItem(STORAGE_KEYS.QUIZ_HISTORY, []);
};

export const saveQuizSession = (session: QuizSession): void => {
  const history = getQuizHistory();
  history.push(session);
  setItem(STORAGE_KEYS.QUIZ_HISTORY, history);
  setItem(STORAGE_KEYS.LAST_QUIZ_TIME, new Date().toISOString());
};

export const getLastQuizTime = (): string | null => {
  return getItem(STORAGE_KEYS.LAST_QUIZ_TIME, null);
};

// Badges
export const getUnlockedBadges = (): Badge[] => {
  return getItem(STORAGE_KEYS.BADGES, []);
};

export const unlockBadge = (badge: Badge): void => {
  const badges = getUnlockedBadges();
  if (!badges.find(b => b.id === badge.id)) {
    badges.push({ ...badge, unlockedAt: new Date().toISOString() });
    setItem(STORAGE_KEYS.BADGES, badges);
  }
};

export const isBadgeUnlocked = (badgeId: string): boolean => {
  const badges = getUnlockedBadges();
  return badges.some(b => b.id === badgeId);
};

// Streak Management
export const checkAndUpdateStreak = (): { streak: number; isNewDay: boolean; bonusEarned: boolean } => {
  const stats = getUserStats();
  const today = new Date().toDateString();
  const lastActive = stats.lastActiveDate ? new Date(stats.lastActiveDate).toDateString() : '';

  let newStreak = stats.currentStreak;
  let isNewDay = false;
  let bonusEarned = false;

  if (lastActive !== today) {
    isNewDay = true;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastActive === yesterday.toDateString()) {
      // Consecutive day
      newStreak = stats.currentStreak + 1;
      bonusEarned = true;
    } else if (lastActive === '') {
      // First activity
      newStreak = 1;
    } else {
      // Streak broken
      newStreak = 1;
    }

    updateUserStats({
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, stats.longestStreak),
      lastActiveDate: new Date().toISOString(),
      factsViewedToday: 0,
    });
  }

  return { streak: newStreak, isNewDay, bonusEarned };
};

// Clear all data (for testing/reset)
export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};
