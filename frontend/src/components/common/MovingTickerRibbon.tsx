import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface StockTicker {
  id: string;
  symbol: string;
  price: number;
  changePercent: number;
  isGold?: boolean;
  flash?: 'up' | 'down' | null;
}

const INITIAL_STOCKS: StockTicker[] = [
  { id: 'nifty', symbol: 'NIFTY 50', price: 24520.40, changePercent: 0.65 },
  { id: 'sensex', symbol: 'SENSEX', price: 80480.10, changePercent: 0.52 },
  { id: 'banknifty', symbol: 'BANKNIFTY', price: 52340.80, changePercent: -0.18 },
  { id: 'niftyit', symbol: 'NIFTY IT', price: 39120.50, changePercent: 1.24 },
  { id: 'gold', symbol: 'GOLD 24K', price: 7240.00, changePercent: 0.35, isGold: true },
  { id: 'reliance', symbol: 'RELIANCE', price: 2934.50, changePercent: 1.45 },
  { id: 'tcs', symbol: 'TCS', price: 4185.10, changePercent: -0.42 },
  { id: 'infy', symbol: 'INFY', price: 1562.10, changePercent: 0.85 },
  { id: 'tatasteel', symbol: 'TATASTEEL', price: 147.20, changePercent: 2.40 },
  { id: 'hdfcbank', symbol: 'HDFCBANK', price: 1682.40, changePercent: 0.85 },
];

interface MovingTickerRibbonProps {
  theme?: 'dark' | 'light';
  speed?: number; // duration in seconds
}

export const MovingTickerRibbon: React.FC<MovingTickerRibbonProps> = ({
  theme = 'dark',
  speed = 30,
}) => {
  const [stocks, setStocks] = useState<StockTicker[]>(INITIAL_STOCKS);

  // Live simulation: randomize small price updates every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prev) => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        return prev.map((stock, idx) => {
          if (idx === randomIndex) {
            const deltaPercent = (Math.random() * 0.4 - 0.2) / 100;
            const newPrice = stock.price * (1 + deltaPercent);
            const newChange = stock.changePercent + deltaPercent * 100;
            const flash = deltaPercent >= 0 ? 'up' : 'down';
            return {
              ...stock,
              price: newPrice,
              changePercent: newChange,
              flash,
            };
          }
          return stock;
        });
      });

      // Reset flash state after 700ms
      setTimeout(() => {
        setStocks((curr) => curr.map((s) => ({ ...s, flash: null })));
      }, 700);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (stock: StockTicker) => {
    if (stock.isGold) {
      return `₹${Math.round(stock.price).toLocaleString('en-IN')} / g`;
    }
    return stock.price.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const renderStockItem = (stock: StockTicker, keySuffix: string) => {
    const isPositive = stock.changePercent >= 0;
    const colorClass = stock.isGold
      ? 'text-amber-400 font-bold'
      : isPositive
      ? 'text-emerald-400 font-bold'
      : 'text-rose-400 font-bold';

    const flashClass =
      stock.flash === 'up'
        ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/50'
        : stock.flash === 'down'
        ? 'bg-danger/20 text-rose-300 ring-1 ring-rose-500/50'
        : '';

    return (
      <div
        key={`${stock.id}-${keySuffix}`}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all duration-300 ${flashClass}`}
      >
        <span className="opacity-80">●</span>
        <span className="font-black text-white">{stock.symbol}:</span>
        <span className={colorClass}>{formatPrice(stock)}</span>
        <span className={`text-[10px] ${colorClass}`}>
          ({isPositive ? '+' : ''}
          {stock.changePercent.toFixed(2)}%)
        </span>
        <span className="opacity-30 ml-3">|</span>
      </div>
    );
  };

  return (
    <div
      className={`border-t py-1.5 px-4 overflow-hidden text-[11px] font-mono whitespace-nowrap select-none ${
        theme === 'dark'
          ? 'bg-[#080D1A] border-slate-800 text-slate-200'
          : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}
    >
      <motion.div
        className="flex items-center gap-2 shrink-0"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {/* Render 1st set */}
        {stocks.map((stock) => renderStockItem(stock, 'set1'))}
        {/* Render 2nd set for seamless infinite scrolling loop */}
        {stocks.map((stock) => renderStockItem(stock, 'set2'))}
      </motion.div>
    </div>
  );
};

export default MovingTickerRibbon;
