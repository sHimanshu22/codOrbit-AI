import Skeleton from "./Skeleton";

const ProfileCardSkeleton = () => (
  <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
    <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
      <Skeleton className="h-24 w-24 rounded-full" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  </div>
);

export default ProfileCardSkeleton;
