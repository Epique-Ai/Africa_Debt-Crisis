import { useRef } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { StressTestSection } from "@/components/sections/StressTestSection";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { ReportSection } from "@/components/sections/ReportSection";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const stressTestRef = useRef<HTMLDivElement>(null);
  const methodologyRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      hero: heroRef,
      dashboard: dashboardRef,
      'stress-test': stressTestRef,
      methodology: methodologyRef,
      report: reportRef,
    };

    const targetRef = refs[section];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onNavigate={handleNavigate} />
      
      <main>
        <div ref={heroRef}>
          <HeroSection onNavigate={handleNavigate} />
        </div>
        
        <div ref={dashboardRef}>
          <DashboardSection />
        </div>

        <div ref={stressTestRef}>
          <StressTestSection />
        </div>
        
        <div ref={methodologyRef}>
          <MethodologySection />
        </div>
        
        <div ref={reportRef}>
          <ReportSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
