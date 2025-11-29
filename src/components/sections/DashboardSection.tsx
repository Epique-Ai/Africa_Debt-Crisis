import { MetricCard } from "@/components/dashboard/MetricCard";
import { DebtTrendChart } from "@/components/dashboard/DebtTrendChart";
import { RegionalComparison } from "@/components/dashboard/RegionalComparison";
import { RiskTable } from "@/components/dashboard/RiskTable";
import { ForecastChart } from "@/components/dashboard/ForecastChart";
import { PolicyRecommendations } from "@/components/dashboard/PolicyRecommendations";
import { ScenarioStressTest } from "@/components/dashboard/ScenarioStressTest";
import { Wallet, TrendingDown, AlertTriangle, Globe } from "lucide-react";

export const DashboardSection = () => {
  return (
    <section id="dashboard" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Africa Fiscal Health Dashboard
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time visualization of key fiscal indicators across African economies, 
            highlighting debt sustainability metrics and early warning signals.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Avg. Debt/GDP"
            value="65.2"
            suffix="%"
            change={8.5}
            trend="up"
            icon={<Wallet className="h-6 w-6" />}
          />
          <MetricCard
            title="Avg. Deficit/GDP"
            value="-4.8"
            suffix="%"
            change={-2.1}
            trend="down"
            icon={<TrendingDown className="h-6 w-6" />}
          />
          <MetricCard
            title="Countries at Risk"
            value="7"
            change={16.7}
            trend="up"
            icon={<AlertTriangle className="h-6 w-6" />}
          />
          <MetricCard
            title="Avg. GDP Growth"
            value="3.8"
            suffix="%"
            change={1.2}
            trend="up"
            icon={<Globe className="h-6 w-6" />}
          />
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

        {/* Stress Test Module */}
        <div className="mb-6">
          <ScenarioStressTest />
        </div>
      </div>
    </section>
  );
};
