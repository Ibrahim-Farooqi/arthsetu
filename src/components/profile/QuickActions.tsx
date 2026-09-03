import React from 'react';
import { Edit3, Building2, UserPlus, Link2, Shield, Download, LifeBuoy, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const actions = [
  { icon: Wallet, label: 'Add Funds' },
  { icon: Edit3, label: 'Edit Profile' },
  { icon: Building2, label: 'Manage Banks' },
  { icon: UserPlus, label: 'Manage Nominee' },
  { icon: Link2, label: 'Broker Connections' },
  { icon: Shield, label: 'Security Settings' },
  { icon: Download, label: 'Statements' },
  { icon: LifeBuoy, label: 'Support' },
];

interface QuickActionsProps {
  onActionClick?: (tab: string) => void;
  onAddFunds?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick, onAddFunds }) => {
  const handleAction = (label: string) => {
    if (label === 'Add Funds') {
      if (onAddFunds) onAddFunds();
    } else if (label === 'Edit Profile') {
      if (onActionClick) onActionClick('Personal Details');
    } else if (label === 'Manage Banks') {
      if (onActionClick) onActionClick('Bank Accounts');
    } else if (label === 'Manage Nominee') {
      if (onActionClick) onActionClick('Personal Details');
    } else if (label === 'Broker Connections') {
      if (onActionClick) onActionClick('Broker Accounts');
    } else if (label === 'Security Settings') {
      if (onActionClick) onActionClick('Security');
    } else if (label === 'Statements') {
      toast.success('Downloading P&L & Tax Statement (PDF)...');
    } else if (label === 'Support') {
      toast.success('Opening Priority Investor Support chat...');
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-black text-[#172033] mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={index}
              onClick={() => handleAction(action.label)}
              whileHover={{ y: -3 }}
              className="bg-white border border-[#E2E8F0] rounded-[20px] p-4 flex flex-col items-center justify-center gap-2.5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary-light transition-colors">
                <Icon className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
              </div>
              <span className="text-[11px] font-bold text-[#172033] text-center leading-tight">
                {action.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
