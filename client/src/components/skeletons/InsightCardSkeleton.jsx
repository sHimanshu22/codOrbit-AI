import Skeleton from "./Skeleton";

const InsightCardSkeleton = () => (
  <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
    <Skeleton className="h-4 w-28" />
    <div className="mt-4 space-y-3">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="h-3 w-4/6" />
    </div>
    <div className="mt-6 grid gap-3">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  </div>
);

export default InsightCardSkeleton;
