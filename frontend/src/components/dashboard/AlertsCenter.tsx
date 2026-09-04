import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Plus, Trash2, ShieldCheck, Zap, AlertCircle, 
  TrendingUp, Newspaper, FileText, Calendar, CheckCircle2, Sparkles, X
} from 'lucide-react';

export interface IntelligentAlert {
  id: string;
  symbol: string;
  type: 'PRICE' | 'NEWS' | 'RESEARCH' | 'EVENT';
  condition: string;
  targetValue?: string;
  status: 'Active' | 'Triggered' | 'Paused';
  createdAt: string;
  isPremium?: boolean;
}

const INITIAL_ALERTS: IntelligentAlert[] = [
  { id: 'al-1', symbol: 'RELIANCE', type: 'RESEARCH', condition: 'Research Thesis Update or Conviction Rating Change', status: 'Active', createdAt: '22 Aug 2026', isPremium: true },
  { id: 'al-2', symbol: 'INFY', type: 'PRICE', condition: 'Price Falls Below Target', targetValue: '₹1,550.00', status: 'Active', createdAt: '19 Aug 2026' },
  { id: 'al-3', symbol: 'HDFCBANK', type: 'EVENT', condition: 'Q2 Earnings Release & Management Commentary', status: 'Active', createdAt: '15 Aug 2026' },
  { id: 'al-4', symbol: 'TATASTEEL', type: 'NEWS', condition: 'High Market Impact Corporate Announcement', status: 'Triggered', createdAt: '10 Aug 2026' },
];

export const AlertsCenter: React.FC = () => {
  const [alerts, setAlerts] = useState<IntelligentAlert[]>(INITIAL_ALERTS);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Alert State
  const [newSymbol, setNewSymbol] = useState('RELIANCE');
  const [newType, setNewType] = useState<'PRICE' | 'NEWS' | 'RESEARCH' | 'EVENT'>('PRICE');
  const [newCondition, setNewCondition] = useState('Price Above Target');
  const [newTargetValue, setNewTargetValue] = useState('3000');

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const created: IntelligentAlert = {
      id: `al-${Date.now()}`,
      symbol: newSymbol,
      type: newType,
      condition: newType === 'PRICE' ? `${newCondition} (₹${newTargetValue})` : newCondition,
      targetValue: newType === 'PRICE' ? `₹${newTargetValue}` : undefined,
      status: 'Active',
      createdAt: 'Today',
      isPremium: newType === 'RESEARCH' || newType === 'EVENT'
    };
    setAlerts([created, ...alerts]);
    setShowCreateModal(false);
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#15519D] mb-1">
            <Bell className="w-4 h-4" />
            <span>Real-time Market Surveillance</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Intelligent Alerts Center
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure automated signals for price breakouts, research thesis updates, high-impact news, and earnings events.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 bg-[#15519D] hover:bg-[#123B63] text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Alert</span>
        </button>
      </div>

      {/* Alert Type Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <span className="p-3 bg-blue-50 text-[#15519D] rounded-xl">
            <TrendingUp className="w-5 h-5" />
          </span>
          <div>
            <div className="font-extrabold text-slate-900 text-sm">Price Alerts</div>
            <p className="text-xs text-slate-400">Target thresholds & % movement</p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <span className="p-3 bg-emerald-50 text-[#16A34A] rounded-xl">
            <Newspaper className="w-5 h-5" />
          </span>
          <div>
            <div className="font-extrabold text-slate-900 text-sm">News Alerts</div>
            <p className="text-xs text-slate-400">AI filtered high-impact headlines</p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <span className="p-3 bg-purple-50 text-purple-700 rounded-xl">
            <FileText className="w-5 h-5" />
          </span>
          <div>
            <div className="font-extrabold text-slate-900 text-sm">Research Alerts</div>
            <p className="text-xs text-slate-400">Thesis changes & target updates</p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <span className="p-3 bg-amber-50 text-amber-700 rounded-xl">
            <Calendar className="w-5 h-5" />
          </span>
          <div>
            <div className="font-extrabold text-slate-900 text-sm">Event Alerts</div>
            <p className="text-xs text-slate-400">Quarterly results & board events</p>
          </div>
        </div>
      </div>

      {/* Active Alerts List */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-base">Your Configured Alert Triggers</h3>
          <span className="text-xs font-bold text-slate-500">{alerts.length} Active Triggers</span>
        </div>

        <div className="divide-y divide-slate-100">
          {alerts.map((al) => (
            <div key={al.id} className="p-5 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${
                  al.type === 'PRICE' ? 'bg-blue-50 text-[#15519D]' :
                  al.type === 'NEWS' ? 'bg-emerald-50 text-[#16A34A]' :
                  al.type === 'RESEARCH' ? 'bg-purple-50 text-purple-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {al.type === 'PRICE' && <TrendingUp className="w-5 h-5" />}
                  {al.type === 'NEWS' && <Newspaper className="w-5 h-5" />}
                  {al.type === 'RESEARCH' && <FileText className="w-5 h-5" />}
                  {al.type === 'EVENT' && <Calendar className="w-5 h-5" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-base">{al.symbol}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      al.type === 'PRICE' ? 'bg-blue-100 text-[#15519D]' :
                      al.type === 'NEWS' ? 'bg-emerald-100 text-[#16A34A]' :
                      al.type === 'RESEARCH' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {al.type} Alert
                    </span>
                    {al.isPremium && (
                      <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded text-[10px] font-black uppercase tracking-wider">
                        Prime Intelligence
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 font-semibold mt-1">{al.condition}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                  al.status === 'Active' ? 'bg-emerald-50 text-[#16A34A]' : 'bg-slate-100 text-slate-500'
                }`}>
                  {al.status}
                </span>

                <button
                  onClick={() => handleDeleteAlert(al.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                  title="Delete Alert"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CREATE ALERT MODAL */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-lg">Configure Intelligent Alert</h3>
                <button onClick={() => setShowCreateModal(false)} className="p-2 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateAlert} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Target Stock Symbol</label>
                  <select
                    value={newSymbol}
                    onChange={(e) => setNewSymbol(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-extrabold text-slate-900"
                  >
                    <option value="RELIANCE">RELIANCE — Reliance Industries</option>
                    <option value="TCS">TCS — Tata Consultancy Services</option>
                    <option value="HDFCBANK">HDFCBANK — HDFC Bank Ltd</option>
                    <option value="INFY">INFY — Infosys Limited</option>
                    <option value="TATASTEEL">TATASTEEL — Tata Steel Ltd</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Alert Trigger Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'PRICE', label: 'Price Threshold' },
                      { id: 'NEWS', label: 'News AI Impact' },
                      { id: 'RESEARCH', label: 'Research Thesis' },
                      { id: 'EVENT', label: 'Corporate Event' },
                    ].map((t) => (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setNewType(t.id as any)}
                        className={`p-3 rounded-xl border text-xs font-extrabold transition-all ${
                          newType === t.id
                            ? 'bg-[#15519D] text-white border-[#15519D]'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {newType === 'PRICE' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Target Price (₹)</label>
                    <input
                      type="number"
                      value={newTargetValue}
                      onChange={(e) => setNewTargetValue(e.target.value)}
                      placeholder="e.g. 3000"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-extrabold text-slate-900"
                    />
                  </div>
                )}

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2.5 border border-slate-200 text-slate-600 font-bold text-sm rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#15519D] text-white font-extrabold text-sm rounded-xl shadow-md"
                  >
                    Activate Alert
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlertsCenter;
