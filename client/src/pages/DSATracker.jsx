import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import PageLoader from "../components/ui/PageLoader";

import DashboardLayout from "../layouts/DashboardLayout";

import ProgressBar from "../components/ProgressBar";

import ModuleAccordion from "../components/dsa/ModuleAccordion";

import {
  getQuestions,
  getProgress,
  toggleQuestion,
  getAICoach,
  getSkillAnalysis,
  toggleBookmark,
} from "../services/dsaService";

import TopicAnalytics from "../components/TopicAnalytics";

import DifficultyAnalytics from "../components/DifficultyAnalytics";

import DSAStatCard from "../components/DSAStatCard";

import InsightCard from "../components/InsightCard";

import SheetSelector from "../components/SheetSelector";

import { getProfile } from "../services/userService";

import AICoachCard from "../components/AICoachCard";

import SkillAnalysisCard from "../components/SkillAnalysisCard";

import SavedQuestions from "../components/SavedQuestions";

import { getBookmarks } from "../services/dsaService";
import SectionHeader from "../components/ui/SectionHeader";

const DSATracker = () => {
  const [loading, setLoading] = useState(true);

  const [questions, setQuestions] = useState([]);
  const [activeSheets, setActiveSheets] = useState([]);
  const [progress, setProgress] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedSheet, setSelectedSheet] = useState(
    () => searchParams.get("sheet") || "Striver A2Z",
  );

  const [coach, setCoach] = useState(null);

  const [skillAnalysis, setSkillAnalysis] = useState(null);

  const [bookmarks, setBookmarks] = useState([]);

  const fetchData = async () => {
    try {
      const questionsData = await getQuestions(selectedSheet);

      setQuestions(questionsData.questions);

      const progressData = await getProgress(selectedSheet);

      console.log("PROGRESS API RESPONSE:", progressData);

      setProgress(progressData);

      const coachData = await getAICoach(selectedSheet);

      setCoach(coachData.coach);

      const skillAnalysisData = await getSkillAnalysis(selectedSheet);

      setSkillAnalysis(skillAnalysisData.analysis);

      const bookmarksData = await getBookmarks();

      setBookmarks(bookmarksData.questions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
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
        const data = await getProfile();

        const sheets = data.user.activeSheets || [];

        setActiveSheets(sheets);

        if (sheets.length > 0 && !sheets.includes(selectedSheet)) {
          setSelectedSheet(sheets[0]);
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

  if (loading) {
    return (
      <DashboardLayout>
        <PageLoader />
      </DashboardLayout>
    );
  }

  const MODULE_ORDER = [
    "Learn the Basics",

    "Learn Important Sorting Techniques",

    "Arrays",

    "Binary Search",

    "Strings",

    "Linked List",

    "Recursion & Backtracking",

    "Bit Manipulation",

    "Stack & Queue",

    "Sliding Window & Two Pointers",

    "Heaps",

    "Greedy Algorithms",

    "Binary Trees",

    "Binary Search Trees",

    "Graphs",

    "Dynamic Programming",

    "Tries",

    "Strings [Hard]",
  ];

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

  return (
    <DashboardLayout>
      <div className="mb-10">
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

      {progress && (
        <div className="mt-12">
          <SectionHeader
            title="Progress"
            subtitle="Track completion of the current sheet"
          />

          <div className="mt-6">
            <ProgressBar percentage={progress?.completionPercentage || 0} />
          </div>
        </div>
      )}

      <div className="mt-12">
        <SectionHeader
          title="Active Sheet"
          subtitle="Switch between your learning tracks"
        />

        <div className="mt-6">
          <SheetSelector
            sheets={activeSheets}
            selectedSheet={selectedSheet}
            setSelectedSheet={setSelectedSheet}
          />
        </div>
      </div>

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
      {/* Topic Analysis
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
      {/* <div className="mt-12">
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
      </div> */}

      <div className="mt-12">
        <SectionHeader
          title="Saved Questions"
          subtitle="Questions marked for revision"
        />

        {bookmarks.length > 0 && (
          <div className="mt-6">
            <SavedQuestions questions={bookmarks} />
          </div>
        )}
      </div>

      <div className="mt-12">
        <SectionHeader
          title="DSA Roadmap"
          subtitle={`${questions.length} questions available`}
        />

        <div className="mt-6 space-y-5">
          {MODULE_ORDER.filter(
            (moduleName) => groupedQuestions[moduleName],
          ).map((moduleName,index) => (
            <ModuleAccordion
              key={moduleName}
              moduleName={`${index + 1}. ${moduleName}`}
              sections={groupedQuestions[moduleName]}
              onToggle={handleToggle}
              onBookmark={handleBookmark}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DSATracker;
