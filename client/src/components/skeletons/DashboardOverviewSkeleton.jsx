import Skeleton from "./Skeleton";
import StatCardSkeleton from "./StatCardSkeleton";
import InsightCardSkeleton from "./InsightCardSkeleton";

const DashboardOverviewSkeleton = () => (
  <div className="space-y-8">
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
      <Skeleton className="h-4 w-32" />
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <StatCardSkeleton key={index} />
      ))}
    </div>

    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <Skeleton className="h-4 w-36" />
        <div className="mt-6 h-64 w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
      </div>
      <InsightCardSkeleton />
    </div>
  </div>
);

export default DashboardOverviewSkeleton;
