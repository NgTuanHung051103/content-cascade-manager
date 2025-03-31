
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
import { Component, Content, contents, findCategoryById } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Search, FileText, Tag, Filter, Check, CalendarDays, X } from 'lucide-react';
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
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from '@/components/ui/scroll-area';

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
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  useEffect(() => {
    if (open && component && position) {
      const currentContentId = component.contents.find(c => c.position === position)?.contentId || null;
      setSelectedContentId(currentContentId);
    }
  }, [open, component, position]);
  
  if (!component || !position) return null;
  
  const filteredContents = contents.filter(content => {
    // Apply search query filter
    const titleMatch = content.translations.some(t => 
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const categoryMatch = findCategoryById(content.categoryId)?.translations.some(t =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply status filter if active
    const statusMatch = filterStatus ? content.status === filterStatus : true;

    // Apply category filter if active
    const categoryFilterMatch = filterCategory ? content.categoryId === filterCategory : true;
    
    return (titleMatch || categoryMatch) && statusMatch && categoryFilterMatch;
  });

  // Get unique categories for the filter
  const categories = Array.from(new Set(contents.map(content => content.categoryId)))
    .map(categoryId => findCategoryById(categoryId))
    .filter(Boolean);
  
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

  const clearFilters = () => {
    setFilterStatus(null);
    setFilterCategory(null);
    setSearchQuery('');
  };

  const selectedContent = contents.find(content => content.id === selectedContentId);
  const selectedContentTitle = selectedContent?.translations.find(t => t.languageId === 'lang-1')?.title || '';
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Select Content for {position}</DialogTitle>
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
            
            {/* View toggle */}
            <div className="flex border rounded-md overflow-hidden">
              <Button 
                variant={view === 'list' ? "default" : "ghost"} 
                size="sm" 
                className="rounded-none"
                onClick={() => setView('list')}
              >
                <FileText className="h-4 w-4" />
              </Button>
              <Button 
                variant={view === 'grid' ? "default" : "ghost"} 
                size="sm" 
                className="rounded-none"
                onClick={() => setView('grid')}
              >
                <Tag className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Filters dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filters
                  {(filterStatus || filterCategory) && (
                    <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-violet-500">
                      {filterStatus && filterCategory ? "2" : "1"}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <div className="p-2">
                    <div className="font-medium mb-1">Status</div>
                    <div className="grid grid-cols-2 gap-1">
                      <Button 
                        size="sm" 
                        variant={filterStatus === 'published' ? "default" : "outline"} 
                        onClick={() => setFilterStatus(filterStatus === 'published' ? null : 'published')}
                        className="w-full justify-start text-xs"
                      >
                        Published
                      </Button>
                      <Button 
                        size="sm" 
                        variant={filterStatus === 'draft' ? "default" : "outline"} 
                        onClick={() => setFilterStatus(filterStatus === 'draft' ? null : 'draft')}
                        className="w-full justify-start text-xs"
                      >
                        Draft
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-2 border-t">
                    <div className="font-medium mb-1">Categories</div>
                    <ScrollArea className="h-40">
                      <div className="space-y-1">
                        {categories.map(category => {
                          const name = category?.translations.find(t => t.languageId === 'lang-1')?.name || '';
                          return (
                            <Button
                              key={category?.id}
                              size="sm"
                              variant={filterCategory === category?.id ? "default" : "outline"}
                              onClick={() => setFilterCategory(filterCategory === category?.id ? null : category?.id || null)}
                              className="w-full justify-start text-xs"
                            >
                              {name}
                            </Button>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  {(filterStatus || filterCategory) && (
                    <div className="p-2 border-t">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={clearFilters}
                        className="w-full"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Clear All Filters
                      </Button>
                    </div>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {(filterStatus || filterCategory) && (
            <div className="flex items-center text-sm text-gray-500">
              <span>Filtered by:</span>
              {filterStatus && (
                <Badge variant="outline" className="ml-2">
                  Status: {filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 ml-1 p-0"
                    onClick={() => setFilterStatus(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filterCategory && (
                <Badge variant="outline" className="ml-2">
                  Category: {findCategoryById(filterCategory)?.translations.find(t => t.languageId === 'lang-1')?.name}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 ml-1 p-0"
                    onClick={() => setFilterCategory(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          )}
          
          <div className="border rounded-md overflow-hidden max-h-[60vh]">
            {view === 'list' && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
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
                          <div className="flex items-center justify-center h-4 w-4">
                            {selectedContentId === content.id ? (
                              <Check className="h-4 w-4 text-violet-500" />
                            ) : (
                              <input 
                                type="radio" 
                                className="h-4 w-4 text-violet-600"
                                checked={selectedContentId === content.id}
                                onChange={() => handleSelectContent(content.id)}
                              />
                            )}
                          </div>
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
                        <TableCell className="text-gray-500 text-sm">
                          <div className="flex items-center">
                            <CalendarDays className="h-3 w-3 mr-1" />
                            {new Date(content.updatedAt).toLocaleDateString()}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  
                  {filteredContents.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No content matching your search
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
            
            {view === 'grid' && (
              <ScrollArea className="h-[60vh] p-4">
                <div className="grid grid-cols-3 gap-4">
                  {filteredContents.map(content => {
                    const englishTitle = content.translations.find(
                      t => t.languageId === 'lang-1'
                    )?.title || 'Untitled';
                    
                    const englishExcerpt = content.translations.find(
                      t => t.languageId === 'lang-1'
                    )?.description || '';
                    
                    const category = findCategoryById(content.categoryId);
                    const categoryName = category?.translations.find(
                      t => t.languageId === 'lang-1'
                    )?.name || 'Uncategorized';
                    
                    return (
                      <div 
                        key={content.id}
                        className={`border rounded-md p-4 cursor-pointer hover:border-violet-300 transition-colors ${
                          selectedContentId === content.id ? 'border-violet-500 bg-violet-50' : ''
                        }`}
                        onClick={() => handleSelectContent(content.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium truncate">{englishTitle}</div>
                          <input 
                            type="radio" 
                            className="h-4 w-4 text-violet-600 mt-1"
                            checked={selectedContentId === content.id}
                            onChange={() => handleSelectContent(content.id)}
                          />
                        </div>
                        
                        <div className="text-xs text-gray-500 mb-2 line-clamp-2">
                          {englishExcerpt}
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className="text-xs">
                            {categoryName}
                          </Badge>
                          <Badge 
                            variant={content.status === 'published' ? 'default' : 'secondary'}
                            className={`text-xs ${content.status === 'published' ? 'bg-green-500' : ''}`}
                          >
                            {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                  
                  {filteredContents.length === 0 && (
                    <div className="col-span-3 text-center py-8 text-gray-500">
                      No content matching your search
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
        
        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <div className="text-sm">
            {selectedContentId ? (
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">Selected:</span>
                <Badge variant="outline" className="font-medium">
                  {selectedContentTitle}
                </Badge>
              </div>
            ) : (
              <span className="text-gray-500">No content selected</span>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={!selectedContentId}>
              <Check className="h-4 w-4 mr-2" />
              Confirm Selection
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
