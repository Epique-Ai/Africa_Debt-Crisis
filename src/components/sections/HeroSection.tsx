import { Button } from "@/components/ui/button";
import { TrendingUp, FileText, ChevronDown, Shield, Zap, LineChart } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
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

        {/* Platform Features */}
        <div className="max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '400ms' }}>
          <h2 className="text-xl md:text-2xl font-semibold mb-8 text-foreground">
            Your Complete Fiscal Intelligence Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl glass text-left">
              <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary mb-4">
                <LineChart className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Real-Time Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Track debt-to-GDP ratios, fiscal deficits, and economic indicators with live data 
                feeds from major financial institutions.
              </p>
            </div>
            <div className="p-6 rounded-xl glass text-left">
              <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Risk Assessment</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered risk classification using K-Means clustering to categorize countries 
                into Low, Medium, High, and Critical risk tiers.
              </p>
            </div>
            <div className="p-6 rounded-xl glass text-left">
              <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Scenario Modeling</h3>
              <p className="text-sm text-muted-foreground">
                Stress-test fiscal scenarios with 5-year projections using ARIMA and Prophet 
                forecasting models for informed policy decisions.
              </p>
            </div>
          </div>
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
