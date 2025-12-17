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
  const sizeStyles = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-10 py-4.5 text-base',
  };

  const variantStyles = {
    primary: `
      bg-gradient-to-br from-[#FF00FF] via-[#FF00FF] to-[#FF0080]
      text-white font-bold
      shadow-[0_0_25px_rgba(255,0,255,0.6),0_4px_20px_rgba(0,0,0,0.3)]
      hover:shadow-[0_0_40px_rgba(255,0,255,0.8),0_6px_25px_rgba(0,0,0,0.4)]
      border border-[#FF00FF]/50
    `,
    secondary: `
      bg-gradient-to-br from-[#00FFFF] via-[#00FFFF] to-[#0080FF]
      text-[#1A0B2E] font-bold
      shadow-[0_0_25px_rgba(0,255,255,0.6),0_4px_20px_rgba(0,0,0,0.3)]
      hover:shadow-[0_0_40px_rgba(0,255,255,0.8),0_6px_25px_rgba(0,0,0,0.4)]
      border border-[#00FFFF]/50
    `,
    ghost: `
      bg-transparent
      border-2 border-[#00FFFF]
      text-[#00FFFF] font-semibold
      hover:bg-[#00FFFF]/15
      hover:shadow-[0_0_30px_rgba(0,255,255,0.4)]
    `,
    success: `
      bg-gradient-to-br from-[#00FF41] to-[#39FF14]
      text-[#1A0B2E] font-bold
      shadow-[0_0_25px_rgba(0,255,65,0.6),0_4px_20px_rgba(0,0,0,0.3)]
      hover:shadow-[0_0_40px_rgba(0,255,65,0.8),0_6px_25px_rgba(0,0,0,0.4)]
    `,
    danger: `
      bg-gradient-to-br from-[#FF0080] to-[#FF0000]
      text-white font-bold
      shadow-[0_0_25px_rgba(255,0,128,0.6),0_4px_20px_rgba(0,0,0,0.3)]
      hover:shadow-[0_0_40px_rgba(255,0,128,0.8),0_6px_25px_rgba(0,0,0,0.4)]
    `,
  };

  return (
    <motion.button
      className={`
        relative inline-flex items-center justify-center gap-2
        font-display uppercase tracking-wider
        rounded-xl cursor-pointer
        transition-all duration-300 ease-out
        overflow-hidden
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      whileHover={disabled ? undefined : { scale: 1.03, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      {...props}
    >
      {/* Shine effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
      
      {/* Inner glow */}
      <span className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {loading ? (
        <motion.span
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      ) : (
        <span className="relative z-10">{children}</span>
      )}
    </motion.button>
  );
};

export default Button;
