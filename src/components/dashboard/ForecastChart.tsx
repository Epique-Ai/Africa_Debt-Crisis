import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCountryFiscalData } from "@/hooks/useCountryFiscalData";
import { AlertTriangle, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const ForecastChart = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const { data: countriesData, isLoading, error } = useCountryFiscalData();

  const { countryOptions, countryData, chartData, trend } = useMemo(() => {
    if (!countriesData || countriesData.length === 0) {
      return { countryOptions: [], countryData: null, chartData: [], trend: 'stable' };
    }

    const options = countriesData.map(c => ({ value: c.id, label: c.name }));
    
    // Auto-select first country if none selected
    const currentCountryId = selectedCountry || countriesData[0]?.id;
    const currentCountry = countriesData.find(c => c.id === currentCountryId);
    
    if (!currentCountry) {
      return { countryOptions: options, countryData: null, chartData: [], trend: 'stable' };
    }

    // Get historical data
    const historicalData = currentCountry.fiscalData
      .sort((a, b) => a.year - b.year)
      .map(fd => ({
        year: fd.year,
        value: fd.debt_to_gdp || 0,
        type: 'historical' as const,
      }));

    // Generate simple forecast (linear extrapolation for demo)
    const lastTwoYears = historicalData.slice(-2);
    let forecastTrend: 'improving' | 'stable' | 'worsening' = 'stable';
    
    if (lastTwoYears.length === 2) {
      const change = lastTwoYears[1].value - lastTwoYears[0].value;
      if (change > 2) forecastTrend = 'worsening';
      else if (change < -2) forecastTrend = 'improving';
    }

    const lastValue = historicalData[historicalData.length - 1]?.value || 50;
    const lastYear = historicalData[historicalData.length - 1]?.year || 2024;
    
    // Generate 3 years of forecast
    const forecastData = [1, 2, 3].map(i => {
      const trendMultiplier = forecastTrend === 'worsening' ? 1.5 : forecastTrend === 'improving' ? -1 : 0.5;
      const baseValue = lastValue + (i * trendMultiplier);
      return {
        year: lastYear + i,
        value: Math.max(0, baseValue),
        upper: Math.max(0, baseValue + 5),
        lower: Math.max(0, baseValue - 5),
        type: 'forecast' as const,
      };
    });

    return {
      countryOptions: options,
      countryData: currentCountry,
      chartData: [...historicalData, ...forecastData],
      trend: forecastTrend,
    };
  }, [countriesData, selectedCountry]);

  const getTrendIcon = () => {
    switch (trend) {
      case 'improving': return <TrendingDown className="h-5 w-5 text-success" />;
      case 'worsening': return <TrendingUp className="h-5 w-5 text-destructive" />;
      default: return <Minus className="h-5 w-5 text-muted-foreground" />;
    }
  };

  if (error) {
    return (
      <Card variant="gradient">
        <CardContent className="p-6 text-center text-destructive">
          Failed to load forecast data
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="gradient">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg">5-Year Debt/GDP Forecast</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {getTrendIcon()}
            <span className="capitalize">{trend} trend</span>
          </div>
        </div>
        {!isLoading && countryOptions.length > 0 && (
          <Select 
            value={selectedCountry || countryOptions[0]?.value} 
            onValueChange={setSelectedCountry}
          >
            <SelectTrigger className="w-40 bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countryOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
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
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="historicalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(173, 80%, 40%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(173, 80%, 40%)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
              <XAxis 
                dataKey="year" 
                stroke="hsl(215, 20%, 55%)"
                tick={{ fill: 'hsl(215, 20%, 55%)' }}
              />
              <YAxis 
                stroke="hsl(215, 20%, 55%)"
                tick={{ fill: 'hsl(215, 20%, 55%)' }}
                domain={['dataMin - 10', 'dataMax + 10']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(222, 47%, 9%)', 
                  border: '1px solid hsl(222, 30%, 18%)',
                  borderRadius: '8px',
                  color: 'hsl(210, 40%, 96%)'
                }}
                formatter={(value: number, name: string) => [
                  `${value?.toFixed(1)}%`, 
                  name === 'value' ? 'Debt/GDP' : name
                ]}
              />
              <ReferenceLine 
                x={chartData.find(d => d.type === 'forecast')?.year || 2024} 
                stroke="hsl(222, 30%, 30%)" 
                strokeDasharray="5 5"
                label={{ value: 'Forecast →', fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(173, 80%, 40%)"
                fill="url(#historicalGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="upper"
                stroke="transparent"
                fill="hsl(38, 92%, 50%)"
                fillOpacity={0.1}
              />
              <Area
                type="monotone"
                dataKey="lower"
                stroke="transparent"
                fill="hsl(222, 47%, 9%)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};
