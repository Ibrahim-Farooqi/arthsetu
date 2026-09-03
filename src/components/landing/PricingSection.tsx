import React from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Star, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Basic Free',
    price: '₹0',
    period: '/forever',
    description: 'Essential market access and introductory research.',
    features: [
      'Real-time NSE/BSE market ticks',
      'Basic AI market overview',
      '3 SEBI research calls per month',
      'Watchlist & basic charts',
      'Community news feed'
    ],
    cta: 'Get Started Free',
    popular: false
  },
  {
    name: 'Pro Trader',
    price: '₹999',
    period: '/month',
    description: 'For active investors seeking maximum alpha.',
    features: [
      'All Basic features included',
      'Unlimited SEBI Research Calls',
      'Autonomous AI Signal Engine',
      'Advanced Options & Futures Screener',
      'Real-time Push & Price Alerts',
      'Portfolio CAGR Optimization',
      'Priority Research Support'
    ],
    cta: 'Start 14-Day Free Trial',
    popular: true
  },
  {
    name: 'Elite Wealth',
    price: '₹2,999',
    period: '/month',
    description: 'For High Net Worth & Institutional Investors.',
    features: [
      'All Pro features included',
      '1-on-1 Dedicated Research Analyst',
      'Custom PMS Strategy Reports',
      'API Access for Automated Trading',
      'Exclusive Pre-IPO Allocation Access',
      '24/7 Priority VIP Concierge Desk'
    ],
    cta: 'Contact Wealth Desk',
    popular: false
  }
];

export const PricingSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 bg-[#172033] relative font-sans text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-emerald-600/10 border border-emerald-600/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-wider mb-4">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              Investment Plan
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg font-medium">
            Flexible plans designed to grow with your trading journey. No hidden fees.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`
                relative bg-[#1E293B] rounded-3xl p-8 border flex flex-col justify-between transition-all
                ${plan.popular 
                  ? 'border-primary shadow-2xl shadow-[rgba(21,81,157,0.3)]/20 scale-105 z-10' 
                  : 'border-slate-700 hover:border-slate-500'
                }
              `}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-emerald-500 rounded-full text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <div className="text-center mb-6">
                  {plan.popular ? (
                    <Crown className="w-8 h-8 text-[#64748B] mx-auto mb-2" />
                  ) : (
                    <Star className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  )}
                  <h3 className="text-xl font-black text-white">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-xs text-slate-400 font-bold">{plan.period}</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400 font-medium">{plan.description}</p>
                </div>

                <div className="border-t border-slate-700/80 pt-6 mb-8">
                  <ul className="space-y-3.5 text-xs font-medium">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => navigate('/signup')}
                className={`
                  w-full py-3.5 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer
                  ${plan.popular
                    ? 'bg-gradient-to-r from-primary to-emerald-500 hover:from-primary hover:to-emerald-600 text-white shadow-lg shadow-[rgba(21,81,157,0.3)]/30'
                    : 'bg-[#172033] hover:bg-slate-800 text-slate-200 border border-slate-700'
                  }
                `}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2.5 bg-slate-800/80 border border-slate-700 rounded-full px-6 py-2 text-slate-300 text-xs font-bold shadow-sm">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>14-day risk-free trial • No credit card required • Cancel anytime in 1 click</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
