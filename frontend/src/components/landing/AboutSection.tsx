import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Users, TrendingUp, Zap, Heart, CheckCircle2 } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description: 'Complete auditability and SEBI compliance across all research, advisory, and execution workflows.'
  },
  {
    icon: Award,
    title: 'Research Excellence',
    description: 'Combining rigorous fundamental analysis with high-frequency quantitative models.'
  },
  {
    icon: Users,
    title: 'Investor First',
    description: 'Zero conflict of interest. Every advisory signal is optimized strictly for retail alpha.'
  },
  {
    icon: TrendingUp,
    title: 'AI Innovation',
    description: 'Building state-of-the-art machine learning agents trained on Indian stock market micro-structure.'
  },
  {
    icon: Zap,
    title: 'Low-Latency Speed',
    description: 'Sub-second market feeds and real-time push alerts to capture fleeting momentum setups.'
  },
  {
    icon: Heart,
    title: 'Vibrant Community',
    description: 'Empowering over 50,000+ retail investors to learn, share insights, and grow together.'
  }
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#1E293B] relative font-sans text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Vision */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[#64748B] text-xs font-black uppercase tracking-wider mb-4">
              About Univest
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Democratizing{' '}
              <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Institutional-Grade
              </span>{' '}
              Investing
            </h2>

            <p className="mt-6 text-slate-300 text-base font-medium leading-relaxed">
              Univest is a SEBI-registered stock advisory platform engineered to level the playing field for retail investors in India.
            </p>

            <p className="mt-4 text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
              By combining certified SEBI Research Analysts with autonomous AI model clusters, Univest delivers real-time market intelligence, risk-managed portfolio rebalancing, and high-conviction research calls.
            </p>

            {/* Regulatory Badge */}
            <div className="mt-8 bg-[#172033] rounded-2xl p-6 border border-slate-700 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-white">SEBI Registered Research Analyst</h4>
                  <p className="text-xs text-emerald-400 font-mono font-bold">Registration No: INH000009821</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-800">
                All investment calls undergo strict regulatory checks and risk disclosure protocols under the SEBI (Research Analysts) Regulations 2014.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Values Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-[#172033] rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 text-[#64748B] flex items-center justify-center mb-3">
                  <v.icon className="w-5 h-5" />
                </div>
                <h4 className="font-black text-sm text-white mb-1">{v.title}</h4>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">{v.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
