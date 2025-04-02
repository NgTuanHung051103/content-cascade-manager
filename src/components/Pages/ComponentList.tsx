
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus } from 'lucide-react';

interface ComponentType {
  type: string;
  label: string;
}

interface ComponentListProps {
  availableComponents: ComponentType[];
  onAddComponent: (type: string) => void;
}

export const ComponentList: React.FC<ComponentListProps> = ({
  availableComponents,
  onAddComponent
}) => {
  return (
    <ScrollArea className="h-[calc(80vh-80px)]">
      <div className="flex flex-col space-y-2">
        {availableComponents.map(component => (
          <Button 
            key={component.type} 
            variant="outline" 
            onClick={() => onAddComponent(component.type)}
          >
            <Plus className="w-4 h-4 mr-2" />
            {component.label}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};
