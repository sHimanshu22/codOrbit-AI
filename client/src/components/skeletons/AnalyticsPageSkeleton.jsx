import Skeleton from "./Skeleton";
import StatCardSkeleton from "./StatCardSkeleton";
import ChartSkeleton from "./ChartSkeleton";
import TableSkeleton from "./TableSkeleton";

const AnalyticsPageSkeleton = () => (
  <div className="space-y-8">
    <div className="space-y-3">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-8 w-72" />
      <Skeleton className="h-4 w-96" />
    </div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <StatCardSkeleton key={index} />
      ))}
    </div>

    <div className="grid gap-6 xl:grid-cols-2">
      <ChartSkeleton />
      <ChartSkeleton />
    </div>

    <TableSkeleton rows={5} columns={4} />
  </div>
);

export default AnalyticsPageSkeleton;
