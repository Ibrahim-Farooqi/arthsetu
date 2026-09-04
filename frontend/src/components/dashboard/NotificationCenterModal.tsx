import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, ArrowRight, TrendingUp, AlertCircle, Sparkles, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface NotificationItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  time: string;
  isRead: boolean;
  stock?: string;
  destinationType: 'stock' | 'research' | 'trade' | 'news' | 'portfolio';
  dataPayload?: any;
}

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStock?: (stock: any) => void;
  onSelectResearch?: (research: any) => void;
  onTrade?: (tradeData: any) => void;
  onSelectNews?: (news: any) => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  onSelectStock,
  onSelectResearch,
  onTrade,
  onSelectNews
}) => {
  const [filter, setFilter] = useState<'All' | 'Unread'>('All');
  
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      category: 'Research',
      title: 'Reliance Industries (RELIANCE) Target Raised',
      summary: 'SEBI Lead Analyst revised upside target to ₹3,375 (+14%).',
      time: '10m ago',
      isRead: false,
      stock: 'RELIANCE',
      destinationType: 'research',
      dataPayload: { symbol: 'RELIANCE', company: 'Reliance Industries Ltd', rec: 'BUY' }
    },
    {
      id: 'n2',
      category: 'Price Alerts',
      title: 'Stop Loss Alert: INFY',
      summary: 'Dropped below ₹1,580. Review position or adjust trailing stop loss.',
      time: '25m ago',
      isRead: false,
      stock: 'INFY',
      destinationType: 'stock',
      dataPayload: { symbol: 'INFY', company: 'Infosys Limited' }
    },
    {
      id: 'n3',
      category: 'Orders',
      title: 'Order Executed: BUY HDFCBANK',
      summary: '50 shares executed at ₹1,682.40 on NSE.',
      time: '1h ago',
      isRead: true,
      stock: 'HDFCBANK',
      destinationType: 'trade',
      dataPayload: { symbol: 'HDFCBANK', company: 'HDFC Bank Ltd', price: '1,682.40', rec: 'BUY' }
    },
    {
      id: 'n4',
      category: 'Corporate',
      title: 'L&T Dividend Ex-Date Tomorrow',
      summary: 'Declared ₹28.00 per share dividend.',
      time: '2h ago',
      isRead: true,
      stock: 'LT',
      destinationType: 'stock',
      dataPayload: { symbol: 'LT', company: 'Larsen & Toubro Ltd' }
    }
  ]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const displayedNotifications = notifications.filter(n => {
    if (filter === 'Unread') return !n.isRead;
    return true;
  });

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    toast.success('Marked all as read');
  };

  const handleItemClick = (item: NotificationItem) => {
    setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, isRead: true } : n));
    onClose();

    if (item.destinationType === 'research' && onSelectResearch) {
      onSelectResearch(item.dataPayload);
    } else if (item.destinationType === 'stock' && onSelectStock) {
      onSelectStock(item.dataPayload);
    } else if (item.destinationType === 'trade' && onTrade) {
      onTrade(item.dataPayload);
    } else if (item.destinationType === 'news' && onSelectNews) {
      onSelectNews(item.dataPayload);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[90] flex items-start justify-end p-4 sm:p-6 sm:pt-20">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs"
        />

        {/* Clean Dropdown Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.18 }}
          className="relative w-full max-w-sm bg-white border border-[#E2E8F0] rounded-[24px] shadow-2xl z-10 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              <h3 className="font-black text-sm text-[#172033]">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-primary-light text-primary text-[10px] font-black">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-[11px] font-bold text-primary hover:underline"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="px-4 py-2 bg-[#F8FAFC] border-b border-slate-100 flex items-center gap-2 text-xs font-bold">
            <button
              onClick={() => setFilter('All')}
              className={`px-3 py-1 rounded-lg transition ${filter === 'All' ? 'bg-[#172033] text-white font-black' : 'text-slate-500 hover:text-[#172033]'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('Unread')}
              className={`px-3 py-1 rounded-lg transition ${filter === 'Unread' ? 'bg-[#172033] text-white font-black' : 'text-slate-500 hover:text-[#172033]'}`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100">
            {displayedNotifications.length === 0 ? (
              <div className="p-8 text-center text-xs font-bold text-slate-400">
                No notifications right now.
              </div>
            ) : (
              displayedNotifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`p-4 hover:bg-slate-50 transition cursor-pointer flex gap-3 items-start ${
                    !item.isRead ? 'bg-primary-light/30' : ''
                  }`}
                >
                  {!item.isRead ? (
                    <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-transparent mt-1.5 shrink-0" />
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <h4 className="font-black text-xs text-[#172033] truncate">{item.title}</h4>
                      <span className="text-[10px] text-slate-400 font-bold shrink-0">{item.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-snug line-clamp-2">{item.summary}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-slate-100 bg-[#F8FAFC] text-center text-[10px] font-bold text-slate-400">
            Click any notification to open workspace
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NotificationCenterModal;
