import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DebtTrendChart } from "@/components/dashboard/DebtTrendChart";
import { RegionalComparison } from "@/components/dashboard/RegionalComparison";
import { RiskTable } from "@/components/dashboard/RiskTable";
import { ForecastChart } from "@/components/dashboard/ForecastChart";
import { PolicyRecommendations } from "@/components/dashboard/PolicyRecommendations";
import { LiveAlertsFeed } from "@/components/dashboard/LiveAlertsFeed";
import { Wallet, TrendingDown, AlertTriangle, Globe, Loader2 } from "lucide-react";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { data: metrics, isLoading, error } = useDashboardMetrics();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Section header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Africa Fiscal Health Dashboard
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-time visualization of key fiscal indicators across African economies, 
              highlighting debt sustainability metrics and early warning signals.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {isLoading ? (
              <>
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-32 rounded-lg" />
                ))}
              </>
            ) : (
              <>
                <MetricCard
                  title="Avg. Debt/GDP"
                  value={metrics?.avgDebtToGDP?.toString() || "0"}
                  suffix="%"
                  change={8.5}
                  trend="up"
                  icon={<Wallet className="h-6 w-6" />}
                />
                <MetricCard
                  title="Avg. Deficit/GDP"
                  value={metrics?.avgDeficitToGDP?.toString() || "0"}
                  suffix="%"
                  change={-2.1}
                  trend="down"
                  icon={<TrendingDown className="h-6 w-6" />}
                />
                <MetricCard
                  title="Countries at Risk"
                  value={metrics?.countriesAtRisk?.toString() || "0"}
                  change={16.7}
                  trend="up"
                  icon={<AlertTriangle className="h-6 w-6" />}
                />
                <MetricCard
                  title="Avg. GDP Growth"
                  value={metrics?.avgGDPGrowth?.toString() || "0"}
                  suffix="%"
                  change={1.2}
                  trend="up"
                  icon={<Globe className="h-6 w-6" />}
                />
              </>
            )}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <DebtTrendChart />
            <RegionalComparison />
          </div>

          {/* Risk Table */}
          <div className="mb-6">
            <RiskTable limit={10} />
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ForecastChart />
            <PolicyRecommendations />
          </div>

          {/* Live Feed */}
          <div className="mt-8">
            <LiveAlertsFeed />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
