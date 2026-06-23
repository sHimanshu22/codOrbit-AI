import { useState } from "react";

import { ChevronDown, ChevronRight } from "lucide-react";

import SectionAccordion from "./SectionAccordion";

const ModuleAccordion = ({
  moduleName,
  sections,
  onToggle,
  onBookmark,
  onNotes,
  onOpenVideo,
}) => {
  const [open, setOpen] = useState(false);

  const allQuestions = Object.values(sections).flat();

  const total = allQuestions.length;

  const solved = allQuestions.filter((q) => q.solved).length;

  const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;

  return (
    <div
      className="
      bg-white
      dark:bg-slate-900

      border
      border-slate-200
      dark:border-slate-800

      rounded-2xl

      overflow-hidden
      "
    >
      <button
        onClick={() => setOpen(!open)}
        className="
        w-full

        px-5
        py-4

        flex
        items-center
        justify-between
        "
      >
        {/* Left */}
        <div className="flex items-center gap-3">
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

          <h3
            className="
  text-lg
  md:text-xl

  font-bold

  tracking-normal

  text-slate-900
  dark:text-white

  text-left
  "
          >
            {moduleName}
          </h3>
        </div>

        {/* Right */}
        <div
          className="
          flex
          items-center
          gap-4
          "
        >
          <span
            className="
            text-sm
            font-medium

            text-slate-500
            dark:text-slate-400
            "
          >
            {solved}/{total}
          </span>

          <span
            className="
            text-sm
            font-semibold

            px-3
            py-1

            rounded-full

            bg-green-100
            text-green-700

            dark:bg-green-900/20
            dark:text-green-400
            "
          >
            {percentage}%
          </span>
        </div>
      </button>

      {/* Progress Bar */}
      <div className="px-5 pb-4">
        <div
          className="
          h-2

          rounded-full

          bg-slate-200
          dark:bg-slate-800
          "
        >
          <div
            className="
            h-2

            rounded-full

            bg-green-500

            transition-all
            duration-500
            "
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>

      {open && (
        <div
          className="
          px-4
          pb-4

          space-y-3
          "
        >
          {Object.entries(sections).map(([sectionName, questions]) => (
            <SectionAccordion
              key={sectionName}
              title={sectionName}
              questions={questions}
              onToggle={onToggle}
              onBookmark={onBookmark}
              onNotes={onNotes}
              onOpenVideo={onOpenVideo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ModuleAccordion;
