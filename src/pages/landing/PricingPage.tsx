import React from 'react';
import { StablecoinNavbar } from '../../components/landing/StablecoinNavbar';
import { Check } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const backersBrands = [
    { name: 'Fundamental Labs', style: { fontFamily: '"Times New Roman", Times, serif', fontWeight: 400, letterSpacing: '0.02em', fontSize: '14px' } },
    { name: 'KUCOIN', style: { fontFamily: '"Arial Black", sans-serif', fontWeight: 900, letterSpacing: '0.08em', fontSize: '16px' } },
    { name: 'NGC', style: { fontFamily: 'Impact, sans-serif', fontWeight: 700, letterSpacing: '0.05em', fontSize: '18px' } },
    { name: 'NxGen', style: { fontFamily: 'Georgia, serif', fontWeight: 600, letterSpacing: '-0.02em', fontSize: '17px' } },
    { name: 'Matter Labs', style: { fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, letterSpacing: '-0.01em', fontSize: '15px' } },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans relative">
      {/* Background with blurred 3D coins */}
      <div 
        className="fixed inset-0 z-0 bg-[#F0EEF9]"
        style={{
          backgroundImage: "url('/images/ai_research_hero_1785925492431.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.6,
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent to-[#F8FAFC]" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <StablecoinNavbar />

        <main className="flex-1 pt-32 pb-24 px-[50px] flex flex-col">
          <div className="max-w-[72rem] mx-auto w-full flex-1 flex flex-col justify-center">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 
                className="text-black text-5xl md:text-6xl font-medium leading-tight mb-4"
                style={{ letterSpacing: '-0.04em' }}
              >
                Simple, Transparent Pricing
              </h1>
              <p className="text-black/70 text-xl max-w-2xl mx-auto">
                Choose the plan that fits your wealth generation goals. No hidden fees.
              </p>
            </div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-16">
              {/* Starter */}
              <div className="rounded-[2rem] bg-[#E8E4F5] p-10 flex flex-col shadow-sm">
                <h3 className="text-black text-2xl font-medium mb-2">Starter</h3>
                <div className="text-black text-5xl font-medium mb-6 tracking-tighter">Free</div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-black/70">
                    <Check className="w-5 h-5 text-black" /> Basic yield routing
                  </li>
                  <li className="flex items-center gap-3 text-black/70">
                    <Check className="w-5 h-5 text-black" /> Standard risk scoring
                  </li>
                  <li className="flex items-center gap-3 text-black/70">
                    <Check className="w-5 h-5 text-black" /> 24/7 Support
                  </li>
                </ul>
                <button className="w-full bg-black text-white text-base font-medium py-3 rounded-full hover:bg-gray-800 transition-colors duration-200">
                  Get Started
                </button>
              </div>

              {/* Pro */}
              <div className="rounded-[2rem] bg-[#2B2644] p-10 flex flex-col shadow-2xl relative transform md:scale-105 z-10 border border-white/10">
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-white text-black text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  Most Popular
                </div>
                <h3 className="text-white text-2xl font-medium mb-2">Pro</h3>
                <div className="text-white text-5xl font-medium mb-6 tracking-tighter">$29<span className="text-xl text-white/50">/mo</span></div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-white/80">
                    <Check className="w-5 h-5 text-white" /> Advanced AI yield routing
                  </li>
                  <li className="flex items-center gap-3 text-white/80">
                    <Check className="w-5 h-5 text-white" /> Real-time market signals
                  </li>
                  <li className="flex items-center gap-3 text-white/80">
                    <Check className="w-5 h-5 text-white" /> Automated rebalancing
                  </li>
                  <li className="flex items-center gap-3 text-white/80">
                    <Check className="w-5 h-5 text-white" /> Priority 24/7 Support
                  </li>
                </ul>
                <button className="w-full bg-white text-black text-base font-medium py-3 rounded-full hover:bg-gray-200 transition-colors duration-200">
                  Join us
                </button>
              </div>

              {/* Enterprise */}
              <div className="rounded-[2rem] bg-[#E8E4F5] p-10 flex flex-col shadow-sm">
                <h3 className="text-black text-2xl font-medium mb-2">Enterprise</h3>
                <div className="text-black text-5xl font-medium mb-6 tracking-tighter">Custom</div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-black/70">
                    <Check className="w-5 h-5 text-black" /> Dedicated account manager
                  </li>
                  <li className="flex items-center gap-3 text-black/70">
                    <Check className="w-5 h-5 text-black" /> Custom AI strategy deployment
                  </li>
                  <li className="flex items-center gap-3 text-black/70">
                    <Check className="w-5 h-5 text-black" /> API access
                  </li>
                </ul>
                <button className="w-full bg-black text-white text-base font-medium py-3 rounded-full hover:bg-gray-800 transition-colors duration-200">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer Partners */}
        <section className="bg-white/40 backdrop-blur-md px-[50px] py-10 border-t border-black/5 mt-auto">
          <div className="max-w-[88rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-black/60 text-sm font-medium uppercase tracking-widest">
              Funded by premier partners
            </div>
            <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale">
              {backersBrands.map((brand, idx) => (
                <span
                  key={idx}
                  className="text-black"
                  style={brand.style}
                >
                  {brand.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
