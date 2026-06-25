import { Briefcase } from "lucide-react";

const ResumePlacementReadiness = ({
  roles,
}) => {
  return (
    <div
      className="
      bg-white
      dark:bg-slate-900

      border
      border-slate-200
      dark:border-slate-800

      rounded-3xl
      p-6
      "
    >
      <div className="flex items-center gap-3 mb-6">
        <Briefcase
          size={24}
          className="text-blue-600"
        />

        <h2
          className="
          text-2xl
          font-bold

          text-slate-900
          dark:text-white
          "
        >
          Placement Readiness
        </h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {roles?.map(
          (role, index) => (
            <span
              key={index}
              className="
              px-4
              py-2

              rounded-full

              bg-blue-100
              dark:bg-blue-900/30

              text-blue-700
              dark:text-blue-300

              font-medium
              "
            >
              {role}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default ResumePlacementReadiness;