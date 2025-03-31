
import React from 'react';
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
import { Component } from '@/data/mockData';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface ComponentSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  component: Component | null;
}

export const ComponentSettingsDialog = ({ open, onOpenChange, component }: ComponentSettingsDialogProps) => {
  if (!component) return null;
  
  const renderComponentSettings = () => {
    switch (component.type) {
      case 'hero':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="background">Background</Label>
              <Select defaultValue={component.settings.background}>
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
              <Select defaultValue={component.settings.height}>
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
          </>
        );
        
      case 'featured':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="columns">Columns</Label>
              <Select defaultValue={component.settings.columns.toString()}>
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
            
            <div className="flex items-center space-x-2">
              <Switch id="show-image" defaultChecked={component.settings.showImage} />
              <Label htmlFor="show-image">Show Featured Image</Label>
            </div>
          </>
        );
        
      case 'grid':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="columns">Columns</Label>
              <Select defaultValue={component.settings.columns.toString()}>
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
            
            <div className="space-y-2">
              <Label htmlFor="rows">Rows</Label>
              <Select defaultValue={component.settings.rows.toString()}>
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
          </>
        );
      
      default:
        return (
          <div className="p-4 bg-gray-100 rounded-md">
            <p>No settings available for this component type.</p>
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
              defaultValue={component.name}
              placeholder="Enter component name" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="order">Display Order</Label>
            <Input 
              id="order" 
              type="number" 
              defaultValue={component.order}
              min="1"
            />
          </div>
          
          {renderComponentSettings()}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
