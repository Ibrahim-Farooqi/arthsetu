import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  type = 'button',
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  const baseStyles = 'inline-flex items-center justify-center font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-primary hover:bg-brand-blue text-white rounded-button px-6 py-3 shadow-premium hover:shadow-glow-blue',
    secondary: 'bg-white dark:bg-dark-card border border-brand-border dark:border-dark-border text-brand-navy dark:text-dark-text hover:bg-slate-50 dark:hover:bg-slate-800 rounded-button px-6 py-3 shadow-premium-sm',
    ghost: 'text-brand-navy dark:text-dark-text hover:bg-slate-100 dark:hover:bg-slate-850 rounded-button px-6 py-3',
    icon: 'p-3 rounded-full text-brand-navy dark:text-dark-text hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-brand-border dark:hover:border-dark-border',
  };

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      whileHover={isDisabled ? undefined : { scale: 1.015, y: -0.5 }}
      whileTap={isDisabled ? undefined : { scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-current mr-2"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : icon && iconPosition === 'left' ? (
        <span className={cn(children ? "mr-2" : "")}>{icon}</span>
      ) : null}
      
      {variant !== 'icon' && children}
      
      {!isLoading && icon && iconPosition === 'right' ? (
        <span className={cn(children ? "ml-2" : "")}>{icon}</span>
      ) : null}
    </motion.button>
  );
};
