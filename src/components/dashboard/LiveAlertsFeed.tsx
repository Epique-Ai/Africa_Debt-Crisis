import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Bell,
  Activity,
  Calendar,
  ChevronRight,
  Radio,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAlerts } from "@/hooks/useAlerts";
import { useLatestFiscalMetrics } from "@/hooks/useCountryFiscalData";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

type AlertStatus = 'green' | 'yellow' | 'red';

const statusConfig: Record<AlertStatus, { color: string; bg: string; label: string }> = {
  green: { color: 'text-success', bg: 'bg-success/20 border-success/30', label: 'Positive' },
  yellow: { color: 'text-warning', bg: 'bg-warning/20 border-warning/30', label: 'Caution' },
  red: { color: 'text-destructive', bg: 'bg-destructive/20 border-destructive/30', label: 'Alert' },
};

const categoryIcons: Record<string, string> = {
  debt: '💰',
  risk: '⚠️',
  forecast: '📊',
  policy: '📋',
  market: '📈',
};

const AlertCard = ({ alert }: { alert: any }) => {
  // Determine status based on priority
  const getStatus = (priority: string | null): AlertStatus => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      default: return 'green';
    }
  };
  
  const status = getStatus(alert.priority);
  const config = statusConfig[status];
  const isNew = new Date(alert.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000);
  
  return (
    <div className={cn(
      "p-4 rounded-lg border transition-all hover:shadow-md",
      config.bg,
      isNew && "ring-2 ring-primary/50"
    )}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{categoryIcons[alert.category] || '📌'}</span>
          <div>
            <div className="flex items-center gap-2">
              {alert.country ? (
                <Link 
                  to={`/country/${alert.country.name?.toLowerCase().replace(' ', '-')}`}
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {alert.country.name}
                </Link>
              ) : (
                <span className="font-semibold text-foreground">{alert.title}</span>
              )}
              {isNew && (
                <Badge variant="outline" className="text-xs bg-primary/20 text-primary border-primary/30">
                  NEW
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{alert.title}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge className={cn("text-xs", config.bg, config.color, "border")}>
            {config.label}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(alert.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
      <p className="text-sm text-foreground/90 leading-relaxed">
        {alert.description}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <Badge variant="outline" className="text-xs capitalize">
          {alert.category}
        </Badge>
        {alert.country && (
          <Link 
            to={`/country/${alert.country.name?.toLowerCase().replace(' ', '-')}`}
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            View Country Profile <ChevronRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  );
};

const ForecastCard = ({ forecast }: { forecast: any }) => {
  const currentValue = forecast.debt_to_gdp || 0;
  const gdpGrowth = forecast.gdp_growth || 0;
  
  const trend = gdpGrowth > 3 ? 'improving' : gdpGrowth < 1 ? 'deteriorating' : 'stable';
  
  const trendConfig = {
    improving: { icon: TrendingDown, color: 'text-success', label: 'Improving' },
    stable: { icon: Minus, color: 'text-warning', label: 'Stable' },
    deteriorating: { icon: TrendingUp, color: 'text-destructive', label: 'Deteriorating' },
  };
  
  const config = trendConfig[trend];
  const Icon = config.icon;
  
  // Simple forecast projection
  const forecast2024 = currentValue * (1 + (gdpGrowth > 2 ? -0.02 : 0.03));
  const forecast2025 = forecast2024 * (1 + (gdpGrowth > 2 ? -0.02 : 0.03));
  
  return (
    <div className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div>
          <Link 
            to={`/country/${forecast.countries?.name?.toLowerCase().replace(' ', '-')}`}
            className="font-semibold text-foreground hover:text-primary transition-colors"
          >
            {forecast.countries?.name || 'Unknown'}
          </Link>
          <p className="text-sm text-muted-foreground">Debt/GDP</p>
        </div>
        <div className={cn("flex items-center gap-1", config.color)}>
          <Icon className="h-4 w-4" />
          <span className="text-xs font-medium">{config.label}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center p-2 rounded bg-muted/50">
          <p className="text-xs text-muted-foreground">Current</p>
          <p className="text-lg font-bold">{currentValue.toFixed(1)}%</p>
        </div>
        <div className="text-center p-2 rounded bg-muted/50">
          <p className="text-xs text-muted-foreground">2025F</p>
          <p className="text-lg font-bold flex items-center justify-center">
            {forecast2024.toFixed(1)}%
            {forecast2024 > currentValue ? (
              <ArrowUpRight className="h-3 w-3 text-destructive ml-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-success ml-1" />
            )}
          </p>
        </div>
        <div className="text-center p-2 rounded bg-muted/50">
          <p className="text-xs text-muted-foreground">2026F</p>
          <p className="text-lg font-bold flex items-center justify-center">
            {forecast2025.toFixed(1)}%
            {forecast2025 > forecast2024 ? (
              <ArrowUpRight className="h-3 w-3 text-destructive ml-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-success ml-1" />
            )}
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Activity className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Risk: {forecast.risk_level || 'N/A'}
          </span>
        </div>
        <Link 
          to={`/country/${forecast.countries?.name?.toLowerCase().replace(' ', '-')}`}
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          Details <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};

const RepaymentScheduleTable = () => {
  // Using static data for repayment schedule as it's specialized data
  const repaymentSchedule = [
    { country: 'Kenya', year: 2024, quarter: 'Q2', amount: 2000, currency: 'USD', type: 'Eurobond', riskLevel: 'high' },
    { country: 'Nigeria', year: 2024, quarter: 'Q3', amount: 1500, currency: 'USD', type: 'Eurobond', riskLevel: 'medium' },
    { country: 'Egypt', year: 2024, quarter: 'Q1', amount: 3200, currency: 'USD', type: 'Bilateral', riskLevel: 'high' },
    { country: 'Ghana', year: 2024, quarter: 'Q4', amount: 800, currency: 'USD', type: 'Multilateral', riskLevel: 'low' },
    { country: 'South Africa', year: 2024, quarter: 'Q2', amount: 2500, currency: 'USD', type: 'Domestic', riskLevel: 'medium' },
    { country: 'Angola', year: 2024, quarter: 'Q3', amount: 1800, currency: 'USD', type: 'Bilateral', riskLevel: 'medium' },
  ];

  const riskColors: Record<string, string> = {
    low: 'bg-success/20 text-success',
    medium: 'bg-warning/20 text-warning',
    high: 'bg-destructive/20 text-destructive',
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/50">
            <th className="text-left py-2 px-3 text-muted-foreground font-medium">Country</th>
            <th className="text-left py-2 px-3 text-muted-foreground font-medium">Due</th>
            <th className="text-right py-2 px-3 text-muted-foreground font-medium">Amount</th>
            <th className="text-left py-2 px-3 text-muted-foreground font-medium">Type</th>
            <th className="text-center py-2 px-3 text-muted-foreground font-medium">Risk</th>
          </tr>
        </thead>
        <tbody>
          {repaymentSchedule.map((item, idx) => (
            <tr key={idx} className="border-b border-border/30 hover:bg-muted/30">
              <td className="py-2 px-3">
                <Link 
                  to={`/country/${item.country.toLowerCase().replace(' ', '-')}`}
                  className="font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.country}
                </Link>
              </td>
              <td className="py-2 px-3 text-muted-foreground">{item.quarter} {item.year}</td>
              <td className="py-2 px-3 text-right font-mono">${(item.amount / 1000).toFixed(1)}B</td>
              <td className="py-2 px-3">
                <Badge variant="outline" className="text-xs">{item.type}</Badge>
              </td>
              <td className="py-2 px-3 text-center">
                <Badge className={cn("text-xs capitalize", riskColors[item.riskLevel])}>
                  {item.riskLevel}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const LiveAlertsFeed = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { data: alerts, isLoading: alertsLoading } = useAlerts(20);
  const { data: fiscalData, isLoading: fiscalLoading } = useLatestFiscalMetrics();
  
  const filteredAlerts = useMemo(() => {
    if (!alerts) return [];
    return selectedCategory === 'all' 
      ? alerts 
      : alerts.filter(a => a.category === selectedCategory);
  }, [alerts, selectedCategory]);
  
  return (
    <section id="live-updates" className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Radio className="h-5 w-5 text-destructive animate-pulse" />
              <h2 className="text-2xl md:text-3xl font-bold">Live Intelligence Feed</h2>
            </div>
            <p className="text-muted-foreground">
              Real-time fiscal alerts, forecasts, and debt monitoring across Africa
            </p>
          </div>
          <Badge variant="outline" className="hidden md:flex items-center gap-1 text-success border-success/30">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            Live
          </Badge>
        </div>

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="forecasts" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Forecasts</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Repayments</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {['all', 'debt', 'risk', 'forecast', 'policy', 'market'].map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="capitalize"
                >
                  {cat === 'all' ? 'All Updates' : cat}
                </Button>
              ))}
            </div>
            
            {/* Alerts Grid */}
            {alertsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-40" />
                ))}
              </div>
            ) : filteredAlerts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No alerts available
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="forecasts" className="space-y-4">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Debt Trajectory Forecasts
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Projections based on current fiscal data and economic indicators
                </p>
              </CardHeader>
              <CardContent>
                {fiscalLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-48" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fiscalData?.slice(0, 6).map((forecast) => (
                      <ForecastCard key={forecast.id} forecast={forecast} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Debt Repayments
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Critical maturities and refinancing events requiring attention
                </p>
              </CardHeader>
              <CardContent>
                <RepaymentScheduleTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
