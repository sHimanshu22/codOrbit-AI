import { createPortal } from "react-dom";
import { LogOut } from "lucide-react";

const LogoutModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="
      fixed
      inset-0
      z-[9999]

      bg-black/50
      backdrop-blur-md

      flex
      items-center
      justify-center

      p-4
      "
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={onCancel}
      />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
        relative

        w-full
        max-w-md

        rounded-3xl

        bg-white
        dark:bg-slate-900

        border
        border-slate-200
        dark:border-slate-800

        shadow-2xl

        px-8
        py-7
        "
      >
        {/* Icon */}

        <div
          className="
          w-14
          h-14

          mx-auto

          rounded-2xl

          bg-gradient-to-br
          from-red-100
          to-red-50

          dark:from-red-900/40
          dark:to-red-900/10

          flex
          items-center
          justify-center
          "
        >
          <LogOut
            size={26}
            className="text-red-500"
          />
        </div>

        {/* Title */}

        <h2
          className="
          mt-5

          text-2xl
          font-bold

          text-center

          text-slate-900
          dark:text-white
          "
        >
          Logout?
        </h2>

        {/* Description */}

        <p
          className="
          mt-3

          text-center

          leading-7

          text-slate-500
          dark:text-slate-400
          "
        >
          Are you sure you want to logout from
          CodOrbit?
        </p>

        {/* Buttons */}

        <div className="mt-6 flex gap-4">
          <button
            onClick={onCancel}
            className="
            flex-1

            py-3

            rounded-xl

            border
            border-slate-300
            dark:border-slate-700

            bg-white
            dark:bg-slate-900

            text-slate-700
            dark:text-slate-200

            hover:bg-slate-100
            dark:hover:bg-slate-800

            font-medium

            transition-all
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
            flex-1

            py-3

            rounded-xl

            bg-red-600
            hover:bg-red-700

            text-white

            font-medium

            shadow-lg
            shadow-red-500/20

            transition-all
            "
          >
            Logout
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LogoutModal;