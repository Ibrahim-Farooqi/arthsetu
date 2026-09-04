import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, Bookmark, Printer, LayoutList, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

interface ReportViewerProps {
  isOpen: boolean;
  onClose: () => void;
  report: any;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({ isOpen, onClose, report }) => {
  if (!isOpen || !report) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex justify-center bg-slate-900/60 backdrop-blur-sm p-4 md:p-8"
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-5xl bg-white rounded-t-[32px] md:rounded-[32px] h-full shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-primary uppercase tracking-wider mb-1 bg-primary-light w-fit px-2 py-0.5 rounded-md">{report.category}</span>
              <h3 className="font-black text-xl text-[#172033] leading-tight line-clamp-1">{report.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toast.success('Saved to Library')} className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-500">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-500">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-500">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-500">
                <Printer className="w-5 h-5" />
              </button>
              <div className="w-px h-6 bg-slate-200 mx-2" />
              <button onClick={onClose} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar TOC */}
            <div className="hidden md:flex flex-col w-64 border-r border-slate-200 bg-slate-50 overflow-y-auto p-6">
               <div className="flex items-center gap-2 mb-6">
                 <LayoutList className="w-5 h-5 text-slate-400" />
                 <h4 className="font-black text-[#172033]">Contents</h4>
               </div>
               
               <div className="flex flex-col gap-2 relative">
                 <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-slate-200" />
                 {['Executive Summary', 'Macro Environment', 'Sector Tailwinds', 'Valuation Multiples', 'Key Risks', 'Conclusion'].map((section, idx) => (
                   <button key={idx} className="flex items-center gap-4 text-left group z-10 relative">
                     <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition ${idx === 0 ? 'bg-primary border-2 border-[#E2E8F0] shadow-sm' : 'bg-white border-2 border-slate-200 group-hover:border-primary-light'}`}>
                       {idx === 0 && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                     </div>
                     <span className={`text-sm font-bold transition ${idx === 0 ? 'text-primary' : 'text-slate-500 group-hover:text-[#172033]'}`}>
                       {section}
                     </span>
                   </button>
                 ))}
               </div>
            </div>

            {/* Document Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white relative">
               <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-20">
                 
                 <div className="flex items-center gap-4 mb-4 text-sm font-bold text-slate-500">
                   <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-700">
                     {report.author.charAt(0)}
                   </div>
                   <div>
                     <span className="block text-[#172033]">{report.author}</span>
                     <span>Published {report.date} • {report.time}</span>
                   </div>
                 </div>

                 <h1 className="text-4xl font-black text-[#172033] leading-tight">{report.title}</h1>

                 <div className="bg-primary-light border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
                   <h4 className="text-xs font-black text-primary uppercase tracking-wider mb-3">Executive Summary</h4>
                   <p className="text-primary-dark font-medium leading-relaxed">
                     The global shift towards defensive large-caps is accelerating as valuation multiples in high-beta sectors peak. This report analyzes the fundamental resilience of the IT and Banking sectors, projecting a 12-15% margin expansion driven by operational efficiencies and stable deposit costs over the next two quarters.
                   </p>
                 </div>

                 <p className="text-slate-700 font-medium leading-relaxed text-lg">
                   Over the past 18 months, the market has heavily favored growth-oriented mid-caps. However, our proprietary models, which aggregate over 40 macro indicators, signal a definitive rotation strategy. Institutional accumulation in large-cap IT services is currently at its highest since Q3 2024.
                 </p>

                 <div className="my-8 rounded-2xl bg-slate-100 h-64 border border-slate-200 flex items-center justify-center text-slate-400">
                   [ Embedded Interactive Chart: Sector Rotation Heatmap ]
                 </div>

                 <h2 className="text-2xl font-black text-[#172033]">Sector Tailwinds</h2>
                 <p className="text-slate-700 font-medium leading-relaxed text-lg">
                   The primary catalyst for the IT sector remains the stabilization of global macro environments, leading to un-pausing of deferred discretionary tech spends. Combined with aggressive cost-optimization strategies executed in the previous fiscal year, bottom-line growth is projected to outpace top-line recovery.
                 </p>

                 <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 text-xl font-medium italic text-[#172033]">
                   "We expect large-cap IT to outperform the broader index by 800 basis points over the next 12 months, driven by earnings upgrades and multiple expansion."
                 </blockquote>

                 <p className="text-slate-700 font-medium leading-relaxed text-lg">
                   Conversely, the banking sector is experiencing a different dynamic. While credit growth remains robust at 14% YoY, the intense competition for deposits is plateauing. Banks with strong CASA franchises will see NIMs (Net Interest Margins) stabilize and potentially expand in the latter half of the year.
                 </p>

                 <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-200">
                    <span className="text-sm font-bold text-slate-400">End of Preview</span>
                    <button className="flex items-center gap-2 bg-[#172033] text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition">
                      Unlock Full Report <ChevronRight className="w-4 h-4" />
                    </button>
                 </div>

               </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
