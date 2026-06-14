import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionButton?: ReactNode;
}

export default function EmptyState({
  title = "No movies found",
  description = "Try adjusting your search terms or filters to find what you are looking for.",
  actionButton,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white rounded-2xl border border-slate-100 shadow-sm max-w-md mx-auto my-8">
      <div className="p-3 bg-slate-50 text-slate-400 rounded-full mb-4">
        <Inbox className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed max-w-xs">
        {description}
      </p>
      {actionButton}
    </div>
  );
}
