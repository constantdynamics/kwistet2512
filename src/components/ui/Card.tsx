import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'elevated' | 'gradient' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  glowColor?: 'pink' | 'cyan' | 'purple' | 'success';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  interactive = false,
  glowColor = 'pink',
  children,
  className = '',
  ...props
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const glowStyles = {
    pink: 'hover:shadow-[0_0_40px_rgba(255,0,255,0.4)] hover:border-[#FF00FF]/60',
    cyan: 'hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] hover:border-[#00FFFF]/60',
    purple: 'hover:shadow-[0_0_40px_rgba(128,0,255,0.4)] hover:border-[#8000FF]/60',
    success: 'hover:shadow-[0_0_40px_rgba(0,255,65,0.4)] hover:border-[#00FF41]/60',
  };

  const baseStyles = `
    relative overflow-hidden
    bg-[#1A0B2E]/80 backdrop-blur-xl
    border border-[#FF00FF]/30
    rounded-2xl
    transition-all duration-300 ease-out
    ${interactive ? glowStyles[glowColor] : ''}
  `;

  const variantStyles = {
    default: '',
    elevated: 'shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_20px_rgba(255,0,255,0.15)]',
    gradient: 'bg-gradient-to-br from-[#1A0B2E]/90 to-[#2D1B69]/90',
    glass: 'glass-card',
  };

  return (
    <motion.div
      className={`
        ${baseStyles}
        ${paddingStyles[padding]}
        ${variantStyles[variant]}
        ${className}
      `}
      whileHover={interactive ? { scale: 1.02, y: -4 } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      {...props}
    >
      {/* Gradient glow effect at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF00FF] to-transparent opacity-50" />
      
      {/* Inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF00FF]/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;
