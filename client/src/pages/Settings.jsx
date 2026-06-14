import {
  useEffect,
  useState,
} from "react";

import DashboardLayout
from "../layouts/DashboardLayout";

import {
  getProfile,
  updateProfile,
} from "../services/profileService";

const Settings = () => {

  const [formData,
    setFormData] =
    useState({
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

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile =
    async () => {

      try {

        const res =
          await getProfile();

        setFormData(
          res.user
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  const handleChange =
    (e) => {

      setFormData({
        ...formData,

        [e.target.name]:
          e.target.value,
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await updateProfile(
          formData
        );

        alert(
          "Profile Updated Successfully"
        );

      } catch (error) {

        alert(
          "Update Failed"
        );

      }
    };

  if (loading) {
    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="max-w-4xl bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">

          Profile Settings

        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >

          <input
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Name"
            className="border p-3 rounded"
          />

          <input
            name="college"
            value={formData.college || ""}
            onChange={handleChange}
            placeholder="College"
            className="border p-3 rounded"
          />

          <input
            name="branch"
            value={formData.branch || ""}
            onChange={handleChange}
            placeholder="Branch"
            className="border p-3 rounded"
          />

          <input
            name="graduationYear"
            value={
              formData.graduationYear || ""
            }
            onChange={handleChange}
            placeholder="Graduation Year"
            className="border p-3 rounded"
          />

          <input
            name="githubUsername"
            value={
              formData.githubUsername || ""
            }
            onChange={handleChange}
            placeholder="GitHub Username"
            className="border p-3 rounded"
          />

          <input
            name="leetcodeUsername"
            value={
              formData.leetcodeUsername || ""
            }
            onChange={handleChange}
            placeholder="LeetCode Username"
            className="border p-3 rounded"
          />

          <input
            name="codeforcesUsername"
            value={
              formData.codeforcesUsername || ""
            }
            onChange={handleChange}
            placeholder="Codeforces Username"
            className="border p-3 rounded"
          />

          <input
            name="gfgUsername"
            value={
              formData.gfgUsername || ""
            }
            onChange={handleChange}
            placeholder="GFG Username"
            className="border p-3 rounded"
          />

          <input
            name="hackerrankUsername"
            value={
              formData.hackerrankUsername || ""
            }
            onChange={handleChange}
            placeholder="HackerRank Username"
            className="border p-3 rounded"
          />

          <button
            className="bg-blue-600 text-white py-3 rounded md:col-span-2"
          >
            Save Profile
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
};

export default Settings;