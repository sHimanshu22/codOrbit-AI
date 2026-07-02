import Skeleton from "./Skeleton";

const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
    <div className="space-y-4">
      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-full" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={`${rowIndex}-${colIndex}`} className="h-10 w-full" />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default TableSkeleton;
