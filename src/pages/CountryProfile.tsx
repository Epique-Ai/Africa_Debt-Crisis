import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Globe, 
  Wallet,
  Activity,
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { RiskBadge } from "@/components/dashboard/RiskBadge";
import { africaCountries, riskClassifications } from "@/data/africaDebtData";
import { liveAlerts, rlForecasts } from "@/data/liveAlertsData";
import { cn } from "@/lib/utils";

const CountryProfile = () => {
  const { countrySlug } = useParams<{ countrySlug: string }>();
  
  const countryName = countrySlug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const countryData = africaCountries.find(c => 
    c.country.toLowerCase().replace(' ', '-') === countrySlug || 
    c.country.toLowerCase() === countryName?.toLowerCase()
  );
  
  const riskData = riskClassifications.find(r => r.country === countryData?.country);
  const countryAlerts = liveAlerts.filter(a => a.country === countryData?.country).slice(0, 3);
  const countryForecast = rlForecasts.find(f => f.country === countryData?.country);

  if (!countryData) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <Card className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Country Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The country profile you're looking for doesn't exist.
            </p>
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const latestYear = countryData.years[countryData.years.length - 1];
  const previousYear = countryData.years[countryData.years.length - 2];
  
  const debtChange = latestYear.debtToGDP - previousYear.debtToGDP;
  const deficitChange = latestYear.deficitToGDP - previousYear.deficitToGDP;
  const growthChange = latestYear.gdpGrowth - previousYear.gdpGrowth;

  const radarData = [
    { metric: 'Debt Level', value: Math.min(100, (latestYear.debtToGDP / 150) * 100), fullMark: 100 },
    { metric: 'Deficit', value: Math.min(100, Math.abs(latestYear.deficitToGDP) * 10), fullMark: 100 },
    { metric: 'Inflation', value: Math.min(100, latestYear.inflationRate * 3), fullMark: 100 },
    { metric: 'External Debt', value: latestYear.externalDebtShare, fullMark: 100 },
    { metric: 'Revenue Risk', value: riskData?.revenueVolatility ? riskData.revenueVolatility * 4 : 50, fullMark: 100 },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-10 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto max-w-6xl">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">{countryData.country}</h1>
                  {riskData && <RiskBadge level={riskData.riskLevel} />}
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    {countryData.region}
                  </span>
                  <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                    {countryData.code}
                  </span>
                </div>
              </div>
              
              {riskData && (
                <Card className="glass-card">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Risk Score</p>
                      <p className="text-4xl font-bold text-primary">{riskData.riskScore}</p>
                      <p className="text-xs text-muted-foreground">out of 100</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="py-6 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    <Badge variant={debtChange > 0 ? "destructive" : "default"} className="text-xs">
                      {debtChange > 0 ? '+' : ''}{debtChange.toFixed(1)}pp
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold">{latestYear.debtToGDP}%</p>
                  <p className="text-sm text-muted-foreground">Debt/GDP</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingDown className="h-5 w-5 text-destructive" />
                    <Badge variant={deficitChange < 0 ? "destructive" : "default"} className="text-xs">
                      {deficitChange > 0 ? '+' : ''}{deficitChange.toFixed(1)}pp
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold">{latestYear.deficitToGDP}%</p>
                  <p className="text-sm text-muted-foreground">Deficit/GDP</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="h-5 w-5 text-success" />
                    <Badge variant={growthChange > 0 ? "default" : "destructive"} className="text-xs">
                      {growthChange > 0 ? '+' : ''}{growthChange.toFixed(1)}pp
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold">{latestYear.gdpGrowth}%</p>
                  <p className="text-sm text-muted-foreground">GDP Growth</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  </div>
                  <p className="text-2xl font-bold">{latestYear.inflationRate}%</p>
                  <p className="text-sm text-muted-foreground">Inflation</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Charts Grid */}
        <section className="py-6 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Historical Trends */}
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Fiscal Trends (2018-2023)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={countryData.years}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
                      <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Line type="monotone" dataKey="debtToGDP" name="Debt/GDP" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="gdpGrowth" name="Growth" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Risk Profile Radar */}
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Risk Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(var(--muted-foreground) / 0.3)" />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9 }} />
                      <Radar name="Risk" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Revenue vs Expenditure */}
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Revenue vs Expenditure</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={countryData.years.slice(-4)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
                      <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Bar dataKey="revenueToGDP" name="Revenue" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expenditureToGDP" name="Expenditure" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* RL Forecast */}
              {countryForecast && (
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="h-4 w-4 text-primary" />
                      AI Debt Forecast
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">Current</p>
                        <p className="text-xl font-bold">{countryForecast.currentValue}%</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">2024</p>
                        <p className="text-xl font-bold">{countryForecast.forecast2024}%</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">2025</p>
                        <p className="text-xl font-bold">{countryForecast.forecast2025}%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Confidence: {countryForecast.confidence}%</Badge>
                      <Badge className={cn(
                        countryForecast.trend === 'improving' && "bg-success/20 text-success",
                        countryForecast.trend === 'stable' && "bg-warning/20 text-warning",
                        countryForecast.trend === 'deteriorating' && "bg-destructive/20 text-destructive"
                      )}>
                        {countryForecast.trend}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Recent Alerts */}
        {countryAlerts.length > 0 && (
          <section className="py-6 px-4">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {countryAlerts.map((alert) => {
                  const statusConfig = {
                    green: { color: 'text-success', bg: 'bg-success/10 border-success/30' },
                    yellow: { color: 'text-warning', bg: 'bg-warning/10 border-warning/30' },
                    red: { color: 'text-destructive', bg: 'bg-destructive/10 border-destructive/30' },
                  };
                  const config = statusConfig[alert.status];
                  
                  return (
                    <Card key={alert.id} className={cn("border", config.bg)}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-sm">{alert.metric}</p>
                          <Badge className={cn(config.bg, config.color, "border text-xs capitalize")}>
                            {alert.status === 'green' ? 'OK' : alert.status === 'yellow' ? 'Watch' : 'Alert'}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{alert.insight}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Risk Drivers */}
        {riskData && (
          <section className="py-6 px-4 pb-12">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-xl font-semibold mb-4">Key Risk Drivers</h2>
              <div className="flex flex-wrap gap-3">
                {riskData.drivers.map((driver, idx) => (
                  <Badge key={idx} variant="outline" className="px-4 py-2 text-sm bg-destructive/10 border-destructive/30 text-destructive">
                    {driver}
                  </Badge>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CountryProfile;
