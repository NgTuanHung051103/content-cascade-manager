
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Plus, 
  Move, 
  Settings, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Save
} from 'lucide-react';
import { Page, Component, contents, findContentById } from '@/data/mockData';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from "@/components/ui/use-toast";
import { ComponentSettingsDialog } from './ComponentSettingsDialog';
import { ContentPickerDialog } from './ContentPickerDialog';

interface PageBuilderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  page: Page | null;
}

export const PageBuilder = ({ open, onOpenChange, page }: PageBuilderProps) => {
  const [componentSettingsOpen, setComponentSettingsOpen] = useState(false);
  const [contentPickerOpen, setContentPickerOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  
  if (!page) return null;
  
  const handleAddComponent = () => {
    // Logic to add a new component would go here
    toast({
      title: "Component Added",
      description: "New component has been added to the page",
      duration: 3000,
    });
  };
  
  const handleSave = () => {
    toast({
      title: "Page Saved",
      description: "Your page layout has been saved successfully",
      duration: 3000,
    });
  };
  
  const handleEditComponent = (component: Component) => {
    setSelectedComponent(component);
    setComponentSettingsOpen(true);
  };
  
  const handlePickContent = (component: Component, position: string) => {
    setSelectedComponent(component);
    setSelectedPosition(position);
    setContentPickerOpen(true);
  };
  
  // Component preview renderer
  const renderComponentPreview = (component: Component) => {
    switch (component.type) {
      case 'hero':
        const heroContent = component.contents.find(c => c.position === 'main');
        const content = heroContent ? findContentById(heroContent.contentId) : null;
        const title = content?.translations.find(t => t.languageId === 'lang-1')?.title || 'No content selected';
        
        return (
          <div className={`p-6 rounded-md ${component.settings.background === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm opacity-70">Hero Banner Component</p>
          </div>
        );
      
      case 'featured':
        return (
          <div className="p-4 bg-gray-100 rounded-md">
            <div className="mb-2 text-sm font-semibold">Featured Content</div>
            <div className={`grid grid-cols-${component.settings.columns} gap-2`}>
              {Array.from({ length: component.settings.columns }).map((_, i) => {
                const featuredContent = component.contents.find(c => c.position === `item-${i + 1}`);
                const content = featuredContent ? findContentById(featuredContent.contentId) : null;
                const title = content?.translations.find(t => t.languageId === 'lang-1')?.title || 'Select content';
                
                return (
                  <div key={i} className="p-2 border rounded-md bg-white text-center h-16 flex items-center justify-center">
                    <span className="text-xs">{title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
        
      case 'grid':
        return (
          <div className="p-4 bg-gray-100 rounded-md">
            <div className="mb-2 text-sm font-semibold">Content Grid</div>
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 4 }).map((_, i) => {
                const gridContent = component.contents.find(c => c.position === `item-${i + 1}`);
                const content = gridContent ? findContentById(gridContent.contentId) : null;
                const title = content?.translations.find(t => t.languageId === 'lang-1')?.title || 'Select content';
                
                return (
                  <div key={i} className="p-2 border rounded-md bg-white text-center h-12 flex items-center justify-center">
                    <span className="text-xs">{title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
        
      default:
        return (
          <div className="p-4 bg-gray-100 rounded-md">
            <div className="text-sm">Unknown Component Type</div>
          </div>
        );
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className="max-w-screen-xl h-[90vh] max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-3 border-b flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <DialogTitle className="text-xl">{page.title} - Page Builder</DialogTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Page
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 flex overflow-hidden">
          {/* Components Panel */}
          <div className="w-80 border-r bg-gray-50 flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-semibold mb-2">Components</h3>
              <Button onClick={handleAddComponent} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Component
              </Button>
            </div>
            
            <ScrollArea className="flex-1">
              <Accordion type="multiple" defaultValue={page.components.map(c => c.id)}>
                {page.components.map((component, index) => (
                  <AccordionItem key={component.id} value={component.id} className="border-b">
                    <AccordionTrigger className="px-4 py-2 hover:bg-gray-100">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 mr-2">
                          {index + 1}
                        </div>
                        <span>{component.name}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Type: {component.type}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7" 
                            onClick={() => handleEditComponent(component)}
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <span className="text-sm font-medium">Content Slots:</span>
                          
                          {component.type === 'hero' && (
                            <Card className="overflow-hidden">
                              <CardContent className="p-2">
                                <Button 
                                  variant="ghost" 
                                  className="w-full justify-between border border-dashed h-auto py-2 px-3"
                                  onClick={() => handlePickContent(component, 'main')}
                                >
                                  <span className="text-sm">Main Hero Content</span>
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </CardContent>
                            </Card>
                          )}
                          
                          {component.type === 'featured' && (
                            <div className="space-y-2">
                              {Array.from({ length: component.settings.columns }).map((_, i) => (
                                <Card key={i} className="overflow-hidden">
                                  <CardContent className="p-2">
                                    <Button 
                                      variant="ghost" 
                                      className="w-full justify-between border border-dashed h-auto py-2 px-3"
                                      onClick={() => handlePickContent(component, `item-${i + 1}`)}
                                    >
                                      <span className="text-sm">Featured Item {i + 1}</span>
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          )}
                          
                          {component.type === 'grid' && (
                            <div className="space-y-2">
                              {Array.from({ length: 4 }).map((_, i) => (
                                <Card key={i} className="overflow-hidden">
                                  <CardContent className="p-2">
                                    <Button 
                                      variant="ghost" 
                                      className="w-full justify-between border border-dashed h-auto py-2 px-3"
                                      onClick={() => handlePickContent(component, `item-${i + 1}`)}
                                    >
                                      <span className="text-sm">Grid Item {i + 1}</span>
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="space-x-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <ChevronUp className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </div>
          
          {/* Preview Area */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 overflow-auto bg-white pattern-dots pattern-gray-200 pattern-bg-white pattern-size-2">
              <div className="w-full max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
                {page.components.length === 0 ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center text-center">
                    <Layers className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Components Added</h3>
                    <p className="text-gray-500 mb-4">Start building your page by adding components from the panel on the left.</p>
                    <Button onClick={handleAddComponent}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Component
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {page.components.map((component, index) => (
                      <div 
                        key={component.id} 
                        className={cn(
                          "relative border rounded-md overflow-hidden group",
                          selectedComponent?.id === component.id ? "ring-2 ring-violet-500" : ""
                        )}
                      >
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                          <div className="flex gap-2">
                            <Button variant="default" size="sm" onClick={() => handleEditComponent(component)}>
                              <Settings className="h-4 w-4 mr-2" />
                              Edit Settings
                            </Button>
                            <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                              <Move className="h-4 w-4 mr-2" />
                              Move
                            </Button>
                          </div>
                        </div>
                        {renderComponentPreview(component)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      
      <ComponentSettingsDialog 
        open={componentSettingsOpen}
        onOpenChange={setComponentSettingsOpen}
        component={selectedComponent}
      />
      
      <ContentPickerDialog
        open={contentPickerOpen}
        onOpenChange={setContentPickerOpen}
        component={selectedComponent}
        position={selectedPosition}
      />
    </Dialog>
  );
};
