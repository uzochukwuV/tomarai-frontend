import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from 'date-fns';
import { MarketMetric } from '@/types';

interface MetricsChartProps {
  data: MarketMetric[];
  title: string;
  description?: string;
}

const formatCurrency = (value: number) => {
  // Format large numbers (billions/trillions)
  if (value >= 1000000000000) {
    return `$${(value / 1000000000000).toFixed(2)}T`;
  } else if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(2)}B`;
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else {
    return `$${value.toFixed(2)}`;
  }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-md shadow-md">
        <p className="font-medium">{format(parseISO(label), 'MMM dd, yyyy')}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`tooltip-${index}`} className="flex items-center space-x-2 mt-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.name}: </span>
            <span className="font-medium">
              {entry.name === 'Market Cap' 
                ? formatCurrency(entry.value)
                : `${entry.value.toFixed(2)}%`}
            </span>
          </div>
        ))}
      </div>
    );
  }
  
  return null;
};

const MetricsChart: React.FC<MetricsChartProps> = ({ data, title, description }) => {
  const chartData = useMemo(() => {
    // Reverse the data to display in chronological order
    return [...data].reverse().map(item => ({
      date: item.DATE,
      marketCap: item.TOTAL_CRYPTO_MCAP,
      highGradePercentage: item.TM_GRADE_PERC_HIGH_COINS,
    }));
  }, [data]);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorMarketCap" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorHighGrade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="date"
                tickFormatter={(tick) => format(parseISO(tick), 'MMM dd')}
                className="text-xs text-muted-foreground"
              />
              <YAxis
                yAxisId="left"
                tickFormatter={formatCurrency}
                className="text-xs text-muted-foreground"
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(tick) => `${tick}%`}
                domain={[0, 100]}
                className="text-xs text-muted-foreground"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="marketCap"
                name="Market Cap"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#colorMarketCap)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="highGradePercentage"
                name="High Grade %"
                stroke="hsl(var(--chart-2))"
                fillOpacity={1}
                fill="url(#colorHighGrade)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsChart;