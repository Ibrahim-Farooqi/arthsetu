import React, { useState } from 'react';
import { Rocket, Clock, CheckCircle2, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const IPOsTab: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('Open');

  const ipos = [
    {
      id: 'ipo-1',
      name: 'Hexaware Technologies Limited IPO',
      status: 'Open',
      type: 'Mainboard',
      priceBand: '₹670 - ₹708',
      issueSize: '₹9,950 Cr',
      lotSize: 21,
      subscription: '18.4x',
      gmp: '₹145 (+20.5%)',
      openDate: '22 Jul 2026',
      closeDate: '24 Jul 2026'
    },
    {
      id: 'ipo-2',
      name: 'Ather Energy Limited IPO',
      status: 'Open',
      type: 'Mainboard',
      priceBand: '₹310 - ₹326',
      issueSize: '₹3,100 Cr',
      lotSize: 46,
      subscription: '12.1x',
      gmp: '₹68 (+20.8%)',
      openDate: '21 Jul 2026',
      closeDate: '23 Jul 2026'
    },
    {
      id: 'ipo-3',
      name: 'Swiggy Limited IPO',
      status: 'Upcoming',
      type: 'Mainboard',
      priceBand: '₹371 - ₹390',
      issueSize: '₹11,327 Cr',
      lotSize: 38,
      subscription: 'N/A',
      gmp: '₹45 (+11.5%)',
      openDate: '04 Aug 2026',
      closeDate: '07 Aug 2026'
    }
  ];

  const filteredIpos = ipos.filter((i) => selectedStatus === 'All' || i.status === selectedStatus);

  return (
    <div className="flex flex-col gap-6 w-full font-sans text-slate-800 animate-in fade-in duration-300">
      
      {/* STATUS FILTER BAR */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-4 shadow-xs flex items-center gap-2 overflow-x-auto text-xs font-bold no-scrollbar">
        {['All', 'Open', 'Upcoming'].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
              selectedStatus === st
                ? 'bg-[#172033] text-white font-black'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {st === 'Open' ? '🔥 Open Today (2)' : st === 'Upcoming' ? '📅 Upcoming IPOs' : 'All IPOs'}
          </button>
        ))}
      </div>

      {/* IPO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIpos.map((ipo) => (
          <motion.div
            key={ipo.id}
            whileHover={{ y: -3 }}
            className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded border border-purple-200">
                  {ipo.type} IPO
                </span>
                <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {ipo.status === 'Open' ? 'Closes in 2 Days' : 'Opening Soon'}
                </span>
              </div>

              <h3 className="font-black text-base text-[#172033] mb-3 leading-snug">{ipo.name}</h3>

              <div className="grid grid-cols-2 gap-2 p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl mb-4 text-xs font-bold">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">Price Band</span>
                  <span className="text-slate-900 font-black">{ipo.priceBand}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">GMP (Expected Gain)</span>
                  <span className="text-emerald-600 font-black">{ipo.gmp}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">Issue Size</span>
                  <span className="text-slate-900 font-black">{ipo.issueSize}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">Subscription Rate</span>
                  <span className="text-primary font-black">{ipo.subscription}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400">Lot: {ipo.lotSize} shares</span>
              <button
                onClick={() => toast.success(`UPI IPO Application Triggered for ${ipo.name}`)}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black transition cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <span>Apply via UPI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default IPOsTab;
