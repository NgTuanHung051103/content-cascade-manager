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
import { Textarea } from '@/components/ui/textarea';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Category, languages } from '@/data/mockData';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { categories } from '@/data/mockData';

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
}

export const CategoryDialog = ({ open, onOpenChange, category }: CategoryDialogProps) => {
  const isEditing = !!category;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Category' : 'Add New Category'}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update the category information and translations'
              : 'Fill in the details to create a new category'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="parent">Parent Category</Label>
            <Select defaultValue={category?.parentId || "none"}>
              <SelectTrigger>
                <SelectValue placeholder="Select parent category (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Parent</SelectItem>
                {categories.map(cat => {
                  const name = cat.translations.find(t => t.languageId === 'lang-1')?.name || cat.id;
                  return (
                    <SelectItem key={cat.id} value={cat.id}>
                      {name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input 
              id="slug" 
              placeholder="category-slug" 
              defaultValue={category?.slug}
            />
          </div>
          
          <Tabs defaultValue="lang-1">
            <TabsList className="mb-4">
              {languages.map(lang => (
                <TabsTrigger key={lang.id} value={lang.id}>
                  {lang.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {languages.map(lang => {
              const translation = category?.translations.find(t => t.languageId === lang.id);
              
              return (
                <TabsContent key={lang.id} value={lang.id} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${lang.id}`}>Name ({lang.name})</Label>
                    <Input 
                      id={`name-${lang.id}`} 
                      placeholder={`Category name in ${lang.name}`}
                      defaultValue={translation?.name || ''}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`description-${lang.id}`}>Description ({lang.name})</Label>
                    <Textarea 
                      id={`description-${lang.id}`} 
                      placeholder={`Category description in ${lang.name}`}
                      rows={3}
                      defaultValue={translation?.description || ''}
                    />
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>{isEditing ? 'Save Changes' : 'Create Category'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
