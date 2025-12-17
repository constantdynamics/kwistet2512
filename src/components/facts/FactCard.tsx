import React from 'react';
import { motion } from 'framer-motion';
import type { Fact } from '../../types';
import { CATEGORY_ICONS, CATEGORY_LABELS } from '../../types';
import { Card } from '../ui';

interface FactCardProps {
  fact: Fact;
  onNext?: () => void;
}

export const FactCard: React.FC<FactCardProps> = ({ fact }) => {
  const difficultyConfig = {
    easy: { bg: 'bg-[#00FF41]/20', text: 'text-[#00FF41]', glow: 'shadow-[0_0_10px_rgba(0,255,65,0.5)]' },
    medium: { bg: 'bg-[#00FFFF]/20', text: 'text-[#00FFFF]', glow: 'shadow-[0_0_10px_rgba(0,255,255,0.5)]' },
    hard: { bg: 'bg-[#FF00FF]/20', text: 'text-[#FF00FF]', glow: 'shadow-[0_0_10px_rgba(255,0,255,0.5)]' },
  };

  const config = difficultyConfig[fact.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <Card variant="elevated" padding="lg" className="relative">
        {/* Animated corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-[#FF00FF]/50 rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-[#00FFFF]/50 rounded-br-2xl" />
        
        {/* Floating orb decorations */}
        <motion.div 
          className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#FF00FF]/20 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-[#00FFFF]/20 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.div
            className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-[#FF00FF]/20 to-[#8000FF]/20 rounded-full border border-[#FF00FF]/40 shadow-[0_0_15px_rgba(255,0,255,0.3)]"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-xl">{CATEGORY_ICONS[fact.category]}</span>
            <span className="text-sm font-semibold text-[#FF00FF] tracking-wide uppercase">
              {CATEGORY_LABELS[fact.category]}
            </span>
          </motion.div>

          <motion.div
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest ${config.bg} ${config.text} ${config.glow}`}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {fact.difficulty}
          </motion.div>
        </div>

        {/* Title */}
        <motion.h2
          className="text-2xl md:text-3xl font-display font-bold text-white mb-4 leading-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            textShadow: '0 0 30px rgba(255,0,255,0.3)',
          }}
        >
          {fact.title}
        </motion.h2>

        {/* Divider */}
        <motion.div 
          className="h-[2px] bg-gradient-to-r from-transparent via-[#00FFFF]/50 to-transparent mb-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />

        {/* Content */}
        <motion.p
          className="text-white/85 leading-relaxed text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          {fact.content}
        </motion.p>

        {/* Source */}
        {fact.source && (
          <motion.p
            className="mt-5 text-sm text-white/40 italic flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <span className="w-1 h-1 rounded-full bg-[#00FFFF]" />
            Bron: {fact.source}
          </motion.p>
        )}

        {/* Image */}
        {fact.imageUrl && (
          <motion.div
            className="mt-5 rounded-xl overflow-hidden border border-[#FF00FF]/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <img
              src={fact.imageUrl}
              alt={fact.title}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default FactCard;
