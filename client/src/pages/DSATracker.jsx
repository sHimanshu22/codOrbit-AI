import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import ProgressBar from "../components/ProgressBar";

import QuestionCard from "../components/QuestionCard";

import {
  getQuestions,
  getProgress,
  toggleQuestion,
} from "../services/dsaService";

import TopicAnalytics from "../components/TopicAnalytics";

import DifficultyAnalytics from "../components/DifficultyAnalytics";

import DSAStatCard from "../components/DSAStatCard";

import InsightCard from "../components/InsightCard";

import SheetSelector from "../components/SheetSelector";

import { getProfile } from "../services/userService";

const DSATracker = () => {
  const [questions, setQuestions] = useState([]);
  const [activeSheets, setActiveSheets] = useState([]);
  const [progress, setProgress] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedSheet, setSelectedSheet] = useState(
    () => searchParams.get("sheet") || "Striver A2Z",
  );
  const fetchData = async () => {
    try {
      const questionsData = await getQuestions(selectedSheet);

      const progressData = await getProgress(selectedSheet);

      setQuestions(questionsData.questions);

      setProgress(progressData.progress);
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

        difficulty: question.difficulty,

        sheet: selectedSheet,
      });

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

      {activeSheets.length > 0 && (
        <SheetSelector
          selectedSheet={selectedSheet}
          setSelectedSheet={setSelectedSheet}
          sheets={activeSheets}
        />
      )}

      {progress && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <TopicAnalytics topicStats={progress.topicStats} />

            <DifficultyAnalytics difficultyStats={progress.difficultyStats} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <InsightCard
              title="Strongest Topic"
              value={progress.strongestTopic || "N/A"}
            />

            <InsightCard
              title="Weakest Topic"
              value={progress.weakestTopic || "N/A"}
            />

            <InsightCard
              title="Readiness"
              value={progress.readiness || "Beginner"}
            />
          </div>
        </>
      )}

      <div className="mt-6 space-y-4">
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DSATracker;
