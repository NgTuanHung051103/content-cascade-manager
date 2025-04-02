
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Plus } from 'lucide-react';
import { PageComponent } from '@/data/mockData';

interface FeaturedContentSectionProps {
  component: PageComponent;
  onPickContent: (position: string) => void;
  onPickMultiple: () => void;
  onAddItem: () => void;
}

export const FeaturedContentSection: React.FC<FeaturedContentSectionProps> = ({
  component,
  onPickContent,
  onPickMultiple,
  onAddItem
}) => {
  const featuredColumns = component.settings?.columns || 3;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">Content Items (Featured)</div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onPickMultiple}
          >
            <Pencil className="w-3 h-3 mr-1" />
            Pick Multiple
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onAddItem}
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Item
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: featuredColumns }).map((_, i) => {
          const positionKey = `featured-${i + 1}`;
          return (
            <div key={i} className="border rounded p-2 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-sm">Item {i + 1}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onPickContent(positionKey)}
                >
                  <Pencil className="w-3 h-3 mr-1" />
                  Pick
                </Button>
              </div>
              {component.contents?.[positionKey] && (
                <div className="mt-2 text-xs p-1 bg-violet-50 rounded border border-violet-100">
                  Selected: {component.contents[positionKey]?.translations[0]?.title || 'Untitled'}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
