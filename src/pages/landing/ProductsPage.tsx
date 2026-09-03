import React from 'react';
import { StablecoinNavbar } from '../../components/landing/StablecoinNavbar';
import { ArrowRight } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  return (
    <div className="flex flex-col bg-[#F8FAFC] min-h-screen font-sans">
      <StablecoinNavbar />

      <main className="flex-1 pt-32 pb-24 px-[50px]">
        <div className="max-w-[88rem] mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="text-[#2B2644] text-sm font-bold uppercase tracking-widest block mb-4">INVESTMENT ECOSYSTEM</span>
            <h1 
              className="text-black text-5xl md:text-6xl font-medium leading-tight mb-4"
              style={{ letterSpacing: '-0.04em' }}
            >
              One Platform.<br />Every Investment.
            </h1>
            <p className="text-black/60 text-xl max-w-2xl">
              Everything you need to research, invest, manage and grow your wealth—powered by AI and designed for modern investors.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Product Card */}
            <div className="md:col-span-2 rounded-[2rem] bg-[#E8E4F5] p-10 flex flex-col justify-between overflow-hidden relative min-h-[440px] group hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/5 transition-all duration-300 border border-transparent hover:border-white/40">
              <div className="relative z-10">
                <h3 className="text-black text-3xl font-medium mb-3" style={{ letterSpacing: '-0.02em' }}>AI Research</h3>
                <p className="text-black/70 text-lg max-w-sm mb-6">
                  Transform market data into actionable investment ideas using institutional-grade research, AI-powered stock analysis, technical indicators and fundamental insights—all in one place.
                </p>
                <ul className="text-black/80 font-medium space-y-2 mb-8">
                  <li>• AI Research Reports</li>
                  <li>• Fundamental Analysis</li>
                  <li>• Technical Analysis</li>
                  <li>• Smart Stock Ratings</li>
                </ul>
                <button className="inline-flex items-center gap-3 bg-black text-white text-base font-medium pl-6 pr-2 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200 cursor-pointer w-max">
                  <span>Explore Research</span>
                  <span className="bg-white rounded-full p-1.5 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4 text-black" />
                  </span>
                </button>
              </div>
              
              {/* 3D Image */}
              <div className="absolute right-0 bottom-0 w-2/3 h-full mix-blend-multiply opacity-90 transition-transform duration-500 group-hover:scale-[1.02]" style={{ backgroundImage: "url('/images/products_hero_1785925514340.png')", backgroundSize: 'cover', backgroundPosition: 'center left' }}>
                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-8">
                  <div className="text-black/60 font-bold text-xs uppercase tracking-widest">AI Powered</div>
                  <div className="flex justify-between items-end w-full mt-auto">
                    <div className="text-black/60 font-bold text-xs uppercase tracking-widest">Invest • Research • Grow</div>
                    <div className="text-black/60 font-bold text-xs uppercase tracking-widest text-right">Market Intelligence</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Secondary Product Card 1 */}
              <div className="rounded-[2rem] bg-[#2B2644] p-8 flex flex-col justify-between flex-1 group hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-transparent transition-all duration-500" />
                <div className="relative z-10">
                  <h3 className="text-white text-2xl font-medium mb-3" style={{ letterSpacing: '-0.01em' }}>Market Intelligence</h3>
                  <p className="text-white/70 text-base mb-6">
                    Stay informed with real-time market news, earnings, corporate actions and AI-generated summaries that explain what every event means for your investments.
                  </p>
                  <ul className="text-white/80 text-sm font-medium space-y-2 mb-6">
                    <li>• Live Market News</li>
                    <li>• Earnings Updates</li>
                    <li>• Corporate Actions</li>
                    <li>• AI News Summary</li>
                  </ul>
                </div>
                <a href="#know-more" className="inline-flex items-center gap-3 mt-auto relative z-10 w-max group/btn">
                  <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors duration-200">
                    <ArrowRight className="w-5 h-5 text-white transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </span>
                  <span className="text-white text-sm font-medium">View Market Insights</span>
                </a>
              </div>

              {/* Secondary Product Card 2 */}
              <div className="rounded-[2rem] bg-[#2B2644] p-8 flex flex-col justify-between flex-1 group hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-transparent transition-all duration-500" />
                <div className="relative z-10">
                  <h3 className="text-white text-2xl font-medium mb-3" style={{ letterSpacing: '-0.01em' }}>Portfolio Intelligence</h3>
                  <p className="text-white/70 text-base mb-6">
                    Monitor every investment with real-time portfolio tracking, performance analytics and AI recommendations that help you diversify and invest with confidence.
                  </p>
                  <ul className="text-white/80 text-sm font-medium space-y-2 mb-6">
                    <li>• Live Portfolio Tracking</li>
                    <li>• Performance Insights</li>
                    <li>• Risk Analysis</li>
                    <li>• AI Rebalancing</li>
                  </ul>
                </div>
                <a href="#know-more" className="inline-flex items-center gap-3 mt-auto relative z-10 w-max group/btn">
                  <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors duration-200">
                    <ArrowRight className="w-5 h-5 text-white transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </span>
                  <span className="text-white text-sm font-medium">Manage Portfolio</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
