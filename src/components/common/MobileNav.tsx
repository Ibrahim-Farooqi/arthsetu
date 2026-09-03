import React from 'react';
import { Home, TrendingUp, Compass, Briefcase, User, Sparkles } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tabName: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'Research', label: 'Research', icon: TrendingUp, badge: 'AI' },
    { id: 'Invest', label: 'Invest', icon: Compass },
    { id: 'Portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'Profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex items-center justify-around z-40 shadow-[0_-4px_16px_rgba(15,23,42,0.06)] px-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] py-1 relative transition-colors ${
              isActive ? 'text-primary font-black' : 'text-slate-500 font-bold'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
              {tab.badge && (
                <span className="absolute -top-1 -right-2 bg-danger text-white text-[8px] font-black px-1 rounded-full">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default MobileNav;
