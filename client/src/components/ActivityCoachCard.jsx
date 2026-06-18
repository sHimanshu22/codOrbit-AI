import {
  Brain,
  Code2,
  GitBranch,
} from "lucide-react";

const ActivityCoachCard = ({
  coach,
}) => {

  return (

    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-3xl
      p-6
      shadow-sm
      "
    >

      <div className="flex items-center gap-3 mb-6">

        <div
          className="
          h-12
          w-12
          rounded-xl
          bg-purple-50
          flex
          items-center
          justify-center
          "
        >

          <Brain
            size={22}
            className="text-purple-600"
          />

        </div>

        <div>

          <h2 className="text-xl font-bold">

            AI Activity Coach

          </h2>

          <p className="text-sm text-slate-500">

            Personalized productivity guidance

          </p>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-slate-50 rounded-2xl p-4">

          <div className="flex items-center gap-2">

            <Code2
              size={16}
              className="text-green-600"
            />

            <span className="text-sm text-slate-500">

              Coding

            </span>

          </div>

          <p className="text-3xl font-bold mt-2">

            {coach.codingTotal}

          </p>

        </div>

        <div className="bg-slate-50 rounded-2xl p-4">

          <div className="flex items-center gap-2">

            <GitBranch
              size={16}
              className="text-blue-600"
            />

            <span className="text-sm text-slate-500">

              Development

            </span>

          </div>

          <p className="text-3xl font-bold mt-2">

            {coach.githubTotal}

          </p>

        </div>

      </div>

      <div
        className="
        mt-6
        p-4
        bg-blue-50
        rounded-2xl
        "
      >

        <p className="text-sm text-slate-500 mb-1">

          Current Trend

        </p>

        <p className="font-semibold text-blue-700">

          {coach.trend}

        </p>

      </div>

      <div
        className="
        mt-4
        p-4
        bg-green-50
        rounded-2xl
        "
      >

        <p className="font-medium">

          💡 Recommendation

        </p>

        <p className="mt-2 text-slate-700 leading-relaxed">

          {coach.recommendation}

        </p>

      </div>

    </div>

  );
};

export default ActivityCoachCard;