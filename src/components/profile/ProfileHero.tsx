import React from 'react';
import { ShieldCheck, User, Star, Share, Edit3, Wallet, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

interface ProfileHeroProps {
  onAddFunds?: () => void;
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({ onAddFunds }) => {
  const { user } = useAuth();
  const joinYear = user?.created_at ? new Date(user.created_at).getFullYear() : new Date().getFullYear();

  return (
    <section className="relative overflow-hidden rounded-[28px] p-8 md:p-10 shadow-premium-lg bg-brand-navy w-full border border-slate-800">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#172033] via-[#1e293b] to-[#0f172a] opacity-90" />
      <div className="absolute right-0 top-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-success/15 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Abstract AI Constellation Graphic */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10%" cy="20%" r="2" fill="white" />
        <circle cx="30%" cy="40%" r="3" fill="white" />
        <circle cx="60%" cy="15%" r="2" fill="white" />
        <circle cx="85%" cy="30%" r="4" fill="white" />
        <circle cx="75%" cy="70%" r="2" fill="white" />
        <circle cx="20%" cy="80%" r="3" fill="white" />
        <circle cx="45%" cy="85%" r="2" fill="white" />
        
        <path d="M 10% 20% L 30% 40% L 60% 15% L 85% 30% L 75% 70% L 45% 85% L 20% 80% Z" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
        <path d="M 30% 40% L 45% 85%" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
        <path d="M 60% 15% L 75% 70%" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
      </svg>
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
        
        <div className="flex items-center gap-6">
          {/* Profile Photo */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-slate-800 border-[3px] border-white flex items-center justify-center overflow-hidden shadow-xl">
              <User className="w-10 h-10 text-slate-400" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-success text-white p-1.5 rounded-full border-2 border-[#172033] shadow-lg">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-white text-[32px] md:text-[48px] leading-tight font-black tracking-tight capitalize">
                {user?.full_name || user?.email.split('@')[0] || 'User Profile'}
              </h1>
              <span className="hidden md:flex items-center gap-1 bg-white/10 border border-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> Premium
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-slate-400 text-sm font-medium">
              <span>ID: {user?.id?.substring(0, 8).toUpperCase() || 'UNV-XXXX'}</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span>Member since {joinYear}</span>
            </div>

            <div className="mt-4 inline-flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Total Portfolio Value</span>
              <span className="text-white text-xl font-black">₹12,48,650</span>
            </div>
          </div>
        </div>
        
        {/* Right side CTAs */}
        <div className="flex flex-col gap-2.5 md:min-w-[220px]">
          <motion.button 
            onClick={onAddFunds}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary hover:bg-primary-dark active:bg-primary-dark text-white font-black py-3.5 rounded-xl shadow-glow-blue flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add Funds
          </motion.button>

          <div className="flex gap-2">
            <motion.button 
              onClick={() => toast.success('Edit Profile modal opening...')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-white/10 border border-white/20 text-white font-black py-2.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-white/20 transition text-xs cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </motion.button>
            <motion.button 
              onClick={() => toast.success('Profile link copied to clipboard!')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-white/10 border border-white/20 text-white font-black py-2.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-white/20 transition text-xs cursor-pointer"
            >
              <Share className="w-3.5 h-3.5" /> Share
            </motion.button>
          </div>
        </div>

      </div>
    </section>
  );
};
