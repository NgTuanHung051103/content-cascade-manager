
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Content, languages, categories } from '@/data/mockData';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ImagePicker } from '@/components/Media/ImagePicker';
import { Plus, Trash } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: Content | null;
}

export const ContentDialog = ({ open, onOpenChange, content }: ContentDialogProps) => {
  const isEditing = !!content;
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [selectedTab, setSelectedTab] = useState("general");
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Content' : 'Add New Content'}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update the content information, translations, and details'
              : 'Fill in the details to create new content'}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="details">Content Details</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue={content?.categoryId || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
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
                  placeholder="content-slug" 
                  defaultValue={content?.slug}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={content?.status || "draft"}>
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
            
            <Tabs defaultValue="lang-1">
              <TabsList className="mb-4">
                {languages.map(lang => (
                  <TabsTrigger key={lang.id} value={lang.id}>
                    {lang.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {languages.map(lang => {
                const translation = content?.translations.find(t => t.languageId === lang.id);
                
                return (
                  <TabsContent key={lang.id} value={lang.id} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`title-${lang.id}`}>Title ({lang.name})</Label>
                      <Input 
                        id={`title-${lang.id}`} 
                        placeholder={`Content title in ${lang.name}`}
                        defaultValue={translation?.title || ''}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`description-${lang.id}`}>Description ({lang.name})</Label>
                      <Textarea 
                        id={`description-${lang.id}`} 
                        placeholder={`Content description in ${lang.name}`}
                        rows={5}
                        defaultValue={translation?.description || ''}
                      />
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <Accordion type="multiple" defaultValue={["details-1"]}>
              {(content?.details || [{ id: "new-detail", type: "text", order: 1 }]).map((detail, index) => (
                <AccordionItem key={detail.id} value={`details-${index + 1}`}>
                  <AccordionTrigger className="hover:bg-gray-50 px-3">
                    Content Detail {index + 1}
                  </AccordionTrigger>
                  <AccordionContent className="p-4 border-t">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div className="space-y-2 flex-1 mr-2">
                          <Label htmlFor={`detail-type-${index}`}>Type</Label>
                          <Select defaultValue={detail.type || "text"}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="image">Image</SelectItem>
                              <SelectItem value="video">Video</SelectItem>
                              <SelectItem value="file">File</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2 flex-1">
                          <Label htmlFor={`detail-order-${index}`}>Order</Label>
                          <Input 
                            id={`detail-order-${index}`} 
                            type="number"
                            min="1"
                            defaultValue={detail.order}
                          />
                        </div>
                      </div>
                      
                      {detail.type === 'text' && (
                        <div className="space-y-2">
                          <Label htmlFor={`detail-value-${index}`}>Content</Label>
                          <Textarea 
                            id={`detail-value-${index}`} 
                            rows={5}
                            defaultValue={detail.value}
                          />
                        </div>
                      )}
                      
                      {detail.type === 'image' && (
                        <div className="space-y-2">
                          <Label>Image</Label>
                          <Button 
                            variant="outline" 
                            type="button" 
                            onClick={() => setShowImagePicker(true)}
                          >
                            Select Image
                          </Button>
                        </div>
                      )}
                      
                      <Tabs defaultValue="lang-1">
                        <TabsList className="mb-4">
                          {languages.map(lang => (
                            <TabsTrigger key={lang.id} value={lang.id}>
                              {lang.name}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                        
                        {languages.map(lang => (
                          <TabsContent key={lang.id} value={lang.id} className="space-y-4">
                            <div className="space-y-2">
                              <Label>Title ({lang.name})</Label>
                              <Input placeholder={`Detail title in ${lang.name}`} />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Description ({lang.name})</Label>
                              <Textarea 
                                placeholder={`Detail description in ${lang.name}`}
                                rows={3}
                              />
                            </div>
                          </TabsContent>
                        ))}
                      </Tabs>
                      
                      <Button variant="destructive" size="sm" className="mt-2">
                        <Trash className="h-4 w-4 mr-2" />
                        Remove Detail
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <Button variant="outline" type="button">
              <Plus className="h-4 w-4 mr-2" />
              Add Detail
            </Button>
          </TabsContent>
          
          <TabsContent value="images" className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Content Images</h3>
                <Button onClick={() => setShowImagePicker(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Images
                </Button>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {content?.imageIds.map(imageId => (
                  <div key={imageId} className="relative group">
                    <img 
                      src={`https://images.unsplash.com/photo-1682687982167-d7fb3ed8541d?w=300&h=200&fit=crop`} 
                      alt="Content image"
                      className="w-full h-32 object-cover rounded-md border"
                    />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                
                {content?.imageIds.length === 0 && (
                  <div className="col-span-4 border rounded-md p-8 text-center">
                    <p className="text-gray-500">No images attached to this content</p>
                    <Button onClick={() => setShowImagePicker(true)} variant="outline" className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Images
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>{isEditing ? 'Save Changes' : 'Create Content'}</Button>
        </DialogFooter>
      </DialogContent>
      
      <ImagePicker 
        open={showImagePicker} 
        onOpenChange={setShowImagePicker} 
        onSelect={() => setShowImagePicker(false)}
      />
    </Dialog>
  );
};
