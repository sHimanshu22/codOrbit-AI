import Skeleton from "./Skeleton";

const StatCardSkeleton = ({ className = "" }) => (
  <div className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm ${className}`.trim()}>
    <div className="flex items-center justify-between gap-4">
      <div className="space-y-3 flex-1">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-20" />
      </div>
      <Skeleton className="h-12 w-12" />
    </div>
  </div>
);

export default StatCardSkeleton;
