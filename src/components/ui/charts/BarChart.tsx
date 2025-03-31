
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart as RechartsBarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface BarChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export const BarChart = ({
  data,
  index,
  categories,
  colors = ['violet'],
  valueFormatter = (value) => `${value}`,
  className,
}: BarChartProps) => {
  const chartConfig = categories.reduce((acc, category, i) => {
    acc[category] = { color: colors[i % colors.length] };
    return acc;
  }, {} as Record<string, { color: string }>);

  return (
    <ChartContainer className={className} config={chartConfig}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
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
          <Bar
            key={category}
            dataKey={category}
            fill={`var(--color-${category})`}
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
};
