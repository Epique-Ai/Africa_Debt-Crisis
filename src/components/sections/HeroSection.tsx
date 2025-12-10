import { Button } from "@/components/ui/button";
import { TrendingUp, FileText, ChevronDown, Shield, Zap, LineChart, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const featuredArticles = [
  {
    id: 1,
    title: "Kenya Secures $1.5B IMF Extended Credit Facility",
    excerpt: "The International Monetary Fund has approved a significant credit facility aimed at supporting Kenya's economic recovery and debt restructuring efforts.",
    category: "Policy Update",
    date: "Dec 10, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=800&h=600&fit=crop",
    link: "/live-feed"
  },
  {
    id: 2,
    title: "Nigeria's Debt-to-GDP Ratio Reaches Critical Threshold",
    excerpt: "Latest fiscal data shows Nigeria's sovereign debt crossing the 45% threshold, prompting calls for immediate fiscal consolidation measures.",
    category: "Risk Alert",
    date: "Dec 9, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1618044619888-009e412ff12a?w=800&h=600&fit=crop",
    link: "/live-feed"
  },
  {
    id: 3,
    title: "South Africa Announces Comprehensive Fiscal Reform Package",
    excerpt: "New measures target revenue diversification and expenditure optimization to improve long-term debt sustainability.",
    category: "Reform",
    date: "Dec 8, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=800&h=600&fit=crop",
    link: "/live-feed"
  }
];

const quickUpdates = [
  {
    id: 1,
    title: "Ghana's Bond Yields Stabilize After Restructuring Agreement",
    category: "Markets",
    date: "Dec 10, 2024",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300&fit=crop",
    link: "/live-feed"
  },
  {
    id: 2,
    title: "African Development Bank Launches $2.5B Infrastructure Fund",
    category: "Investment",
    date: "Dec 9, 2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    link: "/live-feed"
  },
  {
    id: 3,
    title: "Ethiopia Completes Debt Service Suspension Initiative",
    category: "Policy",
    date: "Dec 8, 2024",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
    link: "/live-feed"
  },
  {
    id: 4,
    title: "Zambia's Copper Exports Boost Fiscal Revenue Projections",
    category: "Trade",
    date: "Dec 7, 2024",
    image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=300&fit=crop",
    link: "/live-feed"
  }
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16">
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

      <div className="relative z-10 container mx-auto px-4">
        {/* Main heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in">
            <span className="block text-foreground">Unraveling Africa's</span>
            <span className="block text-gradient mt-2">Sovereign Debt Crisis</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
            A comprehensive analytical framework for understanding fiscal sustainability, 
            identifying risk factors, and charting paths toward economic resilience across the continent.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
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
        </div>

        {/* Featured Articles Section */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Latest Insights</h2>
            <Link to="/live-feed" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Article */}
            <Link 
              to={featuredArticles[0].link}
              className="lg:col-span-2 group cursor-pointer"
            >
              <article className="relative h-full min-h-[400px] rounded-2xl overflow-hidden">
                <img 
                  src={featuredArticles[0].image} 
                  alt={featuredArticles[0].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-4">
                    {featuredArticles[0].category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {featuredArticles[0].title}
                  </h3>
                  <p className="text-white/80 mb-4 line-clamp-2">
                    {featuredArticles[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <span>{featuredArticles[0].date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredArticles[0].readTime}
                    </span>
                  </div>
                </div>
              </article>
            </Link>

            {/* Secondary Articles */}
            <div className="flex flex-col gap-6">
              {featuredArticles.slice(1).map((article) => (
                <Link 
                  key={article.id}
                  to={article.link}
                  className="group cursor-pointer"
                >
                  <article className="relative h-[180px] rounded-xl overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="inline-block px-2 py-0.5 bg-primary/90 text-primary-foreground text-xs font-semibold rounded mb-2">
                        {article.category}
                      </span>
                      <h3 className="text-sm md:text-base font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/60 text-xs mt-2">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Updates Grid */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Quick Updates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickUpdates.map((update) => (
              <Link 
                key={update.id}
                to={update.link}
                className="group cursor-pointer"
              >
                <article className="rounded-xl overflow-hidden glass">
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={update.image} 
                      alt={update.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-primary">{update.category}</span>
                    <h3 className="text-sm font-semibold text-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {update.title}
                    </h3>
                    <span className="text-xs text-muted-foreground mt-2 block">{update.date}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* Platform Features */}
        <div className="max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '600ms' }}>
          <h2 className="text-xl md:text-2xl font-semibold mb-8 text-foreground text-center">
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
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors animate-bounce mt-12 mx-auto w-fit"
        >
          <span className="text-sm">Explore the data</span>
          <ChevronDown className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};
