import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Briefcase, Search, Newspaper, Sparkles, Star, Target, 
  Zap, Shield, TrendingUp, Layers, Activity, Cpu, ArrowRight
} from 'lucide-react';

interface ConstellationNode {
  id: string;
  name: string;
  metric: string;
  subMetric: string;
  icon: React.ElementType;
  x: number; // percentage or SVG coordinate
  y: number;
  color: string;
  badge?: string;
}

const NODES: ConstellationNode[] = [
  { id: 'portfolio', name: 'Portfolio', metric: '₹12.42L', subMetric: '+1.42% Today', icon: Briefcase, x: 130, y: 110, color: '#10B981', badge: '+22.8%' },
  { id: 'research', name: 'Research', metric: '28 Calls', subMetric: 'SEBI RA Compliant', icon: Shield, x: 390, y: 100, color: '#F59E0B', badge: '14 Live' },
  { id: 'ai-advisors', name: 'AI Copilots', metric: '96% Accuracy', subMetric: '3 Active Agents', icon: Sparkles, x: 260, y: 70, color: '#8B5CF6', badge: 'AI V4' },
  { id: 'news', name: 'News Intel', metric: '142 Updates', subMetric: 'RBI Policy Live', icon: Newspaper, x: 470, y: 240, color: '#38BDF8', badge: 'Breaking' },
  { id: 'invest', name: 'Asset Hub', metric: '7 Assets', subMetric: 'Ola IPO GMP +38%', icon: Layers, x: 410, y: 390, color: '#15519D', badge: 'High Yield' },
  { id: 'watchlist', name: 'Watchlist', metric: '18 Stocks', subMetric: '3 Breakouts Near', icon: Star, x: 70, y: 230, color: '#EC4899', badge: 'Live Ticks' },
  { id: 'orders', name: 'Execution', metric: '3 Active', subMetric: 'Instant NSE/BSE', icon: Zap, x: 120, y: 380, color: '#10B981', badge: '0.2s Execution' },
  { id: 'goals', name: 'Goals Tracker', metric: '68% Goal', subMetric: 'Retirement 2035', icon: Target, x: 260, y: 440, color: '#F59E0B', badge: 'On Track' },
];

interface AiConstellationNeuralNetworkProps {
  theme?: 'dark' | 'light';
  onNodeClick?: (nodeId: string) => void;
}

export const AiConstellationNeuralNetwork: React.FC<AiConstellationNeuralNetworkProps> = ({
  theme = 'dark',
  onNodeClick,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0); // Neural pulse flow step
  const [hoveredNode, setHoveredNode] = useState<ConstellationNode | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isAiPulseActive, setIsAiPulseActive] = useState<boolean>(false);

  // Neural Sequence Simulation (News -> Research -> AI Core -> Portfolio -> Execution)
  useEffect(() => {
    const sequenceTimer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
      if ((activeStep + 1) % 5 === 2) {
        // AI Core scans network wave
        setIsAiPulseActive(true);
        setTimeout(() => setIsAiPulseActive(false), 1200);
      }
    }, 2200);

    return () => clearInterval(sequenceTimer);
  }, [activeStep]);

  // Parallax Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
  };

  // Center Core Coordinates in 540x500 canvas
  const coreX = 260;
  const coreY = 255;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="relative w-full max-w-2xl mx-auto h-[520px] flex items-center justify-center select-none overflow-hidden"
    >
      {/* 1. CINEMATIC BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-primary/15 via-purple-600/10 to-emerald-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/3 w-[250px] h-[250px] bg-cyan-500/10 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* 2. NEURAL CONSTELLATION SVG LINES & DATA PARTICLES */}
      <svg viewBox="0 0 540 500" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <defs>
          <linearGradient id="neuralLineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#15519D" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Primary Radial Neural Lines (Core to Every Node) */}
        {NODES.map((node) => (
          <g key={`link-${node.id}`}>
            <line
              x1={coreX}
              y1={coreY}
              x2={node.x}
              y2={node.y}
              stroke="url(#neuralLineGrad)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.45"
            />
          </g>
        ))}

        {/* Inter-Node Neural Links */}
        <line x1={NODES[3].x} y1={NODES[3].y} x2={NODES[1].x} y2={NODES[1].y} stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
        <line x1={NODES[1].x} y1={NODES[1].y} x2={coreX} y2={coreY} stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
        <line x1={coreX} y1={coreY} x2={NODES[0].x} y2={NODES[0].y} stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
        <line x1={NODES[0].x} y1={NODES[0].y} x2={NODES[6].x} y2={NODES[6].y} stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />

        {/* Active Traveling Particles along Neural Sequence */}
        {activeStep === 0 && (
          <circle cx={NODES[3].x} cy={NODES[3].y} r="5" fill="#38BDF8" filter="url(#glow)" className="animate-ping" />
        )}
        {activeStep === 1 && (
          <circle cx={NODES[1].x} cy={NODES[1].y} r="5" fill="#F59E0B" filter="url(#glow)" className="animate-ping" />
        )}
        {activeStep === 3 && (
          <circle cx={NODES[0].x} cy={NODES[0].y} r="5" fill="#10B981" filter="url(#glow)" className="animate-ping" />
        )}
        {activeStep === 4 && (
          <circle cx={NODES[6].x} cy={NODES[6].y} r="5" fill="#15519D" filter="url(#glow)" className="animate-ping" />
        )}

        {/* AI Scan Pulse Expanding Wave Circle */}
        {isAiPulseActive && (
          <circle cx={coreX} cy={coreY} r="220" fill="none" stroke="#38BDF8" strokeWidth="2" opacity="0.4" className="animate-ping" />
        )}
      </svg>

      {/* 3. CENTRAL AI CORE SPHERE */}
      <motion.div
        style={{
          transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)`,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="relative z-30 w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center cursor-pointer group"
      >
        {/* Breathing Glass Ring */}
        <motion.div
          animate={{ scale: [1, 1.04, 1], rotate: 360 }}
          transition={{
            scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 via-cyan-400/20 to-purple-600/30 backdrop-blur-2xl border border-white/25 shadow-[0_0_50px_rgba(56,189,248,0.4)]"
        />

        {/* Inner Glass Nucleus */}
        <div className="absolute inset-2.5 rounded-full bg-[#172033] border border-primary-light/40 overflow-hidden flex items-center justify-center">
          <div className="absolute w-28 h-28 bg-cyan-500/30 rounded-full blur-xl animate-pulse" />
          <div className="absolute w-20 h-20 bg-primary/40 rounded-full blur-lg top-1 right-1" />

          {/* Core Content */}
          <div className="relative z-10 text-center space-y-1">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary to-cyan-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/40 group-hover:scale-110 transition-transform">
              <Brain className="w-6 h-6" />
            </div>
            <span className="font-mono text-[9px] font-black tracking-widest text-cyan-400 block uppercase">
              AI NUCLEUS
            </span>
            <span className="font-mono text-[8px] text-slate-300 block">
              ● Connected
            </span>
          </div>
        </div>
      </motion.div>

      {/* 4. CONSTELLATION MODULE NODES */}
      {NODES.map((node) => {
        const NodeIcon = node.icon;
        const isHovered = hoveredNode?.id === node.id;
        const isNodeActiveInSequence = 
          (activeStep === 0 && node.id === 'news') ||
          (activeStep === 1 && node.id === 'research') ||
          (activeStep === 3 && node.id === 'portfolio') ||
          (activeStep === 4 && node.id === 'orders');

        return (
          <motion.div
            key={node.id}
            style={{
              left: `${(node.x / 540) * 100}%`,
              top: `${(node.y / 500) * 100}%`,
              transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`,
            }}
            animate={{
              y: [0, -5, 0],
              scale: isNodeActiveInSequence ? [1, 1.08, 1] : 1,
            }}
            transition={{
              y: { duration: 3.5 + Math.random(), repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: 0.8 },
            }}
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => onNodeClick?.(node.id)}
            className={`absolute z-40 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
              isNodeActiveInSequence ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#172033]' : ''
            }`}
          >
            {/* Node Circle */}
            <div className={`relative px-3 py-2 rounded-2xl border backdrop-blur-xl font-mono shadow-xl flex items-center gap-2.5 transition-all duration-300 ${
              isHovered 
                ? 'bg-[#1E293B] border-cyan-400 scale-110 z-50 shadow-cyan-500/30 shadow-2xl' 
                : 'bg-[#172033]/90 border-slate-700/80 hover:border-slate-500'
            }`}>
              <div 
                className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${node.color}20`, color: node.color }}
              >
                <NodeIcon className="w-4 h-4" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-white leading-none">{node.name}</span>
                  {node.badge && (
                    <span 
                      className="text-[8px] font-black px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: `${node.color}25`, color: node.color }}
                    >
                      {node.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-300 font-black block mt-0.5">{node.metric}</span>
              </div>
            </div>

            {/* Hover Floating Tooltip Modal */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#172033] border border-cyan-500/40 p-3 rounded-2xl shadow-2xl font-mono text-xs z-50 pointer-events-none"
                >
                  <span className="text-[10px] text-cyan-400 font-bold block uppercase tracking-wider">
                    MODULE DETAILS
                  </span>
                  <div className="text-white font-bold text-sm my-0.5">{node.name}</div>
                  <span className="text-[10px] text-slate-300 block">{node.subMetric}</span>

                  <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-emerald-400 font-bold">
                    <span>Open Module</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* 5. NEURAL SEQUENCE LIVE ACTIVITY FEED FOOTER */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 bg-[#172033]/90 border border-slate-800 backdrop-blur-xl px-4 py-1.5 rounded-full font-mono text-[10px] text-slate-300 flex items-center gap-2 shadow-lg">
        <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>
          NEURAL FLOW:{' '}
          <strong className="text-cyan-400">
            {activeStep === 0 && 'News Feed Received → Streaming to Research'}
            {activeStep === 1 && 'Research Center Analyzed → Feeding AI Core'}
            {activeStep === 2 && 'AI Core Processing Signal → Scanning Constellation'}
            {activeStep === 3 && 'AI Insight Dispatched → Updating Portfolio'}
            {activeStep === 4 && 'Portfolio Trigger → Order Execution Ready'}
          </strong>
        </span>
      </div>

    </div>
  );
};

export default AiConstellationNeuralNetwork;
