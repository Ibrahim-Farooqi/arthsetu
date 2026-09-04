import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onSignupClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    if (onLoginClick) onLoginClick();
    else navigate('/login');
  };

  const handleSignup = () => {
    if (onSignupClick) onSignupClick();
    else navigate('/signup');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
        isScrolled
          ? 'bg-[#172033]/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#15519D] to-emerald-500 flex items-center justify-center shadow-lg shadow-[rgba(21,81,157,0.3)]/30 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl">A</span>
            </div>
            <div>
              <span className="text-white font-black text-2xl tracking-tight block leading-none">
                ARTHSETU
              </span>
              <span className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase flex items-center gap-1">
                <Shield className="w-3 h-3" /> SEBI Registered
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-slate-300 hover:text-white transition-colors text-sm font-semibold"
            >
              Features
            </a>
            <a
              href="#ai-advisors"
              className="text-slate-300 hover:text-white transition-colors text-sm font-semibold"
            >
              AI Advisors
            </a>
            <a
              href="#pricing"
              className="text-slate-300 hover:text-white transition-colors text-sm font-semibold"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-slate-300 hover:text-white transition-colors text-sm font-semibold"
            >
              About Us
            </a>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleLogin}
              className="px-5 py-2.5 text-sm font-black text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition cursor-pointer"
            >
              Log In
            </button>
            <button
              onClick={handleSignup}
              className="px-6 py-2.5 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary hover:to-emerald-600 text-white text-sm font-black rounded-xl transition shadow-lg shadow-[rgba(21,81,157,0.3)]/25 hover:shadow-[rgba(21,81,157,0.3)]/40 flex items-center gap-2 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pt-4 pb-6 border-t border-slate-800 mt-3"
            >
              <div className="flex flex-col gap-4 font-semibold text-sm">
                <a
                  href="#features"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-white px-2 py-1"
                >
                  Features
                </a>
                <a
                  href="#ai-advisors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-white px-2 py-1"
                >
                  AI Advisors
                </a>
                <a
                  href="#pricing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-white px-2 py-1"
                >
                  Pricing
                </a>
                <a
                  href="#about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-white px-2 py-1"
                >
                  About
                </a>
                <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogin();
                    }}
                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleSignup();
                    }}
                    className="w-full py-3 bg-gradient-to-r from-primary to-emerald-500 text-white font-black rounded-xl shadow-lg"
                  >
                    Get Started Free
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
