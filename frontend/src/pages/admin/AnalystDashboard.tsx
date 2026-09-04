import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, X, Search, RefreshCw, BarChart3, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export const AnalystDashboard = () => {
  const { user } = useAuth();
  const [calls, setCalls] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    symbol: '',
    category_id: '123e4567-e89b-12d3-a456-426614174000', // Mock UUID for now
    call_type: 'BUY',
    entry_price: '',
    target_price: '',
    stop_loss: '',
    time_horizon: '1-3 Months',
    technical_notes: ''
  });

  const fetchCalls = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/research/dashboard');
      setCalls(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load research calls');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/research', {
        ...formData,
        entry_price: parseFloat(formData.entry_price),
        target_price: parseFloat(formData.target_price),
        stop_loss: parseFloat(formData.stop_loss),
      });
      toast.success('Draft research call created successfully!');
      setIsCreating(false);
      fetchCalls();
    } catch (err) {
      console.error(err);
      toast.error('Failed to create call');
    }
  };

  const approveCall = async (id: string) => {
    try {
      await api.post(`/research/${id}/approve`, {
        call_id: id,
        status: 'APPROVED',
        comments: 'Looks good'
      });
      toast.success('Call published successfully!');
      fetchCalls();
    } catch (err) {
      toast.error('Failed to publish call');
    }
  };

  return (
    <div className="p-6 md:p-8 font-sans text-slate-800">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-[#172033]">Analyst Dashboard</h1>
          <p className="text-sm text-slate-500 font-medium">Manage and publish research calls</p>
        </div>
        <Button onClick={() => setIsCreating(true)} icon={<Plus className="w-4 h-4" />}>
          Create Call
        </Button>
      </div>

      {isCreating && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <h2 className="text-lg font-bold mb-4">Create New Draft</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input label="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            <Input label="Symbol (e.g. INFY)" value={formData.symbol} onChange={e => setFormData({...formData, symbol: e.target.value})} required />
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Call Type</label>
              <select className="w-full h-12 px-3 border border-slate-200 rounded-xl" value={formData.call_type} onChange={e => setFormData({...formData, call_type: e.target.value})}>
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
                <option value="HOLD">HOLD</option>
              </select>
            </div>
            <Input label="Entry Price" type="number" step="0.01" value={formData.entry_price} onChange={e => setFormData({...formData, entry_price: e.target.value})} required />
            <Input label="Target Price" type="number" step="0.01" value={formData.target_price} onChange={e => setFormData({...formData, target_price: e.target.value})} required />
            <Input label="Stop Loss" type="number" step="0.01" value={formData.stop_loss} onChange={e => setFormData({...formData, stop_loss: e.target.value})} required />
            
            <div className="col-span-full">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Technical Notes</label>
              <textarea 
                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-primary" 
                rows={3} 
                value={formData.technical_notes}
                onChange={e => setFormData({...formData, technical_notes: e.target.value})}
              />
            </div>
            
            <div className="col-span-full flex gap-3 justify-end mt-2">
              <Button variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
              <Button type="submit">Save Draft</Button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                <th className="p-4">Symbol</th>
                <th className="p-4">Type</th>
                <th className="p-4">Entry</th>
                <th className="p-4">Target / SL</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Loading calls...
                  </td>
                </tr>
              ) : calls.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No research calls found.
                  </td>
                </tr>
              ) : (
                calls.map((call) => (
                  <tr key={call.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 font-bold text-sm text-[#172033]">{call.symbol}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                        call.call_type === 'BUY' ? 'bg-emerald-100 text-emerald-700' : 
                        call.call_type === 'SELL' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {call.call_type}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-medium">₹{call.entry_price}</td>
                    <td className="p-4 text-sm">
                      <span className="text-emerald-600 font-bold">₹{call.target_price}</span> / <span className="text-danger font-bold">₹{call.stop_loss}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                        call.status === 'PUBLISHED' ? 'bg-primary-light text-primary' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {call.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {call.status !== 'PUBLISHED' && (
                        <Button variant="secondary" onClick={() => approveCall(call.id)} className="!py-1.5 !px-3 !text-[11px]">
                          Publish
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalystDashboard;
