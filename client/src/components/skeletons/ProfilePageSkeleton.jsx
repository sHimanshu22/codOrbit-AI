import Skeleton from "./Skeleton";
import StatCardSkeleton from "./StatCardSkeleton";

const ProfilePageSkeleton = () => (
  <div className="space-y-8">
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <StatCardSkeleton key={index} />
      ))}
    </div>

    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
      <Skeleton className="h-4 w-32" />
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full" />
        ))}
      </div>
    </div>
  </div>
);

export default ProfilePageSkeleton;
