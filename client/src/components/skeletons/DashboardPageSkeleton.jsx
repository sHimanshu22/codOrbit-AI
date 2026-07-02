import Skeleton from "./Skeleton";
import StatCardSkeleton from "./StatCardSkeleton";
import InsightCardSkeleton from "./InsightCardSkeleton";

const DashboardPageSkeleton = () => (
  <div className="space-y-8">
    <div className="space-y-3">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-8 w-72" />
      <Skeleton className="h-4 w-96" />
    </div>

    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
      <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <Skeleton className="h-4 w-24" />
          <div className="mt-4 space-y-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    </div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <StatCardSkeleton key={index} />
      ))}
    </div>

    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <Skeleton className="h-4 w-40" />
        <div className="mt-6 h-64 w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
      </div>
      <InsightCardSkeleton />
    </div>
  </div>
);

export default DashboardPageSkeleton;
