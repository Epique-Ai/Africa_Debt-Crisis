import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fiscalScenarios, getScenarioComparisonData, type FiscalScenario } from "@/data/scenarioData";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, ReferenceLine 
} from "recharts";
import { Activity, TrendingUp, TrendingDown, AlertTriangle, Sparkles, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const scenarioIcons: Record<string, React.ReactNode> = {
  baseline: <Activity className="h-4 w-4" />,
  optimistic: <TrendingUp className="h-4 w-4" />,
  adverse: <TrendingDown className="h-4 w-4" />,
  highRisk: <AlertTriangle className="h-4 w-4" />,
  reform: <Sparkles className="h-4 w-4" />
};

const ScenarioCard = ({ scenario }: { scenario: FiscalScenario }) => {
  const lastProjection = scenario.projections[scenario.projections.length - 1];
  const firstProjection = scenario.projections[0];
  const debtChange = lastProjection.debtToGDP - firstProjection.debtToGDP;
  
  return (
    <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
      <div className="flex items-center gap-2 mb-3">
        <div 
          className="p-2 rounded-lg" 
          style={{ backgroundColor: `${scenario.color}20` }}
        >
          {scenarioIcons[scenario.id]}
        </div>
        <div>
          <h4 className="font-semibold text-sm">{scenario.name}</h4>
          <p className="text-xs text-muted-foreground">{scenario.description.substring(0, 60)}...</p>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 mb-3">
        <div className="text-center p-2 rounded bg-background/50">
          <div className="text-xs text-muted-foreground">GDP '28</div>
          <div className="font-mono font-semibold text-sm" style={{ color: scenario.color }}>
            {lastProjection.gdpGrowth}%
          </div>
        </div>
        <div className="text-center p-2 rounded bg-background/50">
          <div className="text-xs text-muted-foreground">Inflation</div>
          <div className="font-mono font-semibold text-sm">
            {lastProjection.inflation}%
          </div>
        </div>
        <div className="text-center p-2 rounded bg-background/50">
          <div className="text-xs text-muted-foreground">Unemp.</div>
          <div className="font-mono font-semibold text-sm">
            {lastProjection.unemployment}%
          </div>
        </div>
        <div className="text-center p-2 rounded bg-background/50">
          <div className="text-xs text-muted-foreground">Risk Idx</div>
          <div className={cn(
            "font-mono font-semibold text-sm",
            lastProjection.fiscalRiskIndex > 70 ? "text-destructive" :
            lastProjection.fiscalRiskIndex > 50 ? "text-warning" : "text-success"
          )}>
            {lastProjection.fiscalRiskIndex}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Debt/GDP by 2028:</span>
        <span className={cn(
          "font-semibold",
          debtChange > 0 ? "text-destructive" : "text-success"
        )}>
          {lastProjection.debtToGDP}% ({debtChange > 0 ? '+' : ''}{debtChange.toFixed(1)}%)
        </span>
      </div>
    </div>
  );
};

export const ScenarioStressTest = () => {
  const comparisonData = getScenarioComparisonData();

  return (
    <Card variant="gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="h-5 w-5 text-primary" />
          Policy Stress-Testing Module
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          5-year fiscal scenario analysis with GDP, inflation, unemployment, and risk projections
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
            <TabsTrigger value="overview">Scenario Overview</TabsTrigger>
            <TabsTrigger value="debtChart">Debt Trajectories</TabsTrigger>
            <TabsTrigger value="riskChart">Risk Index</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fiscalScenarios.map(scenario => (
                <ScenarioCard key={scenario.id} scenario={scenario} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="debtChart">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={comparisonData}>
                  <defs>
                    {fiscalScenarios.map(scenario => (
                      <linearGradient key={scenario.id} id={`gradient-${scenario.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={scenario.color} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={scenario.color} stopOpacity={0}/>
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    dataKey="year" 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    domain={[40, 120]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number, name: string) => {
                      const scenarioName = name.replace('_debtToGDP', '').replace(/([A-Z])/g, ' $1').trim();
                      return [`${value}%`, scenarioName];
                    }}
                  />
                  <ReferenceLine y={85} stroke="hsl(var(--destructive))" strokeDasharray="5 5" label={{ value: 'IMF Threshold', fill: 'hsl(var(--destructive))', fontSize: 10 }} />
                  <ReferenceLine y={60} stroke="hsl(var(--warning))" strokeDasharray="5 5" label={{ value: 'Caution', fill: 'hsl(var(--warning))', fontSize: 10 }} />
                  {fiscalScenarios.map(scenario => (
                    <Area
                      key={scenario.id}
                      type="monotone"
                      dataKey={`${scenario.id}_debtToGDP`}
                      name={scenario.name}
                      stroke={scenario.color}
                      fill={`url(#gradient-${scenario.id})`}
                      strokeWidth={2}
                    />
                  ))}
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Projected average Debt-to-GDP trajectories across African economies under different scenarios
            </p>
          </TabsContent>

          <TabsContent value="riskChart">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={comparisonData}>
                  <defs>
                    {fiscalScenarios.map(scenario => (
                      <linearGradient key={`risk-${scenario.id}`} id={`risk-gradient-${scenario.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={scenario.color} stopOpacity={0.4}/>
                        <stop offset="95%" stopColor={scenario.color} stopOpacity={0}/>
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    dataKey="year" 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    domain={[20, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number, name: string) => {
                      const scenarioName = name.replace('_fiscalRiskIndex', '').replace(/([A-Z])/g, ' $1').trim();
                      return [value, scenarioName];
                    }}
                  />
                  <ReferenceLine y={70} stroke="hsl(var(--destructive))" strokeDasharray="5 5" label={{ value: 'High Risk', fill: 'hsl(var(--destructive))', fontSize: 10 }} />
                  <ReferenceLine y={50} stroke="hsl(var(--warning))" strokeDasharray="5 5" label={{ value: 'Elevated', fill: 'hsl(var(--warning))', fontSize: 10 }} />
                  {fiscalScenarios.map(scenario => (
                    <Area
                      key={scenario.id}
                      type="monotone"
                      dataKey={`${scenario.id}_fiscalRiskIndex`}
                      name={scenario.name}
                      stroke={scenario.color}
                      fill={`url(#risk-gradient-${scenario.id})`}
                      strokeWidth={2}
                    />
                  ))}
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Composite Fiscal Risk Index (0-100) projections under each scenario
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
