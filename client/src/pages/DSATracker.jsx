import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import PageLoader from "../components/ui/PageLoader";

import DashboardLayout from "../layouts/DashboardLayout";

import ModuleAccordion from "../components/dsa/ModuleAccordion";

import NotesModal from "../components/NotesModal";

import {
  getQuestions,
  getProgress,
  toggleQuestion,
  getAICoach,
  getSkillAnalysis,
  toggleBookmark,
  updateNotes,
  getSheets,
} from "../services/dsaService";

import TopicAnalytics from "../components/TopicAnalytics";

import DifficultyAnalytics from "../components/DifficultyAnalytics";

import DSAStatCard from "../components/DSAStatCard";

import InsightCard from "../components/InsightCard";

import SheetSelector from "../components/SheetSelector";

import { getProfile } from "../services/userService";

import AICoachCard from "../components/AICoachCard";

import SkillAnalysisCard from "../components/SkillAnalysisCard";

import SectionHeader from "../components/ui/SectionHeader";
import { MODULE_ORDERS } from "../constants/moduleOrders";

const DSATracker = () => {
  const [loading, setLoading] = useState(true);

  const [questions, setQuestions] = useState([]);
  const [activeSheets, setActiveSheets] = useState([]);
  const [progress, setProgress] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedSheet, setSelectedSheet] = useState(
    searchParams.get("sheet") || "",
  );

  const [coach, setCoach] = useState(null);

  const [skillAnalysis, setSkillAnalysis] = useState(null);

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showNotesModal, setShowNotesModal] = useState(false);

  const [videoUrl, setVideoUrl] = useState(null);

  const fetchData = async () => {
    try {
      const questionsData = await getQuestions(selectedSheet);

      setQuestions(questionsData.questions);

      const progressData = await getProgress(selectedSheet);

      setProgress(progressData);

      const coachData = await getAICoach(selectedSheet);

      setCoach(coachData.coach);

      const skillAnalysisData = await getSkillAnalysis(selectedSheet);

      setSkillAnalysis(skillAnalysisData.analysis);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!selectedSheet) return;

    fetchData();
  }, [selectedSheet]);

  useEffect(() => {
    setSearchParams({
      sheet: selectedSheet,
    });
  }, [selectedSheet]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const [profileRes, sheetsRes] = await Promise.all([
          getProfile(),
          getSheets(),
        ]);

        const activeSheets = profileRes.user.activeSheets || [];

        const availableSheetNames = sheetsRes.sheets.map((sheet) => sheet.name);

        const validActiveSheets = activeSheets.filter((sheet) =>
          availableSheetNames.includes(sheet),
        );

        setActiveSheets(validActiveSheets);

        if (validActiveSheets.length > 0) {
          const urlSheet = searchParams.get("sheet");

          if (urlSheet && validActiveSheets.includes(urlSheet)) {
            setSelectedSheet(urlSheet);
          } else {
            setSelectedSheet(validActiveSheets[0]);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleToggle = async (question) => {
    try {
      await toggleQuestion({
        questionId: question._id,
        title: question.title,
        module: question.module,
        section: question.section,
        difficulty: question.difficulty,
        sheetName: question.sheetName,
        isConcept: question.isConcept,
      });

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookmark = async (question) => {
    try {
      await toggleBookmark(question._id);

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleNotes = (question) => {
    setSelectedQuestion(question);
    setShowNotesModal(true);
  };

  const handleSaveNotes = async (questionId, notes) => {
    try {
      await updateNotes(questionId, notes);

      setShowNotesModal(false);

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <PageLoader />
      </DashboardLayout>
    );
  }

  if (activeSheets.length === 0) {
    return (
      <DashboardLayout>
        <div
          className="
        flex
        flex-col
        items-center
        justify-center

        min-h-[70vh]

        text-center
        "
        >
          <h1
            className="
          text-4xl
          font-bold

          text-slate-900
          dark:text-white
          "
          >
            No Active Sheets
          </h1>

          <p
            className="
          mt-3

          text-slate-500
          dark:text-slate-400
          "
          >
            Activate a DSA sheet from Sheet Management to start tracking
            progress.
          </p>

          <a
            href="/sheet-management"
            className="
          mt-6

          px-6
          py-3

          rounded-xl

          bg-blue-600
          hover:bg-blue-700

          text-white
          font-medium

          transition-all
          "
          >
            Manage Sheets
          </a>
        </div>
      </DashboardLayout>
    );
  }

  const groupedQuestions = questions.reduce((acc, question) => {
    if (!acc[question.module]) {
      acc[question.module] = {};
    }

    if (!acc[question.module][question.section]) {
      acc[question.module][question.section] = [];
    }

    acc[question.module][question.section].push(question);

    return acc;
  }, {});

  const currentOrder =
    MODULE_ORDERS[selectedSheet] || Object.keys(groupedQuestions);

  return (
    <DashboardLayout>
      <div className="mb-10">
        <div className="flex flex-col lg:flex-row gap-6">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              DSA Preparation
            </p>

            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              {selectedSheet}
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Track your progress and prepare for placements
            </p>
          </div>

          <div className="lg:ml-auto">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Active Sheet
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Switch between your learning tracks
              </p>
            </div>

            <SheetSelector
              sheets={activeSheets}
              selectedSheet={selectedSheet}
              setSelectedSheet={setSelectedSheet}
            />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <SectionHeader
          title="Performance Overview"
          subtitle="Your progress across this sheet"
        />
        <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <DSAStatCard
            title="Total Questions"
            value={progress?.totalQuestions || 0}
          />

          <DSAStatCard title="Solved" value={progress?.solvedQuestions || 0} />

          <DSAStatCard
            title="Pending"
            value={
              (progress?.totalQuestions || 0) - (progress?.solvedQuestions || 0)
            }
          />

          <DSAStatCard
            title="Completion"
            value={`${progress?.completionPercentage || 0}%`}
          />
        </div>
      </div>


      <div className="mt-12">
        <SectionHeader
          title="DSA Roadmap"
          subtitle={`${questions.length} questions available`}
        />

        <div className="mt-6 space-y-5">
          {currentOrder
            .filter((moduleName) => groupedQuestions[moduleName])
            .map((moduleName, index) => (
              <ModuleAccordion
                key={moduleName}
                moduleName={`${index + 1}.${moduleName}`}
                sections={groupedQuestions[moduleName]}
                onToggle={handleToggle}
                onBookmark={handleBookmark}
                onNotes={handleNotes}
                onOpenVideo={setVideoUrl}
              />
            ))}
        </div>
      </div>

      {videoUrl && (
        <div
          className="
    fixed
    inset-0
    z-[100]

    bg-black/80

    flex
    items-center
    justify-center

    p-4
    "
          onClick={() => setVideoUrl(null)}
        >
          <div
            className="
      w-full
      max-w-5xl

      bg-white
      dark:bg-slate-900

      rounded-2xl

      p-4
      "
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={videoUrl.replace("watch?v=", "embed/").split("&")[0]}
              title="Solution Video"
              className="
        w-full
        aspect-video

        rounded-xl
        "
              allowFullScreen
            />

            <button
              onClick={() => setVideoUrl(null)}
              className="
        mt-4

        px-4
        py-2

        bg-red-500
        hover:bg-red-600

        text-white

        rounded-xl
        "
            >
              Close
            </button>
          </div>
        </div>
      )}

      <NotesModal
        isOpen={showNotesModal}
        question={selectedQuestion}
        onClose={() => {
          setShowNotesModal(false);
          setSelectedQuestion(null);
        }}
        onSave={handleSaveNotes}
      />

      {/* AI Coach */}
      <div className="mt-12">
        <SectionHeader
          title="AI Learning Center"
          subtitle="Personalized guidance for improvement"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {coach && <AICoachCard coach={coach} />}

          {skillAnalysis && <SkillAnalysisCard analysis={skillAnalysis} />}
        </div>
      </div>

      {/* Topic Analysis */}
      <div className="mt-12">
        <SectionHeader
          title="Analytics"
          subtitle="Understand your strengths and weaknesses"
        />
        {progress && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <TopicAnalytics topicStats={progress.topicStats} />

            <DifficultyAnalytics difficultyStats={progress.difficultyStats} />
          </div>
        )}
      </div>

      {/* Insight Cards */}
      <div className="mt-12">
        <SectionHeader
          title="Performance Insights"
          subtitle="Key takeaways from your preparation"
        />
        {progress && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <InsightCard
              title="Strongest Topic"
              value={progress.strongestTopic}
            />

            <InsightCard title="Weakest Topic" value={progress.weakestTopic} />

            <InsightCard title="Readiness" value={progress.readiness} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DSATracker;
