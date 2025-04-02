import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Plus } from 'lucide-react';
import { PageComponent } from '@/types/page';

interface HierarchyContentSectionProps {
  component: PageComponent;
  onPickContent: (position: string) => void;
  onPickMultiple: (position: string) => void;
}

export const HierarchyContentSection: React.FC<HierarchyContentSectionProps> = ({
  component,
  onPickContent,
  onPickMultiple
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Main Content</div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onPickContent('main')}
          >
            <Pencil className="w-3 h-3 mr-1" />
            Pick Content
          </Button>
        </div>
        <div className="border rounded p-2 bg-gray-50">
          {component.contents?.main ? (
            <div className="text-xs p-1 bg-violet-50 rounded border border-violet-100">
              Selected: {component.contents.main.translations[0]?.title || 'Untitled'}
            </div>
          ) : (
            <div className="text-xs text-gray-500 p-1">No content selected</div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Secondary Content (4 items)</div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onPickMultiple('secondary')}
            >
              <Pencil className="w-3 h-3 mr-1" />
              Pick Multiple
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                // This is handled in the parent component
              }}
            >
              <Plus className="w-3 h-3 mr-1" />
              Add More
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: component.settings?.secondaryCount || 4 }).map((_, i) => {
            const positionKey = `secondary-${i + 1}`;
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
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Tertiary Content (4 items)</div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onPickMultiple('tertiary')}
            >
              <Pencil className="w-3 h-3 mr-1" />
              Pick Multiple
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                // This is handled in the parent component
              }}
            >
              <Plus className="w-3 h-3 mr-1" />
              Add More
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: component.settings?.tertiaryCount || 4 }).map((_, i) => {
            const positionKey = `tertiary-${i + 1}`;
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
    </div>
  );
};
