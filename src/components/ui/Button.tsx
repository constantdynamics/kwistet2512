import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = `
    relative inline-flex items-center justify-center gap-2
    font-display font-semibold uppercase tracking-wider
    border-none rounded-lg cursor-pointer
    transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
    overflow-hidden
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variantStyles = {
    primary: `
      bg-gradient-to-br from-neon-pink to-neon-pink-dark
      text-white
      shadow-[0_0_20px_rgba(255,0,255,0.5)]
      hover:shadow-[0_0_30px_rgba(255,0,255,0.7)]
    `,
    secondary: `
      bg-gradient-to-br from-neon-cyan to-neon-cyan-dark
      text-deep-purple
      shadow-[0_0_20px_rgba(0,255,255,0.5)]
      hover:shadow-[0_0_30px_rgba(0,255,255,0.7)]
    `,
    ghost: `
      bg-transparent
      border-2 border-neon-cyan
      text-neon-cyan
      hover:bg-neon-cyan/10
      hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]
    `,
    success: `
      bg-gradient-to-br from-vapor-success to-vapor-success-light
      text-deep-purple
      shadow-[0_0_20px_rgba(0,255,65,0.5)]
      hover:shadow-[0_0_30px_rgba(0,255,65,0.7)]
    `,
    danger: `
      bg-gradient-to-br from-vapor-error to-red-600
      text-white
      shadow-[0_0_20px_rgba(255,0,128,0.5)]
      hover:shadow-[0_0_30px_rgba(255,0,128,0.7)]
    `,
  };

  return (
    <motion.button
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {/* Shine effect overlay */}
      <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {loading ? (
        <motion.span
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
