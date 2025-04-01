
import React, { useState, useEffect } from 'react';
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
import { toast } from '@/components/ui/use-toast';
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
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  // Reset form when dialog opens with new page data
  useEffect(() => {
    if (open) {
      setTitle(page?.title || '');
      setSlug(page?.slug || '');
      setStatus(page?.status || 'draft');
    }
  }, [open, page]);

  // Generate a slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    // Only auto-generate slug if it's a new page or the slug is empty
    if (!isEditing || slug === '') {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSave = () => {
    if (!title) {
      toast({
        title: "Validation Error",
        description: "Page title is required",
        variant: "destructive"
      });
      return;
    }

    if (!slug) {
      toast({
        title: "Validation Error",
        description: "URL slug is required",
        variant: "destructive"
      });
      return;
    }

    // In a real application, this would call an API to save the page
    toast({
      title: isEditing ? "Page Updated" : "Page Created",
      description: `${title} has been ${isEditing ? 'updated' : 'created'} successfully.`,
    });
    
    // Close the dialog
    onOpenChange(false);
  };
  
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
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <div className="flex items-center space-x-1">
              <span className="text-gray-500">/</span>
              <Input 
                id="slug" 
                placeholder="page-slug" 
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-gray-500">
              The URL slug is used in the page's URL: example.com/<strong>{slug || 'page-slug'}</strong>
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={status} 
              onValueChange={(value: 'draft' | 'published') => setStatus(value)}
            >
              <SelectTrigger id="status">
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
          <Button onClick={handleSave}>{isEditing ? 'Save Changes' : 'Create Page'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
