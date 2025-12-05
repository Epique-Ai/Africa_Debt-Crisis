import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Globe, 
  Wallet,
  Activity,
  Target,
  FileText,
  ChevronRight
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
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
import { africaCountries, riskClassifications, policyRecommendations, type CountryData } from "@/data/africaDebtData";
import { fiscalScenarios } from "@/data/scenarioData";
import { liveAlerts, rlForecasts, repaymentSchedule } from "@/data/liveAlertsData";
import { cn } from "@/lib/utils";

const CountryProfile = () => {
  const { countrySlug } = useParams<{ countrySlug: string }>();
  
  // Find country data by slug
  const countryName = countrySlug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const countryData = africaCountries.find(c => 
    c.country.toLowerCase().replace(' ', '-') === countrySlug || 
    c.country.toLowerCase() === countryName?.toLowerCase()
  );
  
  const riskData = riskClassifications.find(r => r.country === countryData?.country);
  const countryAlerts = liveAlerts.filter(a => a.country === countryData?.country);
  const countryForecast = rlForecasts.find(f => f.country === countryData?.country);
  const countryRepayments = repaymentSchedule.filter(r => r.country === countryData?.country);
  const applicableRecommendations = policyRecommendations.filter(r => 
    r.applicableCountries.includes(countryData?.country || '') || 
    r.applicableCountries.includes('All African countries')
  );

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
  
  // Calculate changes
  const debtChange = latestYear.debtToGDP - previousYear.debtToGDP;
  const deficitChange = latestYear.deficitToGDP - previousYear.deficitToGDP;
  const growthChange = latestYear.gdpGrowth - previousYear.gdpGrowth;

  // Prepare scenario projections for this country
  const scenarioProjections = fiscalScenarios.map(scenario => ({
    name: scenario.name,
    data: scenario.projections.map(p => ({
      year: p.year,
      debtToGDP: latestYear.debtToGDP * (1 + (p.fiscalRiskIndex - 55) / 100),
    }))
  }));

  // Radar chart data for risk profile
  const radarData = [
    { metric: 'Debt Level', value: Math.min(100, (latestYear.debtToGDP / 150) * 100), fullMark: 100 },
    { metric: 'Deficit', value: Math.min(100, Math.abs(latestYear.deficitToGDP) * 10), fullMark: 100 },
    { metric: 'Inflation', value: Math.min(100, latestYear.inflationRate * 3), fullMark: 100 },
    { metric: 'External Debt', value: latestYear.externalDebtShare, fullMark: 100 },
    { metric: 'Revenue Volatility', value: riskData?.revenueVolatility ? riskData.revenueVolatility * 4 : 50, fullMark: 100 },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-12 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto max-w-7xl">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
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

        {/* Key Metrics Grid */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-7xl">
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
                    <Activity className="h-5 w-5 text-success" />
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

        {/* Main Content Tabs */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-7xl">
            <Tabs defaultValue="analytics" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="policy">Policy</TabsTrigger>
              </TabsList>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Historical Trends */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Historical Fiscal Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={countryData.years}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
                          <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="debtToGDP" name="Debt/GDP %" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ fill: 'hsl(var(--chart-1))' }} />
                          <Line type="monotone" dataKey="deficitToGDP" name="Deficit/GDP %" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ fill: 'hsl(var(--chart-2))' }} />
                          <Line type="monotone" dataKey="gdpGrowth" name="GDP Growth %" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ fill: 'hsl(var(--chart-3))' }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Risk Profile Radar */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Risk Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="hsl(var(--muted-foreground) / 0.3)" />
                          <PolarAngleAxis dataKey="metric" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                          <Radar name="Risk Level" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Revenue & Expenditure */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Revenue vs Expenditure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={countryData.years}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
                          <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Legend />
                          <Bar dataKey="revenueToGDP" name="Revenue/GDP %" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="expenditureToGDP" name="Expenditure/GDP %" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Key Risk Drivers */}
                  {riskData && (
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="text-lg">Key Risk Drivers</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {riskData.drivers.map((driver, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                              <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center">
                                <AlertTriangle className="h-4 w-4 text-destructive" />
                              </div>
                              <span className="font-medium">{driver}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-6 grid grid-cols-2 gap-4">
                          <div className="p-3 rounded-lg bg-muted/30 text-center">
                            <p className="text-xs text-muted-foreground">Revenue Volatility</p>
                            <p className="text-xl font-bold">{riskData.revenueVolatility}%</p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/30 text-center">
                            <p className="text-xs text-muted-foreground">External Debt</p>
                            <p className="text-xl font-bold">{latestYear.externalDebtShare}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              {/* Scenarios Tab */}
              <TabsContent value="scenarios" className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Scenario Stress Test Projections</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Projected debt trajectories under different economic scenarios
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={[
                        { year: 2023, baseline: latestYear.debtToGDP, optimistic: latestYear.debtToGDP * 0.95, adverse: latestYear.debtToGDP * 1.08, reform: latestYear.debtToGDP * 0.92 },
                        { year: 2024, baseline: latestYear.debtToGDP * 1.02, optimistic: latestYear.debtToGDP * 0.90, adverse: latestYear.debtToGDP * 1.15, reform: latestYear.debtToGDP * 0.85 },
                        { year: 2025, baseline: latestYear.debtToGDP * 1.04, optimistic: latestYear.debtToGDP * 0.85, adverse: latestYear.debtToGDP * 1.22, reform: latestYear.debtToGDP * 0.78 },
                        { year: 2026, baseline: latestYear.debtToGDP * 1.05, optimistic: latestYear.debtToGDP * 0.80, adverse: latestYear.debtToGDP * 1.30, reform: latestYear.debtToGDP * 0.72 },
                        { year: 2027, baseline: latestYear.debtToGDP * 1.06, optimistic: latestYear.debtToGDP * 0.75, adverse: latestYear.debtToGDP * 1.38, reform: latestYear.debtToGDP * 0.68 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
                        <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="%" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                          formatter={(value: number) => `${value.toFixed(1)}%`}
                        />
                        <Legend />
                        <Area type="monotone" dataKey="adverse" name="Adverse" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive) / 0.2)" />
                        <Area type="monotone" dataKey="baseline" name="Baseline" stroke="hsl(var(--warning))" fill="hsl(var(--warning) / 0.2)" />
                        <Area type="monotone" dataKey="optimistic" name="Optimistic" stroke="hsl(var(--success))" fill="hsl(var(--success) / 0.2)" />
                        <Area type="monotone" dataKey="reform" name="Reform" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Scenario Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fiscalScenarios.slice(0, 4).map((scenario) => (
                    <Card key={scenario.id} className={cn("border-l-4", 
                      scenario.id === 'baseline' && "border-l-warning",
                      scenario.id === 'optimistic' && "border-l-success",
                      scenario.id === 'adverse' && "border-l-destructive",
                      scenario.id === 'reform' && "border-l-primary"
                    )}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{scenario.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{scenario.description}</p>
                        <div className="space-y-1">
                          {scenario.interpretations.slice(0, 2).map((point, idx) => (
                            <p key={idx} className="text-xs text-foreground/80 flex items-start gap-2">
                              <ChevronRight className="h-3 w-3 mt-0.5 text-primary shrink-0" />
                              {point}
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Alerts Tab */}
              <TabsContent value="alerts" className="space-y-6">
                {countryAlerts.length > 0 ? (
                  <div className="space-y-4">
                    {countryAlerts.map((alert) => {
                      const statusConfig = {
                        green: { color: 'text-success', bg: 'bg-success/20 border-success/30' },
                        yellow: { color: 'text-warning', bg: 'bg-warning/20 border-warning/30' },
                        red: { color: 'text-destructive', bg: 'bg-destructive/20 border-destructive/30' },
                      };
                      const config = statusConfig[alert.status];
                      
                      return (
                        <Card key={alert.id} className={cn("border", config.bg)}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-semibold">{alert.metric}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(alert.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                              </div>
                              <Badge className={cn(config.bg, config.color, "border capitalize")}>
                                {alert.status === 'green' ? 'Positive' : alert.status === 'yellow' ? 'Caution' : 'Alert'}
                              </Badge>
                            </div>
                            <p className="text-sm">{alert.insight}</p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <Card className="glass-card">
                    <CardContent className="p-8 text-center">
                      <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No recent alerts for {countryData.country}</p>
                    </CardContent>
                  </Card>
                )}

                {/* RL Forecast */}
                {countryForecast && (
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        RL Agent Forecast
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground">Current</p>
                          <p className="text-2xl font-bold">{countryForecast.currentValue}%</p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground">2024 Forecast</p>
                          <p className="text-2xl font-bold">{countryForecast.forecast2024}%</p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground">2025 Forecast</p>
                          <p className="text-2xl font-bold">{countryForecast.forecast2025}%</p>
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

                {/* Repayment Schedule */}
                {countryRepayments.length > 0 && (
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Upcoming Debt Repayments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {countryRepayments.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                            <div>
                              <p className="font-medium">{item.quarter} {item.year}</p>
                              <p className="text-sm text-muted-foreground">{item.type}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-mono font-bold">${(item.amount / 1000).toFixed(1)}B</p>
                              <Badge className={cn(
                                item.riskLevel === 'low' && "bg-success/20 text-success",
                                item.riskLevel === 'medium' && "bg-warning/20 text-warning",
                                item.riskLevel === 'high' && "bg-destructive/20 text-destructive"
                              )}>
                                {item.riskLevel} risk
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Policy Tab */}
              <TabsContent value="policy" className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {applicableRecommendations.map((rec, idx) => (
                    <Card key={idx} className={cn("border-l-4",
                      rec.priority === 'High' && "border-l-destructive",
                      rec.priority === 'Medium' && "border-l-warning",
                      rec.priority === 'Low' && "border-l-success"
                    )}>
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <Badge variant="outline" className="mb-2">{rec.category}</Badge>
                            <CardTitle className="text-base">{rec.title}</CardTitle>
                          </div>
                          <Badge className={cn(
                            rec.priority === 'High' && "bg-destructive/20 text-destructive",
                            rec.priority === 'Medium' && "bg-warning/20 text-warning",
                            rec.priority === 'Low' && "bg-success/20 text-success"
                          )}>
                            {rec.priority} Priority
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Target className="h-3 w-3" />
                          <span>Timeframe: {rec.timeframe}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CountryProfile;
