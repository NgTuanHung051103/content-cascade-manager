
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
import { Page } from '@/data/mockData';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface PageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  page: Page | null;
}

export const PageDialog = ({ open, onOpenChange, page }: PageDialogProps) => {
  const isEditing = !!page;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Page' : 'Add New Page'}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update the page information and settings'
              : 'Fill in the details to create a new page'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Page Title</Label>
            <Input 
              id="title" 
              placeholder="Page title" 
              defaultValue={page?.title}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <div className="flex items-center space-x-1">
              <span className="text-gray-500">/</span>
              <Input 
                id="slug" 
                placeholder="page-slug" 
                defaultValue={page?.slug}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-gray-500">
              The URL slug is used in the page's URL: example.com/<strong>{page?.slug || 'page-slug'}</strong>
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue={page?.status || "draft"}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>{isEditing ? 'Save Changes' : 'Create Page'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
