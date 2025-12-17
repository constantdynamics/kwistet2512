import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'xp';
  animated?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  showLabel = false,
  size = 'md',
  variant = 'default',
  animated = true,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const gradientStyles = {
    default: 'from-neon-pink via-electric-purple to-neon-cyan',
    success: 'from-vapor-success to-vapor-success-light',
    xp: 'from-neon-cyan via-neon-pink to-electric-purple',
  };

  return (
    <div className={`relative ${className}`}>
      {/* Background track */}
      <div
        className={`
          w-full ${sizeStyles[size]}
          bg-white/10 rounded-full
          overflow-hidden
        `}
      >
        {/* Progress fill */}
        <motion.div
          className={`
            h-full rounded-full
            bg-gradient-to-r ${gradientStyles[variant]}
          `}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: animated ? 0.5 : 0,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </div>

      {/* Glow effect */}
      <motion.div
        className={`
          absolute top-0 left-0
          h-full rounded-full
          bg-gradient-to-r ${gradientStyles[variant]}
          blur-sm opacity-50
          pointer-events-none
        `}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{
          duration: animated ? 0.5 : 0,
          ease: [0.4, 0, 0.2, 1],
        }}
      />

      {/* Label */}
      {showLabel && (
        <div className="flex justify-between items-center mt-1 text-xs text-white/60">
          <span>{value.toLocaleString()}</span>
          <span>{max.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
