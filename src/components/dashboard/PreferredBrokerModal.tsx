import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ShieldCheck, Info } from 'lucide-react';

interface PreferredBrokerModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock?: {
    symbol: string;
    companyName?: string;
    price?: string | number;
  } | null;
}

const BROKERS = [
  {
    id: 'zerodha',
    name: 'Zerodha Kite',
    logoText: 'ZK',
    color: '#387ED1',
    description: 'India\'s largest discount broker platform.',
    url: 'https://kite.zerodha.com'
  },
  {
    id: 'groww',
    name: 'Groww',
    logoText: 'GW',
    color: '#00D09C',
    description: 'Fast & seamless investing in stocks & mutual funds.',
    url: 'https://groww.in'
  },
  {
    id: 'angelone',
    name: 'Angel One',
    logoText: 'AO',
    color: '#EB2A34',
    description: 'Full-service digital broker with advanced charting.',
    url: 'https://www.angelone.in'
  },
  {
    id: 'icicidirect',
    name: 'ICICI Direct',
    logoText: 'ID',
    color: '#004B87',
    description: '3-in-1 trading & demat account platform.',
    url: 'https://www.icicidirect.com'
  },
  {
    id: 'hdfcsec',
    name: 'HDFC Securities',
    logoText: 'HS',
    color: '#004C8F',
    description: 'Integrated banking & stock brokerage service.',
    url: 'https://www.hdfcsec.com'
  }
];

export const PreferredBrokerModal: React.FC<PreferredBrokerModalProps> = ({
  isOpen,
  onClose,
  stock
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 bg-blue-50 text-[#15519D] rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Invest via Preferred Broker</h3>
                  <p className="text-xs text-slate-500">
                    ArthSetu provides intelligence. Execute trades on your broker.
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stock Context Badge if available */}
          {stock && (
            <div className="mx-6 mt-4 p-3.5 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#15519D]">Target Security</span>
                <div className="font-extrabold text-slate-900 text-base">{stock.companyName || stock.symbol}</div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 font-medium">Symbol</span>
                <div className="font-mono font-bold text-[#15519D]">{stock.symbol}</div>
              </div>
            </div>
          )}

          {/* Phase 1 Intelligence Note */}
          <div className="mx-6 mt-3 p-3 bg-slate-100/80 rounded-xl flex items-start gap-2 text-slate-600 text-xs">
            <Info className="w-4 h-4 text-[#15519D] flex-shrink-0 mt-0.5" />
            <p>
              <strong>Direct Broker Redirect:</strong> ArthSetu does not handle order execution or funds custody. Select your broker below to open their platform. Direct 1-click broker syncing will be enabled in Phase 2.
            </p>
          </div>

          {/* Broker List */}
          <div className="p-6 space-y-3 max-h-[360px] overflow-y-auto">
            {BROKERS.map((broker) => (
              <a
                key={broker.id}
                href={broker.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="group flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-[#15519D] hover:bg-blue-50/30 transition-all duration-200"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white shadow-sm"
                    style={{ backgroundColor: broker.color }}
                  >
                    {broker.logoText}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-[#15519D] transition-colors">
                      {broker.name}
                    </h4>
                    <p className="text-xs text-slate-500">{broker.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-[#15519D] group-hover:translate-x-0.5 transition-transform">
                  <span>Open Broker</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-400">
            🔒 ArthSetu does not access or store broker login credentials.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PreferredBrokerModal;
