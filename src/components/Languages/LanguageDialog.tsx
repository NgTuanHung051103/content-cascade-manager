
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
import { Language } from '@/data/mockData';

interface LanguageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: Language | null;
}

export const LanguageDialog = ({ open, onOpenChange, language }: LanguageDialogProps) => {
  const isEditing = !!language;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Language' : 'Add New Language'}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update the language information'
              : 'Fill in the details to add a new language'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Language Name</Label>
            <Input 
              id="name" 
              placeholder="Language name" 
              defaultValue={language?.name}
            />
            <p className="text-xs text-gray-500">
              The display name of the language, e.g., "English", "French"
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="code">Language Code</Label>
            <Input 
              id="code" 
              placeholder="en" 
              defaultValue={language?.code}
              maxLength={5}
            />
            <p className="text-xs text-gray-500">
              ISO language code (e.g., "en" for English, "fr" for French)
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>{isEditing ? 'Save Changes' : 'Add Language'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
