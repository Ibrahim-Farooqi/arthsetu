import React from 'react';
import { 
  Radio, Briefcase, History, Bookmark, Bell, Search, Plus, ArrowRight 
} from 'lucide-react';

export type EmptyStateVariant = 
  | 'Research' 
  | 'Portfolio' 
  | 'Transactions' 
  | 'Watchlist' 
  | 'Notifications' 
  | 'Search' 
  | 'Custom';

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondaryAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  variant = 'Custom',
  title,
  description,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondaryAction,
  icon
}) => {
  const getVariantDefaults = () => {
    switch (variant) {
      case 'Research':
        return {
          icon: <Radio className="w-8 h-8 text-danger" />,
          title: title || 'No Research Calls Available',
          description: description || 'Our SEBI Research Analysts are scanning market signals. Check back shortly for fresh high-conviction ideas.',
          actionLabel: actionLabel || 'Explore AI Advisors',
        };
      case 'Portfolio':
        return {
          icon: <Briefcase className="w-8 h-8 text-primary" />,
          title: title || 'Your Portfolio is Empty',
          description: description || 'Start building your wealth by exploring high-performing stocks or automated SEBI research calls.',
          actionLabel: actionLabel || 'Explore Investments',
        };
      case 'Transactions':
        return {
          icon: <History className="w-8 h-8 text-slate-500" />,
          title: title || 'No Transactions Found',
          description: description || 'Your deposit, withdrawal, and trade execution history will appear here.',
          actionLabel: actionLabel || 'Add Funds',
        };
      case 'Watchlist':
        return {
          icon: <Bookmark className="w-8 h-8 text-amber-500" />,
          title: title || 'Watchlist is Empty',
          description: description || 'Save your favorite stocks and index tickers to track live real-time price movements.',
          actionLabel: actionLabel || 'Search Stocks',
        };
      case 'Notifications':
        return {
          icon: <Bell className="w-8 h-8 text-indigo-500" />,
          title: title || 'No Notifications Yet',
          description: description || 'You are all caught up! Live price alerts and target hit notifications will show up here.',
          actionLabel: actionLabel || 'Configure Alerts',
        };
      case 'Search':
        return {
          icon: <Search className="w-8 h-8 text-slate-400" />,
          title: title || 'No Results Found',
          description: description || 'We could not find any matching stock, research paper, or AI advisor.',
          actionLabel: actionLabel || 'Clear Search',
        };
      default:
        return {
          icon: icon || <Plus className="w-8 h-8 text-primary" />,
          title: title || 'No Items to Display',
          description: description || 'There is no data available for this view at the moment.',
          actionLabel: actionLabel,
        };
    }
  };

  const defaults = getVariantDefaults();

  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-[24px] p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-xs">
      <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 shadow-2xs">
        {defaults.icon}
      </div>

      <h3 className="text-lg font-black text-[#172033] mb-1">
        {defaults.title}
      </h3>

      <p className="text-xs text-slate-500 font-medium max-w-md leading-relaxed mb-6">
        {defaults.description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {defaults.actionLabel && onAction && (
          <button
            onClick={onAction}
            className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-black text-xs transition shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>{defaults.actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}

        {secondaryLabel && onSecondaryAction && (
          <button
            onClick={onSecondaryAction}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition cursor-pointer"
          >
            {secondaryLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
