import Skeleton from "./Skeleton";

const ChartSkeleton = ({ height = "h-64" }) => (
  <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
    <Skeleton className="h-4 w-32" />
    <div className={`mt-6 ${height} w-full rounded-2xl bg-slate-100 dark:bg-slate-800`} />
  </div>
);

export default ChartSkeleton;
