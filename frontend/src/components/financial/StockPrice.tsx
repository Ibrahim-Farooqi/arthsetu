import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface StockPriceProps {
  price: number;
  change: number;
  changePercent: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StockPrice: React.FC<StockPriceProps> = ({
  price,
  change,
  changePercent,
  currency = '₹',
  size = 'md',
  className,
}) => {
  const isPositive = change >= 0;
  
  const sizes = {
    sm: {
      price: 'text-lg font-bold',
      change: 'text-xs font-semibold',
      icon: 'w-3 h-3',
    },
    md: {
      price: 'text-2xl font-bold',
      change: 'text-sm font-semibold',
      icon: 'w-4 h-4',
    },
    lg: {
      price: 'text-display font-extrabold tracking-tight',
      change: 'text-base font-semibold',
      icon: 'w-5 h-5',
    },
  };

  const formatPrice = (val: number) => {
    return val.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className={cn("flex flex-col items-start gap-0.5", className)}>
      <span className={cn("text-brand-navy dark:text-dark-text", sizes[size].price)}>
        {currency}{formatPrice(price)}
      </span>
      <div
        className={cn(
          "flex items-center gap-0.5",
          isPositive ? "text-success" : "text-danger"
        )}
      >
        {isPositive ? (
          <ArrowUpRight className={sizes[size].icon} />
        ) : (
          <ArrowDownRight className={sizes[size].icon} />
        )}
        <span className={sizes[size].change}>
          {isPositive ? '+' : ''}
          {formatPrice(change)} ({isPositive ? '+' : ''}
          {formatPrice(changePercent)}%)
        </span>
      </div>
    </div>
  );
};
