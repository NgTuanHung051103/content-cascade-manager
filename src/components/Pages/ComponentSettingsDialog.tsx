
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
  
  // Reset settings when component changes
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
          <div className="space-y-4">
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
          </div>
        );
        
      case 'featured':
        return (
          <div className="space-y-4">
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
          </div>
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
                                    size="sm"
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
                  value={settings.animation || ''} 
                  onValueChange={(value) => handleChange('animation', value)}
                >
                  <SelectTrigger id="animation">
                    <SelectValue placeholder="Select animation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    <SelectItem value="fade">Fade In</SelectItem>
                    <SelectItem value="slide">Slide In</SelectItem>
                    <SelectItem value="scale">Scale In</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
