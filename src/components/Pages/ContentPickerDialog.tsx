
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
import { Component, Content, contents, findCategoryById } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Search, FileText } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from "@/components/ui/use-toast";

interface ContentPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  component: Component | null;
  position: string | null;
}

export const ContentPickerDialog = ({ 
  open, 
  onOpenChange, 
  component,
  position
}: ContentPickerDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContentId, setSelectedContentId] = useState<string | null>(
    component?.contents.find(c => c.position === position)?.contentId || null
  );
  
  if (!component || !position) return null;
  
  const filteredContents = contents.filter(content => {
    const titleMatch = content.translations.some(t => 
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const categoryMatch = findCategoryById(content.categoryId)?.translations.some(t =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return titleMatch || categoryMatch;
  });
  
  const handleSelectContent = (contentId: string) => {
    setSelectedContentId(contentId);
  };
  
  const handleConfirm = () => {
    if (selectedContentId) {
      // Here you would update the component content in real app
      toast({
        title: "Content Selected",
        description: `Content has been assigned to position ${position}`,
        duration: 3000,
      });
      onOpenChange(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Select Content</DialogTitle>
          <DialogDescription>
            Choose content for the {position} position in {component.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search by title or category..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="border rounded-md overflow-hidden max-h-[60vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]"></TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContents.map(content => {
                  const englishTitle = content.translations.find(
                    t => t.languageId === 'lang-1'
                  )?.title || 'Untitled';
                  
                  const category = findCategoryById(content.categoryId);
                  const categoryName = category?.translations.find(
                    t => t.languageId === 'lang-1'
                  )?.name || 'Uncategorized';
                  
                  return (
                    <TableRow 
                      key={content.id}
                      className={`cursor-pointer hover:bg-gray-50 ${selectedContentId === content.id ? 'bg-violet-50' : ''}`}
                      onClick={() => handleSelectContent(content.id)}
                    >
                      <TableCell>
                        <input 
                          type="radio" 
                          className="w-4 h-4 text-violet-600"
                          checked={selectedContentId === content.id}
                          onChange={() => handleSelectContent(content.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-gray-500" />
                          {englishTitle}
                        </div>
                      </TableCell>
                      <TableCell>{categoryName}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={content.status === 'published' ? 'default' : 'secondary'}
                          className={content.status === 'published' ? 'bg-green-500' : ''}
                        >
                          {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
                
                {filteredContents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      No content matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedContentId}>
            Select Content
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
