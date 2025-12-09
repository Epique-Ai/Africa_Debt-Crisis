import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { LiveAlertsFeed } from "@/components/dashboard/LiveAlertsFeed";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";

const marketNews = [
  {
    id: 1,
    title: "IMF Approves $3 Billion Extended Fund Facility for Ghana",
    summary: "The International Monetary Fund has approved a 36-month arrangement under the Extended Credit Facility to support Ghana's economic stabilization program, marking a significant step toward fiscal recovery.",
    date: "2024-01-15",
    category: "IMF",
    impact: "positive",
    countries: ["Ghana"],
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    readTime: "4 min read"
  },
  {
    id: 2,
    title: "Nigeria's Debt Service Costs Surge to 97% of Revenue",
    summary: "Federal government's debt servicing costs have reached critical levels, consuming nearly all federal revenue and raising concerns about fiscal sustainability across Africa's largest economy.",
    date: "2024-01-14",
    category: "Fiscal Risk",
    impact: "negative",
    countries: ["Nigeria"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    readTime: "6 min read"
  },
  {
    id: 3,
    title: "Kenya Successfully Issues $1.5 Billion Eurobond",
    summary: "Kenya has successfully issued a new Eurobond to partially refinance maturing debt, easing immediate rollover concerns but adding to long-term obligations in a delicate balancing act.",
    date: "2024-01-12",
    category: "Debt Issuance",
    impact: "neutral",
    countries: ["Kenya"],
    image: "https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=800&q=80",
    readTime: "5 min read"
  },
  {
    id: 4,
    title: "Zambia Reaches Agreement with Official Creditors on Debt Restructuring",
    summary: "After prolonged negotiations, Zambia has secured a restructuring deal with bilateral creditors under the G20 Common Framework, setting a precedent for other distressed African sovereigns.",
    date: "2024-01-10",
    category: "Restructuring",
    impact: "positive",
    countries: ["Zambia"],
    image: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=800&q=80",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "Egypt Secures $35 Billion UAE Investment Deal",
    summary: "A landmark investment agreement with the UAE's ADQ provides critical foreign exchange relief and reduces immediate balance of payments pressures in a transformative economic partnership.",
    date: "2024-01-08",
    category: "Investment",
    impact: "positive",
    countries: ["Egypt"],
    image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&q=80",
    readTime: "5 min read"
  },
  {
    id: 6,
    title: "Angola's Oil Revenue Decline Threatens Fiscal Balance",
    summary: "Falling oil prices and production challenges are putting pressure on Angola's fiscal position, with debt servicing costs rising as a share of exports amid global commodity uncertainty.",
    date: "2024-01-05",
    category: "Commodity Risk",
    impact: "negative",
    countries: ["Angola"],
    image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80",
    readTime: "4 min read"
  },
  {
    id: 7,
    title: "African Development Bank Launches $2 Billion Climate Resilience Fund",
    summary: "New financing facility aims to support climate adaptation projects across the continent, with concessional terms for debt-stressed nations seeking sustainable development paths.",
    date: "2024-01-03",
    category: "Development",
    impact: "positive",
    countries: ["Regional"],
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80",
    readTime: "6 min read"
  },
  {
    id: 8,
    title: "South Africa's Credit Rating Under Review Amid Fiscal Pressures",
    summary: "Rating agencies express concern over rising government debt and fiscal slippage, with potential implications for borrowing costs across the continent's most industrialized economy.",
    date: "2024-01-02",
    category: "Credit Rating",
    impact: "negative",
    countries: ["South Africa"],
    image: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=800&q=80",
    readTime: "5 min read"
  }
];

const LiveFeed = () => {
  const featuredNews = marketNews[0];
  const secondaryNews = marketNews.slice(1, 3);
  const remainingNews = marketNews.slice(3);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-destructive';
      default: return 'text-warning';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Section header */}
          <div className="border-b-2 border-foreground pb-4 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Live Updates</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">
              Market & Economy
            </h1>
          </div>

          {/* Featured Article + Secondary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Featured Article */}
            <article className="lg:col-span-2 group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src={featuredNews.image} 
                  alt={featuredNews.title}
                  className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground">
                    {featuredNews.category}
                  </Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(featuredNews.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span>•</span>
                  <span>{featuredNews.readTime}</span>
                  <span>•</span>
                  <span className={getImpactColor(featuredNews.impact)}>
                    {featuredNews.impact.charAt(0).toUpperCase() + featuredNews.impact.slice(1)} Impact
                  </span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
                  {featuredNews.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {featuredNews.summary}
                </p>
                <div className="flex items-center gap-2 text-primary font-medium pt-2">
                  Read full article <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </article>

            {/* Secondary Articles */}
            <div className="space-y-6">
              {secondaryNews.map((news) => (
                <article key={news.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden mb-3">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="text-xs">
                        {news.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span>•</span>
                      <span>{news.readTime}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {news.summary}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-8"></div>

          {/* Live Alerts Section */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">
              Real-Time Intelligence
            </h2>
            <LiveAlertsFeed />
          </div>

          {/* Divider */}
          <div className="border-t border-border my-8"></div>

          {/* Remaining Articles Grid */}
          <div>
            <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">
              More Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {remainingNews.map((news) => (
                <article key={news.id} className="group cursor-pointer flex gap-4">
                  <div className="relative overflow-hidden flex-shrink-0">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-32 h-32 md:w-40 md:h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {news.category}
                      </Badge>
                      <span className={`text-xs ${getImpactColor(news.impact)}`}>
                        {news.impact.charAt(0).toUpperCase() + news.impact.slice(1)}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {news.summary}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <span>{news.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LiveFeed;
