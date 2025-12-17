import React from 'react';
import { motion } from 'framer-motion';
import { Card, ProgressBar } from '../ui';
import { useUser } from '../../contexts/UserContext';

export const StatsCard: React.FC = () => {
  const { stats } = useUser();

  const statItems = [
    { label: 'Feitjes Bekeken', value: stats.factsViewed, icon: '📚' },
    { label: 'Quizzes Voltooid', value: stats.quizzesCompleted, icon: '🎯' },
    { label: 'Perfecte Scores', value: stats.quizzesPerfect, icon: '💯' },
    { label: 'Langste Streak', value: stats.longestStreak, icon: '🏆' },
  ];

  return (
    <Card variant="elevated" padding="md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">
            Level {stats.level}
          </h2>
          <p className="text-white/60 text-sm">
            {stats.totalPoints.toLocaleString()} totale punten
          </p>
        </div>
        <motion.div
          className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-neon-pink/30 to-electric-purple/30 border-2 border-neon-pink/50"
          animate={{
            boxShadow: [
              '0 0 20px rgba(255, 0, 255, 0.3)',
              '0 0 40px rgba(255, 0, 255, 0.5)',
              '0 0 20px rgba(255, 0, 255, 0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-2xl font-display font-black text-white">
            {stats.level}
          </span>
        </motion.div>
      </div>

      {/* Level Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/60">Level Voortgang</span>
          <span className="text-neon-cyan font-mono">
            {stats.currentLevelProgress.toLocaleString()} / {(stats.currentLevelProgress + stats.pointsToNextLevel).toLocaleString()}
          </span>
        </div>
        <ProgressBar
          value={stats.currentLevelProgress}
          max={stats.currentLevelProgress + stats.pointsToNextLevel}
          size="md"
          variant="xp"
        />
      </div>

      {/* Streak */}
      {stats.currentStreak > 0 && (
        <motion.div
          className="mb-6 p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="flex items-center gap-3">
            <motion.span
              className="text-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🔥
            </motion.span>
            <div>
              <p className="text-white font-semibold">
                {stats.currentStreak} dagen streak!
              </p>
              <p className="text-white/60 text-sm">
                Blijf dagelijks leren voor bonuspunten
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            className="p-3 bg-white/5 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span>{item.icon}</span>
              <span className="text-white/60 text-xs">{item.label}</span>
            </div>
            <p className="text-xl font-display font-bold text-white">
              {item.value.toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default StatsCard;
