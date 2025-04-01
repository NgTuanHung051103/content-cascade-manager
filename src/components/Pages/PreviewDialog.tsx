import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ExternalLink, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Page, Content } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TreeBranch } from './TreeBranch';

interface PageComponent {
  id: string;
  type: string;
  contents?: { [key: string]: Content | null };
  settings?: any;
}

interface PreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  page: Page | null;
  components: PageComponent[];
}

export const PreviewDialog = ({ 
  open, 
  onOpenChange, 
  page,
  components 
}: PreviewDialogProps) => {
  
  const renderComponentPreview = (component: PageComponent) => {
    switch(component.type) {
      case 'hero':
        return (
          <div className={`w-full p-8 mb-6 rounded-lg ${component.settings?.background === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}
               style={{
                 height: component.settings?.height === 'small' ? '200px' :
                         component.settings?.height === 'large' ? '500px' : '300px'
               }}>
            <div className="max-w-3xl mx-auto h-full flex flex-col justify-center">
              {component.contents?.main ? (
                <>
                  <h1 className="text-4xl font-bold mb-4">{component.contents.main.translations[0]?.title}</h1>
                  <p className="text-lg mb-6">{component.contents.main.translations[0]?.description}</p>
                  <div>
                    <Button className="mr-4">Learn More</Button>
                    <Button variant="outline">Contact Us</Button>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500">
                  <p>Hero Banner Content</p>
                  <p className="text-sm">(No content selected)</p>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'text':
        return (
          <div className="max-w-3xl mx-auto py-8 px-4">
            {component.contents?.main ? (
              <>
                <h2 className="text-2xl font-bold mb-4">{component.contents.main.translations[0]?.title}</h2>
                <div className="prose max-w-none">
                  <p>{component.contents.main.translations[0]?.description}</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 border border-dashed p-8 rounded">
                <p>Text Block Content</p>
                <p className="text-sm">(No content selected)</p>
              </div>
            )}
          </div>
        );
        
      case 'featured':
        const featuredColumns = component.settings?.columns || 3;
        return (
          <div className="py-8 px-4 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Featured Content</h2>
            <div className={`grid grid-cols-1 md:grid-cols-${Math.min(featuredColumns, 4)} gap-6`}>
              {Array.from({ length: featuredColumns }).map((_, i) => {
                const positionKey = `featured-${i + 1}`;
                const featuredContent = component.contents?.[positionKey];
                
                return (
                  <div key={i} className="rounded-lg border overflow-hidden">
                    {component.settings?.showImage !== false && (
                      <div className="aspect-video bg-gray-200">
                        {featuredContent?.featured_image ? (
                          <img 
                            src={featuredContent.featured_image} 
                            alt={featuredContent.translations[0]?.title || ''} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            No image
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-4">
                      {featuredContent ? (
                        <>
                          <h3 className="font-bold mb-2">{featuredContent.translations[0]?.title}</h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{featuredContent.translations[0]?.description}</p>
                          <Button size="sm" variant="outline">Read More</Button>
                        </>
                      ) : (
                        <div className="text-center text-gray-500 py-4">
                          <p>Featured Item {i + 1}</p>
                          <p className="text-sm">(No content selected)</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
        
      case 'grid':
        const gridColumns = component.settings?.columns || 4;
        const gridRows = component.settings?.rows || 2;
        const totalCells = gridColumns * gridRows;
        
        return (
          <div className="py-8 px-4 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Content Grid</h2>
            <div className={`grid grid-cols-2 md:grid-cols-${Math.min(gridColumns, 4)} gap-4`}>
              {Array.from({ length: totalCells }).map((_, i) => {
                const positionKey = `grid-${i + 1}`;
                const gridContent = component.contents?.[positionKey];
                
                return (
                  <div key={i} className="border rounded-md overflow-hidden">
                    <div className="aspect-video bg-gray-200">
                      {gridContent?.featured_image ? (
                        <img 
                          src={gridContent.featured_image} 
                          alt={gridContent.translations[0]?.title || ''} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      {gridContent ? (
                        <>
                          <h4 className="font-medium text-sm mb-1 line-clamp-1">{gridContent.translations[0]?.title}</h4>
                          <p className="text-xs text-gray-600 line-clamp-2">{gridContent.translations[0]?.description}</p>
                        </>
                      ) : (
                        <div className="text-center text-gray-500 py-2">
                          <p className="text-xs">Item {i + 1}</p>
                          <p className="text-xs">(No content)</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
        
      case 'hierarchy':
        const secondaryCount = component.settings?.secondaryCount || 4;
        const tertiaryCount = component.settings?.tertiaryCount || 4;
        
        return (
          <div className="py-8 px-4 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Hierarchy Content</h2>
            
            {/* Main content */}
            <div className="mb-8">
              {component.contents?.main ? (
                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gray-200">
                    {component.contents.main.featured_image ? (
                      <img 
                        src={component.contents.main.featured_image} 
                        alt={component.contents.main.translations[0]?.title || ''} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    {component.contents.main.content_type && (
                      <Badge className="mb-2">{component.contents.main.content_type}</Badge>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{component.contents.main.translations[0]?.title}</h3>
                    <p className="text-gray-600 mb-4">{component.contents.main.translations[0]?.description}</p>
                    <Button>Read More</Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 border border-dashed p-10 rounded-lg">
                  <p>Main Content</p>
                  <p className="text-sm">(No content selected)</p>
                </div>
              )}
            </div>
            
            {/* Secondary content */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Secondary Content</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Array.from({ length: secondaryCount }).map((_, i) => {
                  const positionKey = `secondary-${i + 1}`;
                  const secondaryContent = component.contents?.[positionKey];
                  
                  return (
                    <div key={i} className="border rounded-md overflow-hidden">
                      <div className="aspect-video bg-gray-200">
                        {secondaryContent?.featured_image ? (
                          <img 
                            src={secondaryContent.featured_image} 
                            alt={secondaryContent.translations[0]?.title || ''} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        {secondaryContent ? (
                          <>
                            <h4 className="font-medium text-sm mb-1 line-clamp-1">{secondaryContent.translations[0]?.title}</h4>
                            <p className="text-xs text-gray-600 line-clamp-2">{secondaryContent.translations[0]?.description}</p>
                          </>
                        ) : (
                          <div className="text-center text-gray-500 py-2">
                            <p className="text-xs">Secondary {i + 1}</p>
                            <p className="text-xs">(No content)</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Tertiary content */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Tertiary Content</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Array.from({ length: tertiaryCount }).map((_, i) => {
                  const positionKey = `tertiary-${i + 1}`;
                  const tertiaryContent = component.contents?.[positionKey];
                  
                  return (
                    <div key={i} className="border rounded-md overflow-hidden">
                      <div className="p-3">
                        {tertiaryContent ? (
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-200 rounded-md mr-3 flex-shrink-0">
                              {tertiaryContent.featured_image ? (
                                <img 
                                  src={tertiaryContent.featured_image} 
                                  alt={tertiaryContent.translations[0]?.title || ''} 
                                  className="w-full h-full object-cover rounded-md"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                                  No img
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-sm line-clamp-1">{tertiaryContent.translations[0]?.title}</h4>
                              <p className="text-xs text-gray-600 line-clamp-1">{tertiaryContent.translations[0]?.description}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center text-gray-500 py-2">
                            <p className="text-xs">Tertiary {i + 1}</p>
                            <p className="text-xs">(No content)</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
        
      case 'tree':
        const bgColor = component.settings?.backgroundColor || 'bg-white';
        const textColor = component.settings?.textColor || 'text-gray-900';
        const fontSize = component.settings?.fontSize || 'text-base';
        const textAlign = component.settings?.textAlign || 'text-left';
        const animation = component.settings?.animation || '';
        const alignment = component.settings?.contentAlignment || 'left';
        
        // Find all primary branches by checking for keys that start with "primary-"
        const primaryBranchKeys = Object.keys(component.contents || {})
          .filter(key => key.startsWith('primary-') && !key.includes('child'))
          .sort((a, b) => {
            const numA = parseInt(a.split('-')[1]);
            const numB = parseInt(b.split('-')[1]);
            return numA - numB;
          });
          
        // If there are no branches yet, use default 4
        const branchCount = primaryBranchKeys.length > 0 
          ? primaryBranchKeys.length
          : 4;
        
        return (
          <div className={`py-8 px-4 max-w-6xl mx-auto ${bgColor} ${textColor} ${animation}`}>
            <h2 className="text-2xl font-bold mb-6 text-center">Tree Content Structure</h2>
            
            {/* Main content */}
            <div className="mb-8">
              {component.contents?.main ? (
                <div className={`border rounded-lg overflow-hidden ${cn(
                  "transition-all duration-300",
                  animation === "fade" ? "animate-fade-in" : "",
                  animation === "slide" ? "animate-slide-in-right" : "",
                  animation === "scale" ? "animate-scale-in" : ""
                )}`}>
                  <div className="aspect-video bg-gray-200">
                    {component.contents.main?.featured_image ? (
                      <img 
                        src={component.contents.main.featured_image} 
                        alt={component.contents.main.translations[0]?.title || ''} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                  <div className={`p-6 ${textAlign}`}>
                    {component.contents.main?.content_type && (
                      <Badge className="mb-2">{component.contents.main.content_type}</Badge>
                    )}
                    <h3 className={`${fontSize === 'large' ? 'text-3xl' : fontSize === 'small' ? 'text-xl' : 'text-2xl'} font-bold mb-2`}>
                      {component.contents.main.translations[0]?.title}
                    </h3>
                    <p className={`text-gray-600 mb-4 ${fontSize === 'large' ? 'text-lg' : fontSize === 'small' ? 'text-sm' : 'text-base'}`}>
                      {component.contents.main.translations[0]?.description}
                    </p>
                    <Button>Read More</Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 border border-dashed p-10 rounded-lg">
                  <p>Main Content</p>
                  <p className="text-sm">(No content selected)</p>
                </div>
              )}
            </div>
            
            {/* Tree content structure */}
            <div className={`grid ${alignment === 'right' ? 'justify-items-end' : alignment === 'center' ? 'justify-items-center' : 'justify-items-start'} gap-8`}>
              {Array.from({ length: branchCount }).map((_, i) => {
                const branchNumber = i + 1;
                const primaryKey = `primary-${branchNumber}`;
                const primaryContent = component.contents?.[primaryKey];
                const isActive = component.settings?.[`${primaryKey}-active`] !== false;
                
                // Collect all child contents for this branch
                const childContents: { [key: string]: Content | null } = {};
                for (let j = 1; j <= 4; j++) {
                  const childKey = `${primaryKey}-child-${j}`;
                  childContents[childKey] = component.contents?.[childKey] || null;
                }
                
                return (
                  <TreeBranch
                    key={i}
                    branchNumber={branchNumber}
                    branchContent={primaryContent || null}
                    childContents={childContents}
                    isActive={isActive}
                    settings={component.settings || {}}
                    onPickContent={() => {}} // Preview doesn't need interactive handlers
                    onToggleActive={() => {}}
                    fontSize={fontSize}
                    animation={animation}
                  />
                );
              })}
            </div>
          </div>
        );
        
      default:
        return (
          <div className="max-w-3xl mx-auto py-8 px-4">
            <div className="text-center text-gray-500 border border-dashed p-8 rounded">
              <p>Preview not available for this component type</p>
              <p className="text-sm">({component.type})</p>
            </div>
          </div>
        );
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Page Preview - {page?.title}</DialogTitle>
        </DialogHeader>
        
        <div className="border rounded-lg overflow-hidden bg-white">
          <div className="border-b p-2 flex justify-between items-center bg-gray-50">
            <div className="flex items-center space-x-2">
              <Badge variant={page?.status === 'published' ? 'default' : 'secondary'}>
                {page?.status === 'published' ? 'Published' : 'Draft'}
              </Badge>
              <span className="text-sm text-gray-500">/{page?.slug}</span>
            </div>
            <Button variant="ghost" size="sm">
              <ExternalLink className="h-4 w-4 mr-1" />
              Open in New Tab
            </Button>
          </div>
          
          <ScrollArea className="h-[70vh] overflow-auto">
            <div className="bg-white">
              {components.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>This page has no components.</p>
                  <p className="text-sm mt-2">Add components to see the preview.</p>
                </div>
              ) : (
                components.map((component) => (
                  <div key={component.id} className="preview-component">
                    {renderComponentPreview(component)}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="w-4 h-4 mr-2" />
            Close Preview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
