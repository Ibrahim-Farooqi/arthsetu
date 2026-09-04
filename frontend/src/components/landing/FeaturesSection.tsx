import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, BarChart3, CandlestickChart, Briefcase, 
  Shield, Zap, Bell, CheckCircle, Users 
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Get intelligent stock recommendations, sentiment signals, and market analysis powered by autonomous AI algorithms.',
    badge: 'AI Engine',
    color: 'bg-primary/20 text-[#64748B] border-primary/30'
  },
  {
    icon: BarChart3,
    title: 'Real-Time Market Data',
    description: 'Live NSE & BSE price ticks, order book depth, and instant notifications for every key market movement.',
    badge: 'NSE / BSE Ticks',
    color: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30'
  },
  {
    icon: CandlestickChart,
    title: 'Technical & Fundamental Analysis',
    description: 'Professional-grade charts with custom indicators, chart patterns, breakout signals, and fundamental metrics.',
    badge: 'Pro Charts',
    color: 'bg-purple-600/20 text-purple-400 border-purple-500/30'
  },
  {
    icon: Briefcase,
    title: 'Portfolio Management',
    description: 'Track multi-asset investments, calculate risk-adjusted CAGR, and auto-rebalance with smart AI advice.',
    badge: 'Multi-Asset',
    color: 'bg-amber-600/20 text-amber-400 border-amber-500/30'
  },
  {
    icon: Shield,
    title: 'SEBI Compliant Advisory',
    description: 'Fully compliant with SEBI (Research Analysts) Regulations 2014, backed by certified market research experts.',
    badge: 'SEBI Registered',
    color: 'bg-danger/20 text-rose-400 border-danger/30'
  },
  {
    icon: Bell,
    title: 'Smart Push & Price Alerts',
    description: 'Never miss a breakout or target with customizable price triggers, stop-loss alerts, and AI news feeds.',
    badge: 'Real-Time Alerts',
    color: 'bg-teal-600/20 text-teal-400 border-teal-500/30'
  }
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#172033] relative font-sans text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[#64748B] text-xs font-black uppercase tracking-wider mb-4">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Everything You Need for{' '}
            <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Smart Investing
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg font-medium">
            Powerful tools and intelligent workflows designed to help you generate alpha with confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-[#1E293B] rounded-3xl p-8 border border-slate-700 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-[rgba(21,81,157,0.3)]/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${feature.color} shadow-sm`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-full">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#64748B] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-16 bg-[#1E293B]/60 border border-slate-800 rounded-2xl p-6 flex flex-wrap justify-center items-center gap-8 text-slate-300 text-xs font-bold">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>SEBI Registered (INH000009821)</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#64748B]" />
            <span>Real-Time Market Data</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            <span>50,000+ Active Investors</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>256-Bit Bank-Grade Encryption</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
