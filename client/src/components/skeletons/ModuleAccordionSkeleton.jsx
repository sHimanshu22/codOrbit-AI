import Skeleton from "./Skeleton";

const ModuleAccordionSkeleton = ({ count = 6 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <div className="mt-4 space-y-3">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-4/6" />
        </div>
      </div>
    ))}
  </div>
);

export default ModuleAccordionSkeleton;
