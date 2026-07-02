import Skeleton from "./Skeleton";

const LoginPageSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 px-4 py-10">
    <div className="mx-auto flex max-w-md flex-col rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-10 shadow-xl backdrop-blur-xl">
      <div className="flex justify-center">
        <Skeleton className="h-24 w-24 rounded-3xl" />
      </div>
      <div className="mt-6 space-y-3 text-center">
        <Skeleton className="mx-auto h-6 w-48" />
        <Skeleton className="mx-auto h-4 w-full" />
        <Skeleton className="mx-auto h-4 w-5/6" />
      </div>
      <div className="mt-10 flex justify-center">
        <Skeleton className="h-12 w-full max-w-xs rounded-full" />
      </div>
      <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-blue-50/70 dark:bg-blue-950/20 p-5">
        <div className="flex justify-center">
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="mt-4 space-y-3">
          <Skeleton className="mx-auto h-4 w-3/4" />
          <Skeleton className="mx-auto h-4 w-2/3" />
          <Skeleton className="mx-auto h-4 w-3/5" />
        </div>
      </div>
    </div>
  </div>
);

export default LoginPageSkeleton;
