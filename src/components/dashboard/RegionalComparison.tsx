import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { regionalAggregates } from "@/data/africaDebtData";

export const RegionalComparison = () => {
  const getBarColor = (riskScore: number) => {
    if (riskScore >= 70) return 'hsl(0, 72%, 51%)';
    if (riskScore >= 55) return 'hsl(38, 92%, 50%)';
    if (riskScore >= 40) return 'hsl(38, 92%, 50%)';
    return 'hsl(142, 76%, 36%)';
  };

  return (
    <Card variant="gradient" className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Regional Risk Scores</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};
