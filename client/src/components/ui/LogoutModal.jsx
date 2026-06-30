import { LogOut } from "lucide-react";

const LogoutModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-[100]

      bg-black/50

      backdrop-blur-sm

      flex
      items-center
      justify-center

      p-4
      "
    >
      <div
        className="
        w-full
        max-w-md

        rounded-3xl

        bg-white
        dark:bg-slate-900

        border
        border-slate-200
        dark:border-slate-800

        shadow-2xl

        p-8
        "
      >
        <div
          className="
          w-16
          h-16

          mx-auto

          rounded-2xl

          bg-red-100
          dark:bg-red-900/20

          flex
          items-center
          justify-center
          "
        >
          <LogOut size={30} className="text-red-500" />
        </div>

        <h2
          className="
          mt-6

          text-2xl
          font-bold

          text-center

          text-slate-900
          dark:text-white
          "
        >
          Logout?
        </h2>

        <p
          className="
          mt-3

          text-center

          leading-7

          text-slate-500
          dark:text-slate-400
          "
        >
          Are you sure you want to logout from CodOrbit?
        </p>

        <div className="mt-8 flex gap-4">
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

            bg-red-500
            hover:bg-red-600

            text-white

            font-medium

            transition-all
            "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
