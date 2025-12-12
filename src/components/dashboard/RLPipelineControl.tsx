import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRLPipeline } from "@/hooks/useRLPipeline";
import { Brain, Loader2, Sparkles, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const RLPipelineControl = () => {
  const { runPipeline, isRunning, lastResult } = useRLPipeline();

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
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Run the Reinforcement Learning pipeline to analyze current fiscal data and generate 
          actionable policy recommendations and real-time alerts.
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
              Analyzing Fiscal Data...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-4 w-4" />
              Run RL Analysis
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
      </CardContent>
    </Card>
  );
};
