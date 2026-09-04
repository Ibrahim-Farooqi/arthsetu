import React, { useState } from 'react';
import { Eye, EyeOff, Search } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isSearch?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  className,
  label,
  error,
  helperText,
  type = 'text',
  isSearch = false,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  
  const getInputType = () => {
    if (isPassword) {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-brand-navy dark:text-dark-text select-none">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {isSearch && (
          <Search className="absolute left-4 w-5 h-5 text-brand-secondary pointer-events-none" />
        )}
        <input
          ref={ref}
          type={getInputType()}
          className={cn(
            "w-full bg-white dark:bg-dark-card border border-brand-border dark:border-dark-border rounded-input py-3.5 px-4 text-brand-navy dark:text-dark-text placeholder:text-brand-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-premium-sm font-sans text-body",
            isSearch && "pl-11",
            isPassword && "pr-11",
            error && "border-danger focus:ring-danger",
            className
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 p-1 text-brand-secondary hover:text-brand-navy dark:hover:text-dark-text rounded-full focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <span className="text-xs font-medium text-danger select-none">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span className="text-xs text-brand-secondary select-none">
          {helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
