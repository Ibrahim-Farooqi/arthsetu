import React from 'react';
import { Shield, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FooterSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0B1120] text-slate-400 font-sans border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#15519D] to-emerald-500 flex items-center justify-center text-white font-black text-xl shadow-md">
                A
              </div>
              <span className="text-white font-black text-2xl tracking-tight">ARTHSETU</span>
            </div>
            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-sm">
              ArthSetu is India's premier SEBI-compliant stock advisory and AI portfolio intelligence platform. Elevating retail investing with institutional analytical rigor.
            </p>
            <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-bold">
              <Shield className="w-4 h-4" /> SEBI Reg No: INH000009821
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-xs text-white uppercase tracking-wider mb-4">Products</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#features" className="hover:text-white transition">Invest Hub & Screener</a></li>
              <li><a href="#ai-advisors" className="hover:text-white transition">AI Copilot Advisors</a></li>
              <li><a href="#features" className="hover:text-white transition">SEBI Research Calls</a></li>
              <li><a href="#features" className="hover:text-white transition">Portfolio Rebalancing</a></li>
              <li><button onClick={() => navigate('/personalization')} className="hover:text-white transition text-left cursor-pointer">AI Personalization</button></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-black text-xs text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#pricing" className="hover:text-white transition">Subscription Plans</a></li>
              <li><button onClick={() => navigate('/onboarding')} className="hover:text-white transition text-left cursor-pointer">KYC Document Onboarding</button></li>
              <li><button onClick={() => navigate('/login')} className="hover:text-white transition text-left cursor-pointer">Sign In / Account Access</button></li>
              <li><button onClick={() => navigate('/signup')} className="hover:text-white transition text-left cursor-pointer">Register Account</button></li>
            </ul>
          </div>

          {/* Legal & Regulatory */}
          <div>
            <h4 className="font-black text-xs text-white uppercase tracking-wider mb-4">Regulatory & Support</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#about" className="hover:text-white transition">SEBI RA Disclosures</a></li>
              <li><a href="#about" className="hover:text-white transition">Investor Charter</a></li>
              <li><a href="#about" className="hover:text-white transition">Grievance Redressal</a></li>
              <li><a href="#about" className="hover:text-white transition">Privacy & Terms</a></li>
            </ul>
          </div>
        </div>

        {/* SEBI Compliance & Risk Disclosure Statement */}
        <div className="py-8 border-b border-slate-800/80 text-[11px] text-slate-500 space-y-2 font-medium leading-relaxed">
          <p>
            <strong className="text-slate-400">SEBI Regulatory Disclosure:</strong> Investment in securities market are subject to market risks. Read all the related documents carefully before investing. SEBI Registration No: INH000009821. Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
          </p>
          <p>
            Past performance is no guarantee of future returns. Stock advisory signals and AI insights provided on ArthSetu are for educational and advisory purposes under SEBI regulations.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p>© {new Date().getFullYear()} ArthSetu Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-white transition">Privacy Policy</a>
            <a href="#about" className="hover:text-white transition">Terms of Service</a>
            <a href="#about" className="hover:text-white transition">SEBI Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
