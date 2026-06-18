const PageLoader = () => {

  return (

    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      min-h-[60vh]
      "
    >

      <div
        className="
        w-12
        h-12
        border-4
        border-slate-200
        border-t-blue-600
        rounded-full
        animate-spin
        "
      />

      <h2 className="mt-6 text-xl font-semibold">

        Loading Dashboard

      </h2>

      <p className="text-slate-500 mt-2">

        Preparing your developer data...

      </p>

    </div>

  );
};

export default PageLoader;