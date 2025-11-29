import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { policyRecommendations } from "@/data/africaDebtData";
import { Lightbulb, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const PolicyRecommendations = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'border-l-destructive';
      case 'Medium': return 'border-l-warning';
      case 'Low': return 'border-l-success';
    }
  };

  return (
    <Card variant="gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5 text-primary" />
          Policy Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {policyRecommendations.map((rec, index) => (
          <div 
            key={index}
            className={cn(
              "p-4 rounded-lg bg-secondary/50 border-l-4 transition-all hover:bg-secondary/70",
              getPriorityColor(rec.priority)
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {rec.category}
                </span>
                <h4 className="font-semibold mt-1">{rec.title}</h4>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {rec.timeframe}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Applicable: {rec.applicableCountries.join(', ')}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
