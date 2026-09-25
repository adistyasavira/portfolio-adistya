import React, { useState } from 'react';
import { motion } from 'motion/react';

interface InteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isDarkMode?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isDarkMode = true,
  children,
  icon,
  iconPosition = 'right',
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    setClicked(true);
    setTimeout(() => setClicked(false), 400);
    if (onClick) onClick(e);
  };

  // Base styling for sizes
  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5 rounded-lg',
    md: 'px-5 py-2.5 text-sm gap-2 rounded-xl',
    lg: 'px-6 py-3.5 text-base gap-2.5 rounded-2xl font-semibold',
  }[size];

  // Variant styles - Dark Black and Crimson Red theme
  const variantClasses = {
    primary:
      'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white border border-red-500/50 shadow-md shadow-red-900/40 hover:shadow-red-600/40 hover:border-red-400',
    secondary: isDarkMode
      ? 'bg-red-950/35 hover:bg-red-900/50 border border-red-800/40 hover:border-red-500/60 text-slate-100 shadow-sm'
      : 'bg-white hover:bg-rose-50 border border-rose-200 hover:border-rose-400 text-slate-800 shadow-sm',
    outline: isDarkMode
      ? 'bg-transparent border border-red-500/50 hover:bg-red-950/30 text-red-300 hover:text-white hover:border-red-400'
      : 'bg-transparent border border-red-400 hover:bg-rose-50 text-red-600 hover:border-red-600',
    ghost: isDarkMode
      ? 'bg-transparent hover:bg-red-950/30 text-slate-300 hover:text-white'
      : 'bg-transparent hover:bg-rose-50 text-slate-700 hover:text-red-700',
  }[variant];

  return (
    <motion.button
      whileHover={
        disabled
          ? undefined
          : {
              scale: 1.035,
              y: -2,
              transition: { type: 'spring', stiffness: 400, damping: 15 },
            }
      }
      whileTap={
        disabled
          ? undefined
          : {
              scale: 0.94,
              y: 1,
              transition: { type: 'spring', stiffness: 500, damping: 20 },
            }
      }
      onClick={handleClick}
      disabled={disabled}
      className={`relative group inline-flex items-center justify-center font-medium select-none overflow-hidden transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
      {...(props as any)}
    >
      {/* Light shimmer line moving across on hover */}
      <span className="absolute top-0 -left-[100%] w-3/4 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] pointer-events-none group-hover:left-[150%] transition-[left] duration-700 ease-in-out" />

      {/* Ripple ring effect on click */}
      {clicked && (
        <motion.span
          initial={{ scale: 0.3, opacity: 0.8 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="absolute inset-0 rounded-xl bg-red-400/40 pointer-events-none"
        />
      )}

      {/* Icon left */}
      {icon && iconPosition === 'left' && (
        <span className="transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:scale-110">
          {icon}
        </span>
      )}

      {/* Label Content */}
      <span className="relative z-10">{children}</span>

      {/* Icon right */}
      {icon && iconPosition === 'right' && (
        <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:scale-110">
          {icon}
        </span>
      )}
    </motion.button>
  );
};
