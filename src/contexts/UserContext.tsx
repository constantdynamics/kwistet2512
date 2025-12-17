import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { UserStats, UserPreferences, Badge, Category } from '../types';
import { POINTS, getLevel, getLevelProgress, BADGE_DEFINITIONS } from '../types';
import {
  getUserStats,
  saveUserStats,
  getUserPreferences,
  saveUserPreferences,
  checkAndUpdateStreak,
  getUnlockedBadges,
  unlockBadge,
  isBadgeUnlocked,
} from '../utils/storage';
import { soundManager } from '../utils/sounds';

interface UserContextType {
  stats: UserStats;
  preferences: UserPreferences;
  badges: Badge[];
  addPoints: (amount: number, reason?: string) => void;
  recordFactView: (category: Category) => void;
  recordQuizAnswer: (category: Category, isCorrect: boolean) => void;
  recordQuizComplete: (isPerfect: boolean) => void;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  checkForNewBadges: () => Badge[];
  refreshStats: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<UserStats>(getUserStats);
  const [preferences, setPreferences] = useState<UserPreferences>(getUserPreferences);
  const [badges, setBadges] = useState<Badge[]>(getUnlockedBadges);

  // Check streak on mount
  useEffect(() => {
    const { streak, isNewDay, bonusEarned } = checkAndUpdateStreak();
    if (bonusEarned) {
      addPoints(POINTS.DAILY_STREAK, 'streak bonus');
    }
    refreshStats();
  }, []);

  const refreshStats = useCallback(() => {
    const currentStats = getUserStats();
    // Recalculate level and progress
    currentStats.level = getLevel(currentStats.totalPoints);
    const progress = getLevelProgress(currentStats.totalPoints);
    currentStats.currentLevelProgress = progress.current;
    currentStats.pointsToNextLevel = progress.max - progress.current;
    setStats(currentStats);
    setBadges(getUnlockedBadges());
  }, []);

  const addPoints = useCallback((amount: number, reason?: string) => {
    setStats(prev => {
      const newPoints = Math.max(0, prev.totalPoints + amount);
      const newLevel = getLevel(newPoints);
      const progress = getLevelProgress(newPoints);

      // Check for level up
      if (newLevel > prev.level) {
        soundManager.playLevelUp();
      }

      const updated: UserStats = {
        ...prev,
        totalPoints: newPoints,
        level: newLevel,
        currentLevelProgress: progress.current,
        pointsToNextLevel: progress.max - progress.current,
      };

      saveUserStats(updated);
      return updated;
    });
  }, []);

  const recordFactView = useCallback((category: Category) => {
    setStats(prev => {
      const updated: UserStats = {
        ...prev,
        factsViewed: prev.factsViewed + 1,
        factsViewedToday: prev.factsViewedToday + 1,
        lastActiveDate: new Date().toISOString(),
        categoryStats: {
          ...prev.categoryStats,
          [category]: {
            ...prev.categoryStats[category],
            factsViewed: prev.categoryStats[category].factsViewed + 1,
          },
        },
      };

      // Add points for viewing fact
      updated.totalPoints = prev.totalPoints + POINTS.FACT_VIEW;
      updated.level = getLevel(updated.totalPoints);
      const progress = getLevelProgress(updated.totalPoints);
      updated.currentLevelProgress = progress.current;
      updated.pointsToNextLevel = progress.max - progress.current;

      saveUserStats(updated);
      return updated;
    });

    // Check for new badges after recording
    setTimeout(() => checkForNewBadges(), 100);
  }, []);

  const recordQuizAnswer = useCallback((category: Category, isCorrect: boolean) => {
    setStats(prev => {
      const catStats = prev.categoryStats[category];
      const newCorrect = catStats.quizCorrect + (isCorrect ? 1 : 0);
      const newTotal = catStats.quizTotal + 1;

      const updated: UserStats = {
        ...prev,
        categoryStats: {
          ...prev.categoryStats,
          [category]: {
            ...catStats,
            quizCorrect: newCorrect,
            quizTotal: newTotal,
            accuracy: newTotal > 0 ? (newCorrect / newTotal) * 100 : 0,
          },
        },
      };

      if (isCorrect) {
        updated.totalPoints = prev.totalPoints + POINTS.QUIZ_CORRECT;
        updated.level = getLevel(updated.totalPoints);
        const progress = getLevelProgress(updated.totalPoints);
        updated.currentLevelProgress = progress.current;
        updated.pointsToNextLevel = progress.max - progress.current;
      }

      saveUserStats(updated);
      return updated;
    });
  }, []);

  const recordQuizComplete = useCallback((isPerfect: boolean) => {
    setStats(prev => {
      const updated: UserStats = {
        ...prev,
        quizzesCompleted: prev.quizzesCompleted + 1,
        quizzesPerfect: prev.quizzesPerfect + (isPerfect ? 1 : 0),
      };

      if (isPerfect) {
        updated.totalPoints = prev.totalPoints + POINTS.QUIZ_PERFECT_BONUS;
        updated.level = getLevel(updated.totalPoints);
        const progress = getLevelProgress(updated.totalPoints);
        updated.currentLevelProgress = progress.current;
        updated.pointsToNextLevel = progress.max - progress.current;
      }

      saveUserStats(updated);
      return updated;
    });

    setTimeout(() => checkForNewBadges(), 100);
  }, []);

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...updates };
      saveUserPreferences(updated);

      // Update sound manager
      if (updates.soundEnabled !== undefined) {
        soundManager.setEnabled(updates.soundEnabled);
      }

      return updated;
    });
  }, []);

  const checkForNewBadges = useCallback((): Badge[] => {
    const newBadges: Badge[] = [];
    const currentStats = getUserStats();

    // First Steps
    if (!isBadgeUnlocked('first-steps') && currentStats.factsViewed >= 1) {
      const badge = BADGE_DEFINITIONS.find(b => b.id === 'first-steps')!;
      unlockBadge(badge);
      newBadges.push(badge);
    }

    // Quiz Master
    if (!isBadgeUnlocked('quiz-master') && currentStats.quizzesCompleted >= 1) {
      const badge = BADGE_DEFINITIONS.find(b => b.id === 'quiz-master')!;
      unlockBadge(badge);
      newBadges.push(badge);
    }

    // Perfect Score
    if (!isBadgeUnlocked('perfect-score') && currentStats.quizzesPerfect >= 1) {
      const badge = BADGE_DEFINITIONS.find(b => b.id === 'perfect-score')!;
      unlockBadge(badge);
      newBadges.push(badge);
    }

    // Streak badges
    if (!isBadgeUnlocked('streak-3') && currentStats.currentStreak >= 3) {
      const badge = BADGE_DEFINITIONS.find(b => b.id === 'streak-3')!;
      unlockBadge(badge);
      newBadges.push(badge);
    }

    if (!isBadgeUnlocked('streak-7') && currentStats.currentStreak >= 7) {
      const badge = BADGE_DEFINITIONS.find(b => b.id === 'streak-7')!;
      unlockBadge(badge);
      newBadges.push(badge);
    }

    if (!isBadgeUnlocked('streak-30') && currentStats.currentStreak >= 30) {
      const badge = BADGE_DEFINITIONS.find(b => b.id === 'streak-30')!;
      unlockBadge(badge);
      newBadges.push(badge);
    }

    // Knowledge Seeker
    if (!isBadgeUnlocked('knowledge-seeker') && currentStats.factsViewed >= 100) {
      const badge = BADGE_DEFINITIONS.find(b => b.id === 'knowledge-seeker')!;
      unlockBadge(badge);
      newBadges.push(badge);
    }

    // Knowledge Master
    if (!isBadgeUnlocked('knowledge-master') && currentStats.factsViewed >= 500) {
      const badge = BADGE_DEFINITIONS.find(b => b.id === 'knowledge-master')!;
      unlockBadge(badge);
      newBadges.push(badge);
    }

    // Category experts
    const categories = Object.keys(currentStats.categoryStats) as Category[];
    categories.forEach(category => {
      const badgeId = `expert-${category}`;
      if (!isBadgeUnlocked(badgeId) && currentStats.categoryStats[category].quizCorrect >= 25) {
        const badge = BADGE_DEFINITIONS.find(b => b.id === badgeId);
        if (badge) {
          unlockBadge(badge);
          newBadges.push(badge);
        }
      }
    });

    // Play sound and update state if new badges unlocked
    if (newBadges.length > 0) {
      soundManager.playBadgeUnlock();
      setBadges(getUnlockedBadges());
    }

    return newBadges;
  }, []);

  // Initialize sound manager with preference
  useEffect(() => {
    soundManager.setEnabled(preferences.soundEnabled);
  }, [preferences.soundEnabled]);

  return (
    <UserContext.Provider
      value={{
        stats,
        preferences,
        badges,
        addPoints,
        recordFactView,
        recordQuizAnswer,
        recordQuizComplete,
        updatePreferences,
        checkForNewBadges,
        refreshStats,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
