
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { CartesianGrid, Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface LineChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export const LineChart = ({
  data,
  index,
  categories,
  colors = ['violet'],
  valueFormatter = (value) => `${value}`,
  className,
}: LineChartProps) => {
  const chartConfig = categories.reduce((acc, category, i) => {
    acc[category] = { color: colors[i % colors.length] };
    return acc;
  }, {} as Record<string, { color: string }>);

  return (
    <ChartContainer className={className} config={chartConfig}>
      <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis 
          dataKey={index} 
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          tickMargin={10}
        />
        <YAxis 
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          tickMargin={10}
          tickFormatter={(value) => valueFormatter(value)}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent 
              formatter={(value) => valueFormatter(Number(value))}
            />
          }
        />
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={`var(--color-${category})`}
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
            activeDot={{ r: 6, strokeWidth: 2, fill: 'white' }}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
};
