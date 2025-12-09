import { Button } from "@/components/ui/button";
import { TrendingUp, FileText, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground) / 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in">
          <span className="block text-foreground">Unraveling Africa's</span>
          <span className="block text-gradient mt-2">Sovereign Debt Crisis</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '100ms' }}>
          A comprehensive analytical framework for understanding fiscal sustainability, 
          identifying risk factors, and charting paths toward economic resilience across the continent.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <Link to="/dashboard">
            <Button variant="hero" size="xl">
              <TrendingUp className="h-5 w-5" />
              Explore Dashboard
            </Button>
          </Link>
          <Link to="/methodology">
            <Button variant="glass" size="xl">
              <FileText className="h-5 w-5" />
              View Methodology
            </Button>
          </Link>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '300ms' }}>
          {[
            { value: '15', label: 'Countries Analyzed' },
            { value: '5', label: 'Year Forecast' },
            { value: '6', label: 'Risk Indicators' },
            { value: '5', label: 'Regions Covered' },
          ].map((stat, index) => (
            <div key={index} className="p-4 rounded-xl glass">
              <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <Link 
          to="/dashboard"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
        >
          <span className="text-sm">Explore the data</span>
          <ChevronDown className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};
