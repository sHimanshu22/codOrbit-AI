import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import { analyzeResume } from "../services/resumeService";
import ResumeScoreCards from "../components/resume/ResumeScoreCards";
import ResumeSummary from "../components/resume/ResumeSummary";
import ResumeBreakdown from "../components/resume/ResumeBreakdown";
import ResumeStrengths from "../components/resume/ResumeStrength";
import ResumeWeaknesses from "../components/resume/ResumeWeaknesses";
import ResumeSuggestions from "../components/resume/ResumeSuggestions";
import ResumeJDMatch from "../components/resume/ResumeJDMatch";
import ResumePlacementReadiness from "../components/resume/ResumePlacementReadiness";
import ResumeUploadSection from "../components/resume/ResumeUploadSection";
import toast from "react-hot-toast";

const ResumeAnalysis = () => {
  const [resumeFile, setResumeFile] = useState(null);

  const [jdFile, setJdFile] = useState(null);

  const [manualJD, setManualJD] = useState("");

  const [loading, setLoading] = useState(false);

  const [analysis, setAnalysis] = useState(null);

  const handleResumeChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleJDChange = (e) => {
    setJdFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!resumeFile) {
      toast.error("Please upload your resume.");
      return;
    }

    const toastId = toast.loading("Analyzing your resume...");

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("resume", resumeFile);

      if (jdFile) {
        formData.append("jobDescription", jdFile);
      }

      if (manualJD.trim()) {
        formData.append("jobDescriptionText", manualJD);
      }

      const data = await analyzeResume(formData);

      setAnalysis(data.analysis);

      toast.success("Resume analyzed successfully!", {
        id: toastId,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Analysis failed.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}

      <div className="mb-10">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
        Career Tools
        </p>

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          AI Resume Analysis
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Upload your resume and get AI-powered feedbackwith Scores.
        </p>
      </div>

      {/* Upload Section */}

      <div className="space-y-6">
        <ResumeUploadSection
          resumeFile={resumeFile}
          jdFile={jdFile}
          manualJD={manualJD}
          handleResumeChange={handleResumeChange}
          handleJDChange={handleJDChange}
          setManualJD={setManualJD}
          handleAnalyze={handleAnalyze}
          loading={loading}
        />

        {analysis && (
          <div
            className="
    mt-12

    border-t
    border-slate-200
    dark:border-slate-800

    pt-10
    "
          >
            <ResumeScoreCards analysis={analysis} />

            <div className="grid lg:grid-cols-2 gap-6 mt-8">
              <ResumeSummary summary={analysis.summary} />

              <ResumeBreakdown breakdown={analysis.breakdown} />
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-8">
              <ResumeStrengths strengths={analysis.strengths} />

              <ResumeWeaknesses weaknesses={analysis.weaknesses} />
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-8">
              <ResumeSuggestions suggestions={analysis.suggestions} />

              <div className="space-y-6">
                <ResumeJDMatch jdMatch={analysis.jdMatch} />

                <ResumePlacementReadiness roles={analysis.placementReadiness} />
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ResumeAnalysis;
