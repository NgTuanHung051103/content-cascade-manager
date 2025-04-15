
import React from 'react';
import { Content } from '@/data/mockData';

interface HeroSectionProps {
  title: string;
  description: string;
  bgColor?: string;
  textColor?: string;
  alignment?: 'left' | 'center' | 'right';
  onNavigate?: (content: Content | null) => void;
  content?: Content | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  bgColor = 'bg-sky-100',
  textColor = 'text-sky-600',
  alignment = 'center',
  onNavigate,
  content
}) => {
  const handleClick = () => {
    if (onNavigate && content) {
      onNavigate(content);
    }
  };

  const textAlignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }[alignment];

  return (
    <div 
      className={`${bgColor} ${textColor} py-16 px-4 cursor-pointer`}
      onClick={handleClick}
    >
      <div className={`max-w-4xl mx-auto ${textAlignmentClass}`}>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{title}</h1>
        <p className="text-lg md:text-xl opacity-90">{description}</p>
      </div>
    </div>
  );
};
