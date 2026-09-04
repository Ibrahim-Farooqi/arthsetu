import React from 'react';
import { X, Command, Keyboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShortcutsCheatSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsCheatSheet: React.FC<ShortcutsCheatSheetProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modKey = isMac ? '⌘' : 'Ctrl';

  const shortcutsList = [
    { key: `${modKey} + K`, label: 'Open Universal Search' },
    { key: 'Escape', label: 'Close Active Modal / Drawer' },
    { key: `${modKey} + N`, label: 'Quick Trade Order Drawer' },
    { key: `${modKey} + T`, label: 'Toggle Light / Dark Mode' },
    { key: '?', label: 'Open Keyboard Shortcuts Help' },
    { key: 'Tab', label: 'Navigate Input Elements' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white rounded-[28px] shadow-2xl p-6 overflow-hidden z-10 font-sans text-slate-800">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <h3 className="text-lg font-black text-[#172033] flex items-center gap-2">
              <Keyboard className="w-5 h-5 text-primary" /> Keyboard Shortcuts
            </h3>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            {shortcutsList.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <span className="font-bold text-slate-700">{item.label}</span>
                <kbd className="px-2 py-1 bg-white border border-slate-300 rounded-md font-mono font-black text-slate-900 shadow-2xs">
                  {item.key}
                </kbd>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <button onClick={onClose} className="w-full py-2.5 bg-[#172033] text-white font-black text-xs rounded-xl cursor-pointer">
              Close Shortcuts
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ShortcutsCheatSheet;
