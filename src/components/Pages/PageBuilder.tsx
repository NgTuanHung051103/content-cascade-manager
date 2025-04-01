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
  X,
  Eye
} from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { ComponentSettingsDialog } from './ComponentSettingsDialog';
import { ContentPickerDialog } from './ContentPickerDialog';
import { Page, Content } from '@/data/mockData';
import { PreviewDialog } from './PreviewDialog';

interface PageComponent {
  id: string;
  type: string;
  contents?: { [key: string]: Content | null };
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
  { type: 'hierarchy', label: 'Hierarchy Content' },
  { type: 'tree', label: 'Tree Content' },
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
      .filter(key => key.startsWith('primary-'))
      .map(key => parseInt(key.split('-')[1]));
    
    const currentBranchCount = branchKeys.length > 0 ? Math.max(...branchKeys) : 0;
    const newBranchNumber = currentBranchCount + 1;
    const newBranchKey = `primary-${newBranchNumber}`;
    
    setComponents(components.map(c => {
      if (c.id === component.id) {
        const updatedContents = { ...c.contents };
        
        updatedContents[newBranchKey] = null;
        
        for (let i = 1; i <= 4; i++) {
          updatedContents[`${newBranchKey}-child-${i}`] = null;
        }
        
        const updatedSettings = { ...c.settings };
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

  const renderComponentContentSection = (component: PageComponent) => {
    switch(component.type) {
      case 'hero':
      case 'text':
        return (
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
            {component.contents?.main && (
              <div className="mt-2 text-xs p-1 bg-violet-50 rounded border border-violet-100">
                Selected: {component.contents.main.translations[0]?.title || 'Untitled'}
              </div>
            )}
          </div>
        );
        
      case 'featured':
        const featuredColumns = component.settings?.columns || 3;
        
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Content Items (Featured)</div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => openContentPicker(component, 'featured', true)}
                >
                  <Pencil className="w-3 h-3 mr-1" />
                  Pick Multiple
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addFeaturedItem(component)}
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
                        onClick={() => openContentPicker(component, positionKey)}
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
        
      case 'grid':
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
                  onClick={() => openContentPicker(component, 'grid', true)}
                >
                  <Pencil className="w-3 h-3 mr-1" />
                  Pick Multiple
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addGridRow(component)}
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
                        onClick={() => openContentPicker(component, positionKey)}
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

      case 'hierarchy':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">Main Content</div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => openContentPicker(component, 'main')}
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
                    onClick={() => openContentPicker(component, 'secondary', true)}
                  >
                    <Pencil className="w-3 h-3 mr-1" />
                    Pick Multiple
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      const updatedSettings = { ...component.settings, secondaryCount: (component.settings?.secondaryCount || 4) + 2 };
                      setComponents(components.map(c => c.id === component.id ? { ...c, settings: updatedSettings } : c));
                      toast({
                        title: "Items Added",
                        description: "Added 2 more secondary content items.",
                      });
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
                          onClick={() => openContentPicker(component, positionKey)}
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
                    onClick={() => openContentPicker(component, 'tertiary', true)}
                  >
                    <Pencil className="w-3 h-3 mr-1" />
                    Pick Multiple
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      const updatedSettings = { ...component.settings, tertiaryCount: (component.settings?.tertiaryCount || 4) + 2 };
                      setComponents(components.map(c => c.id === component.id ? { ...c, settings: updatedSettings } : c));
                      toast({
                        title: "Items Added",
                        description: "Added 2 more tertiary content items.",
                      });
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
                          onClick={() => openContentPicker(component, positionKey)}
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
        
      case 'tree':
        const primaryBranchKeys = Object.keys(component.contents || {})
          .filter(key => key.startsWith('primary-'))
          .sort((a, b) => {
            const numA = parseInt(a.split('-')[1]);
            const numB = parseInt(b.split('-')[1]);
            return numA - numB;
          });
          
        const branchCount = primaryBranchKeys.length > 0 
          ? Math.max(...primaryBranchKeys.map(key => parseInt(key.split('-')[1])))
          : 4;
          
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">Main Content</div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => openContentPicker(component, 'main')}
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
                <div className="text-sm font-medium">Primary Branches ({branchCount} items)</div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => openContentPicker(component, 'primary', true)}
                  >
                    <Pencil className="w-3 h-3 mr-1" />
                    Pick Multiple
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => addTreeBranch(component)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Branch
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: branchCount }).map((_, i) => {
                  const positionKey = `primary-${i + 1}`;
                  const isActive = component.settings?.[`${positionKey}-active`] !== false;
                  
                  return (
                    <div key={i} className={`border rounded p-2 ${isActive ? 'bg-gray-50' : 'bg-gray-200'}`}>
                      <div className="flex justify-between items-center">
                        <span className="text-sm flex items-center">
                          Branch {i + 1}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-6 w-6 p-0 ml-1"
                            onClick={() => {
                              setComponents(components.map(c => {
                                if (c.id === component.id) {
                                  const newSettings = { 
                                    ...c.settings,
                                    [`${positionKey}-active`]: c.settings?.[`${positionKey}-active`] === false ? undefined : false
                                  };
                                  return { ...c, settings: newSettings };
                                }
                                return c;
                              }));
                            }}
                          >
                            <div className={`h-3 w-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          </Button>
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openContentPicker(component, positionKey)}
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
                      
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs">Sub-items</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-6 text-xs px-2"
                            onClick={() => openContentPicker(component, `${positionKey}-children`, true)}
                          >
                            <Pencil className="w-2 h-2 mr-1" />
                            Pick All
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          {Array.from({ length: 4 }).map((_, j) => {
                            const childPositionKey = `${positionKey}-child-${j + 1}`;
                            const isChildActive = component.settings?.[`${childPositionKey}-active`] !== false;
                            
                            return (
                              <div key={j} className={`border rounded p-1 ${isChildActive ? 'bg-white' : 'bg-gray-200'}`}>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs flex items-center">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="h-4 w-4 p-0"
                                      onClick={() => {
                                        setComponents(components.map(c => {
                                          if (c.id === component.id) {
                                            const newSettings = { 
                                              ...c.settings,
                                              [`${childPositionKey}-active`]: c.settings?.[`${childPositionKey}-active`] === false ? undefined : false
                                            };
                                            return { ...c, settings: newSettings };
                                          }
                                          return c;
                                        }));
                                      }}
                                    >
                                      <div className={`h-2 w-2 rounded-full ${isChildActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                    </Button>
                                  </span>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="h-5 text-xs px-1"
                                    onClick={() => openContentPicker(component, childPositionKey)}
                                  >
                                    Pick
                                  </Button>
                                </div>
                                {component.contents?.[childPositionKey] && (
                                  <div className="mt-1 text-xs p-1 bg-violet-50 rounded border border-violet-100 text-[10px] truncate">
                                    {component.contents[childPositionKey]?.translations[0]?.title || 'Untitled'}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="p-2 bg-gray-50 rounded text-sm text-gray-500">
            No content configuration needed for this component type
          </div>
        );
    }
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
                                {renderComponentContentSection(component)}
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
