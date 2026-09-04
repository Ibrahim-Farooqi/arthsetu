import React from 'react';
import { StablecoinNavbar } from '../../components/landing/StablecoinNavbar';

export const AboutPage: React.FC = () => {
  const partners = [
    'Fundamental Labs', 'KUCOIN', 'NGC', 'NxGen', 'Matter Labs', 'Polychain'
  ];

  return (
    <div className="flex flex-col bg-[#F8FAFC] min-h-screen font-sans">
      <StablecoinNavbar />

      <main className="flex-1 pt-32 pb-24 px-[50px] flex flex-col justify-center">
        <div className="max-w-[88rem] mx-auto w-full">
          {/* Header */}
          <div className="mb-12">
            <span className="text-[#2B2644] text-sm font-bold uppercase tracking-widest block mb-4">Our Mission</span>
            <h1 
              className="text-black text-5xl md:text-6xl font-medium leading-tight mb-6"
              style={{ letterSpacing: '-0.04em' }}
            >
              Built by Believers in<br />Better Finance
            </h1>
            <p className="text-black/60 text-xl max-w-2xl leading-relaxed">
              We are a team of researchers, engineers, and financial experts dedicated to bridging the gap between traditional stability and decentralized growth.
            </p>
          </div>

          {/* 2-Column Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 h-[500px]">
            {/* Vision Text Card */}
            <div className="rounded-[2rem] bg-[#2B2644] p-12 flex flex-col justify-center shadow-xl h-full">
              <h3 className="text-white text-3xl font-medium mb-6" style={{ letterSpacing: '-0.02em' }}>The Vision</h3>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Our vision is to make borderless, reward-generating stablecoins the default standard for global commerce and personal wealth. 
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                By combining rigorous AI-driven research with uncompromising security, ArthSetu ensures that your capital never sits idle—it works constantly and safely.
              </p>
            </div>

            {/* Image Card */}
            <div className="rounded-[2rem] bg-[#E8E4F5] overflow-hidden relative shadow-sm h-full">
              <div 
                className="absolute inset-0 mix-blend-multiply" 
                style={{ 
                  backgroundImage: "url('/images/about_hero_1785925532767.png')", 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center' 
                }}
              />
            </div>
          </div>

          {/* Trusted Partners */}
          <div className="text-center">
            <p className="text-black/50 text-sm font-semibold uppercase tracking-widest mb-8">
              Funded by premier partners and forward-thinking leaders
            </p>
            <div className="flex flex-wrap justify-center gap-10 opacity-60 grayscale">
              {partners.map((partner, idx) => (
                <span
                  key={idx}
                  className="text-black text-lg font-bold"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
