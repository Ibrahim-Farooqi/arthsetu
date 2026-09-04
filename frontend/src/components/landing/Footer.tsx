import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Brain, Shield, Lock, Activity, LineChart, Mail, MessageCircle } from 'lucide-react';

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 7.1C2.5 7.1 2.2 5.5 3 4.5 4 3.4 5.2 3.4 5.8 3.3 8.3 3.1 12 3.1 12 3.1s3.7 0 6.2.2c.6.1 1.8.1 2.8 1.2.8 1 1.1 2.6 1.1 2.6s.2 2.1.2 4.2v1.8c0 2.1-.2 4.2-.2 4.2s-.3 1.6-1.1 2.6c-1 1.1-2.4 1-3 .1-1.3.1-6.1.1-6.1.1s-3.7 0-6.2-.2c-.6-.1-1.8-.1-2.8-1.2-.8-1-1.1-2.6-1.1-2.6S2.1 11.2 2.1 9.1V7.3c0-2.1.4-4.2.4-4.2z" />
    <polygon points="9.7 15.3 15.4 11.9 9.7 8.5" />
  </svg>
);

const LogoIcon = () => (
  <svg
    viewBox="0 0 256 256"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8"
  >
    <path d="M 128.005 191.173 C 128.448 156.208 156.93 128 192 128 L 192 64 L 128 64 C 128 99.346 99.346 128 64 128 L 64 192 L 128 192 Z M 192 256 L 64 256 C 28.654 256 0 227.346 0 192 L 0 64 L 64 64 L 64 0 L 192 0 C 227.346 0 256 28.654 256 64 L 256 192 L 192 192 Z" />
  </svg>
);


const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <li>
    <a 
      href={href} 
      className="text-black/60 hover:text-black text-[15px] font-medium transition-colors relative group inline-flex"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
    </a>
  </li>
);

const Badge = ({ icon: Icon, text }: { icon: React.ElementType, text: string }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 bg-white hover:bg-black/5 hover:border-black/20 transition-all cursor-default group">
    <Icon className="w-3.5 h-3.5 text-black/60 group-hover:text-black transition-colors" />
    <span className="text-xs font-semibold text-black/60 group-hover:text-black transition-colors">{text}</span>
  </div>
);

export const Footer = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-5%" });

  return (
    <footer ref={containerRef} className="bg-white border-t border-black/[0.04] pt-24 pb-12 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[88rem] mx-auto px-[50px]"
      >
        
        {/* Main Footer Layout */}
        <div className="flex flex-col xl:flex-row justify-between items-start gap-16 xl:gap-20 mb-20">
          
          {/* Left Side: Brand & Mission */}
          <div className="w-full xl:max-w-[22rem] shrink-0">
            <div className="flex items-center gap-3 mb-6">
              <LogoIcon />
              <span className="text-2xl font-extrabold tracking-tight text-black">ArthSetu</span>
            </div>
            
            <h4 className="text-xl font-medium text-black mb-4 tracking-tight">
              AI Investment Operating System
            </h4>
            
            <p className="text-black/60 text-base leading-relaxed mb-10 max-w-sm">
              Helping investors make smarter financial decisions through AI-powered research, market intelligence, portfolio management and seamless investing.
            </p>
            
            <div className="space-y-4">
              <h5 className="text-sm font-semibold text-black/80 uppercase tracking-widest">
                Stay Ahead of the Market
              </h5>
              <div className="flex items-center gap-2 relative group">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-[#F8F9FA] border border-black/5 text-black placeholder:text-black/40 text-base rounded-full py-3.5 pl-6 pr-32 focus:outline-none focus:bg-white focus:border-black/20 focus:ring-4 focus:ring-black/5 transition-all shadow-sm group-hover:border-black/10"
                />
                <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-black text-white text-sm font-medium px-5 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2 group/btn">
                  Subscribe
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
              <p className="text-xs text-black/50 font-medium pl-2">
                Weekly market insights. No spam.
              </p>
            </div>
          </div>

          {/* Right Side: Navigation & Copyright */}
          <div className="w-full flex flex-col justify-between">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          
          <div>
            <h5 className="text-sm font-bold text-black mb-6 uppercase tracking-wider">Platform</h5>
            <ul className="space-y-4">
              <FooterLink href="#dashboard">Dashboard</FooterLink>
              <FooterLink href="#research">Research</FooterLink>
              <FooterLink href="#portfolio">Portfolio</FooterLink>
              <FooterLink href="#ai-advisors">AI Advisors</FooterLink>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-bold text-black mb-6 uppercase tracking-wider">Resources</h5>
            <ul className="space-y-4">
              <FooterLink href="#help-center">Help Center</FooterLink>
              <FooterLink href="#faqs">FAQs</FooterLink>
              <FooterLink href="#blog">Blog</FooterLink>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-bold text-black mb-6 uppercase tracking-wider">Company</h5>
            <ul className="space-y-4">
              <FooterLink href="#about-us">About Us</FooterLink>
              <FooterLink href="#careers">Careers</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-bold text-black mb-6 uppercase tracking-wider">Legal</h5>
            <ul className="space-y-4">
              <FooterLink href="#terms">Terms & Conditions</FooterLink>
              <FooterLink href="#privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="#disclaimer">Disclaimer</FooterLink>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-bold text-black mb-6 uppercase tracking-wider">Connect</h5>
            <ul className="space-y-4">
              <li>
                <a href="#linkedin" className="text-black/60 hover:text-[#0A66C2] text-[15px] font-medium transition-colors inline-flex items-center gap-2 group">
                  <LinkedinIcon className="w-4 h-4 transition-transform group-hover:scale-110 group-hover:rotate-6" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="#twitter" className="text-black/60 hover:text-black text-[15px] font-medium transition-colors inline-flex items-center gap-2 group">
                  <TwitterIcon className="w-4 h-4 transition-transform group-hover:scale-110 group-hover:-rotate-6" /> Twitter / X
                </a>
              </li>
              <li>
                <a href="#email" className="text-black/60 hover:text-black text-[15px] font-medium transition-colors inline-flex items-center gap-2 group">
                  <Mail className="w-4 h-4 transition-transform group-hover:scale-110 group-hover:rotate-6" /> Email Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-[13px] text-black/40 font-medium text-left xl:text-right mt-16 xl:mt-24">
          © 2026 ArthSetu Technologies Pvt. Ltd. All Rights Reserved.
        </div>
      </div>

      </div>

      </motion.div>

    </footer>
  );
};
