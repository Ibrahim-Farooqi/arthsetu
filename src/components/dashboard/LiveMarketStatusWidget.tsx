import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Info, ExternalLink, Calendar, HelpCircle, AlertCircle, ChevronDown } from 'lucide-react';
import { HolidayCalendarModal } from './HolidayCalendarModal';
import { TradingHoursModal } from './TradingHoursModal';

export const LiveMarketStatusWidget: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [isTradingHoursModalOpen, setIsTradingHoursModalOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Update clock every second/minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle click outside to close popover
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // IST Time Calculations
  // Since server time might not be in IST, let's format it in Asia/Kolkata timezone
  const getISTString = (date: Date) => {
    return date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  };

  const getISTTimeParts = (date: Date) => {
    const istStr = getISTString(date);
    const istDate = new Date(istStr);
    const day = istDate.getDay(); // 0: Sun, 1: Mon, ... 6: Sat
    const hours = istDate.getHours();
    const minutes = istDate.getMinutes();
    const dateNum = istDate.getDate();
    const month = istDate.toLocaleString('en-US', { month: 'short', timeZone: 'Asia/Kolkata' });
    const weekday = istDate.toLocaleString('en-US', { weekday: 'short', timeZone: 'Asia/Kolkata' });
    return { day, hours, minutes, dateNum, month, weekday, istDate };
  };

  const { day, hours, minutes, dateNum, month, weekday, istDate } = getISTTimeParts(currentTime);

  // Market Schedule Config (NSE/BSE)
  // Market Hours: 09:15 to 15:30 (3:30 PM)
  const marketOpenHour = 9;
  const marketOpenMin = 15;
  const marketCloseHour = 15;
  const marketCloseMin = 30;

  // Check if it's a Weekend
  const isWeekend = day === 0 || day === 6;

  // Mock Market Holidays list (e.g. Independence Day 15 Aug, Gandhi Jayanti 2 Oct, etc.)
  // Let's check a static list for simulation
  const holidays = [
    { date: '15 Aug', name: 'Independence Day' },
    { date: '2 Oct', name: 'Gandhi Jayanti' },
    { date: '25 Dec', name: 'Christmas' },
    { date: '15 Nov', name: 'Guru Nanak Jayanti' }
  ];
  const currentDateStr = `${dateNum} ${month}`;
  const matchedHoliday = holidays.find(h => h.date === currentDateStr);
  const isHoliday = !!matchedHoliday;

  // Determine current market status state
  let statusState: 'open' | 'closed' | 'opening_soon' | 'weekend' | 'holiday' = 'closed';
  let statusText = '';
  let countdownText = '';

  const totalCurrentMinutes = hours * 60 + minutes;
  const totalOpenMinutes = marketOpenHour * 60 + marketOpenMin;
  const totalCloseMinutes = marketCloseHour * 60 + marketCloseMin;

  if (isWeekend) {
    statusState = 'weekend';
    statusText = 'Weekend';
    countdownText = 'Reopens Monday 09:15 AM';
  } else if (isHoliday) {
    statusState = 'holiday';
    statusText = 'Holiday';
    countdownText = `Closed (${matchedHoliday?.name})`;
  } else if (totalCurrentMinutes >= totalOpenMinutes && totalCurrentMinutes < totalCloseMinutes) {
    statusState = 'open';
    statusText = 'Market Open';
    // Calculate remaining minutes until close
    const remMins = totalCloseMinutes - totalCurrentMinutes;
    const remHrs = Math.floor(remMins / 60);
    const remMinsText = remMins % 60;
    countdownText = `Closes in ${remHrs}h ${remMinsText}m`;
  } else {
    // Closed or opening soon (e.g. 08:30 to 09:15)
    if (totalCurrentMinutes >= totalOpenMinutes - 45 && totalCurrentMinutes < totalOpenMinutes) {
      statusState = 'opening_soon';
      statusText = 'Opening Soon';
      const remMins = totalOpenMinutes - totalCurrentMinutes;
      countdownText = `Opens in ${remMins}m`;
    } else {
      statusState = 'closed';
      statusText = 'Market Closed';
      // Calculate remaining minutes until opening
      let remMins = 0;
      if (totalCurrentMinutes < totalOpenMinutes) {
        remMins = totalOpenMinutes - totalCurrentMinutes;
      } else {
        // Closed for the day, opens tomorrow at 09:15 AM
        remMins = (24 * 60 - totalCurrentMinutes) + totalOpenMinutes;
      }
      const remHrs = Math.floor(remMins / 60);
      const remMinsText = remMins % 60;
      countdownText = `Opens in ${remHrs}h ${remMinsText}m`;
    }
  }

  // Format Time display string: Thu, 24 Jul • 11:18 AM IST
  const formattedTimeStr = istDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  });
  const timeDisplayStr = `${weekday}, ${dateNum} ${month} · ${formattedTimeStr} IST`;

  return (
    <div className="relative select-none" ref={popoverRef}>
      
      {/* TRIGGER WIDGET BUTTON */}
      <button
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        className="flex items-center gap-2.5 h-10 px-3.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white hover:border-slate-300 transition-all text-xs font-bold text-[#172033] shadow-2xs cursor-pointer"
      >
        <span className="flex items-center gap-1.5 shrink-0">
          {statusState === 'open' ? (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          ) : statusState === 'opening_soon' ? (
            <span className="h-2 w-2 rounded-full bg-amber-500" />
          ) : (
            <span className="h-2 w-2 rounded-full bg-danger" />
          )}
          <span className="font-black text-[#172033]">{statusText}</span>
        </span>

        <span className="text-slate-300 font-normal">•</span>

        <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">{countdownText}</span>

        <span className="text-slate-300 font-normal hidden xl:inline">•</span>

        <span className="text-[11px] text-slate-500 font-bold hidden xl:inline">{formattedTimeStr} IST</span>

        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ml-0.5 ${isPopoverOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* COMPACT DETAILED POPOVER PANEL */}
      <AnimatePresence>
        {isPopoverOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2.5 right-0 w-80 bg-white border border-[#E2E8F0] rounded-[24px] shadow-2xl p-5 z-[80] flex flex-col gap-4 text-xs text-slate-700"
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-black text-[#172033] text-sm">Market Status</span>
              <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase ${
                statusState === 'open' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
              }`}>
                {statusText}
              </span>
            </div>

            {/* Time Indicators */}
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-400 text-[10px] uppercase">Current Time</span>
                <span className="font-black text-[#172033]">{timeDisplayStr}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-400 text-[10px] uppercase">Trading Session</span>
                <span className="font-black text-[#172033]">09:15 AM – 03:30 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-400 text-[10px] uppercase">Time Remaining</span>
                <span className="font-black text-primary">{countdownText}</span>
              </div>
            </div>

            {/* Local Exchanges Board */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-2xl flex justify-between text-[10.5px]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>NSE: <strong className="font-black">Open</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>BSE: <strong className="font-black">Open</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>MCX: <strong className="font-black">Open</strong></span>
              </div>
            </div>

            {/* Next Market Event Section */}
            <div className="flex flex-col gap-2 border-t border-slate-100 pt-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Next Market Events</span>
              <div className="flex flex-col gap-1.5 text-[10.5px]">
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium">RBI Monetary Policy</span>
                  <span className="font-black text-[#172033]">Tomorrow, 10:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium">Monthly F&O Expiry</span>
                  <span className="font-black text-amber-600">Today</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium">Federal Budget Session</span>
                  <span className="font-black text-[#172033]">28 Jul</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium">Reliance Q1 Earnings</span>
                  <span className="font-black text-[#172033]">Today after close</span>
                </div>
              </div>
            </div>

            {/* Global Markets Section */}
            <div className="flex flex-col gap-2 border-t border-slate-100 pt-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Global Markets Overview</span>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="flex justify-between items-center p-2 bg-[#F8FAFC] border border-slate-100 rounded-xl">
                  <span>🇺🇸 NASDAQ</span>
                  <span className="text-danger font-black">Closed</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#F8FAFC] border border-slate-100 rounded-xl">
                  <span>🇺🇸 NYSE</span>
                  <span className="text-danger font-black">Closed</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#F8FAFC] border border-slate-100 rounded-xl">
                  <span>🇯🇵 Nikkei 225</span>
                  <span className="text-emerald-600 font-black">Open</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#F8FAFC] border border-slate-100 rounded-xl">
                  <span>🇬🇧 LSE Spot</span>
                  <span className="text-amber-600 font-black">Opening Soon</span>
                </div>
              </div>
            </div>

            {/* Links Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[10px] font-black text-primary">
              <button 
                onClick={() => {
                  setIsPopoverOpen(false);
                  setIsHolidayModalOpen(true);
                }} 
                className="hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                Holiday Calendar →
              </button>
              <button 
                onClick={() => {
                  setIsPopoverOpen(false);
                  setIsTradingHoursModalOpen(true);
                }} 
                className="hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                Trading Hours →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <HolidayCalendarModal
        isOpen={isHolidayModalOpen}
        onClose={() => setIsHolidayModalOpen(false)}
      />

      <TradingHoursModal
        isOpen={isTradingHoursModalOpen}
        onClose={() => setIsTradingHoursModalOpen(false)}
      />

    </div>
  );
};
export default LiveMarketStatusWidget;
