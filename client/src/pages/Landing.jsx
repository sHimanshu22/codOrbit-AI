import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import DashboardShowcase from "../components/landing/DashboardShowcase";
import CTASection from "../components/landing/CTASection";
import LandingFooter from "../components/landing/LandingFooter";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <LandingNavbar />

      <HeroSection />

      <FeaturesSection />

      <DashboardShowcase />

      <CTASection />

      <LandingFooter />
    </div>
  );
};

export default Landing;