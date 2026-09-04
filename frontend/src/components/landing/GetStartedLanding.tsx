import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, 
  Briefcase, Gem, Compass, BarChart3, Lock, ChevronRight, Activity
} from 'lucide-react';

export const GetStartedLanding: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleInstantGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      navigate('/signup', { state: { email: email.trim() } });
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-[#060917] text-white font-sans selection:bg-[#1759e9] selection:text-white relative overflow-hidden">
      {/* Background Radial Glow Effects */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#4e8cff]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[650px] h-[650px] bg-[#1759e9]/20 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Subtle Tech Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, 
          backgroundSize: '24px 24px' 
        }} 
      />

      {/* NAVIGATION BAR */}
      <header className="relative z-20 border-b border-white/10 backdrop-blur-md bg-[#060917]/70 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4e8cff] to-[#15519D] flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(78,140,255,0.4)] group-hover:scale-105 transition-transform">
              U
            </div>
            <span className="font-black text-2xl tracking-tight text-white">
              univest
            </span>
          </div>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors">Research</button>
            <button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors flex items-center gap-1.5">
              <span>Pro</span>
              <span className="px-1.5 py-0.5 bg-amber-400/20 text-amber-300 rounded-md text-[10px] font-black uppercase">Prime</span>
            </button>
            <button onClick={() => navigate('/pricing')} className="hover:text-white transition-colors">Pricing</button>
            <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">About</button>
            <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">Support</button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-sm font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all"
            >
              Log in
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-5 py-2.5 text-sm font-black text-white bg-[#15519D] hover:bg-[#1759e9] rounded-xl shadow-[0_4px_20px_rgba(21,81,157,0.5)] hover:shadow-[0_6px_25px_rgba(23,89,233,0.6)] transition-all"
            >
              Create account
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION (2-COLUMN GRID) */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: VALUE PROPOSITION & INSTANT ONBOARDING */}
          <div className="lg:col-span-7 space-y-8">
            {/* AI Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#101935] border border-blue-500/30 text-xs font-black tracking-wider text-blue-300 shadow-[0_0_15px_rgba(78,140,255,0.2)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>AI-POWERED INVESTMENT INTELLIGENCE</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[4.2rem] font-black tracking-tight leading-[1.08] text-white"
            >
              Understand the market{' '}
              <span className="bg-gradient-to-r from-[#4e8cff] via-[#60a5fa] to-[#1759e9] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(78,140,255,0.4)]">
                before you invest
              </span>{' '}
              in it.
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed max-w-2xl"
            >
              Independent research, company scorecards, personalized watchlists, and a ₹1,00,000 virtual portfolio lab to test ideas safely — explicitly independent, with <strong className="text-slate-200 font-bold">no demat account required</strong>.
            </motion.p>

            {/* Instant Email Input Bar */}
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleInstantGetStarted}
              className="p-2 bg-[#101935]/90 rounded-2xl border border-blue-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl flex flex-col sm:flex-row items-center gap-2 max-w-xl"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email to start..."
                className="w-full px-4 py-3 bg-transparent text-white font-medium text-sm placeholder:text-slate-500 focus:outline-hidden"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#15519D] hover:bg-[#1759e9] text-white font-black text-sm rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(21,81,157,0.6)] transition-all shrink-0 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-semibold pt-2"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Independent research — we never earn from your trades</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No demat account required</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: LIVE INVESTMENT PULSE CARD */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="p-7 bg-[#101b3d]/90 backdrop-blur-2xl rounded-[28px] border border-blue-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)] space-y-6 relative overflow-hidden"
            >
              {/* Floating Badge Chips around card */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md rounded-xl text-[11px] font-black text-emerald-300 flex items-center gap-1.5 shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>New Research Published</span>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-3 -left-3 px-3 py-1 bg-blue-500/20 border border-blue-500/40 backdrop-blur-md rounded-xl text-[11px] font-black text-blue-300 flex items-center gap-1.5 shadow-lg"
              >
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span>AI Intelligence Insight</span>
              </motion.div>

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base font-black text-white">Your Investment Lab</h3>
                  <p className="text-xs text-slate-400">Virtual Capital Performance</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-black">
                  +18.4% return
                </span>
              </div>

              {/* Portfolio Value & Gain */}
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  ₹1,08,420
                </div>
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <span>▲ ₹8,420 gain from ₹1,00,000 starting virtual capital</span>
                </div>
              </div>

              {/* Smooth Cubic Bezier SVG Area Growth Chart */}
              <div className="h-32 w-full pt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 90" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="heroCardGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3286ff" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3286ff" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M 0 70 Q 50 65, 75 45 T 150 50 T 225 25 T 300 10 L 300 90 L 0 90 Z" 
                    fill="url(#heroCardGrad)" 
                  />
                  <path 
                    d="M 0 70 Q 50 65, 75 45 T 150 50 T 225 25 T 300 10" 
                    fill="none" 
                    stroke="#3286ff" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                  />
                  <circle cx="300" cy="10" r="5" fill="#3286ff" className="animate-pulse" />
                </svg>
              </div>

              {/* Metrics Strip */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Updates</span>
                  <div className="text-xs font-extrabold text-white mt-0.5">4 research calls this week</div>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Univest Score</span>
                  <div className="text-xs font-extrabold text-blue-400 mt-0.5">82/100 (Bullish)</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* BOTTOM FEATURE CARDS (3-COLUMN GRID) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-24">
          
          <div 
            onClick={() => navigate('/dashboard')}
            className="p-7 bg-[#101935]/80 hover:bg-[#101935] rounded-3xl border border-blue-500/20 hover:border-blue-500/50 shadow-xl transition-all cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white group-hover:text-blue-300 transition-colors flex items-center justify-between">
                <span>Research & Analysis</span>
                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                6-part scoring engine for 2,400+ stocks covering Business, Growth, Valuation, Momentum, Financial Health, and Risk.
              </p>
            </div>
          </div>

          <div 
            onClick={() => navigate('/dashboard')}
            className="p-7 bg-[#101935]/80 hover:bg-[#101935] rounded-3xl border border-blue-500/20 hover:border-blue-500/50 shadow-xl transition-all cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                <span>Investment Lab</span>
                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Practice with ₹1,00,000 virtual capital. Track performance, get plain-language behavioral feedback, and optimize allocations safely.
              </p>
            </div>
          </div>

          <div 
            onClick={() => navigate('/pricing')}
            className="p-7 bg-[#101935]/80 hover:bg-[#101935] rounded-3xl border border-amber-500/20 hover:border-amber-500/50 shadow-xl transition-all cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Gem className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                <span>Pro Intelligence</span>
                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Institutional Pro Picks, themed strategy collections with complete constituent weights, and live Opportunity Radar triggers.
              </p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default GetStartedLanding;
