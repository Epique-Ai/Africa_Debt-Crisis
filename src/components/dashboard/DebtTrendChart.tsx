import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { africaCountries } from "@/data/africaDebtData";

interface DebtTrendChartProps {
  countries?: string[];
}

export const DebtTrendChart = ({ countries = ['Nigeria', 'Kenya', 'Ghana', 'Egypt'] }: DebtTrendChartProps) => {
  const selectedCountries = africaCountries.filter(c => countries.includes(c.country));
  
  const chartData = selectedCountries[0]?.years.map((_, index) => {
    const dataPoint: Record<string, number> = { year: selectedCountries[0].years[index].year };
    selectedCountries.forEach(country => {
      dataPoint[country.country] = country.years[index].debtToGDP;
    });
    return dataPoint;
  }) || [];

  const colors = ['hsl(173, 80%, 40%)', 'hsl(38, 92%, 50%)', 'hsl(142, 76%, 36%)', 'hsl(262, 83%, 58%)'];

  return (
    <Card variant="gradient" className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Debt-to-GDP Trends (%)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
            <XAxis 
              dataKey="year" 
              stroke="hsl(215, 20%, 55%)"
              tick={{ fill: 'hsl(215, 20%, 55%)' }}
            />
            <YAxis 
              stroke="hsl(215, 20%, 55%)"
              tick={{ fill: 'hsl(215, 20%, 55%)' }}
              domain={[0, 'dataMax + 20']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(222, 47%, 9%)', 
                border: '1px solid hsl(222, 30%, 18%)',
                borderRadius: '8px',
                color: 'hsl(210, 40%, 96%)'
              }}
            />
            <Legend />
            {selectedCountries.map((country, index) => (
              <Line
                key={country.country}
                type="monotone"
                dataKey={country.country}
                stroke={colors[index]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
