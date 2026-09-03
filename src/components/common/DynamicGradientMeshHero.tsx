import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shield, ArrowRight, Activity, Zap, CheckCircle2, TrendingUp } from 'lucide-react';

interface DynamicGradientMeshHeroProps {
  theme?: 'dark' | 'light';
  onExploreClick?: () => void;
}

export const DynamicGradientMeshHero: React.FC<DynamicGradientMeshHeroProps> = ({
  theme = 'dark',
  onExploreClick,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isAiPulseActive, setIsAiPulseActive] = useState<boolean>(false);
  const [isGlassRevealed, setIsGlassRevealed] = useState<boolean>(false);

  // AI Intelligence Pulse every 9 seconds
  useEffect(() => {
    const pulseTimer = setInterval(() => {
      setIsAiPulseActive(true);
      setTimeout(() => setIsAiPulseActive(false), 2000);
    }, 9000);

    return () => clearInterval(pulseTimer);
  }, []);

  // Glass Reveal Timer
  useEffect(() => {
    const revealTimer = setTimeout(() => {
      setIsGlassRevealed(true);
    }, 1500);
    return () => clearTimeout(revealTimer);
  }, []);

  // Mouse Parallax & Light Ripple Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="relative w-full max-w-2xl mx-auto h-[540px] flex items-center justify-center select-none overflow-hidden rounded-[32px]"
    >
      {/* 1. DYNAMIC LIQUID LIGHT MESH BLOBS (GPU-ACCELERATED) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#172033]">
        
        {/* Blob 1: Royal Blue Core */}
        <motion.div
          animate={{
            x: [0, 45, -30, 0],
            y: [0, -35, 25, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transform: `translate(${mousePos.x * 4}px, ${mousePos.y * 4}px)` }}
          className="absolute top-1/4 left-1/4 w-[360px] h-[360px] bg-primary/25 rounded-full blur-[100px]"
        />

        {/* Blob 2: Emerald Green Intelligence Flow */}
        <motion.div
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.85, 1.1, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)` }}
          className="absolute bottom-1/4 right-1/4 w-[340px] h-[340px] bg-[#16A34A]/20 rounded-full blur-[110px]"
        />

        {/* Blob 3: Soft Cyan Highlight */}
        <motion.div
          animate={{
            x: [0, 30, -40, 0],
            y: [0, 30, -20, 0],
            scale: [1, 1.2, 0.95, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)` }}
          className="absolute top-1/3 right-1/3 w-[260px] h-[260px] bg-[#38BDF8]/20 rounded-full blur-[80px]"
        />

        {/* Blob 4: Deep Indigo Violet */}
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, -25, 35, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-[#6366F1]/15 rounded-full blur-[90px]"
        />

        {/* Subtle Financial Data Particles */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + (i % 5),
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
              style={{
                left: `${(i * 17) % 92 + 4}%`,
                top: `${(i * 23) % 88 + 6}%`,
              }}
              className="absolute w-1 h-1 rounded-full bg-cyan-300"
            />
          ))}
        </div>

        {/* AI Wave Scan Pulse Line */}
        {isAiPulseActive && (
          <motion.div
            initial={{ scale: 0.2, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-cyan-400/40 pointer-events-none"
          />
        )}
      </div>

      {/* 2. FROSTED GLASS REVEAL PRODUCT INTERFACE PANEL */}
      <motion.div
        initial={{ backdropFilter: 'blur(30px)', opacity: 0.85 }}
        animate={{
          backdropFilter: isGlassRevealed ? 'blur(12px)' : 'blur(30px)',
          opacity: isGlassRevealed ? 1 : 0.85,
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="relative z-20 w-[90%] sm:w-[460px] bg-[#172033]/75 border border-white/15 p-6 rounded-[28px] shadow-[0_30px_70px_rgba(0,0,0,0.6)] font-mono text-white"
      >
        {/* Glass Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-emerald-500 text-white flex items-center justify-center font-black shadow-lg shadow-[rgba(21,81,157,0.3)]/30">
              U
            </div>
            <div>
              <span className="font-black text-sm text-white block leading-none tracking-tight">
                UNIVEST AI CORE
              </span>
              <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest block mt-0.5">
                ● SEBI RA: INH000009821
              </span>
            </div>
          </div>

          <div className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[10px] text-slate-300 flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>60 FPS Stream</span>
          </div>
        </div>

        {/* Live Intelligence Feed Row */}
        <div className="my-5 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">SIGNAL DETECTED</span>
                <span className="font-bold text-white">RELIANCE (Cup & Handle)</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                96% Conviction
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Target: ₹3,120</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">NET PORTFOLIO</span>
              <span className="text-sm font-black text-white">₹12,48,420.00</span>
              <span className="text-[10px] text-emerald-400 font-bold block">+22.84% Overall</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">TODAY'S P&L</span>
              <span className="text-sm font-black text-emerald-400">+₹18,420.00</span>
              <span className="text-[10px] text-emerald-500 font-bold block">(+1.42%)</span>
            </div>
          </div>
        </div>

        {/* Glass Footer Trigger */}
        <div className="pt-2">
          <button
            onClick={onExploreClick}
            className="w-full py-3 bg-gradient-to-r from-primary via-emerald-500 to-cyan-500 hover:from-primary hover:to-cyan-600 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore AI Investment System</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

    </div>
  );
};

export default DynamicGradientMeshHero;
