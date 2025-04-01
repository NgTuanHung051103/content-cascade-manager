
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';

interface Component {
  id: string;
  type: string;
  contents?: { [key: string]: any };
  settings?: any;
}

interface ComponentSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  component: Component | null;
  onSaveSettings?: (settings: any) => void;
}

export const ComponentSettingsDialog = ({ 
  open, 
  onOpenChange, 
  component, 
  onSaveSettings 
}: ComponentSettingsDialogProps) => {
  const [name, setName] = useState(component?.settings?.name || '');
  const [order, setOrder] = useState(component?.settings?.order || 1);
  const [settings, setSettings] = useState(component?.settings || {});

  if (!component) return null;
  
  const updateSetting = (key: string, value: any) => {
    setSettings({
      ...settings,
      [key]: value
    });
  };

  const handleSave = () => {
    const updatedSettings = {
      ...settings,
      name,
      order
    };
    
    if (onSaveSettings) {
      onSaveSettings(updatedSettings);
    }
    
    toast({
      title: "Settings Saved",
      description: "Component settings have been updated successfully",
    });
    
    onOpenChange(false);
  };
  
  const renderComponentSettings = () => {
    switch (component.type) {
      case 'hero':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="background">Background</Label>
              <Select 
                defaultValue={settings.background || 'light'}
                onValueChange={(value) => updateSetting('background', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select background style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="image">Image Background</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="height">Banner Height</Label>
              <Select 
                defaultValue={settings.height || 'medium'}
                onValueChange={(value) => updateSetting('height', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select height" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 py-2">
              <Switch 
                id="show-button" 
                checked={settings.showButton === undefined ? true : settings.showButton}
                onCheckedChange={(checked) => updateSetting('showButton', checked)}
              />
              <Label htmlFor="show-button">Show Action Button</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="buttonText">Button Text</Label>
              <Input 
                id="buttonText" 
                value={settings.buttonText || 'Learn More'}
                onChange={(e) => updateSetting('buttonText', e.target.value)}
                placeholder="Enter button text" 
              />
            </div>
          </>
        );
        
      case 'featured':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="columns">Columns</Label>
              <Select 
                defaultValue={settings.columns?.toString() || '3'}
                onValueChange={(value) => updateSetting('columns', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select number of columns" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Column</SelectItem>
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 py-2">
              <Switch 
                id="show-image" 
                checked={settings.showImage === undefined ? true : settings.showImage}
                onCheckedChange={(checked) => updateSetting('showImage', checked)}
              />
              <Label htmlFor="show-image">Show Featured Image</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Section Title</Label>
              <Input 
                id="title" 
                value={settings.title || 'Featured Content'}
                onChange={(e) => updateSetting('title', e.target.value)}
                placeholder="Enter section title" 
              />
            </div>
            
            <div className="flex items-center space-x-2 py-2">
              <Switch 
                id="show-description" 
                checked={settings.showDescription === undefined ? true : settings.showDescription}
                onCheckedChange={(checked) => updateSetting('showDescription', checked)}
              />
              <Label htmlFor="show-description">Show Description</Label>
            </div>
          </>
        );
        
      case 'grid':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="columns">Columns</Label>
              <Select 
                defaultValue={settings.columns?.toString() || '4'}
                onValueChange={(value) => updateSetting('columns', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select number of columns" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                  <SelectItem value="6">6 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rows">Rows</Label>
              <Select 
                defaultValue={settings.rows?.toString() || '2'}
                onValueChange={(value) => updateSetting('rows', parseInt(value))}
              >
                <SelectTrigger>
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
            
            <div className="space-y-2">
              <Label htmlFor="gridTitle">Section Title</Label>
              <Input 
                id="gridTitle" 
                value={settings.title || 'Content Grid'}
                onChange={(e) => updateSetting('title', e.target.value)}
                placeholder="Enter grid title" 
              />
            </div>
            
            <div className="flex items-center space-x-2 py-2">
              <Switch 
                id="show-grid-title" 
                checked={settings.showTitle === undefined ? true : settings.showTitle}
                onCheckedChange={(checked) => updateSetting('showTitle', checked)}
              />
              <Label htmlFor="show-grid-title">Show Grid Title</Label>
            </div>
          </>
        );
        
      case 'hierarchy':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="hierarchy-title">Section Title</Label>
              <Input 
                id="hierarchy-title" 
                value={settings.title || 'Hierarchy Content'}
                onChange={(e) => updateSetting('title', e.target.value)}
                placeholder="Enter section title" 
              />
            </div>
            
            <div className="flex items-center space-x-2 py-2">
              <Switch 
                id="show-hierarchy-title" 
                checked={settings.showTitle === undefined ? true : settings.showTitle}
                onCheckedChange={(checked) => updateSetting('showTitle', checked)}
              />
              <Label htmlFor="show-hierarchy-title">Show Section Title</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secondary-layout">Secondary Content Layout</Label>
              <Select 
                defaultValue={settings.secondaryLayout || 'grid'}
                onValueChange={(value) => updateSetting('secondaryLayout', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid</SelectItem>
                  <SelectItem value="list">List</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tertiary-layout">Tertiary Content Layout</Label>
              <Select 
                defaultValue={settings.tertiaryLayout || 'compact'}
                onValueChange={(value) => updateSetting('tertiaryLayout', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="grid">Grid</SelectItem>
                  <SelectItem value="list">List</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
        
      case 'text':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="text-width">Width</Label>
              <Select 
                defaultValue={settings.width || 'normal'}
                onValueChange={(value) => updateSetting('width', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select width" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="narrow">Narrow</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="wide">Wide</SelectItem>
                  <SelectItem value="full">Full Width</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="text-alignment">Text Alignment</Label>
              <Select 
                defaultValue={settings.alignment || 'left'}
                onValueChange={(value) => updateSetting('alignment', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select alignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      
      default:
        return (
          <div className="p-4 bg-gray-100 rounded-md">
            <p>No specific settings available for this component type.</p>
          </div>
        );
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Component Settings</DialogTitle>
          <DialogDescription>
            Customize the settings for this component
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Component Name</Label>
            <Input 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter component name" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="order">Display Order</Label>
            <Input 
              id="order" 
              type="number" 
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value))}
              min="1"
            />
          </div>
          
          {renderComponentSettings()}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
