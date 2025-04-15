
import React from 'react';
import { Content } from '@/data/mockData';
import { Button } from '@/components/ui/button';

interface NewsItemProps {
  image: string;
  title: string;
  date: string;
  category: string;
  content: Content | null;
  onNavigate?: (content: Content | null) => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ image, title, date, category, content, onNavigate }) => {
  const handleClick = () => {
    if (onNavigate && content) {
      onNavigate(content);
    }
  };

  return (
    <div 
      className="group cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative h-48 mb-3 overflow-hidden rounded-lg">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full p-3">
          <span className="text-white text-xs font-medium">{category}</span>
        </div>
      </div>
      <p className="text-gray-500 text-sm mb-1">{date}</p>
      <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">{title}</h3>
    </div>
  );
};

interface NewsSectionProps {
  title: string;
  news: {
    image: string;
    title: string;
    date: string;
    category: string;
    content: Content | null;
  }[];
  onNavigate?: (content: Content | null) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ title, news, onNavigate }) => {
  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Button variant="outline">View All News</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item, index) => (
            <NewsItem
              key={index}
              image={item.image}
              title={item.title}
              date={item.date}
              category={item.category}
              content={item.content}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
