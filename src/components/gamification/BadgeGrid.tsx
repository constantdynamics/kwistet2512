import React from 'react';
import { motion } from 'framer-motion';
import { BADGE_DEFINITIONS } from '../../types';
import { useUser } from '../../contexts/UserContext';
import { BadgeDisplay } from '../ui/Badge';
import { Card } from '../ui';

export const BadgeGrid: React.FC = () => {
  const { badges, stats } = useUser();

  // Calculate progress for locked badges
  const getBadgeProgress = (badgeId: string): { progress: number; max: number } | null => {
    switch (badgeId) {
      case 'first-steps':
        return { progress: Math.min(1, stats.factsViewed), max: 1 };
      case 'quiz-master':
        return { progress: Math.min(1, stats.quizzesCompleted), max: 1 };
      case 'perfect-score':
        return { progress: Math.min(1, stats.quizzesPerfect), max: 1 };
      case 'streak-3':
        return { progress: Math.min(3, stats.currentStreak), max: 3 };
      case 'streak-7':
        return { progress: Math.min(7, stats.currentStreak), max: 7 };
      case 'streak-30':
        return { progress: Math.min(30, stats.currentStreak), max: 30 };
      case 'knowledge-seeker':
        return { progress: Math.min(100, stats.factsViewed), max: 100 };
      case 'knowledge-master':
        return { progress: Math.min(500, stats.factsViewed), max: 500 };
      default:
        // Category experts
        if (badgeId.startsWith('expert-')) {
          const category = badgeId.replace('expert-', '') as keyof typeof stats.categoryStats;
          const catStats = stats.categoryStats[category];
          if (catStats) {
            return { progress: Math.min(25, catStats.quizCorrect), max: 25 };
          }
        }
        return null;
    }
  };

  const unlockedIds = badges.map(b => b.id);

  return (
    <Card variant="elevated" padding="md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-bold text-white">
          Badges
        </h2>
        <span className="text-sm text-white/60">
          {badges.length}/{BADGE_DEFINITIONS.length} ontgrendeld
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {BADGE_DEFINITIONS.map((badge, index) => {
          const isUnlocked = unlockedIds.includes(badge.id);
          const unlockedBadge = badges.find(b => b.id === badge.id);
          const progress = getBadgeProgress(badge.id);

          const displayBadge = isUnlocked && unlockedBadge
            ? unlockedBadge
            : {
                ...badge,
                progress: progress?.progress,
                maxProgress: progress?.max,
              };

          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <BadgeDisplay
                badge={displayBadge}
                size="sm"
                showDetails={true}
                locked={!isUnlocked}
              />
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
};

export default BadgeGrid;
