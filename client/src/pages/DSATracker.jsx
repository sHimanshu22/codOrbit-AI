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

import DifficultyAnalytics from "../components/DifficultyAnalytics";

import DSAStatCard from "../components/DSAStatCard";

import InsightCard from "../components/InsightCard";

import SheetSelector from "../components/SheetSelector";

import { getProfile } from "../services/userService";

import AICoachCard from "../components/AICoachCard";

import SkillAnalysisCard from "../components/SkillAnalysisCard";

import SectionHeader from "../components/ui/SectionHeader";
import { BookOpen } from "lucide-react";

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

  const [availableSheets, setAvailableSheets] = useState([]);

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

        setAvailableSheets(sheetsRes.sheets);

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

  const getYoutubeEmbedUrl = (url) => {
    try {
      const parsed = new URL(url);

      // Already an embed URL
      if (parsed.pathname.startsWith("/embed/")) {
        return url;
      }

      // youtube.com/watch?v=
      if (
        parsed.hostname.includes("youtube.com") ||
        parsed.hostname.includes("www.youtube.com")
      ) {
        const id = parsed.searchParams.get("v");

        if (id) {
          return `https://www.youtube.com/embed/${id}`;
        }
      }

      // youtu.be/
      if (parsed.hostname.includes("youtu.be")) {
        const id = parsed.pathname.substring(1);

        return `https://www.youtube.com/embed/${id}`;
      }

      return url;
    } catch {
      return "";
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

  const currentSheet = availableSheets.find(
    (sheet) => sheet.name === selectedSheet,
  );
  console.log("Selected Sheet:", selectedSheet);

  console.log("Current Sheet:", currentSheet);

  console.log("Roadmap:", currentSheet?.roadmap);

  console.log("Grouped Modules:", Object.keys(groupedQuestions));
  const currentOrder = currentSheet?.roadmap || Object.keys(groupedQuestions);

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

            <div
              className="
  mt-5

  flex
  items-start
  gap-3

  max-w-3xl
  "
            >
              <BookOpen
                size={20}
                className="
    mt-0.5

    shrink-0

    text-blue-600
    dark:text-blue-400
    "
              />

              <p
                className="
    leading-7

    text-slate-600
    dark:text-slate-400
    "
              >
                {currentSheet?.description}
              </p>
            </div>
          </div>

          <div className="lg:ml-auto">
            <div className="mb-3">
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
                moduleName={`${index + 1}.${" "}${moduleName}`}
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
              src={getYoutubeEmbedUrl(videoUrl)}
              title="Solution Video"
              className="w-full aspect-video rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 items-stretch">
            {/* Difficulty */}

            <DifficultyAnalytics difficultyStats={progress.difficultyStats} />

            {/* Performance */}

            <div
              className="
  bg-white
  dark:bg-slate-900
  border
  border-slate-200
  dark:border-slate-800
  rounded-3xl
  p-8
  shadow-sm
  h-full
  flex
  flex-col
  "
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Performance Insights
              </h3>

              <p className="text-slate-500 dark:text-slate-400 mt-2">
                Key takeaways from your preparation
              </p>

              <div className="flex-1 flex flex-col justify-between mt-8 gap-5">
                <InsightCard
                  title="Strongest Topic"
                  value={progress.strongestTopic || "-"}
                />

                <InsightCard
                  title="Weakest Topic"
                  value={progress.weakestTopic || "-"}
                />

                <InsightCard
                  title="Readiness"
                  value={progress.readiness || "-"}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DSATracker;
