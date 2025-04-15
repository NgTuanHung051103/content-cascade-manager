import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Save, X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ComponentSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  component: { 
    id: string;
    type: string;
    settings?: any;
  } | null;
  onSaveSettings: (settings: any) => void;
}

export const ComponentSettingsDialog = ({ 
  open, 
  onOpenChange, 
  component, 
  onSaveSettings 
}: ComponentSettingsDialogProps) => {
  const [settings, setSettings] = useState<any>({});
  
  useEffect(() => {
    if (component) {
      setSettings(component.settings || {});
    } else {
      setSettings({});
    }
  }, [component]);
  
  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSave = () => {
    onSaveSettings(settings);
  };
  
  if (!component) return null;
  
  const renderComponentSettings = () => {
    switch(component.type) {
      case 'hero':
        return (
          <Tabs defaultValue="general">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="navigation">Navigation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heroHeight">Banner Height</Label>
                <Select 
                  value={settings.height || 'medium'} 
                  onValueChange={(value) => handleChange('height', value)}
                >
                  <SelectTrigger id="heroHeight">
                    <SelectValue placeholder="Select banner height" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="heroBackground">Background Style</Label>
                <Select 
                  value={settings.background || 'light'} 
                  onValueChange={(value) => handleChange('background', value)}
                >
                  <SelectTrigger id="heroBackground">
                    <SelectValue placeholder="Select background style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            
            <TabsContent value="navigation" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="navigationType">Navigation Type</Label>
                <Select 
                  value={settings.navigationType || 'none'} 
                  onValueChange={(value) => handleChange('navigationType', value)}
                >
                  <SelectTrigger id="navigationType">
                    <SelectValue placeholder="Select navigation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="url">External URL</SelectItem>
                    <SelectItem value="content_detail">Content Detail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {settings.navigationType === 'url' && (
                <div className="space-y-2">
                  <Label htmlFor="navigationUrl">URL</Label>
                  <Input 
                    id="navigationUrl" 
                    value={settings.navigationUrl || ''} 
                    onChange={(e) => handleChange('navigationUrl', e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              )}
              
              {settings.navigationType === 'content_detail' && (
                <div className="space-y-2">
                  <Label htmlFor="navigationContentId">Content ID</Label>
                  <Input 
                    id="navigationContentId" 
                    value={settings.navigationContentId || ''} 
                    onChange={(e) => handleChange('navigationContentId', e.target.value)}
                    placeholder="content-123"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the ID of the content to navigate to its detail page.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        );
        
      case 'featured':
        return (
          <Tabs defaultValue="general">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="navigation">Navigation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="featuredColumns">Number of Columns</Label>
                <Select 
                  value={settings.columns?.toString() || '3'} 
                  onValueChange={(value) => handleChange('columns', parseInt(value))}
                >
                  <SelectTrigger id="featuredColumns">
                    <SelectValue placeholder="Select number of columns" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Columns</SelectItem>
                    <SelectItem value="3">3 Columns</SelectItem>
                    <SelectItem value="4">4 Columns</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="showImages" 
                  checked={settings.showImage !== false}
                  onCheckedChange={(checked) => handleChange('showImage', checked)}
                />
                <Label htmlFor="showImages">Show Featured Images</Label>
              </div>
            </TabsContent>
            
            <TabsContent value="navigation" className="space-y-4">
              <div className="text-sm mb-4 p-3 bg-amber-50 border border-amber-200 rounded">
                Each content item can have its own navigation settings. Configure them when selecting content.
              </div>
              
              <div className="space-y-3">
                {Array.from({ length: settings.columns || 3 }).map((_, i) => {
                  const itemKey = `featured-${i + 1}`;
                  return (
                    <div key={i} className="border rounded p-3">
                      <h4 className="font-medium mb-2">Item {i + 1}</h4>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`${itemKey}-navigationType`}>Navigation Type</Label>
                        <Select 
                          value={settings[`${itemKey}-navigationType`] || 'none'} 
                          onValueChange={(value) => handleChange(`${itemKey}-navigationType`, value)}
                        >
                          <SelectTrigger id={`${itemKey}-navigationType`}>
                            <SelectValue placeholder="Select navigation type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="url">External URL</SelectItem>
                            <SelectItem value="content_detail">Content Detail</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {settings[`${itemKey}-navigationType`] === 'url' && (
                        <div className="space-y-2 mt-2">
                          <Label htmlFor={`${itemKey}-navigationUrl`}>URL</Label>
                          <Input 
                            id={`${itemKey}-navigationUrl`} 
                            value={settings[`${itemKey}-navigationUrl`] || ''} 
                            onChange={(e) => handleChange(`${itemKey}-navigationUrl`, e.target.value)}
                            placeholder="https://example.com"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        );
        
      case 'grid':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gridColumns">Number of Columns</Label>
              <Select 
                value={settings.columns?.toString() || '4'} 
                onValueChange={(value) => handleChange('columns', parseInt(value))}
              >
                <SelectTrigger id="gridColumns">
                  <SelectValue placeholder="Select number of columns" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                  <SelectItem value="5">5 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gridRows">Number of Rows</Label>
              <Select 
                value={settings.rows?.toString() || '2'} 
                onValueChange={(value) => handleChange('rows', parseInt(value))}
              >
                <SelectTrigger id="gridRows">
                  <SelectValue placeholder="Select number of rows" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Row</SelectItem>
                  <SelectItem value="2">2 Rows</SelectItem>
                  <SelectItem value="3">3 Rows</SelectItem>
                  <SelectItem value="4">4 Rows</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      case 'tree':
        return (
          <Tabs defaultValue="general">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="animation">Animation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contentAlignment">Content Alignment</Label>
                <Select 
                  value={settings.contentAlignment || 'left'} 
                  onValueChange={(value) => handleChange('contentAlignment', value)}
                >
                  <SelectTrigger id="contentAlignment">
                    <SelectValue placeholder="Select alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Active States</Label>
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => {
                    const primaryKey = `primary-${i + 1}`;
                    return (
                      <div key={i} className="border rounded p-3">
                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor={`${primaryKey}-active`} className="text-sm">Branch {i + 1}</Label>
                          <Switch 
                            id={`${primaryKey}-active`} 
                            checked={settings[`${primaryKey}-active`] !== false}
                            onCheckedChange={(checked) => handleChange(`${primaryKey}-active`, checked)}
                          />
                        </div>
                        
                        <div className="mt-2 text-xs space-y-1">
                          <p className="text-gray-500 mb-1">Children:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {Array.from({ length: 4 }).map((_, j) => {
                              const childKey = `${primaryKey}-child-${j + 1}`;
                              return (
                                <div key={j} className="flex items-center justify-between">
                                  <Label htmlFor={`${childKey}-active`} className="text-xs">Item {j+1}</Label>
                                  <Switch 
                                    id={`${childKey}-active`} 
                                    checked={settings[`${childKey}-active`] !== false}
                                    onCheckedChange={(checked) => handleChange(`${childKey}-active`, checked)}
                                  />
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
            </TabsContent>
            
            <TabsContent value="style" className="space-y-4">
              <div className="space-y-2">
                <Label>Background Color</Label>
                <RadioGroup 
                  value={settings.backgroundColor || 'bg-white'} 
                  onValueChange={(value) => handleChange('backgroundColor', value)}
                  className="grid grid-cols-3 gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bg-white" id="bg-white" />
                    <Label htmlFor="bg-white" className="bg-white border p-2 rounded flex-1">White</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bg-gray-50" id="bg-gray-50" />
                    <Label htmlFor="bg-gray-50" className="bg-gray-50 border p-2 rounded flex-1">Light Gray</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bg-purple-50" id="bg-purple-50" />
                    <Label htmlFor="bg-purple-50" className="bg-purple-50 border p-2 rounded flex-1">Light Purple</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bg-blue-50" id="bg-blue-50" />
                    <Label htmlFor="bg-blue-50" className="bg-blue-50 border p-2 rounded flex-1">Light Blue</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bg-gray-900" id="bg-gray-900" />
                    <Label htmlFor="bg-gray-900" className="bg-gray-900 text-white p-2 rounded flex-1">Dark</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Text Color</Label>
                <RadioGroup 
                  value={settings.textColor || 'text-gray-900'} 
                  onValueChange={(value) => handleChange('textColor', value)}
                  className="grid grid-cols-3 gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text-gray-900" id="text-gray-900" />
                    <Label htmlFor="text-gray-900" className="p-2 rounded flex-1">Dark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text-gray-600" id="text-gray-600" />
                    <Label htmlFor="text-gray-600" className="text-gray-600 p-2 rounded flex-1">Gray</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text-white" id="text-white" />
                    <Label htmlFor="text-white" className="bg-gray-900 text-white p-2 rounded flex-1">White</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text-blue-600" id="text-blue-600" />
                    <Label htmlFor="text-blue-600" className="text-blue-600 p-2 rounded flex-1">Blue</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text-purple-600" id="text-purple-600" />
                    <Label htmlFor="text-purple-600" className="text-purple-600 p-2 rounded flex-1">Purple</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size</Label>
                <Select 
                  value={settings.fontSize || 'medium'} 
                  onValueChange={(value) => handleChange('fontSize', value)}
                >
                  <SelectTrigger id="fontSize">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="textAlign">Text Alignment</Label>
                <Select 
                  value={settings.textAlign || 'text-left'} 
                  onValueChange={(value) => handleChange('textAlign', value)}
                >
                  <SelectTrigger id="textAlign">
                    <SelectValue placeholder="Select text alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text-left">Left</SelectItem>
                    <SelectItem value="text-center">Center</SelectItem>
                    <SelectItem value="text-right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            
            <TabsContent value="animation" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="animation">Animation Style</Label>
                <Select 
                  value={settings.animation || 'none'} 
                  onValueChange={(value) => handleChange('animation', value)}
                >
                  <SelectTrigger id="animation">
                    <SelectValue placeholder="Select animation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="fade">Fade In</SelectItem>
                    <SelectItem value="slide">Slide In</SelectItem>
                    <SelectItem value="scale">Scale In</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
        );
        
      case 'stats':
        return (
          <Tabs defaultValue="general">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="navigation">Navigation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="statsBackground">Background Color</Label>
                <Select 
                  value={settings.backgroundColor || 'blue'} 
                  onValueChange={(value) => handleChange('backgroundColor', value)}
                >
                  <SelectTrigger id="statsBackground">
                    <SelectValue placeholder="Select background color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="teal">Teal</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="gray">Gray</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="statsLayout">Layout</Label>
                <Select 
                  value={settings.layout || 'grid'} 
                  onValueChange={(value) => handleChange('layout', value)}
                >
                  <SelectTrigger id="statsLayout">
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="row">Row</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            
            <TabsContent value="navigation" className="space-y-4">
              <div className="text-sm mb-4 p-3 bg-amber-50 border border-amber-200 rounded">
                Each stat item can have its own navigation settings. Configure them when selecting content.
              </div>
              
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => {
                  const itemKey = `stat-${i + 1}`;
                  return (
                    <div key={i} className="border rounded p-3">
                      <h4 className="font-medium mb-2">Stat {i + 1}</h4>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`${itemKey}-navigationType`}>Navigation Type</Label>
                        <Select 
                          value={settings[`${itemKey}-navigationType`] || 'none'} 
                          onValueChange={(value) => handleChange(`${itemKey}-navigationType`, value)}
                        >
                          <SelectTrigger id={`${itemKey}-navigationType`}>
                            <SelectValue placeholder="Select navigation type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="url">External URL</SelectItem>
                            <SelectItem value="content_detail">Content Detail</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {settings[`${itemKey}-navigationType`] === 'url' && (
                        <div className="space-y-2 mt-2">
                          <Label htmlFor={`${itemKey}-navigationUrl`}>URL</Label>
                          <Input 
                            id={`${itemKey}-navigationUrl`} 
                            value={settings[`${itemKey}-navigationUrl`] || ''} 
                            onChange={(e) => handleChange(`${itemKey}-navigationUrl`, e.target.value)}
                            placeholder="https://example.com"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        );
      
      case 'services':
      case 'case-studies':
      case 'news':
        return (
          <Tabs defaultValue="general">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="navigation">Navigation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contentTitle">Section Title</Label>
                <Input 
                  id="contentTitle" 
                  value={settings.title || ''} 
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter section title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contentLayout">Layout Style</Label>
                <Select 
                  value={settings.layoutStyle || 'grid'} 
                  onValueChange={(value) => handleChange('layoutStyle', value)}
                >
                  <SelectTrigger id="contentLayout">
                    <SelectValue placeholder="Select layout style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="carousel">Carousel</SelectItem>
                    <SelectItem value="list">List</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contentCount">Items per row</Label>
                <Select 
                  value={settings.itemsPerRow?.toString() || '3'} 
                  onValueChange={(value) => handleChange('itemsPerRow', parseInt(value))}
                >
                  <SelectTrigger id="contentCount">
                    <SelectValue placeholder="Select items per row" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Items</SelectItem>
                    <SelectItem value="3">3 Items</SelectItem>
                    <SelectItem value="4">4 Items</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            
            <TabsContent value="navigation" className="space-y-4">
              <div className="text-sm mb-4 p-3 bg-amber-50 border border-amber-200 rounded">
                Each content item can have its own navigation settings. Configure them when selecting content.
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="viewAllButton">View All Button</Label>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="viewAllButton" 
                    checked={settings.showViewAll !== false}
                    onCheckedChange={(checked) => handleChange('showViewAll', checked)}
                  />
                  <Label htmlFor="viewAllButton">Show "View All" button</Label>
                </div>
              </div>
              
              {settings.showViewAll !== false && (
                <div className="space-y-2">
                  <Label htmlFor="viewAllUrl">View All URL</Label>
                  <Input 
                    id="viewAllUrl" 
                    value={settings.viewAllUrl || ''} 
                    onChange={(e) => handleChange('viewAllUrl', e.target.value)}
                    placeholder="https://example.com/all-items"
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
        );
        
      default:
        return (
          <div className="text-center text-gray-500 py-4">
            <p>No configurable settings available for this component type.</p>
          </div>
        );
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Component Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {renderComponentSettings()}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
