import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const featuredArticles = [
  {
    id: 1,
    title: "Kenya Secures $1.5B IMF Extended Credit Facility",
    excerpt: "The International Monetary Fund has approved a significant credit facility aimed at supporting Kenya's economic recovery and debt restructuring efforts.",
    category: "Policy Update",
    date: "December 10, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=800&h=600&fit=crop",
    link: "/live-feed"
  },
  {
    id: 2,
    title: "Nigeria's Debt-to-GDP Ratio Reaches Critical Threshold",
    excerpt: "Latest fiscal data shows Nigeria's sovereign debt crossing the 45% threshold, prompting calls for immediate fiscal consolidation measures.",
    category: "Risk Alert",
    date: "December 9, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1618044619888-009e412ff12a?w=800&h=600&fit=crop",
    link: "/live-feed"
  },
  {
    id: 3,
    title: "South Africa Announces Comprehensive Fiscal Reform Package",
    excerpt: "New measures target revenue diversification and expenditure optimization to improve long-term debt sustainability.",
    category: "Reform",
    date: "December 8, 2024",
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
    date: "December 10, 2024",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300&fit=crop",
    link: "/live-feed"
  },
  {
    id: 2,
    title: "African Development Bank Launches $2.5B Infrastructure Fund",
    category: "Investment",
    date: "December 9, 2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    link: "/live-feed"
  },
  {
    id: 3,
    title: "Ethiopia Completes Debt Service Suspension Initiative",
    category: "Policy",
    date: "December 8, 2024",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
    link: "/live-feed"
  },
  {
    id: 4,
    title: "Zambia's Copper Exports Boost Fiscal Revenue Projections",
    category: "Trade",
    date: "December 7, 2024",
    image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=300&fit=crop",
    link: "/live-feed"
  }
];

export const HeroSection = () => {
  return (
    <section className="min-h-screen pt-28 pb-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Masthead */}
        <header className="text-center border-b border-border pb-8 mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
            10Alytics Global Hackathon
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
            Unraveling Africa's<br />Sovereign Debt Crisis
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A comprehensive analytical framework for understanding fiscal sustainability, 
            identifying risk factors, and charting paths toward economic resilience.
          </p>
          
          {/* Navigation links */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm">
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors font-medium border-b border-foreground pb-0.5">
              Dashboard
            </Link>
            <Link to="/scenarios" className="text-foreground hover:text-primary transition-colors font-medium border-b border-foreground pb-0.5">
              Scenarios
            </Link>
            <Link to="/methodology" className="text-foreground hover:text-primary transition-colors font-medium border-b border-foreground pb-0.5">
              Methodology
            </Link>
            <Link to="/report" className="text-foreground hover:text-primary transition-colors font-medium border-b border-foreground pb-0.5">
              Full Report
            </Link>
          </div>

          {/* Key Stats - simple inline */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
            <span><strong className="text-foreground">15</strong> Countries</span>
            <span className="text-border">|</span>
            <span><strong className="text-foreground">5</strong> Year Forecast</span>
            <span className="text-border">|</span>
            <span><strong className="text-foreground">6</strong> Risk Indicators</span>
            <span className="text-border">|</span>
            <span><strong className="text-foreground">5</strong> Regions</span>
          </div>
        </header>

        {/* Featured Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Feature */}
          <article className="lg:col-span-7">
            <Link to={featuredArticles[0].link} className="group block">
              <div className="aspect-[16/10] overflow-hidden mb-4">
                <img 
                  src={featuredArticles[0].image} 
                  alt={featuredArticles[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-xs uppercase tracking-wider text-primary font-medium mb-2">
                {featuredArticles[0].category}
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-3 group-hover:text-primary transition-colors">
                {featuredArticles[0].title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                {featuredArticles[0].excerpt}
              </p>
              <p className="text-xs text-muted-foreground">
                {featuredArticles[0].date} · {featuredArticles[0].readTime}
              </p>
            </Link>
          </article>

          {/* Secondary Stories */}
          <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-border lg:pl-8">
            {featuredArticles.slice(1).map((article, index) => (
              <article key={article.id} className={index > 0 ? "pt-6 border-t border-border" : ""}>
                <Link to={article.link} className="group flex gap-4">
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider text-primary font-medium mb-1">
                      {article.category}
                    </p>
                    <h3 className="text-lg font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {article.excerpt}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {article.date}
                    </p>
                  </div>
                  <div className="w-28 h-20 flex-shrink-0 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-10" />

        {/* More Headlines */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-6">
            More Headlines
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickUpdates.map((update) => (
              <article key={update.id}>
                <Link to={update.link} className="group block">
                  <div className="aspect-[4/3] overflow-hidden mb-3">
                    <img 
                      src={update.image} 
                      alt={update.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-xs uppercase tracking-wider text-primary font-medium mb-1">
                    {update.category}
                  </p>
                  <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {update.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2">
                    {update.date}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-border my-10" />

        {/* Platform Section */}
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Fiscal Intelligence Platform
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Real-time analytics, AI-powered risk assessment, and scenario modeling 
            for informed policy decisions across Africa's economies.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button variant="default" size="lg">
                Explore Dashboard
              </Button>
            </Link>
            <Link to="/methodology">
              <Button variant="outline" size="lg">
                View Methodology
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
};
