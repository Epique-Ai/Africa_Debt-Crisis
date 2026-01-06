import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePolicyRecommendations } from "@/hooks/usePolicyRecommendations";
import { Lightbulb, Clock, ChevronDown, ChevronUp, Target, TrendingUp, Wallet, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const PolicyRecommendations = () => {
  const { data: recommendations, isLoading, error } = usePolicyRecommendations();
  const [showAll, setShowAll] = useState(false);

  const getPriorityColor = (priority: string | null) => {
    switch (priority) {
      case 'High': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'Medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'Low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Revenue': return <Wallet className="h-4 w-4" />;
      case 'Expenditure': return <TrendingUp className="h-4 w-4" />;
      case 'Debt Management': return <Target className="h-4 w-4" />;
      case 'Structural Reform': return <Building className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
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

  const displayedRecs = showAll ? recommendations : recommendations?.slice(0, 6);

  return (
    <Card variant="gradient">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-primary" />
            Policy Recommendations
          </div>
          {recommendations && recommendations.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {recommendations.length} total
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-28 w-full" />
            ))}
          </div>
        ) : recommendations?.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No recommendations available. Run RL Analysis to generate.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {displayedRecs?.map((rec) => (
                <div 
                  key={rec.id}
                  className="p-3 rounded-lg bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <div className="p-1.5 rounded bg-primary/10 text-primary">
                      {getCategoryIcon(rec.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", getPriorityColor(rec.priority))}>
                          {rec.priority || 'Medium'}
                        </Badge>
                        {rec.timeframe && (
                          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                            <Clock className="h-2.5 w-2.5" />
                            {rec.timeframe}
                          </span>
                        )}
                      </div>
                      <h4 className="font-medium text-sm leading-tight line-clamp-2">{rec.title}</h4>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{rec.description}</p>
                  {rec.countries && rec.countries.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {rec.countries.slice(0, 3).map(c => (
                        <span key={c.id} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                          {c.code}
                        </span>
                      ))}
                      {rec.countries.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                          +{rec.countries.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {recommendations && recommendations.length > 6 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAll(!showAll)}
                className="w-full mt-2"
              >
                {showAll ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Show All ({recommendations.length - 6} more)
                  </>
                )}
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
