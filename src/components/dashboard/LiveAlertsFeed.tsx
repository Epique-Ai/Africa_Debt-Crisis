import { useState } from "react";
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
import { liveAlerts, rlForecasts, repaymentSchedule, type AlertStatus, type LiveAlert } from "@/data/liveAlertsData";
import { Link } from "react-router-dom";

const statusConfig: Record<AlertStatus, { color: string; bg: string; label: string }> = {
  green: { color: 'text-success', bg: 'bg-success/20 border-success/30', label: 'Positive' },
  yellow: { color: 'text-warning', bg: 'bg-warning/20 border-warning/30', label: 'Caution' },
  red: { color: 'text-destructive', bg: 'bg-destructive/20 border-destructive/30', label: 'Alert' },
};

const categoryIcons = {
  debt: '💰',
  risk: '⚠️',
  forecast: '📊',
  policy: '📋',
  market: '📈',
};

const AlertCard = ({ alert }: { alert: LiveAlert }) => {
  const config = statusConfig[alert.status];
  
  return (
    <div className={cn(
      "p-4 rounded-lg border transition-all hover:shadow-md",
      config.bg,
      alert.isNew && "ring-2 ring-primary/50"
    )}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{categoryIcons[alert.category]}</span>
          <div>
            <div className="flex items-center gap-2">
              <Link 
                to={`/country/${alert.country.toLowerCase().replace(' ', '-')}`}
                className="font-semibold text-foreground hover:text-primary transition-colors"
              >
                {alert.country}
              </Link>
              {alert.isNew && (
                <Badge variant="outline" className="text-xs bg-primary/20 text-primary border-primary/30">
                  NEW
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{alert.metric}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge className={cn("text-xs", config.bg, config.color, "border")}>
            {config.label}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(alert.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
      <p className="text-sm text-foreground/90 leading-relaxed">
        {alert.insight}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <Badge variant="outline" className="text-xs capitalize">
          {alert.category}
        </Badge>
        <Link 
          to={`/country/${alert.country.toLowerCase().replace(' ', '-')}`}
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          View Country Profile <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};

const ForecastCard = ({ forecast }: { forecast: typeof rlForecasts[0] }) => {
  const trendConfig = {
    improving: { icon: TrendingDown, color: 'text-success', label: 'Improving' },
    stable: { icon: Minus, color: 'text-warning', label: 'Stable' },
    deteriorating: { icon: TrendingUp, color: 'text-destructive', label: 'Deteriorating' },
  };
  
  const config = trendConfig[forecast.trend];
  const Icon = config.icon;
  const change2024 = forecast.forecast2024 - forecast.currentValue;
  const change2025 = forecast.forecast2025 - forecast.forecast2024;
  
  return (
    <div className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div>
          <Link 
            to={`/country/${forecast.country.toLowerCase().replace(' ', '-')}`}
            className="font-semibold text-foreground hover:text-primary transition-colors"
          >
            {forecast.country}
          </Link>
          <p className="text-sm text-muted-foreground">{forecast.metric}</p>
        </div>
        <div className={cn("flex items-center gap-1", config.color)}>
          <Icon className="h-4 w-4" />
          <span className="text-xs font-medium">{config.label}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center p-2 rounded bg-muted/50">
          <p className="text-xs text-muted-foreground">Current</p>
          <p className="text-lg font-bold">{forecast.currentValue}%</p>
        </div>
        <div className="text-center p-2 rounded bg-muted/50">
          <p className="text-xs text-muted-foreground">2024F</p>
          <p className="text-lg font-bold flex items-center justify-center">
            {forecast.forecast2024}%
            {change2024 > 0 ? (
              <ArrowUpRight className="h-3 w-3 text-destructive ml-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-success ml-1" />
            )}
          </p>
        </div>
        <div className="text-center p-2 rounded bg-muted/50">
          <p className="text-xs text-muted-foreground">2025F</p>
          <p className="text-lg font-bold flex items-center justify-center">
            {forecast.forecast2025}%
            {change2025 > 0 ? (
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
          <span className="text-xs text-muted-foreground">Confidence: {forecast.confidence}%</span>
        </div>
        <Link 
          to={`/country/${forecast.country.toLowerCase().replace(' ', '-')}`}
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          Details <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};

const RepaymentScheduleTable = () => {
  const riskColors = {
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
          {repaymentSchedule.slice(0, 6).map((item, idx) => (
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
  
  const filteredAlerts = selectedCategory === 'all' 
    ? liveAlerts 
    : liveAlerts.filter(a => a.category === selectedCategory);
  
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
              Real-time fiscal alerts, RL-driven forecasts, and debt monitoring across Africa
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
              <span className="hidden sm:inline">RL Forecasts</span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="forecasts" className="space-y-4">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  RL Agent Debt Trajectory Forecasts
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Machine learning projections with confidence intervals and key risk drivers
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rlForecasts.map((forecast) => (
                    <ForecastCard key={forecast.country} forecast={forecast} />
                  ))}
                </div>
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
