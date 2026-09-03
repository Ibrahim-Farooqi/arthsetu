import React from 'react';
import { Activity, ShieldCheck, UserCheck, Key, Laptop, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const activities = [
  { id: '1', title: 'New Device Login', desc: 'Logged in from MacBook Pro 16" in Pune, India', date: 'Today', time: '10:45 AM', icon: Laptop, color: 'text-primary', bg: 'bg-primary-light' },
  { id: '2', title: 'Password Changed', desc: 'Account password was successfully updated.', date: 'Yesterday', time: '02:30 PM', icon: Key, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: '3', title: 'Bank Account Verified', desc: 'HDFC Bank Ltd. account ending in 4589 was verified.', date: '14 Jan 2024', time: '11:15 AM', icon: ShieldCheck, color: 'text-success', bg: 'bg-emerald-50' },
  { id: '4', title: 'Document Uploaded', desc: 'Client Master Report (CMR) was uploaded successfully.', date: '12 Jan 2024', time: '04:20 PM', icon: FileText, color: 'text-indigo-500', bg: 'bg-primary-light' },
  { id: '5', title: 'KYC Approved', desc: 'Your KYC application was approved by the compliance team.', date: '12 Jan 2024', time: '09:00 AM', icon: UserCheck, color: 'text-success', bg: 'bg-emerald-50' },
];

export const ActivityTimeline: React.FC = () => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 md:p-8 shadow-premium w-full">
      <h3 className="text-xl font-black text-brand-navy flex items-center gap-2 mb-8">
        <Activity className="w-5 h-5 text-primary" /> Recent Activity
      </h3>

      <div className="relative border-l-2 border-slate-100 ml-4 md:ml-6 space-y-8 pb-4">
        {activities.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 md:pl-10 group"
            >
              {/* Timeline Dot */}
              <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full ${item.bg} border-4 border-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                <Icon className={`w-3.5 h-3.5 ${item.color}`} />
              </div>

              {/* Content */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h4 className="text-sm font-black text-brand-navy">{item.title}</h4>
                  <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-100 w-fit">
                    {item.date} • {item.time}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
