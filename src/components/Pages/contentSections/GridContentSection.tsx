
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Plus } from 'lucide-react';
import { PageComponent } from '@/data/mockData';

interface GridContentSectionProps {
  component: PageComponent;
  onPickContent: (position: string) => void;
  onPickMultiple: () => void;
  onAddRow: () => void;
}

export const GridContentSection: React.FC<GridContentSectionProps> = ({
  component,
  onPickContent,
  onPickMultiple,
  onAddRow
}) => {
  const gridColumns = component.settings?.columns || 4;
  const gridRows = component.settings?.rows || 2;
  const totalCells = gridColumns * gridRows;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">Content Grid ({gridColumns}×{gridRows})</div>
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
            onClick={onAddRow}
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Row
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {Array.from({ length: totalCells }).map((_, i) => {
          const positionKey = `grid-${i + 1}`;
          return (
            <div key={i} className="border rounded p-2 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-sm text-xs">Item {i + 1}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 text-xs px-2" 
                  onClick={() => onPickContent(positionKey)}
                >
                  <Pencil className="w-3 h-3 mr-1" />
                  Pick
                </Button>
              </div>
              {component.contents?.[positionKey] && (
                <div className="mt-1 text-xs p-1 bg-violet-50 rounded border border-violet-100 truncate">
                  {component.contents[positionKey]?.translations[0]?.title || 'Untitled'}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
