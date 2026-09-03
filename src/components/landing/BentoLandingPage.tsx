import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, ArrowRight, TrendingUp, TrendingDown, Sparkles, Mail, CheckCircle2, 
  Brain, BarChart3, CandlestickChart, Briefcase, GraduationCap, Bell, Crown, Star, Check, 
  Radio, Lock, ChevronRight, Zap, RefreshCcw, Layers, Award, Terminal, Flame, CircleDollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BentoGrid, BentoCard } from '../ui/BentoGrid';

export const BentoLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [aiQuoteIndex, setAiQuoteIndex] = useState(0);

  // AI Quotes Marquee List
  const aiQuotes = [
    "AI Signal Detected: RELIANCE breaking out above ₹2,930 resistance. Target: ₹3,120.",
    "Macro Shift: IT Sector RSI cooling off. Portfolio Advisor suggests rebalancing to Banking.",
    "Options Volatility: NIFTY 24,500 Call OI spike indicates strong bullish momentum.",
    "SEBI Audit Verified: 98.4% accuracy across 142 Research Calls in Q2 2026."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAiQuoteIndex((prev) => (prev + 1) % aiQuotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setEmailSubmitted(true);
    setTimeout(() => {
      navigate('/signup', { state: { email } });
    }, 1200);
  };

  // Mock Terminal Watchlist Items
  const terminalWatchlist = [
    { symbol: 'RELIANCE', price: '2,934.50', change: '+1.45%', positive: true, sparkline: [2900, 2910, 2925, 2934.5] },
    { symbol: 'INFY', price: '1,562.10', change: '-0.85%', positive: false, sparkline: [1580, 1570, 1565, 1562.1] },
    { symbol: 'TATASTEEL', price: '147.20', change: '+2.40%', positive: true, sparkline: [142, 144, 145, 147.2] },
    { symbol: 'HDFCBANK', price: '1,682.40', change: '+0.85%', positive: true, sparkline: [1660, 1675, 1682.4] },
    { symbol: 'TCS', price: '3,845.00', change: '+1.12%', positive: true, sparkline: [3800, 3820, 3845] },
  ];

  return (
    <div className="min-h-screen bg-[#172033] text-white font-sans selection:bg-primary selection:text-white">
      
      {/* STICKY GLASSMORPHIC NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#172033]/90 backdrop-blur-xl border-b border-white/[0.08] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-emerald-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-[rgba(21,81,157,0.3)]/30">
              U
            </div>
            <div>
              <span className="font-black text-xl tracking-tight text-white block leading-none font-display">UNIVEST</span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold tracking-widest uppercase flex items-center gap-1">
                <Shield className="w-3 h-3" /> SEBI RA: INH000009821
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#hero" className="hover:text-white transition">Overview</a>
            <a href="#capabilities" className="hover:text-white transition">Capabilities</a>
            <a href="#ai-advisors" className="hover:text-white transition">AI Advisors</a>
            <a href="#invest-hub" className="hover:text-white transition">Asset Hub</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2.5 text-xs font-black text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-2.5 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary hover:to-emerald-600 text-white text-xs font-black rounded-xl transition shadow-lg shadow-[rgba(21,81,157,0.3)]/25 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-20">

        {/* SECTION 1: HERO BENTO GRID */}
        <section id="hero" className="space-y-4">
          <BentoGrid>
            {/* HERO LEAD CARD (8 col x 2 row) */}
            <BentoCard colSpan={8} rowSpan={2} glowColor="blue" className="bg-gradient-to-br from-[#1E293B] via-[#172033] to-[#1E293B]">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3.5 py-1">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                    SEBI Registered Research Analyst (INH000009821)
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none font-display">
                  Autonomous AI Stock Intelligence &{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                    SEBI Advisory
                  </span>
                </h1>

                <p className="text-slate-400 text-sm sm:text-base font-medium max-w-xl leading-relaxed">
                  Consolidate stocks, mutual funds, ETFs, IPOs, and gold into a single bento workspace. Powered by 3 specialized AI Advisors & certified research analysts.
                </p>

                {/* Email Capture Box */}
                <form onSubmit={handleEmailSubmit} className="max-w-lg space-y-2">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email to test AI platform"
                        className="w-full pl-10 pr-4 py-3 bg-[#172033] border border-slate-700 rounded-xl text-xs font-semibold text-white placeholder-slate-500 outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
                    >
                      {isSubmitting ? 'Verifying...' : emailSubmitted ? 'Redirecting...' : 'Start Free Trial'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono block">✓ No credit card required · Instant 14-day Pro access</span>
                </form>
              </div>
            </BentoCard>

            {/* LIVE TERMINAL WATCHLIST CARD (4 col x 2 row) */}
            <BentoCard colSpan={4} rowSpan={2} glowColor="emerald">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-300">
                  <Terminal className="w-4 h-4 text-emerald-400" /> Live Terminal Watchlist
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="space-y-3 my-2">
                {terminalWatchlist.map((item) => (
                  <div key={item.symbol} className="flex items-center justify-between p-2.5 rounded-xl bg-[#172033] border border-slate-800 text-xs font-mono">
                    <div>
                      <span className="font-bold text-white block">{item.symbol}</span>
                      <span className="text-[10px] text-slate-500 font-semibold">NSE Equity</span>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-white block">₹{item.price}</span>
                      <span className={`text-[11px] font-bold ${item.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {item.positive ? '▲' : '▼'} {item.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 text-center">
                <span className="text-[10px] text-slate-500 font-mono">Sub-second NSE/BSE Feed Ticks</span>
              </div>
            </BentoCard>

            {/* STAT CARD 1 (4 col x 1 row) */}
            <BentoCard colSpan={4} rowSpan={1} glowColor="blue">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Active Investors</span>
              <span className="text-3xl font-black text-white font-mono mt-1 block">50,420+</span>
              <span className="text-[11px] text-[#64748B] font-semibold mt-1 block">▲ +12% Growth this month</span>
            </BentoCard>

            {/* STAT CARD 2 (4 col x 1 row) */}
            <BentoCard colSpan={4} rowSpan={1} glowColor="emerald">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Total Monthly Volume</span>
              <span className="text-3xl font-black text-emerald-400 font-mono mt-1 block">₹540.8 Cr</span>
              <span className="text-[11px] text-slate-400 font-semibold mt-1 block">Verified execution volume</span>
            </BentoCard>

            {/* STAT CARD 3 (4 col x 1 row) */}
            <BentoCard colSpan={4} rowSpan={1} glowColor="amber">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">SEBI Call Accuracy</span>
              <span className="text-3xl font-black text-amber-400 font-mono mt-1 block">98.4%</span>
              <span className="text-[11px] text-slate-400 font-semibold mt-1 block">Audit verified by SEBI RA</span>
            </BentoCard>

            {/* AI INSIGHT MARQUEE CARD (12 col x 1 row) */}
            <BentoCard colSpan={12} rowSpan={1} glowColor="purple" className="bg-gradient-to-r from-purple-950/40 via-[#1E293B] to-blue-950/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={aiQuoteIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-xs font-mono font-bold text-purple-200"
                    >
                      {aiQuotes[aiQuoteIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20 shrink-0">
                  LIVE AI FEED
                </span>
              </div>
            </BentoCard>
          </BentoGrid>
        </section>

        {/* SECTION 2: CAPABILITIES BENTO GRID */}
        <section id="capabilities" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#64748B] bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Bento Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
              Unmatched Financial Capabilities
            </h2>
            <p className="text-xs text-slate-400 font-medium">Asymmetric data modules built for modern investors.</p>
          </div>

          <BentoGrid>
            {/* HERO CAPABILITY: AI INSIGHTS (6 col x 2 row) */}
            <BentoCard colSpan={6} rowSpan={2} glowColor="blue">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 text-[#64748B] flex items-center justify-center border border-primary/30">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white font-display">Autonomous AI Signal Engine</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Scans 4,000+ Indian equities 24/7. Detects candlestick patterns, volume surges, and RSI momentum breakouts before the retail crowd.
                </p>

                <div className="p-4 bg-[#172033] rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Target Stock: TATAMOTORS</span>
                    <span className="text-emerald-400 font-bold">Conviction: 94%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[94%]" />
                  </div>
                  <span className="text-[10px] text-slate-500 block">Setup: Golden Crossover + Institutional Buying Surge</span>
                </div>
              </div>
            </BentoCard>

            {/* CAPABILITY 2: REAL-TIME DATA (6 col x 1 row) */}
            <BentoCard colSpan={6} rowSpan={1} glowColor="emerald">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-base text-white">Sub-Second NSE/BSE Ticks</h4>
                  <p className="text-xs text-slate-400 font-medium mt-1">Direct exchange feed streaming level-2 market depth with 0ms latency.</p>
                </div>
              </div>
            </BentoCard>

            {/* CAPABILITY 3: TECHNICAL ANALYSIS (4 col x 1 row) */}
            <BentoCard colSpan={4} rowSpan={1} glowColor="purple">
              <div className="space-y-2">
                <CandlestickChart className="w-6 h-6 text-purple-400" />
                <h4 className="font-black text-sm text-white">Technical & Fundamental Screening</h4>
                <p className="text-xs text-slate-400 font-medium">Custom RSI, MACD, PE, & Debt-to-Equity filters.</p>
              </div>
            </BentoCard>

            {/* CAPABILITY 4: SEBI COMPLIANT (4 col x 1 row) */}
            <BentoCard colSpan={4} rowSpan={1} glowColor="amber">
              <div className="space-y-2">
                <Shield className="w-6 h-6 text-amber-400" />
                <h4 className="font-black text-sm text-white">SEBI Registered Advisory</h4>
                <p className="text-xs text-slate-400 font-medium">RA INH000009821 verified compliance auditing.</p>
              </div>
            </BentoCard>

            {/* CAPABILITY 5: SMART ALERTS (4 col x 1 row) */}
            <BentoCard colSpan={4} rowSpan={1} glowColor="rose">
              <div className="space-y-2">
                <Bell className="w-6 h-6 text-rose-400" />
                <h4 className="font-black text-sm text-white">Smart Price & Push Triggers</h4>
                <p className="text-xs text-slate-400 font-medium">Instant Telegram, WhatsApp, and App push alerts.</p>
              </div>
            </BentoCard>
          </BentoGrid>
        </section>

        {/* SECTION 3: AI ADVISORS BENTO GRID */}
        <section id="ai-advisors" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              Autonomous Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
              Meet Your AI Investment Team
            </h2>
            <p className="text-xs text-slate-400 font-medium">Three specialized AI agents calibrated for Indian retail wealth.</p>
          </div>

          <BentoGrid>
            {/* INTERACTIVE CHAT PREVIEW (6 col x 2 row) */}
            <BentoCard colSpan={6} rowSpan={2} glowColor="purple" className="bg-[#172033]">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary text-white font-black flex items-center justify-center text-xs">MA</div>
                    <div>
                      <span className="font-black text-xs text-white block">Market Analyst AI</span>
                      <span className="text-[10px] text-emerald-400 font-mono">● Online & Scanning Market</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Model v4.2</span>
                </div>

                {/* Simulated Conversation */}
                <div className="space-y-3 font-sans text-xs">
                  <div className="p-3 rounded-2xl bg-slate-800 text-slate-200 max-w-[85%]">
                    User: "Which tech stock looks strong for a 2-week swing trade?"
                  </div>
                  <div className="p-3 rounded-2xl bg-primary/20 border border-primary/30 text-blue-100 max-w-[90%] ml-auto space-y-1">
                    <span className="font-bold block text-blue-300">Market Analyst AI:</span>
                    <p className="text-[11px] leading-relaxed">
                      INFY shows a bullish falling-wedge breakout at ₹1,560. Target: ₹1,640 with Stop-loss at ₹1,520. Risk-Reward: 1:2.5.
                    </p>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* PORTFOLIO ADVISOR (3 col x 2 row) */}
            <BentoCard colSpan={3} rowSpan={2} glowColor="emerald">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h4 className="font-black text-base text-white font-display">Portfolio Advisor AI</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Evaluates drawdown risk, sector exposure, and auto-rebalances your holdings for target CAGR.
                </p>
                <div className="p-3 bg-[#172033] rounded-xl border border-slate-800 text-[10px] font-mono text-slate-300">
                  Risk Score: 3.8/10 (Balanced)
                </div>
              </div>
            </BentoCard>

            {/* INVESTMENT COACH (3 col x 2 row) */}
            <BentoCard colSpan={3} rowSpan={2} glowColor="amber">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h4 className="font-black text-base text-white font-display">Investment Coach AI</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Step-by-step mentor explaining options strategies, balance sheet ratios, and trading discipline.
                </p>
                <div className="p-3 bg-[#172033] rounded-xl border border-slate-800 text-[10px] font-mono text-slate-300">
                  Active Course: Options Strategy
                </div>
              </div>
            </BentoCard>
          </BentoGrid>
        </section>

        {/* SECTION 4: MARKET INTELLIGENCE STRIP */}
        <section id="market-strip">
          <BentoGrid>
            <BentoCard colSpan={12} rowSpan={1} glowColor="blue" className="bg-[#172033]">
              <div className="flex flex-wrap items-center justify-between gap-6 font-mono text-xs">
                <div className="flex items-center gap-2 shrink-0">
                  <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="font-black text-white">NSE LIVE INDICES</span>
                </div>

                <div className="flex items-center gap-8 overflow-x-auto py-1">
                  <div>
                    <span className="text-slate-400 block text-[10px]">NIFTY 50</span>
                    <span className="text-white font-bold block">24,520.40</span>
                    <span className="text-emerald-400 text-[10px]">▲ +0.65%</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">SENSEX</span>
                    <span className="text-white font-bold block">80,480.10</span>
                    <span className="text-emerald-400 text-[10px]">▲ +0.52%</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">BANKNIFTY</span>
                    <span className="text-white font-bold block">52,340.80</span>
                    <span className="text-rose-400 text-[10px]">▼ -0.18%</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">NIFTY IT</span>
                    <span className="text-white font-bold block">39,120.50</span>
                    <span className="text-emerald-400 text-[10px]">▲ +1.24%</span>
                  </div>
                </div>

                <button onClick={() => navigate('/dashboard')} className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-black rounded-lg text-xs transition cursor-pointer">
                  Open Terminal
                </button>
              </div>
            </BentoCard>
          </BentoGrid>
        </section>

        {/* SECTION 5: INVEST HUB ASSETS PREVIEW */}
        <section id="invest-hub" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              7 Asset Classes
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
              Invest Hub Asset Grid
            </h2>
            <p className="text-xs text-slate-400 font-medium">Stocks, Mutual Funds, ETFs, IPOs, Gold, and Commodities in one view.</p>
          </div>

          <BentoGrid>
            {/* ENLARGED TRENDING ASSET CARD (4 col x 2 row) */}
            <BentoCard colSpan={4} rowSpan={2} glowColor="amber" className="bg-gradient-to-br from-amber-950/30 to-[#1E293B]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold rounded-md">
                  <Flame className="w-3.5 h-3.5" /> TRENDING NOW: IPOs
                </div>
                <h3 className="text-xl font-black text-white font-display">Ola Electric & Bajaj Housing IPO</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Grey Market Premium (GMP): <strong className="text-amber-400 font-mono">+₹42 (38.5% Expected Listing Gain)</strong>.
                </p>
                <div className="p-3 bg-[#172033] rounded-xl border border-slate-800 text-[10px] font-mono text-slate-300 space-y-1">
                  <div>Subscription: 14.8x (Retail: 22.1x)</div>
                  <div className="text-emerald-400">AI Recommendation: Apply</div>
                </div>
              </div>
            </BentoCard>

            {/* STOCKS (4 col x 1 row) */}
            <BentoCard colSpan={4} rowSpan={1} glowColor="blue">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Equities & Stocks</span>
                  <span className="text-lg font-black text-white font-mono block mt-1">4,000+ Listed</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">RSI & P/E Filters</span>
              </div>
            </BentoCard>

            {/* MUTUAL FUNDS (4 col x 1 row) */}
            <BentoCard colSpan={4} rowSpan={1} glowColor="emerald">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Mutual Funds</span>
                  <span className="text-lg font-black text-white font-mono block mt-1">Top Fund: 24.2% CAGR</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#64748B]">SIP Calculator</span>
              </div>
            </BentoCard>

            {/* GOLD (4 col x 1 row) */}
            <BentoCard colSpan={4} rowSpan={1} glowColor="amber">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">24K Digital Gold</span>
                  <span className="text-lg font-black text-white font-mono block mt-1">₹7,240 / g</span>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400">99.9% Pure SGB</span>
              </div>
            </BentoCard>

            {/* COMMODITIES (4 col x 1 row) */}
            <BentoCard colSpan={4} rowSpan={1} glowColor="purple">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">MCX Commodities</span>
                  <span className="text-lg font-black text-white font-mono block mt-1">Crude & Silver</span>
                </div>
                <span className="text-xs font-mono font-bold text-purple-400">Margin Active</span>
              </div>
            </BentoCard>
          </BentoGrid>
        </section>

        {/* SECTION 6: PORTFOLIO COMMAND CENTER PREVIEW */}
        <section id="portfolio-preview" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#64748B] bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Wealth Command Center
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
              Real-Time Portfolio Intelligence
            </h2>
          </div>

          <BentoGrid>
            {/* NET WEALTH & ALLOCATION CARD (8 col x 2 row) */}
            <BentoCard colSpan={8} rowSpan={2} glowColor="blue">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">Total Net Wealth</span>
                    <span className="text-4xl sm:text-5xl font-black text-white font-mono mt-1 block">₹8,42,150.00</span>
                  </div>
                  <span className="text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-xl">
                    Overall Returns: +20.3%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Invested Amount</span>
                    <span className="font-bold text-white">₹7,00,000.00</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Total Profit</span>
                    <span className="font-bold text-emerald-400">+₹1,42,150.00</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">XIRR CAGR</span>
                    <span className="font-bold text-[#64748B]">22.4%</span>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* TODAY'S P&L (4 col x 1 row) */}
            <BentoCard colSpan={4} rowSpan={1} glowColor="emerald">
              <span className="text-xs font-mono text-slate-400 uppercase block">Today's P&L</span>
              <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">+₹14,820.50</span>
              <span className="text-[11px] text-emerald-400 font-mono font-bold">▲ +1.79% Today</span>
            </BentoCard>

            {/* TOP HOLDINGS (4 col x 1 row) */}
            <BentoCard colSpan={4} rowSpan={1} glowColor="purple">
              <span className="text-xs font-mono text-slate-400 uppercase block">Top Holding</span>
              <span className="text-lg font-black text-white font-mono mt-1 block">RELIANCE (35% Weight)</span>
              <span className="text-[11px] text-slate-400 font-mono">Avg Price: ₹2,450.00</span>
            </BentoCard>
          </BentoGrid>
        </section>

        {/* SECTION 7: PRICING (ASYMMETRIC BENTO GRID) */}
        <section id="pricing" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Pricing Plans
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
              Transparent Bento Pricing
            </h2>
          </div>

          <BentoGrid>
            {/* BASIC FREE PLAN (3 col x 2 row) */}
            <BentoCard colSpan={3} rowSpan={2} glowColor="slate">
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase block">Basic Free</span>
                <span className="text-4xl font-black text-white font-mono block">₹0</span>
                <p className="text-xs text-slate-400 font-medium">Essential market data & basic watchlist.</p>
                <ul className="space-y-2 text-xs font-medium text-slate-300 pt-4 border-t border-slate-800">
                  <li>✓ Real-time NSE/BSE ticks</li>
                  <li>✓ 3 SEBI Research Calls/mo</li>
                  <li>✓ Watchlist & Charts</li>
                </ul>
                <button onClick={() => navigate('/signup')} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl cursor-pointer">
                  Get Started Free
                </button>
              </div>
            </BentoCard>

            {/* RECOMMENDED PRO PLAN (ELEVATED 6 col x 2 row HERO TIER) */}
            <BentoCard colSpan={6} rowSpan={2} glowColor="emerald" className="bg-gradient-to-b from-[#1E293B] via-[#172033] to-[#1E293B] border-2 border-emerald-500/40">
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full">
                    Recommended Tier
                  </span>
                  <Crown className="w-5 h-5 text-amber-400" />
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white font-mono">₹999</span>
                  <span className="text-xs text-slate-400 font-mono font-bold">/ month</span>
                </div>

                <p className="text-xs text-slate-300 font-medium">Full access to SEBI Calls & Autonomous AI Signal Engine.</p>

                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-200 pt-4 border-t border-slate-800">
                  <div>✓ Unlimited SEBI Calls</div>
                  <div>✓ 3 Autonomous AI Advisors</div>
                  <div>✓ Option & Stock Screener</div>
                  <div>✓ Portfolio Rebalance Engine</div>
                </div>

                <button onClick={() => navigate('/signup')} className="w-full py-4 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary hover:to-emerald-600 text-white font-black text-xs rounded-xl shadow-lg transition cursor-pointer">
                  Start 14-Day Free Trial
                </button>
              </div>
            </BentoCard>

            {/* ELITE WEALTH PLAN (3 col x 2 row) */}
            <BentoCard colSpan={3} rowSpan={2} glowColor="amber">
              <div className="space-y-4">
                <span className="text-xs font-bold text-amber-400 uppercase block">Elite Wealth</span>
                <span className="text-4xl font-black text-white font-mono block">₹2,999</span>
                <p className="text-xs text-slate-400 font-medium">For HNWIs & active F&O traders.</p>
                <ul className="space-y-2 text-xs font-medium text-slate-300 pt-4 border-t border-slate-800">
                  <li>✓ Dedicated SEBI Analyst</li>
                  <li>✓ Pre-IPO Allocation Desk</li>
                  <li>✓ Automated Trading API</li>
                </ul>
                <button onClick={() => navigate('/signup')} className="w-full py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs rounded-xl border border-amber-500/40 cursor-pointer">
                  Contact Desk
                </button>
              </div>
            </BentoCard>
          </BentoGrid>
        </section>

      </main>

      {/* SECTION 8: MONOSPACE TABULAR REGULATORY FOOTER */}
      <footer className="bg-[#0B1120] text-slate-400 font-mono text-xs border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary text-white font-black flex items-center justify-center">U</div>
              <span className="font-black text-white font-display text-lg">UNIVEST</span>
            </div>
            <div className="text-[11px] text-emerald-400 font-bold">
              SEBI Registration No: INH000009821 (Research Analyst)
            </div>
          </div>

          <div className="text-[10px] text-slate-500 leading-relaxed space-y-2">
            <p>
              REGULATORY DISCLOSURE: Investments in securities market are subject to market risks. Read all related documents carefully before investing. Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
            </p>
            <p>
              © {new Date().getFullYear()} Univest / Waya Financial Technologies Pvt Ltd. All rights reserved. Tabular data rendered via JetBrains Mono / Inter.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default BentoLandingPage;
