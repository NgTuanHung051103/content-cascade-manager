import React, { useState } from 'react';
import { 
  DragDropContext, 
  Droppable, 
  Draggable 
} from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Trash,
  Settings,
  Pencil,
  Plus,
  LayoutGrid
} from 'lucide-react';
import { ComponentSettingsDialog } from './ComponentSettingsDialog';
import { ContentPickerDialog } from './ContentPickerDialog';
import { Content } from '@/data/mockData';

interface PageComponent {
  id: string;
  type: string;
  content?: Content | null;
  settings?: any;
}

const initialComponents: PageComponent[] = [
  { id: 'component-1', type: 'text', content: null, settings: {} },
  { id: 'component-2', type: 'image', content: null, settings: {} },
];

const availableComponents = [
  { type: 'text', label: 'Text Block' },
  { type: 'image', label: 'Image' },
  { type: 'video', label: 'Video' },
  { type: 'gallery', label: 'Gallery' },
];

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const PageBuilder = () => {
  const [components, setComponents] = useState<PageComponent[]>(initialComponents);
  const [selectedComponent, setSelectedComponent] = useState<PageComponent | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isContentPickerOpen, setIsContentPickerOpen] = useState(false);

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
    setComponents(components.map(c =>
      c.id === selectedComponent?.id ? { ...c, settings: newSettings } : c
    ));
    setIsSettingsOpen(false);
    setSelectedComponent(null);
  };

  const openContentPicker = (component: PageComponent) => {
    setSelectedComponent(component);
    setIsContentPickerOpen(true);
  };

  const updateComponentContent = (content: Content) => {
    setComponents(components.map(c =>
      c.id === selectedComponent?.id ? { ...c, content: content } : c
    ));
    setIsContentPickerOpen(false);
    setSelectedComponent(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-row">
        <div className="w-64 border-r p-4">
          <h3 className="text-lg font-semibold mb-2">Add Component</h3>
          <ScrollArea className="h-[calc(100vh-100px)]">
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

        <div className="flex-1 p-4">
          <h3 className="text-lg font-semibold mb-2">Page Structure</h3>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {components.map((component, index) => (
                    <Draggable key={component.id} draggableId={component.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border rounded p-4 mb-2 bg-white shadow-sm"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              {component.type === 'text' && 'Text Block'}
                              {component.type === 'image' && 'Image'}
                              {component.type === 'video' && 'Video'}
                              {component.type === 'gallery' && 'Gallery'}
                            </div>
                            <div className="space-x-2">
                              <Button variant="ghost" size="icon" onClick={() => editComponentSettings(component)}>
                                <Settings className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => openContentPicker(component)}>
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => removeComponent(component.id)}>
                                <Trash className="w-4 h-4" />
                              </Button>
                            </div>
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
        </div>
      </div>

      <ComponentSettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        component={selectedComponent}
        onSave={updateComponentSettings}
      />

      <ContentPickerDialog
        open={isContentPickerOpen}
        onOpenChange={setIsContentPickerOpen}
        component={selectedComponent}
        onContentSelect={updateComponentContent}
      />
    </div>
  );
};
