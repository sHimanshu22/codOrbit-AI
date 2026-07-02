import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import DashboardShowcase from "../components/landing/DashboardShowcase";
import CTASection from "../components/landing/CTASection";
import LandingFooter from "../components/landing/LandingFooter";
import LoggedInNavbar from "../components/landing/LoggedInNavbar";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LandingPageSkeleton from "../components/skeletons/LandingPageSkeleton";

const Landing = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LandingPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {user ? <LoggedInNavbar /> : <LandingNavbar />}

      <HeroSection />
      <FeaturesSection />
      <DashboardShowcase />
      <CTASection />
      <LandingFooter />
    </div>
  );
};

export default Landing;
