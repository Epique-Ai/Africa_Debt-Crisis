import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { premiumInsight, sampleQueries } from "@/data/scenarioData";
import { Sparkles, Brain, TrendingUp, FileQuestion, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from "recharts";

// Simulated trajectory data for the premium insight chart
const trajectoryData = [
  { quarter: 'Q1 2024', Nigeria: 44.2, Angola: 69.5, Kenya: 71.2, threshold: 85 },
  { quarter: 'Q2 2024', Nigeria: 48.5, Angola: 71.2, Kenya: 72.8, threshold: 85 },
  { quarter: 'Q3 2024', Nigeria: 55.2, Angola: 72.8, Kenya: 74.1, threshold: 85 },
  { quarter: 'Q4 2024', Nigeria: 62.8, Angola: 74.5, Kenya: 75.5, threshold: 85 },
  { quarter: 'Q1 2025', Nigeria: 72.5, Angola: 76.2, Kenya: 77.2, threshold: 85 },
  { quarter: 'Q2 2025', Nigeria: 86.2, Angola: 78.5, Kenya: 78.8, threshold: 85 },
  { quarter: 'Q3 2025', Nigeria: 92.5, Angola: 81.2, Kenya: 80.2, threshold: 85 },
  { quarter: 'Q4 2025', Nigeria: 98.2, Angola: 86.5, Kenya: 81.5, threshold: 85 },
  { quarter: 'Q1 2026', Nigeria: 102.5, Angola: 90.2, Kenya: 83.2, threshold: 85 },
  { quarter: 'Q2 2026', Nigeria: 105.8, Angola: 92.8, Kenya: 86.5, threshold: 85 },
];

export const PremiumInsight = () => {
  return (
    <Card variant="gradient" className="border-primary/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            Premium Query Intelligence Insight
          </CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            Impact Score: {premiumInsight.query.impactScore}/100
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          AI-selected highest-impact analytical query from the intelligence layer
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Query Display */}
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <Badge variant="secondary" className="mb-2 text-xs">
                {premiumInsight.query.category}
              </Badge>
              <p className="text-sm font-medium text-foreground">
                "{premiumInsight.query.query}"
              </p>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            IMF Intervention Probability Chart
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trajectoryData}>
                <defs>
                  <linearGradient id="nigeriaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="angolaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="kenyaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="quarter" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  domain={[40, 110]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`${value}%`, 'Debt/GDP']}
                />
                <ReferenceLine 
                  y={85} 
                  stroke="hsl(var(--destructive))" 
                  strokeDasharray="8 4" 
                  strokeWidth={2}
                  label={{ 
                    value: 'IMF Intervention Threshold', 
                    fill: 'hsl(var(--destructive))', 
                    fontSize: 11,
                    fontWeight: 600
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="Nigeria" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Angola" 
                  stroke="hsl(var(--warning))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--warning))', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Kenya" 
                  stroke="hsl(var(--chart-3))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 4 }}
                />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Projected debt-to-GDP trajectories with IMF intervention threshold (85% GDP)
          </p>
        </div>

        {/* Narrative Insight */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            Analytical Narrative
          </div>
          <div className="p-4 rounded-lg bg-secondary/50 text-sm text-muted-foreground leading-relaxed">
            <div className="prose prose-sm prose-invert max-w-none" dangerouslySetInnerHTML={{ 
              __html: premiumInsight.narrative.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>').replace(/\n\n/g, '</p><p class="mt-3">') 
            }} />
          </div>
        </div>

        {/* Policy Interpretation */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <FileQuestion className="h-4 w-4 text-muted-foreground" />
            Policy Interpretation
          </div>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-sm text-muted-foreground leading-relaxed">
            <div className="prose prose-sm prose-invert max-w-none" dangerouslySetInnerHTML={{ 
              __html: premiumInsight.policyInterpretation.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>').replace(/\n\n/g, '</p><p class="mt-3">').replace(/\d\.\s/g, '<br/><span class="text-primary font-semibold">→</span> ')
            }} />
          </div>
        </div>

        {/* Other Queries Considered */}
        <div className="border-t border-border/50 pt-4">
          <p className="text-xs text-muted-foreground mb-2">Other high-impact queries considered:</p>
          <div className="flex flex-wrap gap-2">
            {sampleQueries.filter(q => q.impactScore !== premiumInsight.query.impactScore).slice(0, 4).map((query, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {query.category} ({query.impactScore})
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
