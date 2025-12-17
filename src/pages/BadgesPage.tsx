import React from 'react';
import { motion } from 'framer-motion';
import { BadgeGrid } from '../components/gamification';
import { useUser } from '../contexts/UserContext';
import { BADGE_DEFINITIONS } from '../types';

export const BadgesPage: React.FC = () => {
  const { badges } = useUser();

  const recentBadges = badges
    .filter(b => b.unlockedAt)
    .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-white">
          Badges & Achievements
        </h1>
        <p className="text-white/60 text-sm">
          {badges.length} van {BADGE_DEFINITIONS.length} badges ontgrendeld
        </p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        className="p-4 bg-gradient-to-r from-neon-pink/10 to-electric-purple/10 rounded-xl border border-neon-pink/20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/70 text-sm">Totale Voortgang</span>
          <span className="text-neon-pink font-mono text-sm">
            {((badges.length / BADGE_DEFINITIONS.length) * 100).toFixed(0)}%
          </span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan"
            initial={{ width: 0 }}
            animate={{ width: `${(badges.length / BADGE_DEFINITIONS.length) * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Recent Unlocks */}
      {recentBadges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-display font-semibold text-white mb-4">
            Recent Ontgrendeld
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recentBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                className="flex-shrink-0 flex items-center gap-3 p-3 bg-gradient-to-r from-vapor-success/10 to-vapor-success/5 rounded-lg border border-vapor-success/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <span className="text-3xl">{badge.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{badge.name}</p>
                  <p className="text-white/50 text-xs">
                    {badge.unlockedAt && new Date(badge.unlockedAt).toLocaleDateString('nl-NL')}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* All Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <BadgeGrid />
      </motion.div>

      {/* Tips */}
      <motion.div
        className="p-4 bg-white/5 rounded-lg border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div>
            <p className="text-white font-semibold text-sm mb-1">Tips om badges te verdienen</p>
            <ul className="text-xs text-white/60 space-y-1">
              <li>• Bekijk dagelijks feitjes om je streak te behouden</li>
              <li>• Doe quizzes om categorie expert te worden</li>
              <li>• Probeer een perfecte quiz score te halen</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BadgesPage;
