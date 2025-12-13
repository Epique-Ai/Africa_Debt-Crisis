import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Globe, 
  Wallet,
  Activity,
  RefreshCw,
  Loader2,
  Bell,
  Clock,
  ChevronRight,
  Lightbulb,
  Target
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
import { useCountries } from "@/hooks/useCountries";
import { useCountryFiscalData } from "@/hooks/useCountryFiscalData";
import { useAlerts } from "@/hooks/useAlerts";
import { useCountryAnalysis } from "@/hooks/useCountryAnalysis";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const CountryProfile = () => {
  const { countrySlug } = useParams<{ countrySlug: string }>();
  const { data: countries, isLoading: countriesLoading } = useCountries();
  const { data: fiscalData, isLoading: fiscalLoading } = useCountryFiscalData();
  const { data: allAlerts, isLoading: alertsLoading } = useAlerts(100);
  const { analyzeCountry, isAnalyzing, analysisResult } = useCountryAnalysis();
  
  const countryName = countrySlug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  const country = countries?.find(c => 
    c.name.toLowerCase().replace(/\s+/g, '-') === countrySlug || 
    c.name.toLowerCase() === countryName?.toLowerCase()
  );

  const countryFiscal = fiscalData?.find(f => f.id === country?.id);
  const countryAlerts = allAlerts?.filter(a => a.country?.id === country?.id).slice(0, 5);

  const isLoading = countriesLoading || fiscalLoading;

  const handleSyncData = async () => {
    if (country) {
      await analyzeCountry(country.id, country.name);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 py-10 px-4">
          <div className="container mx-auto max-w-6xl">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-12 w-64 mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24" />)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-64" />)}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!country) {
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
            <Link to="/dashboard">
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

  const latestData = countryFiscal?.fiscalData?.[0];
  const previousData = countryFiscal?.fiscalData?.[1];
  
  const debtChange = latestData && previousData ? latestData.debt_to_gdp - previousData.debt_to_gdp : 0;
  const growthChange = latestData && previousData ? latestData.gdp_growth - previousData.gdp_growth : 0;

  // Prepare chart data
  const chartData = countryFiscal?.fiscalData?.slice().reverse().map(d => ({
    year: d.year,
    debtToGDP: d.debt_to_gdp,
    gdpGrowth: d.gdp_growth,
    inflationRate: d.inflation_rate,
    revenueToGDP: d.revenue_to_gdp,
    expenditureToGDP: d.expenditure_to_gdp,
  })) || [];

  const radarData = latestData ? [
    { metric: 'Debt Level', value: Math.min(100, ((latestData.debt_to_gdp || 0) / 150) * 100) },
    { metric: 'Deficit', value: Math.min(100, Math.abs(latestData.fiscal_deficit || 0) * 10) },
    { metric: 'Inflation', value: Math.min(100, (latestData.inflation_rate || 0) * 3) },
    { metric: 'Risk Score', value: latestData.risk_score || 50 },
    { metric: 'Unemployment', value: Math.min(100, (latestData.unemployment_rate || 0) * 5) },
  ] : [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-10 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto max-w-6xl">
            <Link to="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">{country.name}</h1>
                  {latestData?.risk_level && <RiskBadge level={latestData.risk_level as 'Low' | 'Medium' | 'High' | 'Critical'} />}
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    {country.region}
                  </span>
                  <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                    {country.code}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {latestData && (
                  <Card className="glass-card">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Risk Score</p>
                        <p className="text-4xl font-bold text-primary">{latestData.risk_score || 'N/A'}</p>
                        <p className="text-xs text-muted-foreground">out of 100</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {/* Sync Button */}
                <Button 
                  onClick={handleSyncData}
                  disabled={isAnalyzing}
                  variant="outline"
                  className="gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4" />
                      Sync Data
                    </>
                  )}
                </Button>
              </div>
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
                    {debtChange !== 0 && (
                      <Badge variant={debtChange > 0 ? "destructive" : "default"} className="text-xs">
                        {debtChange > 0 ? '+' : ''}{debtChange.toFixed(1)}pp
                      </Badge>
                    )}
                  </div>
                  <p className="text-2xl font-bold">{latestData?.debt_to_gdp?.toFixed(1) || 'N/A'}%</p>
                  <p className="text-sm text-muted-foreground">Debt/GDP</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingDown className="h-5 w-5 text-destructive" />
                  </div>
                  <p className="text-2xl font-bold">{latestData?.fiscal_deficit?.toFixed(1) || 'N/A'}%</p>
                  <p className="text-sm text-muted-foreground">Deficit/GDP</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="h-5 w-5 text-success" />
                    {growthChange !== 0 && (
                      <Badge variant={growthChange > 0 ? "default" : "destructive"} className="text-xs">
                        {growthChange > 0 ? '+' : ''}{growthChange.toFixed(1)}pp
                      </Badge>
                    )}
                  </div>
                  <p className="text-2xl font-bold">{latestData?.gdp_growth?.toFixed(1) || 'N/A'}%</p>
                  <p className="text-sm text-muted-foreground">GDP Growth</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  </div>
                  <p className="text-2xl font-bold">{latestData?.inflation_rate?.toFixed(1) || 'N/A'}%</p>
                  <p className="text-sm text-muted-foreground">Inflation</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* AI Analysis Results (if available) */}
        {analysisResult?.success && (
          <section className="py-6 px-4">
            <div className="container mx-auto max-w-6xl">
              <Card className="glass-card border-primary/30 bg-primary/5">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="h-5 w-5 text-primary" />
                    AI Analysis Results
                    <Badge className="ml-2 text-xs bg-primary/20 text-primary">Just Updated</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-background/50">
                      <h4 className="text-sm font-semibold text-muted-foreground mb-2">Current Status</h4>
                      <p className="text-sm">{analysisResult.currentStatus}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-warning/10">
                      <h4 className="text-sm font-semibold text-warning mb-2">Risk Assessment</h4>
                      <p className="text-sm">{analysisResult.riskAssessment}</p>
                    </div>
                  </div>

                  {analysisResult.keyInsights && (
                    <div className="p-4 rounded-lg bg-muted/30">
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        Key Insights
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.keyInsights.map((insight, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysisResult.recommendations && (
                    <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                      <h4 className="text-sm font-semibold text-success mb-2">Recommendations</h4>
                      <ul className="space-y-2">
                        {analysisResult.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span className="text-success font-bold">{idx + 1}.</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Charts Grid */}
        <section className="py-6 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Historical Trends */}
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Fiscal Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={chartData}>
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
                  ) : (
                    <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                      No historical data available
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Risk Profile Radar */}
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Risk Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  {radarData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="hsl(var(--muted-foreground) / 0.3)" />
                        <PolarAngleAxis dataKey="metric" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9 }} />
                        <Radar name="Risk" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
                      </RadarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                      No risk data available
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Revenue vs Expenditure */}
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Revenue vs Expenditure</CardTitle>
                </CardHeader>
                <CardContent>
                  {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={chartData.slice(-4)}>
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
                  ) : (
                    <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                      No data available
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* AI Predictions Chart */}
              {analysisResult?.predictions && analysisResult.predictions.length > 0 && (
                <Card className="glass-card border-primary/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="h-4 w-4 text-primary" />
                      AI 5-Year Forecast
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={analysisResult.predictions}>
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
                        <Line type="monotone" dataKey="debtToGDP" name="Debt/GDP %" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                        <Line type="monotone" dataKey="riskScore" name="Risk Score" stroke="hsl(var(--destructive))" strokeWidth={2} />
                        <Line type="monotone" dataKey="gdpGrowth" name="GDP Growth %" stroke="hsl(var(--success))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Recent Alerts - Redesigned as compact cards, not article style */}
        <section className="py-6 px-4 pb-12">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-warning" />
              Recent Alerts
            </h2>
            
            {alertsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-32" />)}
              </div>
            ) : countryAlerts && countryAlerts.length > 0 ? (
              <div className="space-y-3">
                {countryAlerts.map((alert) => {
                  const priorityConfig: Record<string, { icon: React.ReactNode; bg: string; border: string }> = {
                    High: { 
                      icon: <AlertTriangle className="h-4 w-4 text-destructive" />, 
                      bg: 'bg-destructive/10', 
                      border: 'border-destructive/30' 
                    },
                    Medium: { 
                      icon: <Bell className="h-4 w-4 text-warning" />, 
                      bg: 'bg-warning/10', 
                      border: 'border-warning/30' 
                    },
                    Low: { 
                      icon: <Activity className="h-4 w-4 text-success" />, 
                      bg: 'bg-success/10', 
                      border: 'border-success/30' 
                    },
                  };
                  const config = priorityConfig[alert.priority || 'Medium'] || priorityConfig.Medium;
                  
                  return (
                    <div 
                      key={alert.id} 
                      className={cn(
                        "p-4 rounded-lg border flex items-start gap-4",
                        config.bg,
                        config.border
                      )}
                    >
                      <div className="shrink-0 mt-0.5">
                        {config.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-sm">{alert.title}</h4>
                          <Badge variant="outline" className="shrink-0 text-xs">
                            {alert.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {alert.description}
                        </p>
                        {alert.impact && (
                          <p className="text-xs text-muted-foreground mt-2 italic">
                            Impact: {alert.impact}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {format(new Date(alert.created_at), 'MMM d, yyyy')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  No recent alerts for {country.name}
                </p>
                <Button 
                  onClick={handleSyncData}
                  variant="outline"
                  className="mt-4"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  Generate Alerts
                </Button>
              </Card>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CountryProfile;
