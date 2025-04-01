
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Content, contents } from '@/data/mockData';
import { CheckCircle, Grid, List, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';

interface ContentPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectContent: (content: Content, position?: string | null) => void;
  position?: string | null;
  multiSelect?: boolean;
}

export const ContentPickerDialog = ({ 
  open, 
  onOpenChange, 
  onSelectContent,
  position,
  multiSelect = false
}: ContentPickerDialogProps) => {
  const [filter, setFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  const [selectedMultipleIds, setSelectedMultipleIds] = useState<string[]>([]);

  const filteredContents = contents.filter(content => {
    const title = content.translations[0]?.title?.toLowerCase() || '';
    const description = content.translations[0]?.description?.toLowerCase() || '';
    const searchTerm = filter.toLowerCase();
    
    return title.includes(searchTerm) || description.includes(searchTerm);
  });

  const handleSelectContent = (content: Content) => {
    if (multiSelect) {
      if (selectedMultipleIds.includes(content.id)) {
        setSelectedMultipleIds(selectedMultipleIds.filter(id => id !== content.id));
      } else {
        setSelectedMultipleIds([...selectedMultipleIds, content.id]);
      }
    } else {
      setSelectedContentId(content.id);
    }
  };

  const handleConfirmSelection = () => {
    if (multiSelect) {
      const selectedContents = contents.filter(content => selectedMultipleIds.includes(content.id));
      if (selectedContents.length > 0) {
        selectedContents.forEach((content, index) => {
          const specificPosition = position ? `${position}-${index + 1}` : null;
          onSelectContent(content, specificPosition);
        });
        resetAndClose();
      }
    } else {
      const selectedContent = contents.find(content => content.id === selectedContentId);
      if (selectedContent) {
        onSelectContent(selectedContent, position);
        resetAndClose();
      }
    }
  };

  const resetAndClose = () => {
    setSelectedContentId(null);
    setSelectedMultipleIds([]);
    setFilter('');
    onOpenChange(false);
  };

  const getContentTypeLabel = (type: string | undefined) => {
    if (!type) return 'Content';
    
    switch(type) {
      case 'article': return 'Article';
      case 'product': return 'Product';
      case 'event': return 'Event';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const renderContentItem = (content: Content, viewType: 'grid' | 'list') => {
    const isSelected = multiSelect 
      ? selectedMultipleIds.includes(content.id) 
      : selectedContentId === content.id;
      
    if (viewType === 'grid') {
      return (
        <div
          key={content.id}
          className={`
            border rounded-md p-3 cursor-pointer transition-colors relative
            ${isSelected 
              ? 'border-primary bg-primary/5' 
              : 'hover:border-gray-400'
            }
          `}
          onClick={() => handleSelectContent(content)}
        >
          {isSelected && (
            <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary" />
          )}
          
          <div className="aspect-video bg-gray-100 rounded-sm mb-2 flex items-center justify-center text-gray-400">
            {content.featured_image 
              ? <img 
                  src={content.featured_image} 
                  alt={content.translations[0]?.title || ''} 
                  className="w-full h-full object-cover rounded-sm"
                />
              : 'No image'
            }
          </div>
          
          <h4 className="font-medium line-clamp-1">{content.translations[0]?.title || 'Untitled'}</h4>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
            {content.translations[0]?.description || 'No description'}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <Badge variant="outline">{getContentTypeLabel(content.content_type)}</Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(content.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={content.id}
          className={`
            border rounded-md p-3 cursor-pointer transition-colors flex items-center
            ${isSelected 
              ? 'border-primary bg-primary/5' 
              : 'hover:border-gray-400'
            }
          `}
          onClick={() => handleSelectContent(content)}
        >
          <div className="w-16 h-16 bg-gray-100 rounded-sm mr-3 flex-shrink-0">
            {content.featured_image 
              ? <img 
                  src={content.featured_image} 
                  alt={content.translations[0]?.title || ''} 
                  className="w-full h-full object-cover rounded-sm"
                />
              : 'No image'
            }
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-medium line-clamp-1">{content.translations[0]?.title || 'Untitled'}</h4>
            <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
              {content.translations[0]?.description || 'No description'}
            </p>
            <div className="mt-1 flex items-center">
              <Badge variant="outline" className="mr-2">{getContentTypeLabel(content.content_type)}</Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(content.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          {isSelected && (
            <CheckCircle className="h-5 w-5 text-primary ml-2" />
          )}
        </div>
      );
    }
  };

  const renderContentList = (contentList: Content[], tabType?: string) => {
    const filteredTabContents = tabType 
      ? contentList.filter(content => content.content_type === tabType)
      : contentList;
      
    if (filteredTabContents.length === 0) {
      return (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">
            {tabType 
              ? `No ${tabType}s found matching your search`
              : 'No content found matching your search'
            }
          </p>
        </div>
      );
    }
    
    return (
      viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredTabContents.map(content => renderContentItem(content, 'grid'))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTabContents.map(content => renderContentItem(content, 'list'))}
        </div>
      )
    );
  };

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {multiSelect ? 'Select Multiple Content' : 'Select Content'}
          </DialogTitle>
          <DialogDescription>
            {position 
              ? `Choose content for position: ${position}`
              : multiSelect
                ? 'Choose multiple content items to include in this component'
                : 'Choose content to include in this component'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-between py-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              className="pl-8"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="article">Articles</TabsTrigger>
            <TabsTrigger value="product">Products</TabsTrigger>
            <TabsTrigger value="event">Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <ScrollArea className="h-[50vh]">
              {renderContentList(filteredContents)}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="article" className="mt-0">
            <ScrollArea className="h-[50vh]">
              {renderContentList(filteredContents, 'article')}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="product" className="mt-0">
            <ScrollArea className="h-[50vh]">
              {renderContentList(filteredContents, 'product')}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="event" className="mt-0">
            <ScrollArea className="h-[50vh]">
              {renderContentList(filteredContents, 'event')}
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={resetAndClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmSelection}
            disabled={!multiSelect ? !selectedContentId : selectedMultipleIds.length === 0}
          >
            {multiSelect 
              ? `Select ${selectedMultipleIds.length} Item${selectedMultipleIds.length !== 1 ? 's' : ''}`
              : 'Select Content'
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
