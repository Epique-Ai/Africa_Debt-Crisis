import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { forecastData } from "@/data/africaDebtData";
import { AlertTriangle, TrendingUp, TrendingDown, Minus } from "lucide-react";

export const ForecastChart = () => {
  const [selectedCountry, setSelectedCountry] = useState('Nigeria');
  
  const countryData = forecastData.find(f => f.country === selectedCountry);
  
  if (!countryData) return null;

  const chartData = [
    ...countryData.historical.map(h => ({
      year: h.year,
      value: h.value,
      type: 'historical'
    })),
    ...countryData.forecast.map(f => ({
      year: f.year,
      value: f.value,
      lower: f.lower,
      upper: f.upper,
      type: 'forecast'
    }))
  ];

  const getTrendIcon = () => {
    switch (countryData.trend) {
      case 'improving': return <TrendingDown className="h-5 w-5 text-success" />;
      case 'worsening': return <TrendingUp className="h-5 w-5 text-destructive" />;
      default: return <Minus className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <Card variant="gradient">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg">5-Year Debt/GDP Forecast</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {getTrendIcon()}
            <span className="capitalize">{countryData.trend} trend</span>
          </div>
        </div>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-40 bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {forecastData.map(f => (
              <SelectItem key={f.country} value={f.country}>{f.country}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {countryData.alert && (
          <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-warning/10 border border-warning/20">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-sm text-warning">{countryData.alert}</span>
          </div>
        )}
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
                `${value.toFixed(1)}%`, 
                name === 'value' ? 'Debt/GDP' : name
              ]}
            />
            <ReferenceLine 
              x={2023} 
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
      </CardContent>
    </Card>
  );
};
