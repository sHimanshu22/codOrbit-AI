import Skeleton from "./Skeleton";

const LandingPageSkeleton = () => (
  <div className="min-h-screen bg-white dark:bg-slate-950">
    <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-2xl" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-10 w-28 rounded-full" />
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <div className="flex gap-3 pt-4">
            <Skeleton className="h-12 w-36 rounded-full" />
            <Skeleton className="h-12 w-36 rounded-full" />
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6 shadow-sm">
          <Skeleton className="h-6 w-36" />
          <div className="mt-6 space-y-3">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="mt-4 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
            <Skeleton className="mt-2 h-4 w-4/6" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default LandingPageSkeleton;
