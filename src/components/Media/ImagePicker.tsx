
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
import { images } from '@/data/mockData';
import { Search, Check, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ImagePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (imageIds: string[]) => void;
  multiple?: boolean;
}

export const ImagePicker = ({ 
  open, 
  onOpenChange, 
  onSelect,
  multiple = false 
}: ImagePickerProps) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  
  const toggleImageSelection = (imageId: string) => {
    if (multiple) {
      if (selectedImages.includes(imageId)) {
        setSelectedImages(selectedImages.filter(id => id !== imageId));
      } else {
        setSelectedImages([...selectedImages, imageId]);
      }
    } else {
      setSelectedImages([imageId]);
    }
  };
  
  const handleSelect = () => {
    onSelect(selectedImages);
    setSelectedImages([]);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Images</DialogTitle>
          <DialogDescription>
            Choose images from your media library to use in your content
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search images..."
              className="pl-8 w-full"
            />
          </div>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-h-[50vh] overflow-y-auto p-1">
          {images.map(image => (
            <div 
              key={image.id} 
              className={`
                relative rounded-md overflow-hidden border-2 cursor-pointer transition-all
                ${selectedImages.includes(image.id) ? 'border-violet-500 ring-2 ring-violet-200' : 'border-transparent hover:border-gray-200'}
              `}
              onClick={() => toggleImageSelection(image.id)}
            >
              <img 
                src={image.path}
                alt={image.alt}
                className="w-full h-32 object-cover"
              />
              <div className="p-2 text-xs truncate bg-white">
                {image.filename}
              </div>
              {selectedImages.includes(image.id) && (
                <div className="absolute top-2 right-2 bg-violet-500 text-white rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-gray-500">
              {selectedImages.length} {multiple ? 'images' : 'image'} selected
            </div>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  onOpenChange(false);
                  setSelectedImages([]);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSelect} disabled={selectedImages.length === 0}>
                Select {multiple ? 'Images' : 'Image'}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
