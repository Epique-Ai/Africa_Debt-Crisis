import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { LiveAlertsFeed } from "@/components/dashboard/LiveAlertsFeed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, TrendingUp, TrendingDown, AlertTriangle, Calendar } from "lucide-react";

const marketNews = [
  {
    id: 1,
    title: "IMF Approves $3 Billion Extended Fund Facility for Ghana",
    summary: "The International Monetary Fund has approved a 36-month arrangement under the Extended Credit Facility to support Ghana's economic stabilization program.",
    date: "2024-01-15",
    category: "IMF",
    impact: "positive",
    countries: ["Ghana"]
  },
  {
    id: 2,
    title: "Nigeria's Debt Service Costs Surge to 97% of Revenue",
    summary: "Federal government's debt servicing costs have reached critical levels, consuming nearly all federal revenue and raising concerns about fiscal sustainability.",
    date: "2024-01-14",
    category: "Fiscal Risk",
    impact: "negative",
    countries: ["Nigeria"]
  },
  {
    id: 3,
    title: "Kenya Successfully Issues $1.5 Billion Eurobond",
    summary: "Kenya has successfully issued a new Eurobond to partially refinance maturing debt, easing immediate rollover concerns but adding to long-term obligations.",
    date: "2024-01-12",
    category: "Debt Issuance",
    impact: "neutral",
    countries: ["Kenya"]
  },
  {
    id: 4,
    title: "Zambia Reaches Agreement with Official Creditors on Debt Restructuring",
    summary: "After prolonged negotiations, Zambia has secured a restructuring deal with bilateral creditors under the G20 Common Framework.",
    date: "2024-01-10",
    category: "Restructuring",
    impact: "positive",
    countries: ["Zambia"]
  },
  {
    id: 5,
    title: "Egypt Secures $35 Billion UAE Investment Deal",
    summary: "A landmark investment agreement with the UAE's ADQ provides critical foreign exchange relief and reduces immediate balance of payments pressures.",
    date: "2024-01-08",
    category: "Investment",
    impact: "positive",
    countries: ["Egypt"]
  },
  {
    id: 6,
    title: "Angola's Oil Revenue Decline Threatens Fiscal Balance",
    summary: "Falling oil prices and production challenges are putting pressure on Angola's fiscal position, with debt servicing costs rising as a share of exports.",
    date: "2024-01-05",
    category: "Commodity Risk",
    impact: "negative",
    countries: ["Angola"]
  },
  {
    id: 7,
    title: "African Development Bank Launches $2 Billion Climate Resilience Fund",
    summary: "New financing facility aims to support climate adaptation projects across the continent, with concessional terms for debt-stressed nations.",
    date: "2024-01-03",
    category: "Development",
    impact: "positive",
    countries: ["Regional"]
  },
  {
    id: 8,
    title: "South Africa's Credit Rating Under Review Amid Fiscal Pressures",
    summary: "Rating agencies express concern over rising government debt and fiscal slippage, with potential implications for borrowing costs.",
    date: "2024-01-02",
    category: "Credit Rating",
    impact: "negative",
    countries: ["South Africa"]
  }
];

const LiveFeed = () => {
  const getImpactStyles = (impact: string) => {
    switch (impact) {
      case 'positive':
        return { icon: TrendingUp, color: 'text-success', bg: 'bg-success/10' };
      case 'negative':
        return { icon: TrendingDown, color: 'text-destructive', bg: 'bg-destructive/10' };
      default:
        return { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10' };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-muted-foreground">Live Updates</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Market & Economy News
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay informed with the latest developments in African sovereign debt markets, 
              fiscal policy changes, and economic updates.
            </p>
          </div>

          {/* Live Alerts Component */}
          <div className="mb-12">
            <LiveAlertsFeed />
          </div>

          {/* News Feed */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
              <Newspaper className="h-5 w-5 text-primary" />
              Recent Market News
            </h2>
            
            {marketNews.map((news) => {
              const { icon: ImpactIcon, color, bg } = getImpactStyles(news.impact);
              
              return (
                <Card key={news.id} variant="glass" className="hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${bg} flex-shrink-0`}>
                        <ImpactIcon className={`h-5 w-5 ${color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {news.category}
                          </Badge>
                          {news.countries.map(country => (
                            <Badge key={country} variant="secondary" className="text-xs">
                              {country}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {news.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {news.summary}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(news.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LiveFeed;
