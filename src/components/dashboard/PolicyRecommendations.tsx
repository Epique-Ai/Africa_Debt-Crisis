import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePolicyRecommendations } from "@/hooks/usePolicyRecommendations";
import { Lightbulb, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export const PolicyRecommendations = () => {
  const { data: recommendations, isLoading, error } = usePolicyRecommendations();

  const getPriorityColor = (priority: string | null) => {
    switch (priority) {
      case 'High': return 'border-l-destructive';
      case 'Medium': return 'border-l-warning';
      case 'Low': return 'border-l-success';
      default: return 'border-l-muted';
    }
  };

  if (error) {
    return (
      <Card variant="gradient">
        <CardContent className="p-6 text-center text-destructive">
          Failed to load recommendations
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5 text-primary" />
          Policy Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : recommendations?.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No recommendations available
          </div>
        ) : (
          recommendations?.map((rec) => (
            <div 
              key={rec.id}
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
                {rec.timeframe && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {rec.timeframe}
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
              {rec.countries && rec.countries.length > 0 && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Applicable: {rec.countries.map(c => c.name).join(', ')}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
