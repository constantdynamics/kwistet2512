import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES, CATEGORY_ICONS, CATEGORY_LABELS } from '../../types';
import { useUser } from '../../contexts/UserContext';
import { Card, ProgressBar } from '../ui';

export const CategoryProgress: React.FC = () => {
  const { stats } = useUser();

  return (
    <Card variant="elevated" padding="md">
      <h2 className="font-display text-xl font-bold text-white mb-6">
        Categorie Voortgang
      </h2>

      <div className="space-y-4">
        {CATEGORIES.map((category, index) => {
          const catStats = stats.categoryStats[category];
          const expertProgress = Math.min(25, catStats.quizCorrect);

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span>{CATEGORY_ICONS[category]}</span>
                  <span className="text-white text-sm font-medium">
                    {CATEGORY_LABELS[category]}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-white/50">
                    {catStats.factsViewed} feitjes
                  </span>
                  {catStats.quizTotal > 0 && (
                    <span className="text-neon-cyan">
                      {catStats.accuracy.toFixed(0)}% nauwkeurig
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <ProgressBar
                    value={expertProgress}
                    max={25}
                    size="sm"
                    variant={expertProgress >= 25 ? 'success' : 'default'}
                  />
                </div>
                <span className="text-xs text-white/40 w-12 text-right">
                  {expertProgress}/25
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-white/40 text-center">
        Behaal 25 correcte antwoorden per categorie om Expert te worden
      </p>
    </Card>
  );
};

export default CategoryProgress;
