
import React from 'react';
import { Content } from '@/data/mockData';
import { ArrowRight } from 'lucide-react';

interface ServiceItemProps {
  title: string;
  description: string;
  image?: string;
  content: Content | null;
  onNavigate?: (content: Content | null) => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ title, description, image, content, onNavigate }) => {
  const handleClick = () => {
    if (onNavigate && content) {
      onNavigate(content);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={handleClick}>
      {image && (
        <div className="h-48 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center text-blue-500 font-medium">
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  );
};

interface ServicesSectionProps {
  title: string;
  services: {
    title: string;
    description: string;
    image?: string;
    content: Content | null;
  }[];
  onNavigate?: (content: Content | null) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ title, services, onNavigate }) => {
  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 pb-2 border-b">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceItem 
              key={index} 
              title={service.title} 
              description={service.description} 
              image={service.image}
              content={service.content}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
