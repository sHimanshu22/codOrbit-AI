import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ContestCalendar = ({ contests }) => {
  const contestDates = contests.map((contest) =>
    new Date(contest.startTime).toDateString(),
  );

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
      <h2 className="text-xl font-bold mb-6">Contest Calendar</h2>

      <div className="overflow-x-auto">
        <Calendar
          tileClassName={({ date }) => {
            const hasContest = contestDates.includes(date.toDateString());

            return hasContest ? "contest-day" : "";
          }}
          tileContent={({ date }) => {
            const hasContest = contestDates.includes(date.toDateString());

            return hasContest ? (
              <div className="flex justify-center">
                <span className="text-xs">🏆</span>
              </div>
            ) : null;
          }}
        />
      </div>
    </div>
  );
};

export default ContestCalendar;
