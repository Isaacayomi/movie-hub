import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  variant?: 'spinner' | 'grid' | 'row';
  count?: number;
}

export default function LoadingState({ variant = 'spinner', count = 8 }: LoadingStateProps) {
  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 animate-pulse">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="w-full aspect-[2/3] bg-slate-200 rounded-2xl"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'row') {
    return (
      <div className="flex gap-6 overflow-x-hidden animate-pulse py-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex-none w-48 flex flex-col gap-3">
            <div className="w-full aspect-[2/3] bg-slate-200 rounded-2xl"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <Loader2 className="w-10 h-10 text-accent animate-spin mb-3" />
      <p className="text-sm text-slate-500 font-medium">Loading content...</p>
    </div>
  );
}
