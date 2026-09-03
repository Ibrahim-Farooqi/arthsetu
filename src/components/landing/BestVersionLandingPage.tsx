import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, ArrowRight, TrendingUp, TrendingDown, Sparkles, Mail, CheckCircle2, 
  Brain, BarChart3, CandlestickChart, Briefcase, GraduationCap, Bell, Crown, Star, Check, 
  Radio, Lock, ChevronRight, Zap, RefreshCcw, Layers, Award, Terminal, Flame, Sun, Moon,
  UserCheck, FileCheck, CircleDollarSign, Coins, Globe, Landmark, Compass, LineChart, BookOpen, Link, Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MovingTickerRibbon } from '../common/MovingTickerRibbon';
import { CenteredHeroBackground } from './CenteredHeroBackground';
import { LiveHeroCards } from './LiveHeroCards';
import { BentoFeaturesSection } from './BentoFeaturesSection';
import { AIChatSection } from './AIChatSection';
import { ScrollStepperSection } from './ScrollStepperSection';

export const BestVersionLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = 'dark';
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [signalIndex, setSignalIndex] = useState(0);

  // Cycling Hero AI Signals
  const aiSignals = [
    { symbol: 'RELIANCE', conviction: 96, target: '₹3,120', pattern: 'Cup & Handle Breakout' },
    { symbol: 'TATAMOTORS', conviction: 94, target: '₹1,080', pattern: 'Golden Crossover' },
    { symbol: 'INFY', conviction: 91, target: '₹1,640', pattern: 'Falling Wedge Breakout' },
    { symbol: 'HDFCBANK', conviction: 93, target: '₹1,820', pattern: 'Institutional Accumulation' }
  ];

  // Stepper Steps for How It Works
  const steps = [
    { title: "Quick Signup", desc: "Register with mobile OTP & email in 30s.", icon: UserCheck },
    { title: "Instant DigiLocker eKYC", desc: "Automated NSDL PAN & Aadhaar validation.", icon: FileCheck },
    { title: "AI Investor Calibration", desc: "Determine your risk tolerance & target CAGR.", icon: Brain },
    { title: "Execute Advisory Calls", desc: "Receive SEBI research calls and automated rebalancing.", icon: TrendingUp },
  ];

  // Illustrative User Experiences
  const testimonials = [
    {
      quote: "Univest's AI Market Analyst flagged the Tata Motors breakout at ₹920 before any broker research report. Booked +24% gain in 12 days.",
      author: "Rajesh Sharma",
      role: "Pro Trader, Mumbai (Illustrative Example)",
      gains: "+₹1,84,000 P&L"
    },
    {
      quote: "The DigiLocker KYC process was completely seamless. Uploaded PAN and was ready for SEBI options calls in under 3 minutes.",
      author: "Priya Nair",
      role: "Options Investor, Bengaluru (Illustrative Example)",
      gains: "14-Day Free Access"
    },
    {
      quote: "Having 3 specialized AI advisors watching my portfolio 24/7 gives me total confidence. The auto-rebalance advice protected my gains.",
      author: "Amitabh Verma",
      role: "HNWI Portfolio Client, Delhi (Illustrative Example)",
      gains: "+22.4% XIRR CAGR"
    }
  ];
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Dynamic Ticker and Countdown states for the Asset classes mosaic grid
  const [niftyChange, setNiftyChange] = useState(0.84);
  const [goldPrice, setGoldPrice] = useState(9845.50);
  const [ipoCountdown, setIpoCountdown] = useState('2d 04h 12m 35s');

  useEffect(() => {
    const interval = setInterval(() => {
      setNiftyChange((prev) => +(prev + (Math.random() * 0.04 - 0.02)).toFixed(2));
      setGoldPrice((prev) => +(prev + (Math.random() * 2.0 - 1.0)).toFixed(2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let seconds = 187955;
    const interval = setInterval(() => {
      seconds--;
      if (seconds < 0) {
        setIpoCountdown('Ended');
        clearInterval(interval);
        return;
      }
      const d = Math.floor(seconds / (3600 * 24));
      const h = Math.floor((seconds % (3600 * 24)) / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      const pad = (num: number) => String(num).padStart(2, '0');
      setIpoCountdown(`${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSignalIndex((prev) => (prev + 1) % aiSignals.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setEmailSubmitted(true);
    setTimeout(() => navigate('/signup', { state: { email } }), 1200);
  };

  return (
    <div
      data-theme={theme}
      className={`min-h-screen font-sans transition-colors duration-300 relative ${
        theme === 'dark' ? 'bg-[#080E1A] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >

      {/* ── SITE-WIDE BACKGROUND: vertical lines + gradient mesh ───────── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Vertical grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: theme === 'dark'
              ? 'repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 80px)'
              : 'repeating-linear-gradient(90deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 80px)',
          }}
        />
        {/* Blob 1 — Blue, top-left */}
        <div className={`absolute top-[-5%] left-[-5%] w-[600px] h-[600px] rounded-full blur-[140px] ${
          theme === 'dark' ? 'bg-primary/20' : 'bg-blue-400/10'
        }`} />
        {/* Blob 2 — Emerald, mid-right */}
        <div className={`absolute top-[35%] right-[-8%] w-[500px] h-[500px] rounded-full blur-[120px] ${
          theme === 'dark' ? 'bg-emerald-500/12' : 'bg-emerald-400/8'
        }`} />
        {/* Blob 3 — Indigo, bottom-left */}
        <div className={`absolute bottom-[10%] left-[10%] w-[450px] h-[450px] rounded-full blur-[120px] ${
          theme === 'dark' ? 'bg-primary/15' : 'bg-indigo-400/8'
        }`} />
        {/* Blob 4 — Cyan, top-right */}
        <div className={`absolute top-[15%] right-[20%] w-[350px] h-[350px] rounded-full blur-[100px] ${
          theme === 'dark' ? 'bg-cyan-500/10' : 'bg-cyan-400/6'
        }`} />
        {/* Blob 5 — Blue, bottom-right */}
        <div className={`absolute bottom-[5%] right-[5%] w-[400px] h-[400px] rounded-full blur-[130px] ${
          theme === 'dark' ? 'bg-primary/12' : 'bg-blue-400/6'
        }`} />
      </div>

      {/* 1. STICKY NAVBAR WITH SUN/MOON THEME TOGGLE & TICKER RIBBON */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          theme === 'dark'
            ? 'bg-[#172033]/90 backdrop-blur-xl border-white/[0.08]'
            : 'bg-white/90 backdrop-blur-xl border-slate-200 shadow-xs'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[50px] py-3.5 flex items-center justify-between">
          <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-emerald-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-[rgba(21,81,157,0.3)]/30">
              U
            </div>
            <div>
              <span className="font-black text-xl tracking-tight block leading-none font-display">UNIVEST</span>
              <span className="text-[10px] text-emerald-500 font-mono font-bold tracking-widest uppercase flex items-center gap-1">
                <Shield className="w-3 h-3" /> SEBI RA: INH000009821
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold opacity-90">
            <a href="#hero" className="hover:text-primary transition">Overview</a>
            <a href="#capabilities" className="hover:text-primary transition">Capabilities</a>
            <a href="#ai-advisors" className="hover:text-primary transition">AI Advisors</a>
            <a href="#how-it-works" className="hover:text-primary transition">How It Works</a>
            <a href="#invest-hub" className="hover:text-primary transition">Asset Hub</a>
            <a href="#pricing" className="hover:text-primary transition">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2.5 text-xs font-black opacity-80 hover:opacity-100 transition cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-5 py-2.5 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary hover:to-emerald-600 text-white text-xs font-black rounded-xl transition shadow-lg shadow-[rgba(21,81,157,0.3)]/25 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CONTINUOUS TICKER MARQUEE UNDER NAVBAR */}
        <MovingTickerRibbon theme={theme} />
      </nav>

      {/* FULL-SCREEN HERO — Equitum-inspired gradient layout */}
      <section id="hero" className="relative w-full min-h-screen overflow-hidden flex flex-col">

        {/* Hero-specific extra-density blobs (layered on top of global background) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-primary/25 rounded-full blur-[120px]" />
          <div className="absolute bottom-[0%] right-[10%] w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-[100px]" />
          <div className="absolute top-[10%] right-[5%] w-[350px] h-[350px] bg-primary/15 rounded-full blur-[90px]" />
          <div className="absolute top-[40%] left-[-5%] w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-[80px]" />
        </div>

        {/* Navbar-height spacer */}
        <div className="h-20 shrink-0" />

        {/* Middle: grows to push top content to center */}
        <div className="flex-1 flex flex-col justify-center">

        {/* Top: Split headline + subtitle */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-[50px] py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">

          {/* LEFT: Big Headline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.04] tracking-tight font-display">
              We're here to help you build
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                lasting wealth.
              </span>
            </h1>
          </motion.div>

          {/* RIGHT: Subtitle + CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-6 lg:pt-4"
          >
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              Research, invest, and grow your portfolio — all from one intelligent platform. Powered by certified SEBI Research Analysts and AI that works around the clock.
            </p>

            {/* Email Capture */}
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-2">
              <div className="flex items-center gap-0 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                <Mail className="w-4 h-4 ml-4 shrink-0 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-3 py-3.5 text-sm font-medium outline-none bg-transparent text-white placeholder-slate-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="shrink-0 m-1.5 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-black rounded-xl transition cursor-pointer flex items-center gap-1.5"
                >
                  {emailSubmitted ? 'Welcome!' : isSubmitting ? 'Joining...' : 'Open Account'}
                  {!emailSubmitted && !isSubmitting && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 pl-1">Free 14-day trial · No credit card required · SEBI Compliant</p>
            </form>

            {/* How it works link */}
            <button
              onClick={() => navigate('/signup')}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white text-sm font-semibold transition w-fit"
            >
              How it works <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        </div> {/* end flex-1 justify-center */}

        <LiveHeroCards />
      </section>

      {/* MAIN CONTAINER — Remaining page sections */}
      <main className="max-w-[1440px] mx-auto px-6 lg:px-[50px] py-20 space-y-24">

        <BentoFeaturesSection theme={theme} />

        <AIChatSection theme={theme} />

        {/* 4. MARKET INTELLIGENCE — FULL-BLEED AMBIENT DATA STRIP */}
        <section
          id="market-intelligence"
          className={`border py-8 px-6 rounded-3xl transition-colors ${
            theme === 'dark' ? 'bg-[#080D1A] border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs">
            <div className="flex items-center gap-3 shrink-0">
              <Radio className="w-5 h-5 text-emerald-500 animate-pulse" />
              <div>
                <span className="font-black text-sm block">LIVE EXCHANGE SPARKELINES</span>
                <span className="text-[10px] opacity-70">Sub-second NSE/BSE streaming tick feeds</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div>
                <span className="opacity-70 block text-[10px]">NIFTY 50</span>
                <span className="font-black text-sm block">24,520.40</span>
                <span className="text-emerald-500 text-[11px] font-bold">▲ +0.65% (+158.2)</span>
              </div>
              <div>
                <span className="opacity-70 block text-[10px]">SENSEX</span>
                <span className="font-black text-sm block">80,480.10</span>
                <span className="text-emerald-500 text-[11px] font-bold">▲ +0.52% (+412.0)</span>
              </div>
              <div>
                <span className="opacity-70 block text-[10px]">BANKNIFTY</span>
                <span className="font-black text-sm block">52,340.80</span>
                <span className="text-danger text-[11px] font-bold">▼ -0.18% (-94.2)</span>
              </div>
              <div>
                <span className="opacity-70 block text-[10px]">NIFTY IT</span>
                <span className="font-black text-sm block">39,120.50</span>
                <span className="text-emerald-500 text-[11px] font-bold">▲ +1.24% (+478.6)</span>
              </div>
            </div>

            <button onClick={() => navigate('/dashboard')} className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-black text-xs rounded-xl shadow-lg transition shrink-0 cursor-pointer">
              Launch Terminal
            </button>
          </div>
        </section>

        <ScrollStepperSection theme={theme} />

        {/* 6. ONE PLATFORM. EVERY INVESTMENT. (RE-DESIGNED ASSET HUB MOSAIC) */}
        <section id="invest-hub" className="space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
              Asset Universe
            </span>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              One Platform. Every Investment.
            </h2>
            <p className={`opacity-80 text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Access stocks, mutual funds, ETFs, IPOs, gold, bonds and global markets from one intelligent investment platform.
            </p>
          </div>

          {/* Asymmetric Mosaic Grid */}
          <div className="grid grid-cols-12 gap-6 items-stretch">
            
            {/* STOCKS CARD (Featured - col-span-8) */}
            <motion.div
              whileHover={{ y: -5 }}
              className={`col-span-12 lg:col-span-8 p-6 rounded-3xl border flex flex-col justify-between min-h-[240px] transition-all duration-300 relative overflow-hidden group ${
                theme === 'dark'
                  ? 'bg-[#0A0F1D]/60 border-white/[0.08] hover:border-primary/40 hover:shadow-[0_8px_32px_rgba(21,81,157,0.06)]'
                  : 'bg-white border-slate-200/80 hover:border-primary/30 hover:shadow-[0_8px_32px_rgba(21,81,157,0.04)] shadow-xs'
              }`}
            >
              {/* Card background sparkline graph drawing */}
              <div className="absolute inset-0 opacity-15 pointer-events-none flex items-end justify-end p-2 z-0">
                <svg className="w-48 h-20 text-emerald-400 overflow-visible" viewBox="0 0 100 30" fill="none">
                  <path
                    d="M0,25 Q15,28 30,12 T60,8 T80,22 T100,5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="relative z-10 space-y-3 text-left">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase tracking-wider font-mono">
                    Live Today
                  </span>
                </div>
                <div>
                  <h4 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Stocks</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Invest in 4,300+ listed NSE & BSE companies with SEBI-registered advisory models and smart scanners.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex justify-between items-end border-t border-slate-800/40 pt-4 mt-4 font-mono">
                <div>
                  <span className="text-[8px] text-slate-500 uppercase block font-bold">NIFTY index trend</span>
                  <span className="text-xs font-black text-emerald-400">▲ +{niftyChange}%</span>
                </div>
                <button
                  onClick={() => navigate('/dashboard')}
                  className={`text-xs font-black flex items-center gap-1 group-hover:text-[#64748B] transition-colors ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Explore Stocks <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* MUTUAL FUNDS CARD (col-span-4) */}
            <motion.div
              whileHover={{ y: -5 }}
              className={`col-span-12 md:col-span-6 lg:col-span-4 p-6 rounded-3xl border flex flex-col justify-between min-h-[240px] transition-all duration-300 group ${
                theme === 'dark'
                  ? 'bg-[#0A0F1D]/60 border-white/[0.08] hover:border-purple-500/40 hover:shadow-[0_8px_32px_rgba(168,85,247,0.06)]'
                  : 'bg-white border-slate-200/80 hover:border-purple-500/30 hover:shadow-[0_8px_32px_rgba(168,85,247,0.04)] shadow-xs'
              }`}
            >
              <div className="space-y-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h4 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Mutual Funds</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    4,500+ direct mutual funds options. Smart categorisations designed for horizon wealth.
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 mt-4 text-left">
                <div className="flex flex-wrap gap-1.5">
                  {['Large Cap', 'Flexi Cap', 'Small Cap'].map((tag) => (
                    <span
                      key={tag}
                      className={`text-[8px] font-black px-2 py-0.5 rounded-md border font-mono ${
                        theme === 'dark'
                          ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center border-t border-slate-800/40 pt-3 font-mono">
                  <span className="text-[9px] text-slate-500 font-bold">Zero-commission</span>
                  <button onClick={() => navigate('/dashboard')} className="text-xs font-black flex items-center gap-1 group-hover:text-purple-400 transition-colors">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* EXCHANGE TRADED FUNDS (ETFs - col-span-4) */}
            <motion.div
              whileHover={{ y: -5 }}
              className={`col-span-12 md:col-span-6 lg:col-span-4 p-6 rounded-3xl border flex flex-col justify-between min-h-[240px] transition-all duration-300 group ${
                theme === 'dark'
                  ? 'bg-[#0A0F1D]/60 border-white/[0.08] hover:border-emerald-500/40 hover:shadow-[0_8px_32px_rgba(16,185,129,0.06)]'
                  : 'bg-white border-slate-200/80 hover:border-emerald-500/30 hover:shadow-[0_8px_32px_rgba(16,185,129,0.04)] shadow-xs'
              }`}
            >
              <div className="space-y-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Exchange Traded Funds</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Low cost Index & Commodity ETFs tracking global and Indian benchmarks efficiently.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-800/40 pt-4 mt-4 flex justify-between items-center font-mono text-left">
                <div>
                  <span className="text-[7px] text-slate-500 uppercase block font-bold">Gold & Index ETFs</span>
                  <span className="text-xs font-black text-emerald-400">0.05% TER Min</span>
                </div>
                <button onClick={() => navigate('/dashboard')} className="text-xs font-black flex items-center gap-1 group-hover:text-emerald-400 transition-colors">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* DIGITAL GOLD (col-span-4) */}
            <motion.div
              whileHover={{ y: -5 }}
              animate={{
                background: theme === 'dark'
                  ? [
                      'linear-gradient(to bottom right, rgba(10,15,29,0.6), rgba(10,15,29,0.6))',
                      'linear-gradient(to bottom right, rgba(245,158,11,0.05), rgba(10,15,29,0.6))',
                      'linear-gradient(to bottom right, rgba(10,15,29,0.6), rgba(10,15,29,0.6))'
                    ]
                  : [
                      'linear-gradient(to bottom right, rgba(255,255,255,1), rgba(255,255,255,1))',
                      'linear-gradient(to bottom right, rgba(254,243,199,0.3), rgba(255,255,255,1))',
                      'linear-gradient(to bottom right, rgba(255,255,255,1), rgba(255,255,255,1))'
                    ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className={`col-span-12 md:col-span-6 lg:col-span-4 p-6 rounded-3xl border flex flex-col justify-between min-h-[240px] transition-all duration-300 group ${
                theme === 'dark'
                  ? 'border-white/[0.08] hover:border-amber-500/40 hover:shadow-[0_8px_32px_rgba(245,158,11,0.06)]'
                  : 'border-slate-200/80 hover:border-amber-500/30 hover:shadow-[0_8px_32px_rgba(245,158,11,0.04)] shadow-xs'
              }`}
            >
              <div className="space-y-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Coins className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h4 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>24K Digital Gold</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Secure fractional ownership with 99.99% purity vaults. Pure gold assets backed by secure trustee vaults.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-800/40 pt-4 mt-4 flex justify-between items-center font-mono text-left">
                <div>
                  <span className="text-[7px] text-slate-500 uppercase block font-bold">Gold Live Price</span>
                  <span className="text-xs font-black text-amber-500">₹{goldPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / g</span>
                </div>
                <button onClick={() => navigate('/dashboard')} className="text-xs font-black flex items-center gap-1 group-hover:text-amber-500 transition-colors">
                  Buy Instantly <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* TRENDING IPO (col-span-4) */}
            <motion.div
              whileHover={{ y: -5 }}
              className={`col-span-12 md:col-span-6 lg:col-span-4 p-6 rounded-3xl border flex flex-col justify-between min-h-[240px] transition-all duration-300 group ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-amber-950/10 to-[#0A0F1D]/60 border-amber-500/30 hover:border-amber-500/60 hover:shadow-[0_8px_32px_rgba(245,158,11,0.08)]'
                  : 'bg-amber-50/40 border-amber-300/60 hover:border-amber-500/40 hover:shadow-[0_8px_32px_rgba(245,158,11,0.06)] shadow-xs'
              }`}
            >
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
                  </div>
                  <span className="text-[9px] font-black text-amber-500 bg-amber-500/15 px-2.5 py-1 rounded-full border border-amber-500/20 uppercase tracking-wider font-mono">
                    Trending IPO
                  </span>
                </div>
                <div>
                  <h4 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Ola Electric IPO</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Apply securely using UPI ASBA pipeline with NSDL subscription tracking.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-800/40 pt-4 mt-4 flex justify-between items-end font-mono text-left">
                <div>
                  <span className="text-[7px] text-slate-500 uppercase block font-bold">Closes In</span>
                  <span className="text-xs font-black text-amber-500 animate-pulse">{ipoCountdown}</span>
                </div>
                <div>
                  <span className="text-[7px] text-slate-500 uppercase block font-bold text-right">Subscription</span>
                  <span className="text-xs font-bold text-white block text-right">6.8×</span>
                </div>
              </div>
            </motion.div>

            {/* COMMODITIES (col-span-4) */}
            <motion.div
              whileHover={{ y: -5 }}
              className={`col-span-12 md:col-span-6 lg:col-span-3 p-6 rounded-3xl border flex flex-col justify-between min-h-[240px] transition-all duration-300 group ${
                theme === 'dark'
                  ? 'bg-[#0A0F1D]/60 border-white/[0.08] hover:border-danger/40 hover:shadow-[0_8px_32px_rgba(244,63,94,0.06)]'
                  : 'bg-white border-slate-200/80 hover:border-danger/30 hover:shadow-[0_8px_32px_rgba(244,63,94,0.04)] shadow-xs'
              }`}
            >
              <div className="space-y-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-danger" />
                </div>
                <div>
                  <h4 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>MCX Commodities</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Trade Crude Oil, Silver, Gold, and Natural Gas on MCX with optimized margins.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-800/40 pt-4 mt-4 flex justify-between items-center font-mono text-left">
                <div>
                  <span className="text-[7px] text-slate-500 uppercase block font-bold">MCX Live Spreads</span>
                  <span className="text-xs font-black text-rose-400">Margin Active</span>
                </div>
                <button onClick={() => navigate('/dashboard')} className="text-xs font-black flex items-center gap-1 group-hover:text-rose-400 transition-colors">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* FIXED INCOME BONDS (col-span-5) */}
            <motion.div
              whileHover={{ y: -5 }}
              className={`col-span-12 md:col-span-6 lg:col-span-5 p-6 rounded-3xl border flex flex-col justify-between min-h-[240px] transition-all duration-300 group ${
                theme === 'dark'
                  ? 'bg-[#0A0F1D]/60 border-white/[0.08] hover:border-primary/40 hover:shadow-[0_8px_32px_rgba(21,81,157,0.06)]'
                  : 'bg-white border-slate-200/80 hover:border-primary/30 hover:shadow-[0_8px_32px_rgba(21,81,157,0.04)] shadow-xs'
              }`}
            >
              <div className="space-y-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Bonds & Fixed Income</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Government and Corporate bonds offering predictable income and secured returns.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-800/40 pt-4 mt-4 flex justify-between items-center font-mono text-left">
                <div>
                  <span className="text-[7px] text-slate-500 uppercase block font-bold">Tax-Free Yields</span>
                  <span className="text-xs font-black text-[#64748B]">7.45% Avg Yield</span>
                </div>
                <button onClick={() => navigate('/dashboard')} className="text-xs font-black flex items-center gap-1 group-hover:text-[#64748B] transition-colors">
                  View Bonds <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* US STOCKS (col-span-4) */}
            <motion.div
              className={`col-span-12 md:col-span-6 lg:col-span-4 p-6 rounded-3xl border flex flex-col justify-between min-h-[240px] transition-all duration-300 opacity-65 group ${
                theme === 'dark' ? 'bg-[#0A0F1D]/30 border-white/[0.04]' : 'bg-slate-50/50 border-slate-200 shadow-xs'
              }`}
            >
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-slate-500" />
                  </div>
                  <span className="text-[8px] font-black text-[#64748B] bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20 uppercase tracking-widest font-mono">
                    Coming Soon
                  </span>
                </div>
                <div>
                  <h4 className={`text-lg font-black ${theme === 'dark' ? 'text-slate-500' : 'text-slate-700'}`}>US Stocks</h4>
                  <p className="text-xs mt-1 leading-relaxed text-slate-500">
                    Fractional investing in global leaders like Apple, Tesla, Microsoft and NVIDIA.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-800/40 pt-4 mt-4 flex justify-between items-center font-mono text-left">
                <span className="text-[8px] text-slate-500 uppercase font-bold">Global Markets</span>
                <span className="text-[10px] font-bold text-primary">Notify Me</span>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── WHY INVESTORS CHOOSE UNIVEST FEATURE BANNER & PATHWAY ─────── */}
        <section className={`rounded-3xl border p-8 sm:p-12 relative overflow-hidden transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-[#0A0F1D]/80 border-white/[0.08] shadow-[0_8px_48px_rgba(0,0,0,0.5)]'
            : 'bg-white border-slate-200/80 shadow-sm'
        }`}>
          {/* Subtle background glow mesh */}
          <div className="absolute inset-0 z-0 bg-gradient-to-tr from-primary/5 via-transparent to-emerald-500/5 opacity-40 pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto space-y-12">
            
            {/* Header */}
            <div className="text-center space-y-3.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
                Core Advantages
              </span>
              <h3 className={`text-4xl font-extrabold font-display tracking-tight text-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Why Investors Choose Univest
              </h3>
              <p className={`text-sm sm:text-base max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Univest provides an integrated multi-agent AI engine and certified Research Analysts to secure and scale your wealth portfolio.
              </p>
            </div>

            {/* Advantage Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 text-left">
              {[
                {
                  icon: Sparkles,
                  title: 'AI Research & Signals',
                  desc: 'Certified SEBI advisory calls with entries, targets, and exit levels generated by smart algorithms.'
                },
                {
                  icon: Activity,
                  title: 'Market Intelligence',
                  desc: 'Sub-second NSDL tracking and live NIFTY tick feeds reporting market anomalies in real time.'
                },
                {
                  icon: Layers,
                  title: 'Multi-Asset Investing',
                  desc: 'Equities, Direct Mutual Funds, Corporate Bonds, and Gold managed from a single unified wallet.'
                },
                {
                  icon: BarChart3,
                  title: 'Portfolio Insights',
                  desc: 'Deep analytical diagnostics tracking CAGR performance, XIRR returns, and potential risk leakage.'
                },
                {
                  icon: Brain,
                  title: 'AI Advisors Monitoring',
                  desc: 'Autonomous multi-agents calibrating horizons, rebalancing configurations, and guarding gains 24/7.'
                },
                {
                  icon: Terminal,
                  title: 'Fast Order Execution',
                  desc: 'One-tap trade execution pipelines integrated directly into India’s major broker terminals.'
                }
              ].map((adv, idx) => {
                const AIcon = adv.icon;
                return (
                  <div key={idx} className="space-y-3">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${
                      theme === 'dark' ? 'bg-primary/10 border-primary/20' : 'bg-primary/5 border-primary/15'
                    }`}>
                      <AIcon className={`w-6 h-6 ${theme === 'dark' ? 'text-[#64748B]' : 'text-primary'}`} />
                    </div>
                    <h4 className={`text-base sm:text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{adv.title}</h4>
                    <p className={`text-xs sm:text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{adv.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Investment Journey Pathway */}
            <div className="pt-10 border-t border-slate-800/40 mt-10">
              <span className={`text-xs font-black uppercase tracking-widest block text-center mb-6 font-mono ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                The AI-Powered Investment Journey
              </span>
              
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto px-4 py-4 overflow-hidden md:overflow-visible">
                {/* Connecting Line Track */}
                <div className={`absolute top-[38px] left-10 right-10 h-[2px] hidden md:block z-0 ${theme === 'dark' ? 'bg-slate-800/80' : 'bg-slate-200'}`} />
                
                {/* Active Pulsing Laser Dash */}
                <div className="absolute top-[38px] left-10 right-10 h-[2px] hidden md:block z-0 overflow-hidden pointer-events-none">
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
                    className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                  />
                </div>

                {/* Pathway Nodes */}
                {[
                  { label: '1. Select Stocks', desc: 'Browse Asset Classes', icon: TrendingUp },
                  { label: '2. AI Research', desc: 'SEBI Compliant Advisory', icon: Shield },
                  { label: '3. Calibrate Target', desc: 'CAGR Optimized Profile', icon: Brain },
                  { label: '4. Unified Portfolio', desc: 'Monitor Real-Time Wealth', icon: Layers },
                  { label: '5. Wealth Growth', desc: 'Automated Rebalancing', icon: CheckCircle2 }
                ].map((node, i) => {
                  const NIcon = node.icon;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-3 md:flex-col md:text-center md:gap-2.5 px-5 py-4 rounded-2xl border z-10 w-full md:w-[185px] shadow-lg relative ${
                        theme === 'dark'
                          ? 'bg-[#050914] border-slate-800'
                          : 'bg-slate-50 border-slate-200 shadow-sm'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border ${
                        theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/25' : 'bg-emerald-500/5 border-emerald-500/15'
                      }`}>
                        <NIcon className={`w-5.5 h-5.5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      </div>
                      <div className="text-left md:text-center min-w-0">
                        <span className={`text-xs font-black block truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{node.label}</span>
                        <span className={`text-[10px] font-bold block truncate mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{node.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </section>

        {/* 8. TESTIMONIALS SPOTLIGHT (CAROUSEL SPOTLIGHT WITH ILLUSTRATIVE DISCLAIMER) */}
        <section
          id="testimonials"
          className={`border rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 transition-colors ${
            theme === 'dark' ? 'bg-[#080D1A] border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <span className="text-xs font-black uppercase tracking-wider text-purple-500 bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20">
            User Experience Spotlight
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <p className="text-lg sm:text-2xl font-medium leading-relaxed italic">
                "{testimonials[testimonialIdx].quote}"
              </p>

              <div>
                <h4 className="font-black text-base">{testimonials[testimonialIdx].author}</h4>
                <p className="text-xs opacity-75 font-medium">{testimonials[testimonialIdx].role}</p>
                <span className="inline-block mt-2 font-mono text-xs font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  {testimonials[testimonialIdx].gains}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* 9. PRICING SECTION — 3-TIER COMPARISON CARDS */}
        <section id="pricing" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
              Subscription Plans
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display">
              Transparent Pricing
            </h2>
            <p className="opacity-80 text-sm font-medium">Choose the plan that fits your trading volume. No hidden fees.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* Basic Free */}
            <div className={`rounded-3xl p-8 border flex flex-col justify-between ${
              theme === 'dark' ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="space-y-4">
                <span className="text-xs font-bold opacity-70 uppercase block">Basic Free</span>
                <div className="font-mono">
                  <span className="text-4xl font-black">₹0</span>
                  <span className="text-xs opacity-70 font-bold"> / forever</span>
                </div>
                <p className="text-xs opacity-75 font-medium">Essential market access and basic watchlists.</p>
                <ul className={`space-y-3 text-xs font-medium pt-4 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Real-time NSE/BSE ticks</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 3 SEBI Calls per month</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Basic charts</li>
                </ul>
              </div>
              <button onClick={() => navigate('/signup')} className={`w-full mt-8 py-3.5 font-bold text-xs rounded-xl cursor-pointer ${
                theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
              }`}>
                Get Started Free
              </button>
            </div>

            {/* Pro Trader (Elevated Recommended Tier) */}
            <div className={`rounded-3xl p-8 border-2 border-emerald-500 shadow-2xl flex flex-col justify-between scale-105 relative ${
              theme === 'dark' ? 'bg-gradient-to-b from-[#1E293B] via-[#172033] to-[#1E293B]' : 'bg-gradient-to-b from-white via-emerald-50/30 to-white'
            }`}>
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-emerald-500 rounded-full text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                Recommended Tier
              </div>

              <div className="space-y-4">
                <span className="text-xs font-bold text-emerald-500 uppercase block">Pro Trader</span>
                <div className="font-mono">
                  <span className="text-5xl font-black">₹999</span>
                  <span className="text-xs opacity-70 font-bold"> / month</span>
                </div>
                <p className="text-xs font-medium opacity-90">Full access to SEBI Calls & Autonomous AI Signal Engine.</p>
                <ul className={`space-y-3 text-xs font-medium pt-4 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Unlimited SEBI Research Calls</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 3 Autonomous AI Advisors</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Options & Futures Screener</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Portfolio Rebalance Engine</li>
                </ul>
              </div>
              <button onClick={() => navigate('/signup')} className="w-full mt-8 py-4 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary hover:to-emerald-600 text-white font-black text-xs rounded-xl shadow-lg transition cursor-pointer">
                Start 14-Day Free Trial
              </button>
            </div>

            {/* Elite Wealth */}
            <div className={`rounded-3xl p-8 border flex flex-col justify-between ${
              theme === 'dark' ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="space-y-4">
                <span className="text-xs font-bold text-amber-500 uppercase block">Elite Wealth</span>
                <div className="font-mono">
                  <span className="text-4xl font-black">₹2,999</span>
                  <span className="text-xs opacity-70 font-bold"> / month</span>
                </div>
                <p className="text-xs opacity-75 font-medium">For HNWIs & professional traders.</p>
                <ul className={`space-y-3 text-xs font-medium pt-4 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Dedicated SEBI Analyst</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Pre-IPO Allocation Desk</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Automated Trading API</li>
                </ul>
              </div>
              <button onClick={() => navigate('/signup')} className="w-full mt-8 py-3.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 font-bold text-xs rounded-xl border border-amber-500/40 cursor-pointer">
                Contact Desk
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* 10. MONOSPACE TABULAR REGULATORY FOOTER */}
      <footer className={`font-mono text-xs border-t py-12 ${
        theme === 'dark' ? 'bg-[#080D1A] border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[50px] space-y-6">
          <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b ${
            theme === 'dark' ? 'border-slate-800' : 'border-slate-300'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary text-white font-black flex items-center justify-center font-display">U</div>
              <span className="font-black font-display text-lg">UNIVEST</span>
            </div>
            <div className="text-[11px] text-emerald-500 font-bold">
              SEBI Registration No: INH000009821 (Research Analyst)
            </div>
          </div>

          <div className="text-[10px] opacity-70 leading-relaxed space-y-2">
            <p>
              REGULATORY DISCLOSURE: Investments in securities market are subject to market risks. Read all related documents carefully before investing. Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
            </p>
            <p>
              © {new Date().getFullYear()} Univest / Waya Financial Technologies Pvt Ltd. All rights reserved. Tabular figures rendered via JetBrains Mono.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

// SIGNATURE HERO visual: LIVE AI SIGNAL GRAPH
const LiveAiSignalGraph: React.FC<{ theme: 'dark' | 'light'; activeSignal: any }> = ({ theme, activeSignal }) => {
  return (
    <div className="relative w-full max-w-md mx-auto py-4">
      <svg viewBox="0 0 400 320" className="w-full h-auto">
        {/* Background Grid */}
        <defs>
          <pattern id="graph-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={theme === 'dark' ? '#334155' : '#CBD5E1'} strokeWidth="0.8" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#graph-grid)" />

        {/* Candlestick Bars */}
        {[50, 110, 170, 230, 290, 350].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={120 + (i % 3) * 20} x2={x} y2={210 + (i % 3) * 20} stroke="#64748B" strokeWidth="2" />
            <rect
              x={x - 7}
              y={140 + (i % 3) * 15}
              width="14"
              height={30 + (i % 2) * 20}
              fill={i % 2 === 0 ? "#10B981" : "#15519D"}
              rx="3"
            />
          </g>
        ))}

        {/* Actual Price Trend Line */}
        <path
          d="M 20 260 Q 80 200, 160 230 T 300 130 T 380 90"
          stroke="#15519D"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* AI Prediction Trend Line (Emerald Glowing) */}
        <path
          d="M 20 280 Q 80 220, 160 240 T 300 110 T 380 65"
          stroke="#10B981"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Traveling Pulsing Dot on AI Prediction Line */}
        <circle cx="380" cy="65" r="7" fill="#10B981" className="animate-ping" opacity="0.75" />
        <circle cx="380" cy="65" r="5" fill="#10B981" />
      </svg>
    </div>
  );
};

export default BestVersionLandingPage;
