import { useState } from "react";

import {
  Upload,
  Loader2,
  FileText,
  FileSearch,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const ResumeUploadSection = ({
  resumeFile,
  jdFile,
  manualJD,
  handleResumeChange,
  handleJDChange,
  setManualJD,
  handleAnalyze,
  loading,
}) => {
  const [showJDOptions, setShowJDOptions] = useState(false);

  return (
    <div className="space-y-6">
      {/* Resume Upload Card */}

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
        <div className="flex items-center gap-3 mb-6">
          <FileText size={26} className="text-blue-600" />

          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Resume Upload
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Upload your resume and get AI-powered feedback.
            </p>
          </div>
        </div>

        {/* Upload Area */}

        <label
          className="
          block

          border-2
          border-dashed

          border-slate-300
          dark:border-slate-700

          rounded-2xl

          p-10

          cursor-pointer

          hover:border-blue-500
          dark:hover:border-blue-500

          transition-all
          "
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleResumeChange}
            className="hidden"
          />

          <div className="text-center">
            <Upload
              size={42}
              className="
              mx-auto
              mb-4

              text-blue-600
              "
            />

            <h3 className="font-semibold text-slate-900 dark:text-white">
              Upload Resume PDF
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Click to browse your files
            </p>
          </div>
        </label>

        {/* Uploaded Resume */}

        {resumeFile && (
          <div
            className="
            mt-4

            flex
            items-center
            gap-3

            p-4

            rounded-xl

            bg-green-50
            dark:bg-green-900/20

            border
            border-green-200
            dark:border-green-900
            "
          >
            <FileText size={18} className="text-green-600" />

            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              {resumeFile.name}
            </span>
          </div>
        )}

        {/* Actions */}

        <div className="mt-6 space-y-3">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="
            w-full

            bg-blue-600
            hover:bg-blue-700

            text-white

            py-3

            rounded-xl

            font-semibold

            flex
            items-center
            justify-center
            gap-2

            transition-all

            disabled:opacity-50
            "
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <Upload size={18} />
                Analyze Resume
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowJDOptions(!showJDOptions)}
            className="
            w-full

            flex
            items-center
            justify-center
            gap-2

            text-sm
            font-medium

            text-purple-600
            hover:text-purple-700
            "
          >
            <FileSearch size={16} />

            {showJDOptions
              ? "Hide JD Matching"
              : "( Advance Option )- Match Resume With Job Description"}

            {showJDOptions ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
        </div>
      </div>

      {/* JD Section */}

      {showJDOptions && (
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
          {/* Upload JD */}

          <div>
            <label
              className="
      h-full

      flex
      flex-col
      items-center
      justify-center

      border-2
      border-dashed

      border-slate-300
      dark:border-slate-700

      rounded-2xl

      p-6

      cursor-pointer

      hover:border-purple-500

      transition-all
      "
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleJDChange}
                className="hidden"
              />

              {!jdFile ? (
                <>
                  <Upload size={32} className="mb-3 text-purple-600" />

                  <p className="font-medium">Upload JD PDF</p>

                  <p className="text-xs text-slate-500">
                    Job Description Document
                  </p>
                </>
              ) : (
                <>
                  <FileText size={32} className="mb-3 text-purple-600" />

                  <p className="font-medium text-purple-600">{jdFile.name}</p>

                  <p className="text-xs text-slate-500 mt-1">
                    Click to replace file
                  </p>
                </>
              )}
            </label>
          </div>

          {/* OR Divider */}

          <div
            className="
    flex
    items-center
    justify-center
    "
          >
            <div
              className="
      px-4
      py-2

      rounded-full

      bg-slate-100
      dark:bg-slate-800

      text-xs
      font-semibold

      text-slate-500
      dark:text-slate-400
      "
            >
              OR
            </div>
          </div>

          {/* Manual JD */}

          <div>
            <textarea
              rows={10}
              value={manualJD}
              onChange={(e) => setManualJD(e.target.value)}
              placeholder="Paste Job Description here..."
              className="
      w-full
      h-full

      rounded-2xl

      border
      border-slate-200
      dark:border-slate-700

      bg-white
      dark:bg-slate-950

      text-slate-900
      dark:text-white

      p-4

      resize-none

      focus:outline-none
      focus:ring-2
      focus:ring-purple-500
      "
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUploadSection;
