import Skeleton from "./Skeleton";
import TableSkeleton from "./TableSkeleton";

const ContestPageSkeleton = () => (
  <div className="space-y-8">
    <div className="space-y-3">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-8 w-72" />
      <Skeleton className="h-4 w-96" />
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="h-32 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-6 w-3/4" />
          <Skeleton className="mt-3 h-4 w-full" />
        </div>
      ))}
    </div>

    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <Skeleton className="h-4 w-32" />
      <div className="mt-4 h-64 w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
    </div>

    <TableSkeleton rows={4} columns={5} />
  </div>
);

export default ContestPageSkeleton;
