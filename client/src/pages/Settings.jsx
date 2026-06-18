import { useEffect, useState } from "react";

import PageLoader from "../components/ui/PageLoader";

import DashboardLayout from "../layouts/DashboardLayout";

import { getProfile, updateProfile } from "../services/profileService";

import SectionHeader from "../components/ui/SectionHeader";

const inputClass = `
  w-full
  border
  border-slate-200
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
      <div className="max-w-6xl">
        {/* Header */}

        <div className="mb-10">
          <p className="text-slate-500 text-sm">Account Management</p>

          <h1 className="text-4xl font-bold text-slate-900">Settings</h1>

          <p className="text-slate-500 mt-2">
            Manage your profile and coding platforms
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}

          <div
            className="
            bg-white
            border
            border-slate-200
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
              <input
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Name"
                className={inputClass}
              />

              <input
                name="college"
                value={formData.college || ""}
                onChange={handleChange}
                placeholder="College"
                className={inputClass}
              />

              <input
                name="branch"
                value={formData.branch || ""}
                onChange={handleChange}
                placeholder="Branch"
                className={inputClass}
              />

              <input
                name="graduationYear"
                value={formData.graduationYear || ""}
                onChange={handleChange}
                placeholder="Graduation Year"
                className={inputClass}
              />
            </div>
          </div>

          {/* Connected Platforms */}

          <div
            className="
            bg-white
            border
            border-slate-200
            rounded-3xl
            p-8
            shadow-sm
            "
          >
            <SectionHeader
              title="Connected Platforms"
              subtitle="Usernames used for syncing data"
            />

            <div className="grid gap-5 mt-6">
              <input
                name="githubUsername"
                value={formData.githubUsername || ""}
                onChange={handleChange}
                placeholder="GitHub Username"
                className={inputClass}
              />

              <input
                name="leetcodeUsername"
                value={formData.leetcodeUsername || ""}
                onChange={handleChange}
                placeholder="LeetCode Username"
                className={inputClass}
              />

              <input
                name="codeforcesUsername"
                value={formData.codeforcesUsername || ""}
                onChange={handleChange}
                placeholder="Codeforces Username"
                className={inputClass}
              />

              <input
                name="gfgUsername"
                value={formData.gfgUsername || ""}
                onChange={handleChange}
                placeholder="GeeksforGeeks Username"
                className={inputClass}
              />

              <input
                name="hackerrankUsername"
                value={formData.hackerrankUsername || ""}
                onChange={handleChange}
                placeholder="HackerRank Username"
                className={inputClass}
              />
            </div>
          </div>

          {/* Save Button */}

          <div>
            <button
              type="submit"
              className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-8
              py-3
              rounded-xl
              font-medium
              transition-all
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
