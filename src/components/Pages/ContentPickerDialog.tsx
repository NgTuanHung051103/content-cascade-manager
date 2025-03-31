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
  onSelectContent: (content: Content) => void;
  position?: string | null;
}

export const ContentPickerDialog = ({ 
  open, 
  onOpenChange, 
  onSelectContent,
  position
}: ContentPickerDialogProps) => {
  const [filter, setFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);

  const filteredContents = contents.filter(content => {
    const title = content.translations[0]?.title?.toLowerCase() || '';
    const description = content.translations[0]?.description?.toLowerCase() || '';
    const searchTerm = filter.toLowerCase();
    
    return title.includes(searchTerm) || description.includes(searchTerm);
  });

  const handleSelectContent = (content: Content) => {
    setSelectedContentId(content.id);
  };

  const handleConfirmSelection = () => {
    const selectedContent = contents.find(content => content.id === selectedContentId);
    if (selectedContent) {
      onSelectContent(selectedContent);
      resetAndClose();
    }
  };

  const resetAndClose = () => {
    setSelectedContentId(null);
    setFilter('');
    onOpenChange(false);
  };

  const getContentTypeLabel = (type: string) => {
    switch(type) {
      case 'article': return 'Article';
      case 'product': return 'Product';
      case 'event': return 'Event';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Select Content</DialogTitle>
          <DialogDescription>
            {position 
              ? `Choose content for position: ${position}`
              : 'Choose content to include in this component'}
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
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredContents.map(content => (
                    <div
                      key={content.id}
                      className={`
                        border rounded-md p-3 cursor-pointer transition-colors
                        ${selectedContentId === content.id 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-gray-400'
                        }
                      `}
                      onClick={() => handleSelectContent(content)}
                    >
                      {selectedContentId === content.id && (
                        <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary" />
                      )}
                      
                      <div className="aspect-video bg-gray-100 rounded-sm mb-2 flex items-center justify-center text-gray-400">
                        {content.featuredImage 
                          ? <img 
                              src={content.featuredImage.url} 
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
                        <Badge variant="outline">{getContentTypeLabel(content.type)}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(content.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredContents.map(content => (
                    <div
                      key={content.id}
                      className={`
                        border rounded-md p-3 cursor-pointer transition-colors flex items-center
                        ${selectedContentId === content.id 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-gray-400'
                        }
                      `}
                      onClick={() => handleSelectContent(content)}
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-sm mr-3 flex-shrink-0">
                        {content.featuredImage 
                          ? <img 
                              src={content.featuredImage.url} 
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
                          <Badge variant="outline" className="mr-2">{getContentTypeLabel(content.type)}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(content.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      {selectedContentId === content.id && (
                        <CheckCircle className="h-5 w-5 text-primary ml-2" />
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {filteredContents.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">No content found matching your search</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="article" className="mt-0">
            <ScrollArea className="h-[50vh]">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredContents
                    .filter(content => content.type === 'article')
                    .map(content => (
                      <div
                        key={content.id}
                        className={`
                          border rounded-md p-3 cursor-pointer transition-colors
                          ${selectedContentId === content.id 
                            ? 'border-primary bg-primary/5' 
                            : 'hover:border-gray-400'
                          }
                        `}
                        onClick={() => handleSelectContent(content)}
                      >
                        {selectedContentId === content.id && (
                          <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary" />
                        )}
                        
                        <div className="aspect-video bg-gray-100 rounded-sm mb-2 flex items-center justify-center text-gray-400">
                          {content.featuredImage 
                            ? <img 
                                src={content.featuredImage.url} 
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
                          <Badge variant="outline">{getContentTypeLabel(content.type)}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(content.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredContents
                    .filter(content => content.type === 'article')
                    .map(content => (
                      <div
                        key={content.id}
                        className={`
                          border rounded-md p-3 cursor-pointer transition-colors flex items-center
                          ${selectedContentId === content.id 
                            ? 'border-primary bg-primary/5' 
                            : 'hover:border-gray-400'
                          }
                        `}
                        onClick={() => handleSelectContent(content)}
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-sm mr-3 flex-shrink-0">
                          {content.featuredImage 
                            ? <img 
                                src={content.featuredImage.url} 
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
                            <Badge variant="outline" className="mr-2">{getContentTypeLabel(content.type)}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(content.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        
                        {selectedContentId === content.id && (
                          <CheckCircle className="h-5 w-5 text-primary ml-2" />
                        )}
                      </div>
                    ))}
                </div>
              )}
              
              {filteredContents.filter(content => content.type === 'article').length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">No articles found matching your search</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="product" className="mt-0">
            <ScrollArea className="h-[50vh]">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredContents
                    .filter(content => content.type === 'product')
                    .map(content => (
                      <div
                        key={content.id}
                        className={`
                          border rounded-md p-3 cursor-pointer transition-colors
                          ${selectedContentId === content.id 
                            ? 'border-primary bg-primary/5' 
                            : 'hover:border-gray-400'
                          }
                        `}
                        onClick={() => handleSelectContent(content)}
                      >
                        {selectedContentId === content.id && (
                          <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary" />
                        )}
                        
                        <div className="aspect-video bg-gray-100 rounded-sm mb-2 flex items-center justify-center text-gray-400">
                          {content.featuredImage 
                            ? <img 
                                src={content.featuredImage.url} 
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
                          <Badge variant="outline">{getContentTypeLabel(content.type)}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(content.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredContents
                    .filter(content => content.type === 'product')
                    .map(content => (
                      <div
                        key={content.id}
                        className={`
                          border rounded-md p-3 cursor-pointer transition-colors flex items-center
                          ${selectedContentId === content.id 
                            ? 'border-primary bg-primary/5' 
                            : 'hover:border-gray-400'
                          }
                        `}
                        onClick={() => handleSelectContent(content)}
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-sm mr-3 flex-shrink-0">
                          {content.featuredImage 
                            ? <img 
                                src={content.featuredImage.url} 
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
                            <Badge variant="outline" className="mr-2">{getContentTypeLabel(content.type)}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(content.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        
                        {selectedContentId === content.id && (
                          <CheckCircle className="h-5 w-5 text-primary ml-2" />
                        )}
                      </div>
                    ))}
                </div>
              )}
              
              {filteredContents.filter(content => content.type === 'product').length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">No products found matching your search</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="event" className="mt-0">
            <ScrollArea className="h-[50vh]">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredContents
                    .filter(content => content.type === 'event')
                    .map(content => (
                      <div
                        key={content.id}
                        className={`
                          border rounded-md p-3 cursor-pointer transition-colors
                          ${selectedContentId === content.id 
                            ? 'border-primary bg-primary/5' 
                            : 'hover:border-gray-400'
                          }
                        `}
                        onClick={() => handleSelectContent(content)}
                      >
                        {selectedContentId === content.id && (
                          <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary" />
                        )}
                        
                        <div className="aspect-video bg-gray-100 rounded-sm mb-2 flex items-center justify-center text-gray-400">
                          {content.featuredImage 
                            ? <img 
                                src={content.featuredImage.url} 
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
                          <Badge variant="outline">{getContentTypeLabel(content.type)}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(content.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredContents
                    .filter(content => content.type === 'event')
                    .map(content => (
                      <div
                        key={content.id}
                        className={`
                          border rounded-md p-3 cursor-pointer transition-colors flex items-center
                          ${selectedContentId === content.id 
                            ? 'border-primary bg-primary/5' 
                            : 'hover:border-gray-400'
                          }
                        `}
                        onClick={() => handleSelectContent(content)}
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-sm mr-3 flex-shrink-0">
                          {content.featuredImage 
                            ? <img 
                                src={content.featuredImage.url} 
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
                            <Badge variant="outline" className="mr-2">{getContentTypeLabel(content.type)}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(content.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        
                        {selectedContentId === content.id && (
                          <CheckCircle className="h-5 w-5 text-primary ml-2" />
                        )}
                      </div>
                    ))}
                </div>
              )}
              
              {filteredContents.filter(content => content.type === 'event').length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">No events found matching your search</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={resetAndClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmSelection}
            disabled={!selectedContentId}
          >
            Select Content
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
