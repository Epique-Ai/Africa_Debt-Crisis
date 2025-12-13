import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useRLPipeline } from "@/hooks/useRLPipeline";
import { useCountryAnalysis } from "@/hooks/useCountryAnalysis";
import { useCountries } from "@/hooks/useCountries";
import { 
  Brain, 
  Loader2, 
  Sparkles, 
  AlertTriangle, 
  Lightbulb, 
  CheckCircle2,
  TrendingUp,
  Target,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

export const RLPipelineControl = () => {
  const { runPipeline, isRunning, lastResult } = useRLPipeline();
  const { analyzeCountry, isAnalyzing, analysisResult, clearAnalysis } = useCountryAnalysis();
  const { data: countries, isLoading: countriesLoading } = useCountries();
  const [selectedCountryId, setSelectedCountryId] = useState<string>("");

  const selectedCountry = countries?.find(c => c.id === selectedCountryId);

  const handleCountryAnalysis = async () => {
    if (selectedCountryId && selectedCountry) {
      await analyzeCountry(selectedCountryId, selectedCountry.name);
    }
  };

  return (
    <Card variant="gradient" className="border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="h-5 w-5 text-primary" />
          RL Intelligence Pipeline
          <Badge variant="outline" className="ml-2 text-xs bg-primary/10 text-primary border-primary/30">
            AI-Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Global Analysis Section */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Run the RL pipeline to analyze all countries and generate alerts & recommendations.
          </p>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-lg bg-secondary/50">
              <Sparkles className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">Analyzes</p>
              <p className="text-sm font-semibold">15+ Countries</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <AlertTriangle className="h-5 w-5 mx-auto mb-1 text-warning" />
              <p className="text-xs text-muted-foreground">Generates</p>
              <p className="text-sm font-semibold">Live Alerts</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <Lightbulb className="h-5 w-5 mx-auto mb-1 text-success" />
              <p className="text-xs text-muted-foreground">Creates</p>
              <p className="text-sm font-semibold">Policy Recs</p>
            </div>
          </div>

          <Button 
            onClick={runPipeline} 
            disabled={isRunning}
            className="w-full"
            size="lg"
          >
            {isRunning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing All Countries...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Run Global RL Analysis
              </>
            )}
          </Button>

          {lastResult && (
            <div className={cn(
              "p-4 rounded-lg border",
              lastResult.success 
                ? "bg-success/10 border-success/30" 
                : "bg-destructive/10 border-destructive/30"
            )}>
              <div className="flex items-start gap-2">
                {lastResult.success ? (
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                )}
                <div>
                  <p className={cn(
                    "font-medium",
                    lastResult.success ? "text-success" : "text-destructive"
                  )}>
                    {lastResult.success ? "Analysis Complete" : "Analysis Failed"}
                  </p>
                  {lastResult.success ? (
                    <div className="text-sm text-muted-foreground mt-1 space-y-1">
                      <p>• Generated {lastResult.alertsGenerated} new alerts</p>
                      <p>• Created {lastResult.recommendationsGenerated} policy recommendations</p>
                      {lastResult.summary && (
                        <p className="mt-2 text-foreground/80 italic">"{lastResult.summary}"</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">{lastResult.error}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or analyze specific country</span>
          </div>
        </div>

        {/* Country-Specific Analysis Section */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Select
              value={selectedCountryId}
              onValueChange={(value) => {
                setSelectedCountryId(value);
                clearAnalysis();
              }}
              disabled={countriesLoading}
            >
              <SelectTrigger className="flex-1 bg-background">
                <SelectValue placeholder="Select a country..." />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                {countries?.map((country) => (
                  <SelectItem key={country.id} value={country.id}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              onClick={handleCountryAnalysis}
              disabled={!selectedCountryId || isAnalyzing}
              variant="secondary"
            >
              {isAnalyzing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Target className="h-4 w-4 mr-1" />
                  Analyze
                </>
              )}
            </Button>
          </div>

          {/* Country Analysis Results */}
          {analysisResult && analysisResult.success && (
            <div className="space-y-4 animate-in fade-in-50 duration-300">
              {/* Status Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-xs text-muted-foreground mb-1">Current Status</p>
                  <p className="text-sm font-medium">{analysisResult.currentStatus}</p>
                </div>
                <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <p className="text-xs text-muted-foreground mb-1">Risk Assessment</p>
                  <p className="text-sm font-medium">{analysisResult.riskAssessment}</p>
                </div>
              </div>

              {/* Predictions Chart */}
              {analysisResult.predictions && analysisResult.predictions.length > 0 && (
                <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    5-Year Predictions for {analysisResult.countryName}
                  </h4>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={analysisResult.predictions}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
                      <XAxis 
                        dataKey="year" 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={10} 
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={10} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          fontSize: '11px'
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '10px' }} />
                      <Line 
                        type="monotone" 
                        dataKey="debtToGDP" 
                        name="Debt/GDP %" 
                        stroke="hsl(var(--chart-1))" 
                        strokeWidth={2} 
                        dot={false} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="riskScore" 
                        name="Risk Score" 
                        stroke="hsl(var(--destructive))" 
                        strokeWidth={2} 
                        dot={false} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="gdpGrowth" 
                        name="GDP Growth %" 
                        stroke="hsl(var(--success))" 
                        strokeWidth={2} 
                        dot={false} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Key Insights */}
              {analysisResult.keyInsights && analysisResult.keyInsights.length > 0 && (
                <div className="p-3 rounded-lg bg-muted/50">
                  <h4 className="text-xs font-semibold text-muted-foreground mb-2">Key Insights</h4>
                  <ul className="space-y-1">
                    {analysisResult.keyInsights.map((insight, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {analysisResult.recommendations && analysisResult.recommendations.length > 0 && (
                <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                  <h4 className="text-xs font-semibold text-success mb-2 flex items-center gap-1">
                    <Lightbulb className="h-3 w-3" />
                    Policy Recommendations
                  </h4>
                  <ul className="space-y-1">
                    {analysisResult.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-success font-medium">{idx + 1}.</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Error State */}
          {analysisResult && !analysisResult.success && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <p className="text-sm text-destructive">
                  {analysisResult.error || "Failed to analyze country"}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
