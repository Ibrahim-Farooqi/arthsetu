import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, ArrowRight, TrendingUp, TrendingDown, Sparkles, Mail, CheckCircle2, 
  Brain, BarChart3, CandlestickChart, Briefcase, GraduationCap, Bell, Crown, Star, Check, 
  Radio, Lock, ChevronRight, Zap, RefreshCcw, Layers, Award, Terminal, Flame, CircleDollarSign, UserCheck, CreditCard, FileCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MovingTickerRibbon } from '../common/MovingTickerRibbon';
import { CenteredHeroBackground } from './CenteredHeroBackground';

export const IllustratedLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Stepper steps for KYC / How It Works
  const steps = [
    { title: "Quick Account Signup", desc: "Register with phone OTP & email in under 30 seconds.", icon: UserCheck },
    { title: "Instant DigiLocker eKYC", desc: "Automated NSDL PAN & Aadhaar eKYC via DigiLocker.", icon: FileCheck },
    { title: "AI Investor Calibration", desc: "12-step questionnaire to determine your risk archetype.", icon: Brain },
    { title: "Start Generating Alpha", desc: "Execute SEBI research calls and automated rebalancing.", icon: TrendingUp },
  ];

  // Testimonials Carousel Data
  const testimonials = [
    {
      quote: "Univest's AI Market Analyst flagged the Tata Motors breakout at ₹920 before any broker research report was published. I booked a +24% gain in 12 days.",
      author: "Rajesh Sharma",
      role: "Pro Investor, Mumbai",
      gains: "+₹1,84,000 P&L"
    },
    {
      quote: "The DigiLocker KYC process was completely seamless. I uploaded my PAN and was ready to receive SEBI-compliant options calls in less than 3 minutes.",
      author: "Priya Nair",
      role: "Options Trader, Bengaluru",
      gains: "14-Day Free Trial"
    },
    {
      quote: "Having 3 specialized AI advisors watching my portfolio 24/7 gives me total peace of mind. The auto-rebalance advice saved me during the market pullback.",
      author: "Amitabh Verma",
      role: "HNWI Portfolio Client, Delhi",
      gains: "+22.4% XIRR CAGR"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
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
    <div className="min-h-screen bg-[#172033] text-white font-sans selection:bg-primary selection:text-white">
      
      {/* 1. STICKY GLASSMORPHIC NAVBAR & LIVE TICKER RIBBON */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#172033]/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
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
            <a href="#capabilities" className="hover:text-white transition">Features</a>
            <a href="#ai-advisors" className="hover:text-white transition">AI Advisors</a>
            <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
            <a href="#invest-hub" className="hover:text-white transition">Asset Hub</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2 text-xs font-black text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
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

        {/* CONTINUOUS TICKER MARQUEE UNDER NAVBAR */}
        <MovingTickerRibbon theme="dark" />
      </nav>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 space-y-24">

        {/* 1. CENTERED HERO SECTION WITH DYNAMIC NEURAL CANVAS BACKGROUND */}
        <section id="hero" className="relative py-20 lg:py-28 flex flex-col items-center justify-center text-center overflow-hidden rounded-[32px]">
          {/* Centered Premium Background Animation */}
          <CenteredHeroBackground />

          {/* Centered Content Wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-3xl mx-auto space-y-8 px-4"
          >
            {/* Small premium badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4.5 py-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#64748B] animate-pulse" />
              <span className="text-[#64748B] text-xs font-mono font-bold uppercase tracking-wider">
                AI-Powered Investment Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none font-display text-white">
              Invest Smarter.<br />
              <span className="bg-gradient-to-r from-primary via-teal-400 to-emerald-500 bg-clip-text text-transparent">
                Build Wealth with Confidence.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="opacity-80 text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto text-slate-300">
              Manage your investments through one intelligent platform combining AI research, portfolio intelligence, market news and seamless investing.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary hover:to-emerald-600 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto px-8 py-4 bg-slate-800/80 hover:bg-slate-700/80 text-white border border-slate-700/80 font-black text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-10 border-t border-slate-800/60 max-w-2xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-center">
                <div>
                  <span className="text-xl sm:text-2xl font-black text-white block">50K+</span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mt-0.5">Investors</span>
                </div>
                <div className="border-l border-slate-800/80 pl-4 md:pl-2">
                  <span className="text-xl sm:text-2xl font-black text-emerald-500 block">SEBI Reg</span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mt-0.5">RA: INH000009821</span>
                </div>
                <div className="border-l border-slate-800/80 pl-4 md:pl-2">
                  <span className="text-xl sm:text-2xl font-black text-white block">₹500Cr+</span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mt-0.5">Vol / Month</span>
                </div>
                <div className="border-l border-slate-800/80 pl-4 md:pl-2">
                  <span className="text-xl sm:text-2xl font-black text-emerald-500 block">98.4%</span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mt-0.5">Accuracy</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 2. CAPABILITIES SECTION — FEATURE CARDS */}
        <section id="capabilities" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-[#64748B] bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
              Platform Features
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
              Everything Needed to Generate Alpha
            </h2>
            <p className="text-slate-400 text-sm font-medium">Modular capabilities engineered for retail stock traders and long-term investors.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: AI Signal (Hero Feature Card with animation flourish) */}
            <div className="bg-[#1E293B] rounded-3xl p-8 border border-slate-700 hover:border-primary/50 transition-all hover:shadow-2xl flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary/20 text-[#64748B] flex items-center justify-center mb-6 border border-primary/30">
                  <Brain className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#64748B] transition-colors">AI-Powered Signal Engine</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mb-4">
                  Scans candlestick patterns, volume surges, and RSI breakouts across 4,000+ Indian stocks in real time.
                </p>
              </div>
              <div className="p-3 bg-[#172033] rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-400 flex justify-between">
                <span>RELIANCE Signal</span>
                <span className="font-bold">Target: ₹3,120</span>
              </div>
            </div>

            {/* Feature 2: Real-time Data */}
            <div className="bg-[#1E293B] rounded-3xl p-8 border border-slate-700 hover:border-emerald-500/50 transition-all hover:shadow-2xl flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-6 border border-emerald-500/30">
                  <BarChart3 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-white mb-2 group-hover:text-emerald-400 transition-colors">Sub-Second NSE/BSE Feeds</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mb-4">
                  Direct exchange tick streaming with order book depth and instant notifications.
                </p>
              </div>
              <div className="p-3 bg-[#172033] rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 flex justify-between">
                <span>Feed Latency</span>
                <span className="font-bold text-emerald-400">&lt; 15ms</span>
              </div>
            </div>

            {/* Feature 3: Technical Analysis */}
            <div className="bg-[#1E293B] rounded-3xl p-8 border border-slate-700 hover:border-purple-500/50 transition-all hover:shadow-2xl flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-6 border border-purple-500/30">
                  <CandlestickChart className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-white mb-2 group-hover:text-purple-400 transition-colors">Pro Charting & Screener</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mb-4">
                  Professional technical charts with RSI, MACD, Moving Averages, and fundamental ratio filters.
                </p>
              </div>
              <div className="p-3 bg-[#172033] rounded-xl border border-slate-800 font-mono text-[11px] text-purple-400 flex justify-between">
                <span>Active Screener</span>
                <span className="font-bold">Golden Crossover</span>
              </div>
            </div>

            {/* Feature 4: Portfolio Management */}
            <div className="bg-[#1E293B] rounded-3xl p-8 border border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-2xl flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center mb-6 border border-amber-500/30">
                  <Briefcase className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-white mb-2 group-hover:text-amber-400 transition-colors">Portfolio Auto-Rebalance</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mb-4">
                  Multi-asset wealth tracking with automated risk-adjusted CAGR optimization.
                </p>
              </div>
              <div className="p-3 bg-[#172033] rounded-xl border border-slate-800 font-mono text-[11px] text-amber-400 flex justify-between">
                <span>Target CAGR</span>
                <span className="font-bold">22.4%</span>
              </div>
            </div>

            {/* Feature 5: SEBI Compliance */}
            <div className="bg-[#1E293B] rounded-3xl p-8 border border-slate-700 hover:border-danger/50 transition-all hover:shadow-2xl flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-danger/20 text-rose-400 flex items-center justify-center mb-6 border border-danger/30">
                  <Shield className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-white mb-2 group-hover:text-rose-400 transition-colors">SEBI Compliant Advisory</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mb-4">
                  All research calls undergo strict regulatory checks under SEBI RA Regulations 2014.
                </p>
              </div>
              <div className="p-3 bg-[#172033] rounded-xl border border-slate-800 font-mono text-[11px] text-rose-400 flex justify-between">
                <span>SEBI RA</span>
                <span className="font-bold">INH000009821</span>
              </div>
            </div>

            {/* Feature 6: Smart Push Alerts */}
            <div className="bg-[#1E293B] rounded-3xl p-8 border border-slate-700 hover:border-teal-500/50 transition-all hover:shadow-2xl flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-teal-600/20 text-teal-400 flex items-center justify-center mb-6 border border-teal-500/30">
                  <Bell className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-white mb-2 group-hover:text-teal-400 transition-colors">Instant Push Triggers</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mb-4">
                  Never miss an entry or exit target with automated price alerts and breaking news feeds.
                </p>
              </div>
              <div className="p-3 bg-[#172033] rounded-xl border border-slate-800 font-mono text-[11px] text-teal-400 flex justify-between">
                <span>Push Speed</span>
                <span className="font-bold">Instant</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. AI ADVISORS SECTION — ILLUSTRATED CHARACTER CARDS */}
        <section id="ai-advisors" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-purple-400 bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20">
              Autonomous Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
              Your Personal AI Investment Team
            </h2>
            <p className="text-slate-400 text-sm font-medium">Three specialized AI character agents watching your wealth 24/7.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Advisor 1: Market Analyst AI (Blue) */}
            <div className="bg-[#1E293B] rounded-3xl p-8 border border-slate-700 hover:border-primary/50 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-primary flex items-center justify-center text-white font-black text-xl shadow-lg shadow-[rgba(21,81,157,0.3)]/30">
                  MA
                </div>
                <h3 className="text-xl font-black text-white font-display">Market Analyst AI</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Scans technical breakouts, RSI momentum, and financial news in real time to suggest high-conviction trade setups.
                </p>
                <div className="p-3 bg-[#172033] rounded-2xl border border-slate-800 space-y-1 font-mono text-[11px]">
                  <span className="text-[#64748B] font-bold block">Latest Insight:</span>
                  <p className="text-slate-300">"RELIANCE forming bullish cup-and-handle pattern at ₹2,930."</p>
                </div>
              </div>
              <button onClick={() => navigate('/signup')} className="w-full mt-6 py-3 bg-slate-800 hover:bg-slate-700 text-[#64748B] hover:text-white font-black text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer">
                <span>Chat with Analyst AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Advisor 2: Portfolio Advisor AI (Emerald) */}
            <div className="bg-[#1E293B] rounded-3xl p-8 border border-slate-700 hover:border-emerald-500/50 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-600/30">
                  PA
                </div>
                <h3 className="text-xl font-black text-white font-display">Portfolio Advisor AI</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Evaluates drawdown risk, sector concentration, and suggests rebalancing moves tailored to your target CAGR.
                </p>
                <div className="p-3 bg-[#172033] rounded-2xl border border-slate-800 space-y-1 font-mono text-[11px]">
                  <span className="text-emerald-400 font-bold block">Portfolio Health:</span>
                  <p className="text-slate-300">"Risk Score: 3.8/10. Optimal sector diversification active."</p>
                </div>
              </div>
              <button onClick={() => navigate('/signup')} className="w-full mt-6 py-3 bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-white font-black text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer">
                <span>Chat with Portfolio AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Advisor 3: Investment Coach AI (Amber) */}
            <div className="bg-[#1E293B] rounded-3xl p-8 border border-slate-700 hover:border-amber-500/50 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-amber-600/30">
                  IC
                </div>
                <h3 className="text-xl font-black text-white font-display">Investment Coach AI</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Conversational mentor explaining complex options strategies, balance sheets, and market concepts step-by-step.
                </p>
                <div className="p-3 bg-[#172033] rounded-2xl border border-slate-800 space-y-1 font-mono text-[11px]">
                  <span className="text-amber-400 font-bold block">Mentorship Mode:</span>
                  <p className="text-slate-300">"Lesson 4: Bull Call Spread Options Risk Management."</p>
                </div>
              </div>
              <button onClick={() => navigate('/signup')} className="w-full mt-6 py-3 bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-white font-black text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer">
                <span>Chat with Coach AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 4. MARKET INTELLIGENCE — FULL-BLEED AMBIENT DATA STRIP */}
        <section id="market-intelligence" className="bg-[#0B1120] border-y border-slate-800 py-8 px-6 rounded-3xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs">
            <div className="flex items-center gap-3 shrink-0">
              <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
              <div>
                <span className="font-black text-white text-sm block">LIVE EXCHANGE SPARKELINES</span>
                <span className="text-[10px] text-slate-400">Sub-second NSE/BSE streaming tick feeds</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div>
                <span className="text-slate-400 block text-[10px]">NIFTY 50</span>
                <span className="text-white font-black text-sm block">24,520.40</span>
                <span className="text-emerald-400 text-[11px] font-bold">▲ +0.65% (+158.2)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">SENSEX</span>
                <span className="text-white font-black text-sm block">80,480.10</span>
                <span className="text-emerald-400 text-[11px] font-bold">▲ +0.52% (+412.0)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">BANKNIFTY</span>
                <span className="text-white font-black text-sm block">52,340.80</span>
                <span className="text-rose-400 text-[11px] font-bold">▼ -0.18% (-94.2)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">NIFTY IT</span>
                <span className="text-white font-black text-sm block">39,120.50</span>
                <span className="text-emerald-400 text-[11px] font-bold">▲ +1.24% (+478.6)</span>
              </div>
            </div>

            <button onClick={() => navigate('/dashboard')} className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-black text-xs rounded-xl shadow-lg transition shrink-0 cursor-pointer">
              Launch Terminal
            </button>
          </div>
        </section>

        {/* 5. HOW IT WORKS / ONBOARDING STEPPER (NOT CARDS) */}
        <section id="how-it-works" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
              Seamless Onboarding
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
              Ready in 4 Simple Steps
            </h2>
            <p className="text-slate-400 text-sm font-medium">Digital eKYC via DigiLocker, instant risk calibration, and live advisory execution.</p>
          </div>

          {/* Interactive Stepper Bar */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, idx) => {
              const StepIcon = s.icon;
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`
                    p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between
                    ${isActive 
                      ? 'bg-[#1E293B] border-primary shadow-xl shadow-[rgba(21,81,157,0.3)]/10 scale-105' 
                      : 'bg-[#172033] border-slate-800 hover:border-slate-700'
                    }
                  `}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-full bg-slate-800 text-[#64748B] font-mono font-bold text-xs flex items-center justify-center">
                        0{idx + 1}
                      </span>
                      <StepIcon className={`w-5 h-5 ${isActive ? 'text-[#64748B]' : 'text-slate-500'}`} />
                    </div>
                    <h4 className="font-black text-sm text-white">{s.title}</h4>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{s.desc}</p>
                  </div>

                  <div className={`h-1 rounded-full mt-6 ${isActive ? 'bg-primary' : 'bg-slate-800'}`} />
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. INVEST HUB PREVIEW — 7 ASSET CLASSES */}
        <section id="invest-hub" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
              Multi-Asset Universe
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
              7 Dedicated Asset Classes
            </h2>
            <p className="text-slate-400 text-sm font-medium">Trade stocks, mutual funds, ETFs, IPOs, gold, and commodities from one dashboard.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700 space-y-2 font-mono">
              <span className="text-xs font-bold text-slate-400 block">Equities & Stocks</span>
              <span className="text-lg font-black text-white block">4,000+ Listed</span>
              <span className="text-[11px] text-emerald-400 block">RSI & P/E Filters</span>
            </div>

            <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700 space-y-2 font-mono">
              <span className="text-xs font-bold text-slate-400 block">Mutual Funds</span>
              <span className="text-lg font-black text-white block">24.2% Top CAGR</span>
              <span className="text-[11px] text-[#64748B] block">SIP Calculator</span>
            </div>

            <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700 space-y-2 font-mono">
              <span className="text-xs font-bold text-slate-400 block">ETFs & Index</span>
              <span className="text-lg font-black text-white block">Low Expense</span>
              <span className="text-[11px] text-purple-400 block">0.05% TER</span>
            </div>

            <div className="bg-[#1E293B] p-5 rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-950/20 to-[#1E293B] space-y-2 font-mono">
              <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold">
                <Flame className="w-3.5 h-3.5" /> TRENDING IPO
              </div>
              <span className="text-lg font-black text-white block">Ola Electric</span>
              <span className="text-[11px] text-amber-400 block">GMP: +₹42 (38%)</span>
            </div>

            <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700 space-y-2 font-mono">
              <span className="text-xs font-bold text-slate-400 block">24K Digital Gold</span>
              <span className="text-lg font-black text-white block">₹7,240 / g</span>
              <span className="text-[11px] text-amber-400 block">99.9% Pure SGB</span>
            </div>

            <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700 space-y-2 font-mono">
              <span className="text-xs font-bold text-slate-400 block">MCX Commodities</span>
              <span className="text-lg font-black text-white block">Crude & Silver</span>
              <span className="text-[11px] text-rose-400 block">Margin Active</span>
            </div>

            <div className="col-span-2 bg-gradient-to-r from-primary to-emerald-500 p-5 rounded-2xl text-white font-mono flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase block opacity-90">All-in-One Asset Hub</span>
                <span className="text-lg font-black block">Explore All Products</span>
              </div>
              <button onClick={() => navigate('/dashboard')} className="px-4 py-2 bg-white text-slate-900 font-black text-xs rounded-xl shadow-md cursor-pointer">
                View Hub
              </button>
            </div>
          </div>
        </section>

        {/* 7. PORTFOLIO PREVIEW — SINGLE SPOTLIGHT HERO PANEL */}
        <section id="portfolio-spotlight" className="bg-[#1E293B] rounded-3xl p-8 sm:p-12 border border-slate-700 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 font-mono">
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-widest block">Portfolio Spotlight</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-display leading-tight">
                Total Net Wealth: <span className="text-emerald-400">₹8,42,150.00</span>
              </h2>
              <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[10px]">Overall Returns</span>
                  <span className="font-black text-emerald-400 text-lg">+20.3% (+₹1,42,150)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">CAGR XIRR</span>
                  <span className="font-black text-[#64748B] text-lg">22.4%</span>
                </div>
              </div>
            </div>

            <div className="bg-[#172033] rounded-2xl p-6 border border-slate-800 space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <span className="text-slate-400">Top Holding</span>
                <span className="text-emerald-400 font-bold">RELIANCE (35% Weight)</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <span className="text-slate-400">Today's P&L</span>
                <span className="text-emerald-400 font-bold">+₹14,820.50 (+1.79%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Rebalance Signal</span>
                <span className="text-[#64748B] font-bold">Optimal Allocation</span>
              </div>
            </div>
          </div>
        </section>

        {/* 8. TESTIMONIALS SPOTLIGHT (CAROUSEL SPOTLIGHT, NOT GRID) */}
        <section id="testimonials" className="bg-[#0B1120] border border-slate-800 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-black uppercase tracking-wider text-purple-400 bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20">
            Verified Investor Feedback
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <p className="text-lg sm:text-2xl font-medium text-slate-200 leading-relaxed italic">
                "{testimonials[testimonialIndex].quote}"
              </p>

              <div>
                <h4 className="font-black text-white text-base">{testimonials[testimonialIndex].author}</h4>
                <p className="text-xs text-slate-400 font-medium">{testimonials[testimonialIndex].role}</p>
                <span className="inline-block mt-2 font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  {testimonials[testimonialIndex].gains}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* 9. PRICING SECTION — 3-TIER COMPARISON CARDS */}
        <section id="pricing" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
              Subscription Plans
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
              Transparent Pricing
            </h2>
            <p className="text-slate-400 text-sm font-medium">Choose the plan that fits your trading volume. No hidden fees.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* Basic Free */}
            <div className="bg-[#1E293B] rounded-3xl p-8 border border-slate-700 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase block">Basic Free</span>
                <div className="font-mono">
                  <span className="text-4xl font-black text-white">₹0</span>
                  <span className="text-xs text-slate-400 font-bold"> / forever</span>
                </div>
                <p className="text-xs text-slate-400 font-medium">Essential market access and basic watchlists.</p>
                <ul className="space-y-3 text-xs font-medium text-slate-300 pt-4 border-t border-slate-800">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Real-time NSE/BSE ticks</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 3 SEBI Calls per month</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Basic charts</li>
                </ul>
              </div>
              <button onClick={() => navigate('/signup')} className="w-full mt-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl cursor-pointer">
                Get Started Free
              </button>
            </div>

            {/* Pro Trader (Elevated Recommended Tier) */}
            <div className="bg-gradient-to-b from-[#1E293B] via-[#172033] to-[#1E293B] rounded-3xl p-8 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/10 flex flex-col justify-between scale-105 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-emerald-500 rounded-full text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                Recommended Tier
              </div>

              <div className="space-y-4">
                <span className="text-xs font-bold text-emerald-400 uppercase block">Pro Trader</span>
                <div className="font-mono">
                  <span className="text-5xl font-black text-white">₹999</span>
                  <span className="text-xs text-slate-400 font-bold"> / month</span>
                </div>
                <p className="text-xs text-slate-300 font-medium">Full access to SEBI Calls & Autonomous AI Signal Engine.</p>
                <ul className="space-y-3 text-xs font-medium text-slate-200 pt-4 border-t border-slate-800">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited SEBI Research Calls</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 3 Autonomous AI Advisors</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Options & Futures Screener</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Portfolio Rebalance Engine</li>
                </ul>
              </div>
              <button onClick={() => navigate('/signup')} className="w-full mt-8 py-4 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary hover:to-emerald-600 text-white font-black text-xs rounded-xl shadow-lg transition cursor-pointer">
                Start 14-Day Free Trial
              </button>
            </div>

            {/* Elite Wealth */}
            <div className="bg-[#1E293B] rounded-3xl p-8 border border-slate-700 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-amber-400 uppercase block">Elite Wealth</span>
                <div className="font-mono">
                  <span className="text-4xl font-black text-white">₹2,999</span>
                  <span className="text-xs text-slate-400 font-bold"> / month</span>
                </div>
                <p className="text-xs text-slate-400 font-medium">For HNWIs & professional traders.</p>
                <ul className="space-y-3 text-xs font-medium text-slate-300 pt-4 border-t border-slate-800">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Dedicated SEBI Analyst</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Pre-IPO Allocation Desk</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Automated Trading API</li>
                </ul>
              </div>
              <button onClick={() => navigate('/signup')} className="w-full mt-8 py-3.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs rounded-xl border border-amber-500/40 cursor-pointer">
                Contact Desk
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* 10. MONOSPACE TABULAR REGULATORY FOOTER */}
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
              © {new Date().getFullYear()} Univest / Waya Financial Technologies Pvt Ltd. All rights reserved. Rendered via JetBrains Mono / Inter.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

// CUSTOM ANIMATED SVG ILLUSTRATION ("Market in Motion")
const MarketInMotionIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-md mx-auto py-4">
      <svg viewBox="0 0 400 320" className="w-full h-auto">
        {/* Abstract Grid */}
        <defs>
          <pattern id="market-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#market-grid)" />

        {/* Animated Trend Line */}
        <path
          d="M 20 250 Q 80 180, 160 220 T 300 100 T 380 70"
          stroke="#15519D"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 20 270 Q 80 200, 160 240 T 300 120 T 380 90"
          stroke="#10B981"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Candlesticks */}
        {[60, 120, 180, 240, 300, 360].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={120 + (i % 3) * 20} x2={x} y2={200 + (i % 3) * 20} stroke="#64748B" strokeWidth="2" />
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

        {/* Floating Coin Icons */}
        <g>
          <circle cx="70" cy="70" r="16" fill="#F59E0B" opacity="0.25" />
          <text x="70" y="75" textAnchor="middle" fill="#F59E0B" fontSize="14" fontWeight="bold">₹</text>
        </g>
        <g>
          <circle cx="330" cy="50" r="16" fill="#10B981" opacity="0.25" />
          <text x="330" y="55" textAnchor="middle" fill="#10B981" fontSize="14" fontWeight="bold">₹</text>
        </g>
      </svg>
    </div>
  );
};

export default IllustratedLandingPage;
