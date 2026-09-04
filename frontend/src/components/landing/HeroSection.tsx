import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, TrendingUp, Users, CheckCircle, Mail, Sparkles, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsLoading(false);
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/signup', { state: { email } });
    }, 1500);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#172033] font-sans text-white">
      {/* Background Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-emerald-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-xs font-black uppercase tracking-wider">
                SEBI Registered Research Analyst (INH000009821)
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
              Smart Investing with{' '}
              <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                AI-Powered
              </span>{' '}
              Insights
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl font-medium">
              Join thousands of investors making informed decisions with real-time market feeds, 
              AI-driven portfolio intelligence, and SEBI-compliant research calls.
            </p>

            {/* Platform Stats */}
            <div className="flex flex-wrap gap-8 mt-8 border-y border-slate-800 py-6">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">50K+</div>
                <div className="text-xs text-slate-400 font-semibold mt-0.5">Active Investors</div>
              </div>
              <div className="border-l border-slate-800 pl-8">
                <div className="text-2xl sm:text-3xl font-black text-white">₹500Cr+</div>
                <div className="text-xs text-slate-400 font-semibold mt-0.5">Total Volume</div>
              </div>
              <div className="border-l border-slate-800 pl-8">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">98%</div>
                <div className="text-xs text-slate-400 font-semibold mt-0.5">Call Accuracy</div>
              </div>
            </div>

            {/* Email Lead Capture Box */}
            <div className="mt-8 bg-[#1E293B] rounded-2xl p-5 border border-slate-700 shadow-2xl">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 text-emerald-400 py-2"
                >
                  <CheckCircle className="w-6 h-6 shrink-0" />
                  <div>
                    <span className="font-black text-sm block">Email Verified!</span>
                    <span className="text-xs text-slate-300 font-medium">Redirecting you to complete free account creation...</span>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email to get started"
                        className="w-full pl-11 pr-4 py-3.5 bg-[#172033] border border-slate-700 rounded-xl text-white text-xs font-semibold placeholder-slate-500 focus:outline-none focus:border-primary transition-all"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-3.5 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary hover:to-emerald-600 text-white text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[rgba(21,81,157,0.3)]/30 cursor-pointer shrink-0"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Start Free Account</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium px-1">
                    <span>✓ No credit card required</span>
                    <span>✓ SEBI Compliant</span>
                    <span>✓ 14-day Pro trial included</span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right Column - Illustration & Interactive Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main SVG Illustration Card */}
              <div className="bg-[#1E293B] rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl relative overflow-hidden">
                <StockMarketIllustration />
              </div>

              {/* Floating Card 1: Growth */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -right-5 bg-[#1E293B] rounded-2xl p-4 border border-slate-700 shadow-2xl min-w-[150px] backdrop-blur-md"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-emerald-400 font-black text-sm block">+24.8%</span>
                    <span className="text-[10px] text-slate-400 font-semibold">AI Alpha Yield</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2: AI Conviction Signal */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-5 -left-5 bg-[#1E293B] rounded-2xl p-4 border border-slate-700 shadow-2xl min-w-[180px] backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/20 text-[#64748B] flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-white font-black text-xs block">AI Signal: BUY RELIANCE</span>
                    <span className="text-[10px] text-emerald-400 font-bold">96% Conviction Score</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// SVG Stock Market Illustration
const StockMarketIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 400 350" className="w-full h-auto">
        {/* Background Grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Animated Trend Lines */}
        <path
          d="M 20 280 Q 90 220, 160 250 T 300 120 T 380 90"
          stroke="#15519D"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 20 300 Q 90 240, 160 270 T 300 140 T 380 110"
          stroke="#10B981"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Candlesticks */}
        {[60, 110, 160, 210, 260, 310, 360].map((x, i) => (
          <g key={i}>
            <line
              x1={x}
              y1={140 + (i % 3) * 20}
              x2={x}
              y2={220 + (i % 3) * 20}
              stroke="#64748B"
              strokeWidth="2"
            />
            <rect
              x={x - 8}
              y={160 + (i % 3) * 15}
              width="16"
              height={30 + (i % 2) * 25}
              fill={i % 2 === 0 ? "#10B981" : "#15519D"}
              rx="3"
            />
          </g>
        ))}

        {/* Floating Rupees */}
        <g>
          <circle cx="70" cy="80" r="18" fill="#F59E0B" opacity="0.2" />
          <text x="70" y="86" textAnchor="middle" fill="#F59E0B" fontSize="16" fontWeight="bold">
            ₹
          </text>
        </g>
        <g>
          <circle cx="330" cy="60" r="18" fill="#10B981" opacity="0.2" />
          <text x="330" y="66" textAnchor="middle" fill="#10B981" fontSize="16" fontWeight="bold">
            ₹
          </text>
        </g>
      </svg>
    </div>
  );
};

export default HeroSection;
