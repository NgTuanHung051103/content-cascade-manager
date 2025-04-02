
import React from 'react';
import { Content } from '@/data/mockData';
import { PageComponent } from '@/types/page';
import { Button } from '@/components/ui/button';
import { Pencil, Plus } from 'lucide-react';
import { TreeBranchEditor } from './TreeBranchEditor';
import { BasicContentPicker } from './contentSections/BasicContentPicker';
import { FeaturedContentSection } from './contentSections/FeaturedContentSection';
import { GridContentSection } from './contentSections/GridContentSection';
import { HierarchyContentSection } from './contentSections/HierarchyContentSection';
import { TreeContentSection } from './contentSections/TreeContentSection';

interface ComponentFunctions {
  addFeaturedItem: (component: PageComponent) => void;
  addGridRow: (component: PageComponent) => void;
  addTreeBranch: (component: PageComponent) => void;
  openContentPicker: (component: PageComponent, position: string, multiSelect?: boolean) => void;
}

interface ComponentRendererProps {
  component: PageComponent;
  componentFunctions: ComponentFunctions;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  componentFunctions
}) => {
  switch(component.type) {
    case 'hero':
    case 'text':
      return <BasicContentPicker 
        component={component} 
        onPickContent={(position) => componentFunctions.openContentPicker(component, position)} 
      />;
      
    case 'featured':
      return <FeaturedContentSection 
        component={component}
        onPickContent={(position) => componentFunctions.openContentPicker(component, position)}
        onPickMultiple={() => componentFunctions.openContentPicker(component, 'featured', true)}
        onAddItem={() => componentFunctions.addFeaturedItem(component)}
      />;
      
    case 'grid':
      return <GridContentSection 
        component={component}
        onPickContent={(position) => componentFunctions.openContentPicker(component, position)}
        onPickMultiple={() => componentFunctions.openContentPicker(component, 'grid', true)}
        onAddRow={() => componentFunctions.addGridRow(component)}
      />;

    case 'hierarchy':
      return <HierarchyContentSection 
        component={component}
        onPickContent={(position) => componentFunctions.openContentPicker(component, position)}
        onPickMultiple={(position) => componentFunctions.openContentPicker(component, position, true)}
      />;
      
    case 'tree':
      return <TreeContentSection 
        component={component}
        onPickContent={(position) => componentFunctions.openContentPicker(component, position)}
        onPickMultiple={(position) => componentFunctions.openContentPicker(component, position, true)}
        onAddBranch={() => componentFunctions.addTreeBranch(component)}
      />;
      
    default:
      return (
        <div className="p-2 bg-gray-50 rounded text-sm text-gray-500">
          No content configuration needed for this component type
        </div>
      );
  }
};
