import React from 'react';
import { motion } from 'framer-motion';
import type { Fact } from '../../types';
import { CATEGORY_ICONS, CATEGORY_LABELS } from '../../types';
import { Card } from '../ui';

interface FactCardProps {
  fact: Fact;
  onNext?: () => void;
}

export const FactCard: React.FC<FactCardProps> = ({ fact, onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card variant="elevated" padding="lg" className="relative overflow-hidden">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-neon-pink/20 to-electric-purple/20 rounded-full border border-neon-pink/30"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-lg">{CATEGORY_ICONS[fact.category]}</span>
            <span className="text-sm font-medium text-neon-pink">
              {CATEGORY_LABELS[fact.category]}
            </span>
          </motion.div>

          {/* Difficulty indicator */}
          <motion.div
            className={`
              px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider
              ${fact.difficulty === 'easy' ? 'bg-vapor-success/20 text-vapor-success' : ''}
              ${fact.difficulty === 'medium' ? 'bg-neon-cyan/20 text-neon-cyan' : ''}
              ${fact.difficulty === 'hard' ? 'bg-neon-pink/20 text-neon-pink' : ''}
            `}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {fact.difficulty}
          </motion.div>
        </div>

        {/* Title */}
        <motion.h2
          className="text-2xl font-display font-bold text-white mb-4 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {fact.title}
        </motion.h2>

        {/* Content */}
        <motion.p
          className="text-white/80 leading-relaxed text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ lineHeight: 1.6 }}
        >
          {fact.content}
        </motion.p>

        {/* Source */}
        {fact.source && (
          <motion.p
            className="mt-4 text-sm text-white/40 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Bron: {fact.source}
          </motion.p>
        )}

        {/* Image */}
        {fact.imageUrl && (
          <motion.div
            className="mt-4 rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <img
              src={fact.imageUrl}
              alt={fact.title}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </motion.div>
        )}

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-neon-pink/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-neon-cyan/10 to-transparent rounded-full blur-2xl pointer-events-none" />
      </Card>
    </motion.div>
  );
};

export default FactCard;
