
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Cell, Pie, PieChart as RechartsPieChart } from 'recharts';

interface PieChartProps {
  data: any[];
  index: string;
  category: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export const PieChart = ({
  data,
  index,
  category,
  colors = ['violet', 'gray'],
  valueFormatter = (value) => `${value}`,
  className,
}: PieChartProps) => {
  const chartConfig = data.reduce((acc, item, i) => {
    acc[item[index]] = { color: colors[i % colors.length] };
    return acc;
  }, {} as Record<string, { color: string }>);

  return (
    <ChartContainer className={className} config={chartConfig}>
      <RechartsPieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <ChartTooltip
          content={
            <ChartTooltipContent 
              formatter={(value) => valueFormatter(Number(value))}
            />
          }
        />
        <Pie
          data={data}
          nameKey={index}
          dataKey={category}
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={40}
          paddingAngle={2}
          strokeWidth={2}
          stroke="#fff"
        >
          {data.map((entry, i) => (
            <Cell 
              key={`cell-${i}`} 
              fill={`var(--color-${entry[index]})`} 
            />
          ))}
        </Pie>
      </RechartsPieChart>
    </ChartContainer>
  );
};
