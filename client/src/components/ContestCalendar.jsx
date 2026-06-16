import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ContestCalendar = ({ contests }) => {
  const contestDates = contests.map((contest) =>
    new Date(contest.startTime).toDateString(),
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Contest Calendar</h2>

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
  );
};

export default ContestCalendar;
