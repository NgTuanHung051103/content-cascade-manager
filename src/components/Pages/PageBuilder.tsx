
import React, { useState, useEffect } from 'react';
import { 
  DragDropContext, 
  Droppable, 
  Draggable 
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
  Pencil,
  Plus,
  LayoutGrid,
  Save,
  X
} from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { ComponentSettingsDialog } from './ComponentSettingsDialog';
import { ContentPickerDialog } from './ContentPickerDialog';
import { Page, Content } from '@/data/mockData';

interface PageComponent {
  id: string;
  type: string;
  content?: Content | null;
  settings?: any;
}

const availableComponents = [
  { type: 'text', label: 'Text Block' },
  { type: 'image', label: 'Image' },
  { type: 'video', label: 'Video' },
  { type: 'gallery', label: 'Gallery' },
  { type: 'hero', label: 'Hero Banner' },
  { type: 'featured', label: 'Featured Content' },
  { type: 'grid', label: 'Content Grid' },
];

const reorder = (list: any[], startIndex: number, endIndex: number) => {
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
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  // Reset and load components when page changes or dialog opens
  useEffect(() => {
    if (open && page) {
      setComponents(
        page.components?.map(comp => ({
          id: comp.id,
          type: comp.type,
          settings: comp.settings || {},
          content: comp.content || null
        })) || []
      );
    }
  }, [open, page]);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      components,
      result.source.index,
      result.destination.index
    );

    setComponents(items);
  };

  const addComponent = (type: string) => {
    const newComponent: PageComponent = {
      id: `component-${Date.now()}`,
      type: type,
      content: null,
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

  const openContentPicker = (component: PageComponent, position: string) => {
    setSelectedComponent(component);
    setSelectedPosition(position);
    setIsContentPickerOpen(true);
  };

  const updateComponentContent = (content: Content) => {
    if (selectedComponent) {
      setComponents(components.map(c =>
        c.id === selectedComponent.id ? { ...c, content } : c
      ));
      
      toast({
        title: "Content Selected",
        description: `Content '${content.translations[0]?.title || 'Untitled'}' has been added to the component`,
      });
      
      setIsContentPickerOpen(false);
      setSelectedComponent(null);
      setSelectedPosition(null);
    }
  };

  const handleCloseContentPicker = () => {
    setIsContentPickerOpen(false);
    setSelectedComponent(null);
    setSelectedPosition(null);
  };

  const handleSave = () => {
    // In a real application, this would save the page structure to the backend
    toast({
      title: "Page Layout Saved",
      description: `Page layout has been updated successfully`,
    });
    onOpenChange(false);
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
            <ScrollArea className="h-[calc(80vh-80px)]">
              <div className="flex flex-col space-y-2">
                {availableComponents.map(component => (
                  <Button key={component.type} variant="outline" onClick={() => addComponent(component.type)}>
                    <Plus className="w-4 h-4 mr-2" />
                    {component.label}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex-1 p-4 overflow-auto">
            <h3 className="text-lg font-semibold mb-2">Page Structure</h3>
            <ScrollArea className="h-[calc(80vh-80px)]">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-3"
                    >
                      {components.length === 0 && (
                        <div className="border border-dashed rounded p-8 text-center text-gray-500">
                          <LayoutGrid className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>Drag and drop components here to build your page</p>
                          <p className="text-sm mt-2">Start by adding a component from the left sidebar</p>
                        </div>
                      )}
                      
                      {components.map((component, index) => (
                        <Draggable key={component.id} draggableId={component.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
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
                                {(component.type === 'hero' || component.type === 'text') && (
                                  <div className="border rounded p-2 bg-gray-50">
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm">Main Content</span>
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => openContentPicker(component, 'main')}
                                      >
                                        <Pencil className="w-3 h-3 mr-1" />
                                        Pick Content
                                      </Button>
                                    </div>
                                    {component.content && (
                                      <div className="mt-2 text-xs p-1 bg-violet-50 rounded border border-violet-100">
                                        Selected: {component.content.translations[0]?.title || 'Untitled'}
                                      </div>
                                    )}
                                  </div>
                                )}
                                
                                {(component.type === 'featured' || component.type === 'grid') && (
                                  <div className="space-y-2">
                                    <div className="text-sm font-medium">Content Items</div>
                                    <div className="grid grid-cols-2 gap-2">
                                      {Array.from({ length: component.type === 'featured' ? 3 : 4 }).map((_, i) => (
                                        <div key={i} className="border rounded p-2 bg-gray-50">
                                          <div className="flex justify-between items-center">
                                            <span className="text-sm">Item {i + 1}</span>
                                            <Button 
                                              variant="outline" 
                                              size="sm" 
                                              onClick={() => openContentPicker(component, `item-${i + 1}`)}
                                            >
                                              <Pencil className="w-3 h-3 mr-1" />
                                              Pick
                                            </Button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
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

      {/* Component Settings Dialog */}
      {selectedComponent && (
        <ComponentSettingsDialog
          open={isSettingsOpen}
          onOpenChange={setIsSettingsOpen}
          component={selectedComponent}
          onSaveSettings={updateComponentSettings}
        />
      )}

      {/* Content Picker Dialog */}
      {selectedComponent && (
        <ContentPickerDialog
          open={isContentPickerOpen}
          onOpenChange={handleCloseContentPicker}
          onSelectContent={updateComponentContent}
          position={selectedPosition}
        />
      )}
    </Dialog>
  );
};
