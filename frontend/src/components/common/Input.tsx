import React, { useState } from 'react';
import { Eye, EyeOff, Search, X, AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  currencyPrefix?: boolean;
  onClear?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  currencyPrefix,
  onClear,
  type = 'text',
  className = '',
  required,
  value,
  onChange,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-1.5 w-full font-sans">
      {label && (
        <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
          <span>
            {label} {required && <span className="text-danger">*</span>}
          </span>
        </label>
      )}

      <div className="relative flex items-center">
        {currencyPrefix && (
          <span className="absolute left-3.5 text-slate-400 font-black text-sm">₹</span>
        )}

        <input
          type={inputType}
          value={value}
          onChange={onChange}
          className={`w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 focus:border-primary focus:bg-white rounded-xl text-xs font-medium outline-none transition ${
            currencyPrefix ? 'pl-8' : ''
          } ${error ? 'border-rose-400 bg-rose-50/20' : ''} ${className}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}

        {onClear && value && !isPassword && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {error ? (
        <span className="text-[11px] font-bold text-danger flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </span>
      ) : helperText ? (
        <span className="text-[10px] text-slate-400 font-medium">{helperText}</span>
      ) : null}
    </div>
  );
};

export default Input;
