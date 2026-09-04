import React, { useState } from 'react';
import { ArrowRight, Mail, ShieldCheck, Fingerprint, Database, BrainCircuit, Activity, Wallet, BadgeCheck, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StablecoinNavbar } from './StablecoinNavbar';
import { AnimatedChatbot } from './AnimatedChatbot';
import { Footer } from './Footer';
const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 256 256"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M 128.005 191.173 C 128.448 156.208 156.93 128 192 128 L 192 64 L 128 64 C 128 99.346 99.346 128 64 128 L 64 192 L 128 192 Z M 192 256 L 64 256 C 28.654 256 0 227.346 0 192 L 0 64 L 64 64 L 64 0 L 192 0 C 227.346 0 256 28.654 256 64 L 256 192 L 192 192 Z" />
  </svg>
);

export const UnivestStablecoinLanding: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Supabase Auth doesn't expose a "does this email already have an
    // account" lookup (by design — that's a user-enumeration risk), so we
    // just take the visitor to the sign-in screen with the email
    // pre-filled; it has both a "Sign In" and "Create Account" tab and
    // Supabase will return a clear error either way if they're on the
    // wrong one.
    navigate('/login', { state: { email } });
  };

  const trustCards = [
    {
      title: 'Bank-Grade Security',
      description: 'Your investments and personal data are protected using enterprise-level security standards.',
      icon: ShieldCheck
    },
    {
      title: 'Secure Authentication',
      description: 'Multi-layer verification and encrypted access keep your account protected at every step.',
      icon: Fingerprint
    },
    {
      title: 'Reliable Infrastructure',
      description: 'Built on scalable cloud infrastructure for fast, secure and uninterrupted investing.',
      icon: Database
    },
    {
      title: 'AI-Powered Intelligence',
      description: 'Advanced AI continuously analyzes market data to deliver smarter investment insights.',
      icon: BrainCircuit
    },
    {
      title: 'Real-Time Market Data',
      description: 'Access live prices, market movements and instant portfolio updates.',
      icon: Activity
    },
    {
      title: 'Portfolio Protection',
      description: 'Track your investments securely with real-time monitoring and intelligent alerts.',
      icon: Wallet
    },
    {
      title: 'Verified Identity',
      description: 'Digital KYC and secure verification help maintain a trusted investment environment.',
      icon: BadgeCheck
    },
    {
      title: 'Privacy First',
      description: 'Your personal and financial information always remains private and encrypted.',
      icon: Lock
    }
  ];

  return (
    <div className="flex flex-col bg-[#F8FAFC] min-h-screen">

      {/* 1. Navbar + Hero wrapper (h-screen) */}
      <div className="h-screen flex flex-col overflow-hidden relative w-full">
        <StablecoinNavbar />

        {/* Hero Section */}
        <div className="flex-1 px-[50px] pt-20 pb-[50px] flex items-end">
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{ height: 'calc(100vh - 96px)' }}
          >
            {/* Video Background */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="object-cover absolute inset-0 w-full h-full"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4"
            />

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-start justify-start h-full p-12 pt-36 bg-white/10 md:bg-transparent">
              <h1
                className="text-black text-7xl md:text-[5.5rem] font-medium leading-tight max-w-4xl mb-6"
                style={{ letterSpacing: '-0.04em' }}
              >
                Built for <span className="bg-gradient-to-r from-[#2B2440] to-purple-700 bg-clip-text text-transparent">Investors</span><br />Who Think <span className="bg-gradient-to-r from-[#2B2440] to-purple-700 bg-clip-text text-transparent">Ahead.</span>
              </h1>

              <p
                className="text-black/70 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
                style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
              >
                ArthSetu combines AI research, market intelligence, portfolio management, and investing into one seamless platform helping you invest with clarity and confidence.
              </p>

              {/* Email Form */}
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl relative">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-black/40" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address" 
                    className="w-full bg-white/60 backdrop-blur-md border border-white/40 text-black placeholder:text-black/40 text-base md:text-lg rounded-full py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all shadow-sm"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black text-white text-base md:text-lg font-medium px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-200 shrink-0 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Get Started</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>

      {/* 3. Info Section */}
      <section className="bg-[#F8FAFC] px-[50px] py-24">
        <div className="max-w-[88rem] mx-auto">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
            <div>
              <h2
                className="text-black text-4xl md:text-5xl font-medium leading-tight mb-8"
                style={{ letterSpacing: '-0.03em' }}
              >
                One Platform.<br />Smarter Investing.
              </h2>

            </div>
            <div>
              <p className="text-black/70 text-2xl md:text-3xl leading-relaxed max-w-xl">
                One intelligent ecosystem combining AI research, market intelligence, portfolio management, and multi-asset investing.
              </p>
            </div>
          </div>

          {/* Row 2 - 4-col card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 - spans 2 columns */}
            <div
              className="lg:col-span-2 rounded-2xl p-7 min-h-80 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/5 transition-all duration-300"
            >
              <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-[1.03]" style={{
                backgroundImage: "url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260423_164207_f243351d-ed59-48ec-83a0-a5e996bdbe3c.png&w=1280&q=85')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              


              <div className="relative z-20">
                <h4
                  className="text-black text-3xl font-medium leading-snug mb-3"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  AI Research
                </h4>
              </div>
              <div className="relative z-20">
                <p className="text-black/80 text-base max-w-sm mb-5 font-medium mix-blend-color-burn">
                  Turn complex market data into confident investment decisions with institutional-grade research, stock analysis, and intelligent recommendations powered by AI.
                </p>
                <a href="#explore-research" className="inline-flex items-center gap-2 group/btn">
                  <span className="text-black text-sm font-bold">Explore Research</span>
                  <span className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center group-hover/btn:bg-black/10 transition-colors duration-200">
                    <ArrowRight className="w-4 h-4 text-black transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </span>
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#2B2644] rounded-2xl p-7 min-h-80 flex flex-col justify-between group hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-transparent transition-all duration-500" />
              <div className="relative z-10">
                <h4 className="text-white text-2xl font-medium leading-snug mb-3">
                  Market Intelligence
                </h4>
                <p className="text-white/70 text-base mb-6">
                  Stay ahead of the market. Get live news, earnings updates, corporate actions, and instant AI summaries.
                </p>
                <ul className="text-white/60 text-sm font-medium space-y-1.5 mb-2">
                  <li>• Live Market News</li>
                  <li>• Earnings Updates</li>
                  <li>• Corporate Actions</li>
                  <li>• AI Summaries</li>
                </ul>
              </div>
              <a href="#market-insights" className="inline-flex items-center gap-2 group/btn relative z-10 mt-auto w-max">
                <span className="text-white text-sm font-medium">View Market Insights</span>
                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors duration-200">
                  <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover/btn:translate-x-1" />
                </span>
              </a>
            </div>

            {/* Card 3 */}
            <div className="bg-[#2B2644] rounded-2xl p-7 min-h-80 flex flex-col justify-between group hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-transparent transition-all duration-500" />
              <div className="relative z-10">
                <h4 className="text-white text-2xl font-medium leading-snug mb-3">
                  Portfolio Intelligence
                </h4>
                <p className="text-white/70 text-base mb-6">
                  Grow your wealth with clarity. Track holdings, monitor returns, and get smart AI rebalancing recommendations.
                </p>
                <ul className="text-white/60 text-sm font-medium space-y-1.5 mb-2">
                  <li>• Track Holdings</li>
                  <li>• Monitor Returns</li>
                  <li>• Analyze Portfolio</li>
                  <li>• AI Recommendations</li>
                </ul>
              </div>
              <a href="#portfolio" className="inline-flex items-center gap-2 group/btn relative z-10 mt-auto w-max">
                <span className="text-white text-sm font-medium">Open Portfolio</span>
                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors duration-200">
                  <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover/btn:translate-x-1" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trust Section */}
      <section className="bg-[#F8FAFC] px-[50px] py-24 border-t border-b border-black/5">
        <div className="max-w-[88rem] mx-auto text-center mb-16">
          <span className="text-black/50 font-bold text-xs uppercase tracking-widest block mb-4">TRUST & SECURITY</span>
          <h2
            className="text-black text-4xl md:text-5xl font-medium leading-tight mb-6"
            style={{ letterSpacing: '-0.03em' }}
          >
            Built for Secure Investing.
          </h2>
          <p className="text-black/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
            Every investment on ArthSetu is backed by enterprise-grade security, intelligent infrastructure and a privacy-first architecture designed for modern investors.
          </p>
        </div>
        
        <div className="max-w-[88rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustCards.map((card, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-[18px] border border-black/5 p-8 shadow-sm hover:shadow-md hover:-translate-y-1.5 hover:border-primary transition-all duration-300 group"
            >
              <div className="mb-6 inline-flex p-3 rounded-xl bg-[#F8FAFC] text-black group-hover:text-primary transition-colors duration-300">
                <card.icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[4deg]" strokeWidth={1.5} />
              </div>
              <h4 className="text-black text-xl font-medium mb-3" style={{ letterSpacing: '-0.01em' }}>
                {card.title}
              </h4>
              <p className="text-black/60 text-sm leading-relaxed font-medium">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Use Cases Section */}
      <section className="bg-[#F8FAFC] px-[50px] py-24">
        <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column */}
          <div className="relative rounded-3xl overflow-hidden min-h-[720px] w-full">
            {/* Video Background */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="object-cover absolute inset-0 w-full h-full"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4"
            />
            {/* Overlay Content */}
            <div className="relative z-10 p-10 md:p-12 flex flex-col justify-start h-full min-h-[720px] bg-gradient-to-b from-white/90 via-white/40 to-transparent">
              <h3
                className="text-black text-4xl md:text-5xl font-medium leading-tight mb-5"
                style={{ letterSpacing: '-0.03em' }}
              >
                AI-Powered Stock Advisory
              </h3>

              <p className="text-black/70 text-base max-w-md mb-8">
              Receive AI-driven stock recommendations, institutional-grade research and real-time market insights to make confident, data-backed investment decisions.              </p>


            </div>
          </div>

          {/* Right Column */}
          <div className="md:pl-12 md:pt-2 flex justify-center lg:justify-end w-full">
            <AnimatedChatbot />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default UnivestStablecoinLanding;
