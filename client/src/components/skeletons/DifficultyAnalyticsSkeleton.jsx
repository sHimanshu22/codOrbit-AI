import Skeleton from "./Skeleton";

const DifficultyAnalyticsSkeleton = () => (
  <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
    <Skeleton className="h-4 w-36" />
    <div className="mt-6 flex h-48 items-end gap-3">
      {[60, 90, 75, 45, 110].map((height, index) => (
        <div key={index} className="flex flex-1 flex-col items-center gap-3">
          <Skeleton className={`w-full rounded-t-xl`} style={{ height: `${height}px` }} />
          <Skeleton className="h-3 w-10" />
        </div>
      ))}
    </div>
  </div>
);

export default DifficultyAnalyticsSkeleton;
