import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RiskBadge } from "./RiskBadge";
import { useRiskClassifications } from "@/hooks/useDashboardMetrics";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface RiskTableProps {
  limit?: number;
}

export const RiskTable = ({ limit = 10 }: RiskTableProps) => {
  const { data, isLoading, error } = useRiskClassifications(limit);

  if (error) {
    return (
      <Card variant="gradient">
        <CardContent className="p-6 text-center text-destructive">
          Failed to load risk data
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Top {limit} Highest-Risk Countries
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Rank</TableHead>
                  <TableHead className="text-muted-foreground">Country</TableHead>
                  <TableHead className="text-muted-foreground">Region</TableHead>
                  <TableHead className="text-muted-foreground">Risk Score</TableHead>
                  <TableHead className="text-muted-foreground">Risk Level</TableHead>
                  <TableHead className="text-muted-foreground">Debt/GDP</TableHead>
                  <TableHead className="text-muted-foreground">GDP Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((country) => (
                  <TableRow key={country.code} className="border-border/50">
                    <TableCell className="font-mono text-muted-foreground">{country.rank}</TableCell>
                    <TableCell className="font-semibold">{country.country}</TableCell>
                    <TableCell className="text-muted-foreground">{country.region}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all"
                            style={{ 
                              width: `${country.riskScore}%`,
                              backgroundColor: country.riskScore >= 80 ? 'hsl(0, 72%, 51%)' : 
                                             country.riskScore >= 60 ? 'hsl(38, 92%, 50%)' : 
                                             'hsl(142, 76%, 36%)'
                            }}
                          />
                        </div>
                        <span className="font-mono text-sm">{country.riskScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <RiskBadge level={country.riskLevel as 'Low' | 'Medium' | 'High' | 'Critical'} />
                    </TableCell>
                    <TableCell className="font-mono">{country.debtToGDP?.toFixed(1)}%</TableCell>
                    <TableCell className="font-mono">{country.gdpGrowth?.toFixed(1)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
