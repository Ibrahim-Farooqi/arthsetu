import React from 'react';

export type SkeletonVariant = 
  | 'ResearchCard' 
  | 'PortfolioCard' 
  | 'Chart' 
  | 'TableRow' 
  | 'AIAdvisor' 
  | 'DashboardMetric' 
  | 'Modal' 
  | 'SearchResult';

interface LoadingSkeletonProps {
  variant: SkeletonVariant;
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant,
  count = 1,
  className = ''
}) => {
  const renderVariant = () => {
    switch (variant) {
      case 'ResearchCard':
        return (
          <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-xs flex flex-col gap-4 animate-pulse">
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-xl bg-slate-200" />
                <div className="flex flex-col gap-1.5">
                  <div className="w-28 h-4 bg-slate-200 rounded-md" />
                  <div className="w-16 h-3 bg-slate-200 rounded-md" />
                </div>
              </div>
              <div className="w-14 h-6 bg-slate-200 rounded-lg" />
            </div>
            <div className="grid grid-cols-3 gap-2 py-3 bg-slate-50 rounded-xl p-3">
              <div className="w-full h-8 bg-slate-200 rounded-lg" />
              <div className="w-full h-8 bg-slate-200 rounded-lg" />
              <div className="w-full h-8 bg-slate-200 rounded-lg" />
            </div>
            <div className="w-full h-10 bg-slate-200 rounded-xl" />
          </div>
        );

      case 'PortfolioCard':
        return (
          <div className="bg-white border border-slate-200 rounded-[24px] p-5 shadow-xs flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-200" />
              <div className="flex flex-col gap-1.5">
                <div className="w-24 h-4 bg-slate-200 rounded-md" />
                <div className="w-16 h-3 bg-slate-200 rounded-md" />
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <div className="w-20 h-4 bg-slate-200 rounded-md" />
              <div className="w-12 h-3 bg-slate-200 rounded-md" />
            </div>
          </div>
        );

      case 'Chart':
        return (
          <div className="w-full h-64 bg-slate-100 rounded-[24px] p-6 border border-slate-200 flex flex-col justify-between animate-pulse">
            <div className="flex justify-between items-center">
              <div className="w-32 h-5 bg-slate-200 rounded-md" />
              <div className="w-20 h-4 bg-slate-200 rounded-md" />
            </div>
            <div className="w-full h-36 bg-slate-200/70 rounded-xl" />
            <div className="flex justify-between">
              <div className="w-12 h-3 bg-slate-200 rounded-md" />
              <div className="w-12 h-3 bg-slate-200 rounded-md" />
              <div className="w-12 h-3 bg-slate-200 rounded-md" />
            </div>
          </div>
        );

      case 'TableRow':
        return (
          <div className="w-full h-12 bg-white border-b border-slate-100 px-4 flex items-center justify-between animate-pulse">
            <div className="w-24 h-4 bg-slate-200 rounded-md" />
            <div className="w-16 h-4 bg-slate-200 rounded-md" />
            <div className="w-20 h-4 bg-slate-200 rounded-md" />
            <div className="w-14 h-5 bg-slate-200 rounded-lg" />
          </div>
        );

      case 'AIAdvisor':
        return (
          <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-xs flex flex-col justify-between h-72 animate-pulse">
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 rounded-2xl bg-slate-200" />
              <div className="w-16 h-5 bg-slate-200 rounded-full" />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="w-36 h-5 bg-slate-200 rounded-md" />
              <div className="w-full h-3 bg-slate-200 rounded-md" />
              <div className="w-3/4 h-3 bg-slate-200 rounded-md" />
            </div>
            <div className="w-full h-11 bg-slate-200 rounded-xl mt-4" />
          </div>
        );

      case 'DashboardMetric':
        return (
          <div className="p-5 bg-white border border-slate-200 rounded-[24px] flex flex-col justify-between h-32 animate-pulse">
            <div className="flex justify-between">
              <div className="w-24 h-3 bg-slate-200 rounded-md" />
              <div className="w-12 h-4 bg-slate-200 rounded-md" />
            </div>
            <div className="w-32 h-7 bg-slate-200 rounded-md" />
            <div className="w-20 h-3 bg-slate-200 rounded-md" />
          </div>
        );

      case 'Modal':
        return (
          <div className="p-6 bg-white rounded-[28px] border border-slate-200 flex flex-col gap-4 animate-pulse">
            <div className="w-48 h-6 bg-slate-200 rounded-md" />
            <div className="w-full h-24 bg-slate-100 rounded-2xl" />
            <div className="w-full h-12 bg-slate-200 rounded-xl" />
          </div>
        );

      case 'SearchResult':
        return (
          <div className="p-3 bg-white hover:bg-slate-50 border-b border-slate-100 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-200" />
              <div className="w-32 h-4 bg-slate-200 rounded-md" />
            </div>
            <div className="w-16 h-4 bg-slate-200 rounded-md" />
          </div>
        );

      default:
        return <div className="w-full h-12 bg-slate-200 rounded-xl animate-pulse" />;
    }
  };

  return (
    <div className={`flex flex-col gap-3 w-full ${className}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <React.Fragment key={idx}>{renderVariant()}</React.Fragment>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
