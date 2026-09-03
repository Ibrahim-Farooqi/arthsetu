import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Briefcase, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const advisors = [
  {
    icon: TrendingUp,
    name: 'Market Analyst AI',
    description: 'Scans technical indicators, candlestick breakouts, and financial news in real-time to find high-conviction trade setups.',
    color: 'from-primary to-primary',
    badge: 'Most Popular',
    tags: ['Breakout Signals', 'RSI & MACD', 'News Sentiment']
  },
  {
    icon: Briefcase,
    name: 'Portfolio Advisor AI',
    description: 'Evaluates your portfolio risk score, sector concentration, and suggests rebalancing moves tailored to your target CAGR.',
    color: 'from-emerald-600 to-teal-600',
    badge: 'AI Powered',
    tags: ['Risk Calibration', 'Rebalancing', 'Target CAGR']
  },
  {
    icon: GraduationCap,
    name: 'Investment Coach AI',
    description: 'Conversational mentor that explains complex options strategies, balance sheets, and market concepts step-by-step.',
    color: 'from-purple-600 to-pink-600',
    badge: 'Beginner Friendly',
    tags: ['1-on-1 Guidance', 'Options Simplified', 'Q&A Assistant']
  }
];

export const AIAdvisorsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="ai-advisors" className="py-24 bg-[#1E293B] relative overflow-hidden font-sans text-white border-t border-slate-800">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-purple-600/10 border border-purple-600/20 rounded-full text-purple-400 text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Autonomous Intelligence
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Your Personal{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              AI Investment Team
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg font-medium">
            Three specialized AI agents working around the clock to analyze, protect, and grow your wealth.
          </p>
        </div>

        {/* Advisors Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {advisors.map((advisor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-[#172033] rounded-3xl p-8 border border-slate-700 hover:border-purple-500/50 transition-all group flex flex-col justify-between"
            >
              {advisor.badge && (
                <div className="absolute -top-3.5 right-6 px-3 py-1 bg-gradient-to-r from-purple-600 to-primary rounded-full text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                  {advisor.badge}
                </div>
              )}

              <div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${advisor.color} flex items-center justify-center mb-6 shadow-lg shadow-purple-600/20 group-hover:scale-105 transition-transform`}>
                  <advisor.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-black text-white mb-2">{advisor.name}</h3>
                <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">
                  {advisor.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80 mb-6">
                  {advisor.tags.map((t) => (
                    <span key={t} className="text-[10px] font-bold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => navigate('/signup')}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-[#64748B] hover:text-white font-black text-xs rounded-xl transition flex items-center justify-center gap-1.5 group cursor-pointer"
                >
                  <span>Chat with {advisor.name.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-primary hover:from-purple-700 hover:to-[#5A35F0] text-white font-black text-xs rounded-2xl transition-all shadow-xl shadow-purple-600/25 hover:shadow-purple-600/40 inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Meet Your Personal AI Team Free</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AIAdvisorsSection;
