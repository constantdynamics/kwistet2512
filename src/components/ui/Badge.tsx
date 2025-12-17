import React from 'react';
import { motion } from 'framer-motion';
import type { Badge as BadgeType } from '../../types';

interface BadgeProps {
  badge: BadgeType;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  locked?: boolean;
  onClick?: () => void;
}

export const BadgeDisplay: React.FC<BadgeProps> = ({
  badge,
  size = 'md',
  showDetails = false,
  locked = false,
  onClick,
}) => {
  const sizeStyles = {
    sm: 'w-12 h-12 text-xl',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-24 h-24 text-4xl',
  };

  return (
    <motion.div
      className={`
        flex flex-col items-center gap-2
        ${onClick ? 'cursor-pointer' : ''}
      `}
      whileHover={onClick ? { scale: 1.05 } : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
      onClick={onClick}
    >
      {/* Badge Icon */}
      <motion.div
        className={`
          ${sizeStyles[size]}
          flex items-center justify-center
          rounded-full
          ${locked
            ? 'bg-white/5 border-2 border-white/10 grayscale'
            : 'bg-gradient-to-br from-neon-pink/30 to-electric-purple/30 border-2 border-neon-pink/50 shadow-[0_0_20px_rgba(255,0,255,0.3)]'
          }
          transition-all duration-300
        `}
        initial={!locked ? { scale: 0 } : undefined}
        animate={!locked ? { scale: 1 } : undefined}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <span className={locked ? 'opacity-30' : ''}>
          {badge.icon}
        </span>
      </motion.div>

      {/* Badge Info */}
      {showDetails && (
        <div className="text-center">
          <h4 className={`
            font-display font-semibold
            ${locked ? 'text-white/40' : 'text-white'}
            ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'}
          `}>
            {badge.name}
          </h4>
          <p className={`
            text-white/50
            ${size === 'sm' ? 'text-[10px]' : 'text-xs'}
            max-w-[120px]
          `}>
            {badge.description}
          </p>
          {badge.unlockedAt && (
            <p className="text-xs text-neon-cyan/60 mt-1">
              {new Date(badge.unlockedAt).toLocaleDateString('nl-NL')}
            </p>
          )}
        </div>
      )}

      {/* Progress indicator for locked badges */}
      {locked && badge.progress !== undefined && badge.maxProgress !== undefined && (
        <div className="w-full max-w-[80px]">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/30 rounded-full transition-all duration-300"
              style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
            />
          </div>
          <p className="text-[10px] text-white/40 text-center mt-0.5">
            {badge.progress}/{badge.maxProgress}
          </p>
        </div>
      )}
    </motion.div>
  );
};

// Badge unlock animation component
interface BadgeUnlockProps {
  badge: BadgeType;
  onComplete?: () => void;
}

export const BadgeUnlockAnimation: React.FC<BadgeUnlockProps> = ({
  badge,
  onComplete,
}) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-deep-purple/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onComplete}
    >
      <motion.div
        className="flex flex-col items-center gap-6 p-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-neon-pink/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <motion.p
          className="text-neon-cyan font-display text-sm tracking-[0.3em] uppercase"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Badge Ontgrendeld!
        </motion.p>

        <motion.div
          className="w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-br from-neon-pink/40 to-electric-purple/40 border-4 border-neon-pink shadow-[0_0_60px_rgba(255,0,255,0.5)]"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
        >
          <span className="text-6xl">{badge.icon}</span>
        </motion.div>

        <motion.h3
          className="text-2xl font-display font-bold text-white neon-text-pink"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {badge.name}
        </motion.h3>

        <motion.p
          className="text-white/70 text-center max-w-xs"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {badge.description}
        </motion.p>

        <motion.button
          className="mt-4 px-8 py-3 bg-gradient-to-r from-neon-pink to-electric-purple rounded-lg font-display text-white shadow-neon-pink"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
        >
          Geweldig!
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default BadgeDisplay;
