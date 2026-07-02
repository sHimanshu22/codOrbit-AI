import Skeleton from "./Skeleton";
import StatCardSkeleton from "./StatCardSkeleton";
import ChartSkeleton from "./ChartSkeleton";

const DSAOverviewPageSkeleton = () => (
  <div className="space-y-8">
    <div className="space-y-3">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-8 w-72" />
      <Skeleton className="h-4 w-96" />
    </div>

    <div className="grid gap-6 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <StatCardSkeleton key={index} />
      ))}
    </div>

    <ChartSkeleton />

    <div className="grid gap-6 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="h-32 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-6 w-3/4" />
          <Skeleton className="mt-3 h-4 w-full" />
        </div>
      ))}
    </div>
  </div>
);

export default DSAOverviewPageSkeleton;
