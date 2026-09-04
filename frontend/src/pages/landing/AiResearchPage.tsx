import React from 'react';
import { StablecoinNavbar } from '../../components/landing/StablecoinNavbar';
import { ArrowRight } from 'lucide-react';

export const AiResearchPage: React.FC = () => {
  return (
    <div className="flex flex-col bg-[#F8FAFC] min-h-screen font-sans">
      <StablecoinNavbar />

      <main className="flex-1 pt-32 pb-24 px-[50px]">
        <div className="max-w-[88rem] mx-auto">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
            <div>
              <span className="text-[#2B2644] text-sm font-bold uppercase tracking-widest block mb-4">Innovation</span>
              <h1 
                className="text-black text-5xl md:text-6xl font-medium leading-tight"
                style={{ letterSpacing: '-0.04em' }}
              >
                AI-Powered Research
              </h1>
            </div>
            <div className="md:pt-8">
              <p className="text-black/60 text-xl leading-relaxed">
                Our advanced AI models analyze vast amounts of market data, DeFi protocols, and yield strategies in real-time, surfacing actionable intelligence before the market reacts.
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Main AI Card */}
            <div className="md:col-span-2 rounded-[2rem] bg-[#E8E4F5] p-10 flex flex-col justify-between overflow-hidden relative min-h-[440px]">
              <div className="relative z-10">
                <h3 className="text-black text-3xl font-medium mb-3" style={{ letterSpacing: '-0.02em' }}>Predictive insights</h3>
                <p className="text-black/70 text-lg max-w-sm mb-8">
                  Get ahead of trends with machine learning algorithms that identify highly profitable strategies across chains.
                </p>
              </div>
              
              {/* 3D Image */}
              <div className="absolute right-0 bottom-0 w-3/4 h-full mix-blend-multiply opacity-90 pointer-events-none" style={{ backgroundImage: "url('/images/ai_research_hero_1785925492431.png')", backgroundSize: 'cover', backgroundPosition: 'center left' }}>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Secondary AI Card 1 */}
              <div className="rounded-[2rem] bg-[#2B2644] p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-white text-2xl font-medium mb-3" style={{ letterSpacing: '-0.01em' }}>Risk scoring</h3>
                  <p className="text-white/70 text-base">
                    Every protocol and vault is automatically audited and assigned a dynamic risk score.
                  </p>
                </div>
              </div>

              {/* Secondary AI Card 2 */}
              <div className="rounded-[2rem] bg-[#2B2644] p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-white text-2xl font-medium mb-3" style={{ letterSpacing: '-0.01em' }}>Automated signals</h3>
                  <p className="text-white/70 text-base">
                    Real-time market signals fed directly into your automated portfolio strategies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <button className="inline-flex items-center gap-3 bg-black text-white text-base font-medium pl-8 pr-2 py-2.5 rounded-full hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
              <span>Explore Research</span>
              <span className="bg-white rounded-full p-2 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-black" />
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
