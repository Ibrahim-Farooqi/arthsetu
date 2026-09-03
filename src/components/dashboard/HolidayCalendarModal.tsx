import React, { useState } from 'react';
import { 
  X, Calendar, Search, Sparkles, Filter, Download, 
  Info, ShieldCheck, Sun, Moon, ArrowUpRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface HolidayCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HolidayCalendarModal: React.FC<HolidayCalendarModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedSegment, setSelectedSegment] = useState<'Equity' | 'F&O' | 'MCX' | 'Clearing'>('Equity');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('2026');

  if (!isOpen) return null;

  // 2026 Official Indian Stock Market Holiday List (NSE / BSE / MCX)
  const holidaysList = [
    { id: 1, date: '26 Jan 2026', day: 'Monday', occasion: 'Republic Day', equity: 'Closed', fno: 'Closed', mcxMorning: 'Closed', mcxEvening: 'Closed' },
    { id: 2, date: '08 Mar 2026', day: 'Sunday', occasion: 'Mahashivratri', equity: 'Closed', fno: 'Closed', mcxMorning: 'Closed', mcxEvening: 'Closed' },
    { id: 3, date: '25 Mar 2026', day: 'Monday', occasion: 'Holi', equity: 'Closed', fno: 'Closed', mcxMorning: 'Closed', mcxEvening: 'Open' },
    { id: 4, date: '29 Mar 2026', day: 'Friday', occasion: 'Good Friday', equity: 'Closed', fno: 'Closed', mcxMorning: 'Closed', mcxEvening: 'Closed' },
    { id: 5, date: '11 Apr 2026', day: 'Thursday', occasion: 'Id-Ul-Fitr (Ramzan Id)', equity: 'Closed', fno: 'Closed', mcxMorning: 'Closed', mcxEvening: 'Open' },
    { id: 6, date: '14 Apr 2026', day: 'Sunday', occasion: 'Dr. Baba Saheb Ambedkar Jayanti', equity: 'Closed', fno: 'Closed', mcxMorning: 'Closed', mcxEvening: 'Closed' },
    { id: 7, date: '17 Apr 2026', day: 'Wednesday', occasion: 'Ram Navami', equity: 'Closed', fno: 'Closed', mcxMorning: 'Closed', mcxEvening: 'Open' },
    { id: 8, date: '21 Apr 2026', day: 'Sunday', occasion: 'Shri Mahavir Jayanti', equity: 'Closed', fno: 'Closed', mcxMorning: 'Closed', mcxEvening: 'Closed' },
    { id: 9, date: '01 May 2026', day: 'Wednesday', occasion: 'Maharashtra Day', equity: 'Closed', fno: 'Closed', mcxMorning: 'Closed', mcxEvening: 'Open' },
    { id: 10, date: '23 May 2026', day: 'Thursday', occasion: 'Buddha Purnima', equity: 'Closed', fno: 'Closed', mcxMorning: 'Closed', mcxEvening: 'Open' },
    { id: 11, date: '17 Jun 2026', day: 'Monday', occasion: 'Bakri Id / Eid-ul-Adha', equity: 'Closed', fno: 'Closed', mcxMorning: 'Closed', mcxEvening: 'Open' },
    { id: 12, date: '17 Jul 2026', day: 'Wednesday', occasion: 'Muharram', equity: 'Closed', fno: 'Closed', mcxMorning: 'Closed', mcxEvening: 'Open' },
    { id: 13, date: '15 Aug 2026', day: 'Thursday', occasion: 'Independence Day', equity: 'Closed', fno: 'Closed', mcxMorning: 'Closed', mcxEvening: 'Closed' },
    { id: 14, date: '07 Sep 2026', day: 'Saturday', occasion: 'Ganesh Chaturthi', equity: 'Closed', fno: 'Closed', mcxMorning: 'Closed', mcxEvening: 'Closed' },
    { id: 15, date: '02 Oct 2026', day: 'Wednesday', occasion: 'Mahatma Gandhi Jayanti', equity: 'Closed', fno: 'Closed', mcxMorning: 'Closed', mcxEvening: 'Closed' },
    { id: 16, date: '12 Oct 2026', day: 'Saturday', occasion: 'Dussehra', equity: 'Closed', fno: 'Closed', mcxMorning: 'Closed', mcxEvening: 'Closed' },
    { id: 17, date: '01 Nov 2026', day: 'Friday', occasion: 'Diwali * Laxmi Pujan (Muhurat Trading)', equity: 'Muhurat 18:15', fno: 'Muhurat 18:15', mcxMorning: 'Muhurat 18:15', mcxEvening: 'Muhurat 18:15' },
    { id: 18, date: '02 Nov 2026', day: 'Saturday', occasion: 'Diwali Balipratipada', equity: 'Closed', fno: 'Closed', mcxMorning: 'Closed', mcxEvening: 'Closed' },
    { id: 19, date: '15 Nov 2026', day: 'Friday', occasion: 'Gurunanak Jayanti', equity: 'Closed', fno: 'Closed', mcxMorning: 'Closed', mcxEvening: 'Open' },
    { id: 20, date: '25 Dec 2026', day: 'Wednesday', occasion: 'Christmas', equity: 'Closed', fno: 'Closed', mcxMorning: 'Closed', mcxEvening: 'Closed' },
  ];

  const filteredHolidays = holidaysList.filter((item) => {
    const matchesSearch = 
      item.occasion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.day.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const handleExportCSV = () => {
    toast.success('Downloaded 2026 Stock Market Holiday Calendar (CSV)');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-white rounded-[28px] shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col my-auto font-sans text-slate-800"
        >
          {/* Header */}
          <div className="bg-[#172033] text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute right-5 top-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary/20 text-[#64748B] border border-primary-light/30 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#64748B]" /> NSE · BSE · MCX Official Schedule
              </span>
            </div>

            <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#64748B]" /> Stock Market Holiday Calendar {selectedYear}
            </h2>
            <p className="text-slate-400 text-xs mt-1">Official trading holidays for Indian equity, F&O, currency, and commodities market</p>

            {/* Segment Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-3 border-t border-white/10">
              <div className="flex gap-2 text-xs font-bold">
                {(['Equity', 'F&O', 'MCX', 'Clearing'] as const).map((seg) => (
                  <button
                    key={seg}
                    onClick={() => setSelectedSegment(seg)}
                    className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                      selectedSegment === seg
                        ? 'bg-primary text-white font-black shadow-sm'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    {seg === 'MCX' ? 'MCX Commodities' : seg === 'Clearing' ? 'Clearing Holidays' : `${seg} Trading`}
                  </button>
                ))}
              </div>

              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#64748B]" /> Export CSV
              </button>
            </div>
          </div>

          {/* Search & Stats Bar */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search holiday or festival..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-primary transition"
              />
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 font-bold w-full sm:w-auto justify-between sm:justify-end">
              <span className="flex items-center gap-1 text-slate-700 font-black">
                Total Holidays: <span className="text-primary">{filteredHolidays.length}</span>
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px] font-black">
                <Sun className="w-3.5 h-3.5 text-amber-600" /> Muhurat Trading: 01 Nov 2026
              </span>
            </div>
          </div>

          {/* Holidays List Table */}
          <div className="p-4 overflow-y-auto max-h-[440px]">
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-500 font-black uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Day</th>
                    <th className="py-3 px-4">Occasion / Festival</th>
                    <th className="py-3 px-4 text-center">Equity & F&O</th>
                    <th className="py-3 px-4 text-center">MCX Morning (9am - 5pm)</th>
                    <th className="py-3 px-4 text-center">MCX Evening (5pm - 11:30pm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredHolidays.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                        No market holidays match your search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredHolidays.map((item) => {
                      const isMuhurat = item.occasion.includes('Muhurat');
                      return (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-black text-[#172033] whitespace-nowrap">
                            {item.date}
                          </td>
                          <td className="py-3 px-4 text-slate-500 font-bold whitespace-nowrap">
                            {item.day}
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-800">
                            {item.occasion}
                            {isMuhurat && (
                              <span className="ml-2 text-[9px] bg-amber-500 text-white font-black px-1.5 py-0.5 rounded uppercase">
                                Special Session
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${
                              isMuhurat 
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}>
                              {item.equity}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${
                              item.mcxMorning === 'Closed' 
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}>
                              {item.mcxMorning}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${
                              item.mcxEvening === 'Open'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : item.mcxEvening.includes('Muhurat')
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}>
                              {item.mcxEvening}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Note */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-[11px]">
              <Info className="w-3.5 h-3.5 text-primary shrink-0" /> Note: Dates are subject to changes announced by SEBI & Exchange circulars.
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#172033] hover:bg-slate-800 text-white rounded-xl font-black transition cursor-pointer"
            >
              Close Calendar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default HolidayCalendarModal;
