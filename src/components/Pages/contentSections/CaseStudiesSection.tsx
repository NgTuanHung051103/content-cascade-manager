
import React, { useState } from 'react';
import { Content } from '@/data/mockData';
import { Button } from '@/components/ui/button';

interface CaseStudyProps {
  image: string;
  title: string;
  description?: string;
  content: Content | null;
  onNavigate?: (content: Content | null) => void;
}

const CaseStudy: React.FC<CaseStudyProps> = ({ image, title, description, content, onNavigate }) => {
  const handleClick = () => {
    if (onNavigate && content) {
      onNavigate(content);
    }
  };

  return (
    <div 
      className="rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <div className="h-64 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 bg-white">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
    </div>
  );
};

interface CaseStudiesSectionProps {
  title: string;
  description?: string;
  categories: string[];
  caseStudies: {
    image: string;
    title: string;
    description?: string;
    category: string;
    content: Content | null;
  }[];
  onNavigate?: (content: Content | null) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  title,
  description,
  categories,
  caseStudies,
  onNavigate
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCaseStudies = activeCategory === 'all'
    ? caseStudies
    : caseStudies.filter(cs => cs.category === activeCategory);

  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {description && <p className="text-gray-600 mb-8 max-w-3xl">{description}</p>}
        
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('all')}
            className="rounded-full"
          >
            All
          </Button>
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCaseStudies.map((caseStudy, index) => (
            <CaseStudy
              key={index}
              image={caseStudy.image}
              title={caseStudy.title}
              description={caseStudy.description}
              content={caseStudy.content}
              onNavigate={onNavigate}
            />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button>View All</Button>
        </div>
      </div>
    </div>
  );
};
