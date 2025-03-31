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
import { 
  Calendar,
  FileType,
  LayoutGrid,
  User
} from 'lucide-react';
import { Image } from '@/data/mockData';

interface MediaDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: Image | null;
}

export const MediaDetailDialog = ({ open, onOpenChange, image }: MediaDetailDialogProps) => {
  const isEditing = !!image;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Media Details' : 'No Media Selected'}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'View and edit the details of the selected media item.'
              : 'Select a media item to view its details.'}
          </DialogDescription>
        </DialogHeader>
        
        {image ? (
          <div className="grid grid-cols-2 gap-4 py-4">
            {/* Image Preview */}
            <div className="col-span-2 md:col-span-1">
              <img 
                src={image.url} 
                alt={image.altText} 
                className="w-full rounded-md aspect-video object-cover" 
              />
            </div>

            {/* Details */}
            <div className="col-span-2 md:col-span-1 space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-600">Filename</h4>
                <p className="text-gray-800">{image.filename}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-600">Alt Text</h4>
                <p className="text-gray-800">{image.altText}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-600">File Type</h4>
                <div className="flex items-center space-x-2">
                  <FileType className="h-4 w-4 text-gray-500" />
                  <p className="text-gray-800">{image.fileType}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-600">File Size</h4>
                <p className="text-gray-800">{image.fileSize}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-600">Dimensions</h4>
                <div className="flex items-center space-x-2">
                  <LayoutGrid className="h-4 w-4 text-gray-500" />
                  <p className="text-gray-800">{image.width} x {image.height}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-600">Uploaded By</h4>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <p className="text-gray-800">{image.uploadedBy}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-600">Uploaded On</h4>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <p className="text-gray-800">{new Date(image.uploadedOn).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4">
            <p className="text-gray-500">No media item selected.</p>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {isEditing && (
            <Button>Save Changes</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
