import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'elevated' | 'gradient';
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
  const baseStyles = `
    relative
    bg-deep-purple/80
    backdrop-blur-md
    border border-neon-pink/20
    rounded-2xl
    transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
  `;

  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  };

  const variantStyles = {
    default: '',
    elevated: 'shadow-lg shadow-neon-pink/10',
    gradient: 'bg-gradient-to-br from-deep-purple/90 to-deep-purple-light/90',
  };

  const glowStyles = {
    pink: 'hover:border-neon-pink/50 hover:shadow-[0_0_30px_rgba(255,0,255,0.2)]',
    cyan: 'hover:border-neon-cyan/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]',
    purple: 'hover:border-electric-purple/50 hover:shadow-[0_0_30px_rgba(128,0,255,0.2)]',
    success: 'hover:border-vapor-success/50 hover:shadow-[0_0_30px_rgba(0,255,65,0.2)]',
  };

  return (
    <motion.div
      className={`
        ${baseStyles}
        ${paddingStyles[padding]}
        ${variantStyles[variant]}
        ${interactive ? glowStyles[glowColor] : ''}
        ${className}
      `}
      whileHover={interactive ? { scale: 1.01 } : undefined}
      whileTap={interactive ? { scale: 0.99 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
