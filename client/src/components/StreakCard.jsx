import {
  Flame,
  Trophy,
} from "lucide-react";

const StreakCard = ({
  title,
  current,
  longest,
}) => {

  const isStrong =
    current >= 7;

  return (

    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      p-6
      shadow-sm
      hover:shadow-md
      transition-all
      duration-200
      "
    >

      <div className="flex justify-between items-start">

        <div>

          <p className="text-sm text-slate-500">

            {title}

          </p>

          <h2
            className="
            text-5xl
            font-bold
            mt-3
            text-slate-900
            "
          >
            {current}
          </h2>

          <p className="text-slate-500 mt-1">

            Day Streak

          </p>

        </div>

        <div
          className="
          h-12
          w-12
          rounded-xl
          bg-orange-50
          flex
          items-center
          justify-center
          "
        >

          <Flame
            size={22}
            className="
            text-orange-500
            "
          />

        </div>

      </div>

      <div
        className="
        mt-6
        pt-4
        border-t
        border-slate-100
        "
      >

        <div className="flex items-center gap-2">

          <Trophy
            size={16}
            className="
            text-yellow-500
            "
          />

          <span className="text-sm text-slate-600">

            Longest Streak

          </span>

        </div>

        <p className="text-xl font-semibold mt-2">

          {longest} Days

        </p>

      </div>

      <p className="text-sm text-slate-400 mt-4">

        {isStrong
          ? "Excellent consistency. Keep it going."
          : "Build momentum with daily practice."}

      </p>

    </div>
  );
};

export default StreakCard;