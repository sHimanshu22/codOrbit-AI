import { useEffect, useState } from "react";

const NotesModal = ({
  isOpen,
  onClose,
  question,
  onSave,
}) => {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (question) {
      setNotes(question.notes || "");
    }
  }, [question]);

  if (!isOpen || !question) return null;

  const handleSave = () => {
    onSave(question._id, notes);
  };

  return (
    <div
      className="
      fixed
      inset-0
      z-50

      flex
      items-center
      justify-center

      bg-black/50
      backdrop-blur-sm
      "
    >
      <div
        className="
        w-full
        max-w-2xl

        mx-4

        bg-white
        dark:bg-slate-900

        border
        border-slate-200
        dark:border-slate-800

        rounded-2xl

        shadow-xl
        "
      >
        {/* Header */}

        <div
          className="
          px-6
          py-4

          border-b
          border-slate-200
          dark:border-slate-800
          "
        >
          <h2
            className="
            text-xl
            font-bold

            text-slate-900
            dark:text-white
            "
          >
            Notes
          </h2>

          <p
            className="
            mt-1

            text-sm

            text-slate-500
            dark:text-slate-400
            "
          >
            {question.title}
          </p>
        </div>

        {/* Body */}

        <div className="p-6">
          <textarea
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            placeholder="Write your notes, mistakes, tricks, observations..."
            className="
            w-full
            h-64

            p-4

            rounded-xl

            border
            border-slate-300
            dark:border-slate-700

            bg-white
            dark:bg-slate-800

            text-slate-900
            dark:text-white

            resize-none

            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />
        </div>

        {/* Footer */}

        <div
          className="
          flex
          justify-end
          gap-3

          px-6
          py-4

          border-t
          border-slate-200
          dark:border-slate-800
          "
        >
          <button
            onClick={onClose}
            className="
            px-4
            py-2

            rounded-xl

            border
            border-slate-300
            dark:border-slate-700

            text-slate-700
            dark:text-slate-300
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="
            px-4
            py-2

            rounded-xl

            bg-blue-600
            hover:bg-blue-700

            text-white

            transition
            "
          >
            Save Notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesModal;