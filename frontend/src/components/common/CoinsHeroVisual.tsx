import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Shield, CircleDollarSign } from 'lucide-react';

interface CoinsHeroVisualProps {
  theme?: 'dark' | 'light';
  imagePath?: string;
}

export const CoinsHeroVisual: React.FC<CoinsHeroVisualProps> = ({
  theme = 'dark',
  imagePath = 'C:\\Users\\omar1\\.gemini\\antigravity-ide\\brain\\0e40aad8-54a6-4a45-b607-ea13d414101d\\hero_3d_investment_coins_1784793481097.png',
}) => {
  return (
    <div className="relative w-full max-w-lg mx-auto h-[480px] flex items-center justify-center select-none overflow-hidden rounded-3xl p-4">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-gradient-to-tr from-amber-500/20 via-primary/15 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Floating Levitation Container */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        {/* 3D Generated Investment Coins Image */}
        <img
          src={imagePath}
          alt="3D Gold Investment Coins"
          className="w-full h-auto max-h-[380px] object-contain drop-shadow-[0_20px_40px_rgba(245,158,11,0.25)] rounded-2xl"
        />

        {/* Floating Rupee Profit Badge 1 (Top Right) */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-8 right-4 bg-[#172033]/90 backdrop-blur-xl border border-amber-500/40 p-3 rounded-2xl shadow-2xl font-mono text-xs text-white flex items-center gap-2.5"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <CircleDollarSign className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">PORTFOLIO GAIN</span>
            <span className="font-black text-xs text-amber-400">+₹18,420.00 (+1.42%)</span>
          </div>
        </motion.div>

        {/* Floating AI Signal Badge 2 (Bottom Left) */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-8 left-4 bg-[#172033]/90 backdrop-blur-xl border border-emerald-500/40 p-3 rounded-2xl shadow-2xl font-mono text-xs text-white flex items-center gap-2.5"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">SEBI AI SIGNAL</span>
            <span className="font-black text-xs text-emerald-400">Gold 24K Target ₹7,800</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CoinsHeroVisual;
