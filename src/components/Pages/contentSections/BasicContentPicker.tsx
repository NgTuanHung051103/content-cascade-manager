import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { PageComponent } from '@/types/page';

interface BasicContentPickerProps {
  component: PageComponent;
  onPickContent: (position: string) => void;
}

export const BasicContentPicker: React.FC<BasicContentPickerProps> = ({
  component,
  onPickContent
}) => {
  return (
    <div className="border rounded p-2 bg-gray-50">
      <div className="flex justify-between items-center">
        <span className="text-sm">Main Content</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onPickContent('main')}
        >
          <Pencil className="w-3 h-3 mr-1" />
          Pick Content
        </Button>
      </div>
      {component.contents?.main && (
        <div className="mt-2 text-xs p-1 bg-violet-50 rounded border border-violet-100">
          Selected: {component.contents.main.translations[0]?.title || 'Untitled'}
        </div>
      )}
    </div>
  );
};
