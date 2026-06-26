import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PageLoader from "../components/ui/PageLoader";
import SectionHeader from "../components/ui/SectionHeader";
import SavedQuestions from "../components/SavedQuestions";

import { getBookmarks } from "../services/dsaService";

const SavedQuestionsPage = () => {
  const [loading, setLoading] = useState(true);

  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    try {
      const res = await getBookmarks();

      setBookmarks(res.questions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <PageLoader />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-10">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Learning Activity
        </p>

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Bookmarked Questions
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Questions you've bookmarked for future revision.
        </p>
      </div>

      <SectionHeader
        title="Your Bookmarks"
        subtitle={`${bookmarks.length} saved question${
          bookmarks.length !== 1 ? "s" : ""
        }`}
      />

      <div className="mt-6">
        {bookmarks.length > 0 ? (
          <SavedQuestions questions={bookmarks} />
        ) : (
          <div
            className="
            bg-white
            dark:bg-slate-900

            border
            border-slate-200
            dark:border-slate-800

            rounded-3xl

            p-12

            text-center
            "
          >
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              No Bookmarked Questions
            </h3>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Bookmark questions while solving DSA sheets to quickly revisit them later.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SavedQuestionsPage;