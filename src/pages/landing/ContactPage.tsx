import React from 'react';
import { StablecoinNavbar } from '../../components/landing/StablecoinNavbar';
import { ArrowRight, Mail } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans relative">
      {/* Background with blurred 3D coins */}
      <div 
        className="fixed inset-0 z-0 bg-[#E8E4F5]"
        style={{
          backgroundImage: "url('/images/ai_research_hero_1785925492431.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.7,
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <StablecoinNavbar />

        <main className="flex-1 pt-32 pb-24 px-[50px] flex flex-col justify-center">
          <div className="max-w-[72rem] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Info */}
            <div>
              <span className="text-[#2B2644] text-sm font-bold uppercase tracking-widest block mb-4">Contact Us</span>
              <h1 
                className="text-black text-6xl md:text-7xl font-medium leading-none mb-6"
                style={{ letterSpacing: '-0.04em' }}
              >
                Let's Talk
              </h1>
              <p className="text-black/70 text-xl max-w-md leading-relaxed mb-10">
                Whether you have questions about our products, need enterprise pricing, or just want to say hi, our team is ready to help.
              </p>
              
              <div className="flex flex-col gap-6">
                <a href="mailto:hello@arthsetu.ai" className="flex items-center gap-4 group">
                  <span className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black/10 transition-colors duration-200">
                    <Mail className="w-5 h-5 text-black" />
                  </span>
                  <div>
                    <span className="block text-black/50 text-sm font-medium">Email</span>
                    <span className="text-black text-lg font-medium">hello@arthsetu.ai</span>
                  </div>
                </a>
                
                <div className="flex gap-4 mt-4">
                  <a href="#" className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200 text-black font-bold">
                    X
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-colors duration-200 text-black font-bold">
                    in
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="rounded-[2.5rem] bg-[#2B2644] p-10 md:p-12 shadow-2xl relative overflow-hidden">
              <form className="relative z-10 flex flex-col gap-5">
                <div>
                  <label className="text-white/60 text-sm font-medium ml-4 mb-1.5 block">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200"
                    placeholder="Jane Doe"
                  />
                </div>
                
                <div>
                  <label className="text-white/60 text-sm font-medium ml-4 mb-1.5 block">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200"
                    placeholder="jane@example.com"
                  />
                </div>
                
                <div>
                  <label className="text-white/60 text-sm font-medium ml-4 mb-1.5 block">Message</label>
                  <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200 resize-none"
                    placeholder="How can we help?"
                    rows={4}
                  />
                </div>

                <button 
                  type="button"
                  className="mt-4 w-full flex items-center justify-center gap-3 bg-white text-black text-base font-medium py-4 rounded-full hover:bg-gray-200 transition-colors duration-200"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              
              {/* Subtle accent blob behind the form */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none" />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};
