import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCountryFiscalData } from "@/hooks/useCountryFiscalData";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from 'react';

interface DebtTrendChartProps {
  countries?: string[];
}

export const DebtTrendChart = ({ countries = ['Nigeria', 'Kenya', 'Ghana', 'Egypt'] }: DebtTrendChartProps) => {
  const { data: countriesData, isLoading, error } = useCountryFiscalData();

  const { chartData, selectedCountries } = useMemo(() => {
    if (!countriesData) return { chartData: [], selectedCountries: [] };

    const selected = countriesData.filter(c => countries.includes(c.name));
    
    // Get all unique years across all countries
    const allYears = new Set<number>();
    selected.forEach(country => {
      country.fiscalData.forEach(fd => allYears.add(fd.year));
    });
    
    const sortedYears = Array.from(allYears).sort();
    
    const data = sortedYears.map(year => {
      const dataPoint: Record<string, number | string> = { year };
      selected.forEach(country => {
        const yearData = country.fiscalData.find(fd => fd.year === year);
        if (yearData?.debt_to_gdp) {
          dataPoint[country.name] = yearData.debt_to_gdp;
        }
      });
      return dataPoint;
    });

    return { chartData: data, selectedCountries: selected };
  }, [countriesData, countries]);

  const colors = ['hsl(173, 80%, 40%)', 'hsl(38, 92%, 50%)', 'hsl(142, 76%, 36%)', 'hsl(262, 83%, 58%)'];

  if (error) {
    return (
      <Card variant="gradient" className="h-full">
        <CardContent className="p-6 text-center text-destructive">
          Failed to load debt trend data
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="gradient" className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Debt-to-GDP Trends (%)</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : chartData.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No data available
          </div>
        ) : (
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
                  key={country.name}
                  type="monotone"
                  dataKey={country.name}
                  stroke={colors[index]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};
