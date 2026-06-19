import Calendar from "react-calendar";
import { CalendarDays } from "lucide-react";

import "react-calendar/dist/Calendar.css";

const ContestCalendar = ({
  contests,
}) => {
  const contestDates =
    contests.map((contest) =>
      new Date(
        contest.startTime,
      ).toDateString(),
    );

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
      shadow-sm
      "
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Contest Calendar
        </h2>

        <p className="text-slate-500 dark:text-slate-400">
          Upcoming contests at a glance
        </p>
      </div>

      <div className="overflow-x-auto">
        <Calendar
          tileClassName={({ date }) => {
            const hasContest =
              contestDates.includes(
                date.toDateString(),
              );

            return hasContest
              ? "contest-day"
              : "";
          }}
          tileContent={({ date }) => {
            const hasContest =
              contestDates.includes(
                date.toDateString(),
              );

            return hasContest ? (
              <div className="flex justify-center">
                <CalendarDays
                  size={12}
                  className="
                  text-white
                  dark:text-white
                  "
                />
              </div>
            ) : null;
          }}
        />
      </div>
    </div>
  );
};

export default ContestCalendar;