import { useState } from "react";

import { ChevronDown, ChevronRight } from "lucide-react";

import QuestionRow from "./QuestionRow";

const SectionAccordion = ({
  title,
  questions,
  onToggle,
  onBookmark,
  onNotes,
}) => {
  const [open, setOpen] = useState(true);

  const solved = questions.filter((q) => q.solved).length;

  return (
    <div
      className="
      border
      border-slate-200
      dark:border-slate-800

      rounded-xl
      overflow-hidden
      "
    >
      <button
        onClick={() => setOpen(!open)}
        className="
        w-full

        flex
        items-center
        justify-between

        px-4
        py-3

        bg-slate-50
        dark:bg-slate-800/50
        "
      >
        <div className="flex items-center gap-2">
          {open ? (
            <ChevronDown
              size={20}
              className="
              text-slate-500
              dark:text-slate-400
              "
            />
          ) : (
            <ChevronRight
              size={20}
              className="
              text-slate-500
              dark:text-slate-400
              "
            />
          )}

          <span className="font-medium text-slate-900 dark:text-white">
            {title}
          </span>
        </div>

        <span
          className="
          text-sm
          text-slate-500
          "
        >
          {solved}/{questions.length}
        </span>
      </button>

      {open && (
        <div>
          {questions.map((question) => (
            <QuestionRow
              key={question._id}
              question={question}
              onToggle={onToggle}
              onBookmark={onBookmark}
              onNotes={onNotes}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionAccordion;
