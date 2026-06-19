import { useEffect, useState } from "react";

import {
  User,
  GraduationCap,
  GitBranch,
  Code2,
  Trophy,
  BookOpen,
  Terminal,
} from "lucide-react";

import PageLoader from "../components/ui/PageLoader";
import DashboardLayout from "../layouts/DashboardLayout";
import { getProfile, updateProfile } from "../services/profileService";
import SectionHeader from "../components/ui/SectionHeader";

const inputClass = `
w-full
border
border-slate-200
dark:border-slate-700
bg-white
dark:bg-slate-950
text-slate-900
dark:text-white
rounded-xl
px-4
py-3
focus:outline-none
focus:ring-2
focus:ring-blue-500
`;

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    branch: "",
    graduationYear: "",

    githubUsername: "",
    leetcodeUsername: "",
    codeforcesUsername: "",
    gfgUsername: "",
    hackerrankUsername: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();

      setFormData(res.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(formData);

      alert("Profile Updated Successfully");
    } catch (error) {
      console.error(error);

      alert("Update Failed");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <PageLoader />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl">
        {/* Header */}

        <div className="mb-10">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Account Management
          </p>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Settings
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Manage your profile and coding platforms
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}

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
            "
          >
            <SectionHeader
              title="Personal Information"
              subtitle="Basic profile details"
            />

            <div className="grid md:grid-cols-2 gap-5 mt-6">
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={`${inputClass} pl-11`}
                />
              </div>

              <div className="relative">
                <GraduationCap
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="college"
                  value={formData.college || ""}
                  onChange={handleChange}
                  placeholder="College"
                  className={`${inputClass} pl-11`}
                />
              </div>

              <div className="relative">
                <BookOpen
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="branch"
                  value={formData.branch || ""}
                  onChange={handleChange}
                  placeholder="Branch"
                  className={`${inputClass} pl-11`}
                />
              </div>

              <div className="relative">
                <Trophy
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="graduationYear"
                  value={formData.graduationYear || ""}
                  onChange={handleChange}
                  placeholder="Graduation Year"
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>
          </div>

          {/* Connected Platforms */}

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
            "
          >
            <SectionHeader
              title="Connected Platforms"
              subtitle="Usernames used for syncing data"
            />

            <div className="grid md:grid-cols-2 gap-5 mt-6">
              <div className="relative">
                <GitBranch
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="githubUsername"
                  value={formData.githubUsername || ""}
                  onChange={handleChange}
                  placeholder="GitHub Username"
                  className={`${inputClass} pl-11`}
                />
              </div>

              <div className="relative">
                <Code2
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="leetcodeUsername"
                  value={formData.leetcodeUsername || ""}
                  onChange={handleChange}
                  placeholder="LeetCode Username"
                  className={`${inputClass} pl-11`}
                />
              </div>

              <div className="relative">
                <Trophy
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="codeforcesUsername"
                  value={formData.codeforcesUsername || ""}
                  onChange={handleChange}
                  placeholder="Codeforces Username"
                  className={`${inputClass} pl-11`}
                />
              </div>

              <div className="relative">
                <BookOpen
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="gfgUsername"
                  value={formData.gfgUsername || ""}
                  onChange={handleChange}
                  placeholder="GeeksforGeeks Username"
                  className={`${inputClass} pl-11`}
                />
              </div>

              <div className="relative md:col-span-2">
                <Terminal
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="hackerrankUsername"
                  value={formData.hackerrankUsername || ""}
                  onChange={handleChange}
                  placeholder="HackerRank Username"
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}

          <div className="mt-10">
            <button
              type="submit"
              className="
              inline-flex
              items-center
              gap-2
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-8
              py-3
              rounded-xl
              font-medium
              transition-all
              shadow-sm
              "
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
