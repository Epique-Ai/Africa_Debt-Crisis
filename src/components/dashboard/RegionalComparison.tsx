import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLatestFiscalMetrics } from "@/hooks/useCountryFiscalData";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from 'react';

export const RegionalComparison = () => {
  const { data: fiscalData, isLoading, error } = useLatestFiscalMetrics();

  const regionalAggregates = useMemo(() => {
    if (!fiscalData) return [];

    // Group by region
    const regionMap = new Map<string, { scores: number[], count: number }>();
    
    fiscalData.forEach(item => {
      const region = item.countries?.region || 'Unknown';
      const score = item.risk_score || 0;
      
      if (!regionMap.has(region)) {
        regionMap.set(region, { scores: [], count: 0 });
      }
      
      const regionData = regionMap.get(region)!;
      regionData.scores.push(score);
      regionData.count++;
    });

    // Calculate averages
    return Array.from(regionMap.entries())
      .map(([region, data]) => ({
        region,
        riskScore: Math.round(data.scores.reduce((a, b) => a + b, 0) / data.count),
        count: data.count,
      }))
      .sort((a, b) => b.riskScore - a.riskScore);
  }, [fiscalData]);

  const getBarColor = (riskScore: number) => {
    if (riskScore >= 70) return 'hsl(0, 72%, 51%)';
    if (riskScore >= 55) return 'hsl(38, 92%, 50%)';
    if (riskScore >= 40) return 'hsl(38, 92%, 50%)';
    return 'hsl(142, 76%, 36%)';
  };

  if (error) {
    return (
      <Card variant="gradient" className="h-full">
        <CardContent className="p-6 text-center text-destructive">
          Failed to load regional data
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="gradient" className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Regional Risk Scores</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : regionalAggregates.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalAggregates} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
              <XAxis 
                type="number" 
                stroke="hsl(215, 20%, 55%)"
                tick={{ fill: 'hsl(215, 20%, 55%)' }}
                domain={[0, 100]}
              />
              <YAxis 
                dataKey="region" 
                type="category" 
                stroke="hsl(215, 20%, 55%)"
                tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
                width={75}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(222, 47%, 9%)', 
                  border: '1px solid hsl(222, 30%, 18%)',
                  borderRadius: '8px',
                  color: 'hsl(210, 40%, 96%)'
                }}
                formatter={(value: number) => [`${value}`, 'Risk Score']}
              />
              <Bar dataKey="riskScore" radius={[0, 4, 4, 0]}>
                {regionalAggregates.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.riskScore)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};
