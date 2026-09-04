import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link2, Download, Copy, Share2, Mail, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  const handleCopy = () => {
    toast.success('Link copied to clipboard!');
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-[24px] shadow-2xl w-full max-w-sm overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h3 className="font-black text-lg text-[#172033]">Share Research</h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-500">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 flex flex-col gap-5">
            <div className="text-center mb-2">
              <p className="text-sm font-bold text-slate-500 line-clamp-1">{title}</p>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
               <button onClick={handleCopy} className="flex flex-col items-center gap-2 group">
                 <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-200 transition">
                   <Copy className="w-5 h-5" />
                 </div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Copy</span>
               </button>
               <button className="flex flex-col items-center gap-2 group">
                 <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition">
                   <MessageCircle className="w-5 h-5" />
                 </div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">WhatsApp</span>
               </button>
               <button className="flex flex-col items-center gap-2 group">
                 <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary-light transition">
                   <Mail className="w-5 h-5" />
                 </div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email</span>
               </button>
               <button className="flex flex-col items-center gap-2 group">
                 <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-danger group-hover:bg-rose-100 transition">
                   <Download className="w-5 h-5" />
                 </div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">PDF</span>
               </button>
            </div>

            <div className="mt-4 bg-slate-50 p-3 rounded-xl flex items-center gap-3 border border-slate-100">
               <Link2 className="w-4 h-4 text-slate-400 shrink-0" />
               <span className="text-xs font-medium text-slate-500 truncate flex-1">univest.in/r/RELIANCE-BUY</span>
               <button onClick={handleCopy} className="text-primary font-bold text-xs uppercase tracking-wider hover:text-primary">Copy</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
