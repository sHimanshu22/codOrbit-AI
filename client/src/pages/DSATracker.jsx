import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import ProgressBar from "../components/ProgressBar";

import QuestionCard from "../components/QuestionCard";

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

const DSATracker = () => {
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

      const progressData = await getProgress(selectedSheet);

      setQuestions(questionsData.questions);

      setProgress(progressData.progress);

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
      }
    };

    loadProfile();
  }, []);

  const handleToggle = async (question) => {
    try {
      await toggleQuestion({
        questionId: question.id,

        title: question.title,

        topic: question.topic,

        pattern: question.pattern,

        difficulty: question.difficulty,

        sheet: selectedSheet,
      });

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookmark = async (question) => {
    try {
      await toggleBookmark(question.id);
      console.log(question);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">{selectedSheet} Tracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DSAStatCard
          title="Total Questions"
          value={progress?.totalQuestions || 0}
        />

        <DSAStatCard title="Solved" value={progress?.solvedCount || 0} />

        <DSAStatCard title="Pending" value={progress?.pendingQuestions || 0} />

        <DSAStatCard
          title="Completion"
          value={`${progress?.percentage || 0}%`}
        />
      </div>

      {progress && <ProgressBar percentage={progress.percentage} />}

      <SheetSelector
        sheets={activeSheets}
        selectedSheet={selectedSheet}
        setSelectedSheet={setSelectedSheet}
      />

      {/* AI Coach */}

      {coach && (
        <div className="mt-6">
          <AICoachCard coach={coach} />
        </div>
      )}

      {/* Skill Analysis */}

      {skillAnalysis && (
        <div className="mt-6">
          <SkillAnalysisCard analysis={skillAnalysis} />
        </div>
      )}

      {/* Analytics */}

      {progress && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <TopicAnalytics topicStats={progress.topicStats} />

          <DifficultyAnalytics difficultyStats={progress.difficultyStats} />
        </div>
      )}

      {/* Insight Cards */}

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

      {bookmarks.length > 0 && (
        <div className="mt-6">
          <SavedQuestions questions={bookmarks} />
        </div>
      )}
      
      <div className="mt-6 space-y-4">
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            onToggle={handleToggle}
            onBookmark={handleBookmark}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DSATracker;
