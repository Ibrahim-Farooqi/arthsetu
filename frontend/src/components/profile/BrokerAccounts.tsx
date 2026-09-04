import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, CheckCircle2, AlertCircle, Link2, Unlink, Plus, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

interface Broker {
  id: string;
  name: string;
  logo: string;
  clientId: string;
  status: 'connected' | 'disconnected';
  connectedSince?: string;
  lastSync?: string;
  portfolioValue?: string;
}

export const BrokerAccounts: React.FC = () => {
  const [brokers, setBrokers] = useState<Broker[]>([
    { id: 'zerodha', name: 'Zerodha Kite', logo: 'ZK', clientId: 'AB1294', status: 'connected', connectedSince: '14 Jan 2024', lastSync: '2 min ago', portfolioValue: '₹8,42,150' },
    { id: 'groww', name: 'Groww Direct', logo: 'GW', clientId: 'GRW-8821', status: 'disconnected' },
    { id: 'angelone', name: 'Angel One', logo: 'AO', clientId: 'AO-9912', status: 'disconnected' },
    { id: 'upstox', name: 'Upstox Pro', logo: 'UP', clientId: 'UP-7714', status: 'disconnected' }
  ]);

  const handleSync = (name: string) => {
    toast.success(`Syncing portfolio holdings from ${name}...`);
  };

  const handleToggleConnect = (id: string) => {
    setBrokers(prev => prev.map(b => {
      if (b.id === id) {
        const nextStatus = b.status === 'connected' ? 'disconnected' : 'connected';
        toast.success(`${b.name} ${nextStatus === 'connected' ? 'connected successfully' : 'disconnected'}`);
        return {
          ...b,
          status: nextStatus,
          connectedSince: nextStatus === 'connected' ? 'Just now' : undefined,
          lastSync: nextStatus === 'connected' ? 'Just now' : undefined,
          portfolioValue: nextStatus === 'connected' ? '₹2,14,500' : undefined
        };
      }
      return b;
    }));
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-black text-[#172033]">Connected Broker Accounts</h3>
          <p className="text-xs text-slate-500 font-medium">Direct API integrations for seamless order routing & portfolio sync.</p>
        </div>
        <button
          onClick={() => toast.success('Connecting new broker via OAuth...')}
          className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-black text-xs transition flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Connect Broker
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {brokers.map((b) => {
          const isConn = b.status === 'connected';
          return (
            <div key={b.id} className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#172033] text-white flex items-center justify-center font-black text-sm shadow-sm">
                    {b.logo}
                  </div>
                  <div>
                    <h4 className="font-black text-base text-[#172033]">{b.name}</h4>
                    <span className="text-xs text-slate-400 font-bold block">Client ID: {b.clientId}</span>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 ${
                  isConn ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isConn ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                  {isConn ? 'Connected' : 'Disconnected'}
                </span>
              </div>

              {isConn ? (
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">Portfolio Value</span>
                    <strong className="text-[#172033] text-sm">{b.portfolioValue}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">Last Sync</span>
                    <strong className="text-slate-600 text-xs">{b.lastSync}</strong>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-2xl text-xs text-slate-500 font-medium">
                  Connect your {b.name} account to enable 1-click trade executions and instant margin calculation.
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                {isConn ? (
                  <>
                    <button
                      onClick={() => handleSync(b.name)}
                      className="text-primary font-black hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Sync Portfolio
                    </button>

                    <button
                      onClick={() => handleToggleConnect(b.id)}
                      className="text-danger font-bold hover:underline flex items-center gap-1"
                    >
                      <Unlink className="w-3.5 h-3.5" /> Disconnect
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleToggleConnect(b.id)}
                    className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-black transition text-center flex items-center justify-center gap-1.5"
                  >
                    <Link2 className="w-4 h-4" /> Connect {b.name}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrokerAccounts;
