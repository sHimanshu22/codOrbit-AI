import { useEffect, useState } from "react";
import githubLogo from "../assets/platforms/github.svg";
import leetcodeLogo from "../assets/platforms/leetcode.svg";
import codeforcesLogo from "../assets/platforms/codeforces.svg";
import gfgLogo from "../assets/platforms/gfg.svg";
import hackerrankLogo from "../assets/platforms/hackerrank.svg";
import codechefLogo from "../assets/platforms/codechef.svg";
import { Share2, Copy, Check } from "lucide-react";

import { User, GraduationCap, Trophy, BookOpen, AtSign } from "lucide-react";

import PageLoader from "../components/ui/PageLoader";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getProfile,
  updateProfile,
  uploadProfileImage,
} from "../services/profileService";
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

const Profile = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    college: "",
    branch: "",
    graduationYear: "",

    githubUsername: "",
    leetcodeUsername: "",
    codeforcesUsername: "",
    gfgUsername: "",
    hackerrankUsername: "",
    codechefUsername: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] = useState(false);

  const [copied, setCopied] = useState(false);

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
    const { name, value } = e.target;

    if (name === "username") {
      setFormData({
        ...formData,
        username: value
          .toLowerCase()
          .replace(/\s+/g, "")
          .replace(/[^a-z0-9_]/g, ""),
      });

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const res = await uploadProfileImage(file);

      setFormData((prev) => ({
        ...prev,

        profileImage: res.profileImage,
      }));
    } catch (error) {
      console.error(error);

      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(formData);

      alert("Profile Updated Successfully");
    } catch (error) {
      console.error(error);

      alert(error?.response?.data?.message || "Update Failed");
    }
  };

  const handleShareProfile = async () => {
    const profileUrl = `${window.location.origin}/u/${formData.username}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${formData.name}'s CodOrbit Profile`,
          text: "Check out my developer profile",
          url: profileUrl,
        });

        return;
      }

      await navigator.clipboard.writeText(profileUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const PlatformInputCard = ({ logo, title, name, value, placeholder }) => (
    <div
      className="
    flex
    items-center
    gap-4

    p-4

    rounded-2xl

    border
    border-slate-200
    dark:border-slate-800

    bg-slate-50
    dark:bg-slate-950
    "
    >
      <div
        className="
      flex
      items-center
      gap-3

      min-w-[180px]
      "
      >
        <img
          src={logo}
          alt={title}
          className="
        w-8
        h-8
        object-contain
        "
        />

        <span
          className="
        font-semibold

        text-slate-900
        dark:text-white
        "
        >
          {title}
        </span>
      </div>

      <input
        name={name}
        value={value || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className={`
        ${inputClass}
        flex-1
      `}
      />
    </div>
  );

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

        <div
          className="
  mb-10

  flex
  flex-col
  md:flex-row

  md:items-start
  md:justify-between

  gap-4
  "
        >
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Account Management
            </p>

            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Profile
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Manage your profile and coding platforms
            </p>
          </div>

          {formData.username && (
            <button
              type="button"
              onClick={handleShareProfile}
              className={`
    inline-flex
    items-center
    gap-2

    px-5
    py-3

    rounded-xl

    font-medium

    shadow-sm

    transition-all

    ${
      copied
        ? `
        bg-green-600
        hover:bg-green-700
        text-white
        `
        : `
        bg-blue-600
        hover:bg-blue-700
        text-white
        `
    }
  `}
            >
              {copied ? (
                <>
                  <Check size={18} />
                  Copied
                </>
              ) : (
                <>
                  <Share2 size={18} />
                  Share Profile
                </>
              )}
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}

          <div className="grid lg:grid-cols-[320px_1fr] gap-8">
            {/* Left Profile Card */}

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

      h-fit
      "
            >
              <div className="flex flex-col items-center text-center">
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt="Profile"
                    className="
            w-32
            h-32

            rounded-full
            object-cover

            border-4
            border-slate-200
            dark:border-slate-700
            "
                  />
                ) : (
                  <div
                    className="
            w-32
            h-32

            rounded-full

            bg-blue-600

            flex
            items-center
            justify-center

            text-white

            text-5xl
            font-bold
            "
                  >
                    {formData.name?.charAt(0)?.toUpperCase() || "D"}
                  </div>
                )}

                <label
                  className="
          mt-5

          cursor-pointer

          px-4
          py-2

          rounded-xl

          bg-slate-100
          dark:bg-slate-800

          text-slate-700
          dark:text-slate-200

          text-sm
          font-medium

          hover:bg-slate-200
          dark:hover:bg-slate-700

          transition
          "
                >
                  {uploading ? "Uploading..." : "Change Photo"}

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>

                <h3
                  className="
          mt-6

          text-xl
          font-semibold

          text-slate-900
          dark:text-white
          "
                >
                  {formData.name || "Developer"}
                </h3>

                {formData.username && (
                  <div className="mt-2">
                    <p
                      className="
      text-slate-500
      dark:text-slate-400
      "
                    >
                      @{formData.username}
                    </p>

                    <p
                      className="
      text-xs
      text-slate-400
      mt-1
      "
                    >
                      codorbit.ai/u/{formData.username}
                    </p>
                  </div>
                )}
              </div>
            </div>

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
                <div className="relative md:col-span-2">
                  <AtSign
                    size={18}
                    className="
    absolute
    left-4
    top-[18px]

    text-blue-600
    dark:text-blue-400
    "
                  />

                  <input
                    name="username"
                    value={formData.username || ""}
                    onChange={handleChange}
                    placeholder="Choose a unique username"
                    className={`${inputClass} pl-11`}
                  />

                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className="
      text-xs
      font-medium

      text-slate-500
      dark:text-slate-400
      "
                    >
                      Public URL:
                    </span>

                    <span
                      className="
      text-xs

      text-blue-600
      dark:text-blue-400

      font-medium
      "
                    >
                      /u/{formData.username || "username"}
                    </span>
                  </div>
                </div>
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

            <div className="space-y-4 mt-6">
              <PlatformInputCard
                logo={githubLogo}
                title="GitHub"
                name="githubUsername"
                value={formData.githubUsername}
                placeholder="GitHub Username"
              />

              <PlatformInputCard
                logo={leetcodeLogo}
                title="LeetCode"
                name="leetcodeUsername"
                value={formData.leetcodeUsername}
                placeholder="LeetCode Username"
              />

              <PlatformInputCard
                logo={codeforcesLogo}
                title="Codeforces"
                name="codeforcesUsername"
                value={formData.codeforcesUsername}
                placeholder="Codeforces Username"
              />

              <PlatformInputCard
                logo={gfgLogo}
                title="GeeksforGeeks"
                name="gfgUsername"
                value={formData.gfgUsername}
                placeholder="GeeksforGeeks Username"
              />

              <PlatformInputCard
                logo={hackerrankLogo}
                title="HackerRank"
                name="hackerrankUsername"
                value={formData.hackerrankUsername}
                placeholder="HackerRank Username"
              />

              <PlatformInputCard
                logo={codechefLogo}
                title="CodeChef"
                name="codechefUsername"
                value={formData.codechefUsername}
                placeholder="CodeChef Username"
              />
            </div>
          </div>

          {/* Save Button */}

          <div
            className="
  mt-10

  flex
  flex-wrap
  gap-4
  "
          >
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

export default Profile;
