
import React from 'react';
import { Content } from '@/data/mockData';

interface StatItemProps {
  value: string;
  label: string;
  content: Content | null;
  onNavigate?: (content: Content | null) => void;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, content, onNavigate }) => {
  const handleClick = () => {
    if (onNavigate && content) {
      onNavigate(content);
    }
  };

  return (
    <div 
      className="bg-blue-600 text-white p-8 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
      onClick={handleClick}
    >
      <span className="text-5xl font-bold mb-2">{value}</span>
      <span className="text-center">{label}</span>
    </div>
  );
};

interface StatsSectionProps {
  stats: {
    value: string;
    label: string;
    content: Content | null;
  }[];
  onNavigate?: (content: Content | null) => void;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats, onNavigate }) => {
  return (
    <div className="py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {stats.map((stat, index) => (
          <StatItem 
            key={index} 
            value={stat.value} 
            label={stat.label} 
            content={stat.content}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
};
