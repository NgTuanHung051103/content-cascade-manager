import React, { useState, useEffect } from 'react';
import { 
  DragDropContext, 
  Droppable, 
  Draggable,
  DropResult
} from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Trash,
  Settings,
  LayoutGrid,
  Save,
  X,
  Eye
} from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { ComponentSettingsDialog } from './ComponentSettingsDialog';
import { ContentPickerDialog } from './ContentPickerDialog';
import { Page, Content } from '@/data/mockData';
import { PageComponent } from '@/types/page';
import { PreviewDialog } from './PreviewDialog';
import { EmptyComponentsPlaceholder } from './EmptyComponentsPlaceholder';
import { ComponentList } from './ComponentList';
import { ComponentRenderer } from './ComponentRenderer';

const availableComponents = [
  { type: 'text', label: 'Text Block' },
  { type: 'image', label: 'Image' },
  { type: 'video', label: 'Video' },
  { type: 'gallery', label: 'Gallery' },
  { type: 'hero', label: 'Hero Banner' },
  { type: 'featured', label: 'Featured Content' },
  { type: 'grid', label: 'Content Grid' },
  { type: 'hierarchy', label: 'Hierarchy Content' },
  { type: 'tree', label: 'Tree Content' },
];

const reorder = (list: PageComponent[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

interface PageBuilderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  page: Page | null;
}

export const PageBuilder = ({ open, onOpenChange, page }: PageBuilderProps) => {
  const [components, setComponents] = useState<PageComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<PageComponent | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isContentPickerOpen, setIsContentPickerOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [isMultiSelectContent, setIsMultiSelectContent] = useState(false);

  useEffect(() => {
    if (open && page) {
      setComponents(
        page.components?.map(comp => ({
          id: comp.id,
          type: comp.type,
          settings: comp.settings || {},
          contents: comp.contents || {}
        })) || []
      );
    }
  }, [open, page]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const updatedComponents = reorder(
      components,
      result.source.index,
      result.destination.index
    );

    setComponents(updatedComponents);
    
    toast({
      title: "Component Reordered",
      description: "Component has been moved to a new position.",
    });
  };

  const addComponent = (type: string) => {
    const newComponent: PageComponent = {
      id: `component-${Date.now()}`,
      type: type,
      contents: {},
      settings: {},
    };
    setComponents([...components, newComponent]);
  };

  const removeComponent = (id: string) => {
    setComponents(components.filter(component => component.id !== id));
  };

  const editComponentSettings = (component: PageComponent) => {
    setSelectedComponent(component);
    setIsSettingsOpen(true);
  };

  const updateComponentSettings = (newSettings: any) => {
    if (selectedComponent) {
      setComponents(components.map(c =>
        c.id === selectedComponent.id ? { ...c, settings: newSettings } : c
      ));
      setIsSettingsOpen(false);
      setSelectedComponent(null);
    }
  };

  const openContentPicker = (component: PageComponent, position: string, multiSelect: boolean = false) => {
    setSelectedComponent(component);
    setSelectedPosition(position);
    setIsMultiSelectContent(multiSelect);
    setIsContentPickerOpen(true);
  };

  const updateComponentContent = (content: Content, position: string | null) => {
    if (selectedComponent && position) {
      setComponents(components.map(c => {
        if (c.id === selectedComponent.id) {
          const updatedContents = { ...c.contents };
          updatedContents[position] = content;
          return { ...c, contents: updatedContents };
        }
        return c;
      }));
      
      toast({
        title: "Content Selected",
        description: `Content '${content.translations[0]?.title || 'Untitled'}' has been added to the component`,
      });
    }
  };

  const handleCloseContentPicker = () => {
    setIsContentPickerOpen(false);
    setSelectedComponent(null);
    setSelectedPosition(null);
    setIsMultiSelectContent(false);
  };

  const handleSave = () => {
    toast({
      title: "Page Layout Saved",
      description: `Page layout has been updated successfully`,
    });
    onOpenChange(false);
  };

  const openPreview = () => {
    setIsPreviewOpen(true);
  };

  const addFeaturedItem = (component: PageComponent) => {
    const currentColumns = component.settings?.columns || 3;
    const newColumns = currentColumns + 1;
    
    setComponents(components.map(c => {
      if (c.id === component.id) {
        return {
          ...c,
          settings: {
            ...c.settings,
            columns: newColumns
          }
        };
      }
      return c;
    }));
    
    toast({
      title: "Item Added",
      description: `A new featured content item has been added.`,
    });
  };
  
  const addGridRow = (component: PageComponent) => {
    const currentRows = component.settings?.rows || 2;
    const newRows = currentRows + 1;
    
    setComponents(components.map(c => {
      if (c.id === component.id) {
        return {
          ...c,
          settings: {
            ...c.settings,
            rows: newRows
          }
        };
      }
      return c;
    }));
    
    toast({
      title: "Row Added",
      description: `A new row has been added to the grid.`,
    });
  };
  
  const addTreeBranch = (component: PageComponent) => {
    const branchKeys = Object.keys(component.contents || {})
      .filter(key => key.startsWith('primary-') && !key.includes('child'))
      .sort((a, b) => {
        const numA = parseInt(a.split('-')[1]);
        const numB = parseInt(b.split('-')[1]);
        return numA - numB;
      });
    
    const currentBranchCount = branchKeys.length > 0 
      ? Math.max(...branchKeys.map(key => parseInt(key.split('-')[1])))
      : 0;
    const newBranchNumber = currentBranchCount + 1;
    const newBranchKey = `primary-${newBranchNumber}`;
    
    setComponents(components.map(c => {
      if (c.id === component.id) {
        const updatedContents = { ...(c.contents || {}) };
        const updatedSettings = { ...(c.settings || {}) };
        
        updatedContents[newBranchKey] = null;
        
        for (let i = 1; i <= 4; i++) {
          updatedContents[`${newBranchKey}-child-${i}`] = null;
        }
        
        updatedSettings[`${newBranchKey}-active`] = true;
        
        for (let i = 1; i <= 4; i++) {
          updatedSettings[`${newBranchKey}-child-${i}-active`] = true;
        }
        
        return {
          ...c,
          contents: updatedContents,
          settings: updatedSettings
        };
      }
      return c;
    }));
    
    toast({
      title: "Branch Added",
      description: `A new branch with sub-items has been added to the tree.`,
    });
  };

  const componentFunctions = {
    addFeaturedItem,
    addGridRow,
    addTreeBranch,
    openContentPicker
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Page Builder - {page?.title}</DialogTitle>
          <DialogDescription>
            Drag and drop components to build your page layout
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-1 overflow-hidden">
          <div className="w-64 border-r p-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Add Component</h3>
            <ComponentList 
              availableComponents={availableComponents} 
              onAddComponent={addComponent} 
            />
          </div>

          <div className="flex-1 p-4 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Page Structure</h3>
              <Button variant="outline" onClick={openPreview}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
            <ScrollArea className="h-[calc(80vh-100px)]">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-3"
                    >
                      {components.length === 0 && (
                        <EmptyComponentsPlaceholder />
                      )}
                      
                      {components.map((component, index) => (
                        <Draggable 
                          key={component.id} 
                          draggableId={component.id} 
                          index={index}
                        >
                          {(dragProvided) => (
                            <div
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                              className="border rounded p-4 bg-white shadow-sm"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <div className="font-medium">
                                  {availableComponents.find(c => c.type === component.type)?.label || component.type}
                                </div>
                                <div className="space-x-2">
                                  <Button variant="ghost" size="icon" onClick={() => editComponentSettings(component)}>
                                    <Settings className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => removeComponent(component.id)}>
                                    <Trash className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <ComponentRenderer 
                                  component={component}
                                  componentFunctions={componentFunctions}
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </ScrollArea>
          </div>
        </div>
        
        <DialogFooter className="px-6 py-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Layout
          </Button>
        </DialogFooter>
      </DialogContent>

      {selectedComponent && (
        <ComponentSettingsDialog
          open={isSettingsOpen}
          onOpenChange={setIsSettingsOpen}
          component={selectedComponent}
          onSaveSettings={updateComponentSettings}
        />
      )}

      {selectedComponent && (
        <ContentPickerDialog
          open={isContentPickerOpen}
          onOpenChange={handleCloseContentPicker}
          onSelectContent={updateComponentContent}
          position={selectedPosition}
          multiSelect={isMultiSelectContent}
        />
      )}

      <PreviewDialog 
        open={isPreviewOpen} 
        onOpenChange={setIsPreviewOpen}
        page={page}
        components={components}
      />
    </Dialog>
  );
};
