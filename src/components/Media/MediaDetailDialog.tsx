
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Image } from '@/data/mockData';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Copy, Calendar, DimensionsIcon, FileText } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface MediaDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: Image | null;
}

export const MediaDetailDialog = ({ open, onOpenChange, image }: MediaDetailDialogProps) => {
  if (!image) return null;
  
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copied",
      description: "Image URL has been copied to clipboard",
      duration: 3000,
    });
  };
  
  // Format file size from bytes to KB/MB
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  // Format date from ISO string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Image Details</DialogTitle>
          <DialogDescription>
            View and edit the details of this image
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="rounded-md overflow-hidden border">
              <img 
                src={image.path}
                alt={image.alt}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="filename">Filename</Label>
              <Input id="filename" value={image.filename} readOnly />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alt">Alternative Text</Label>
              <Input id="alt" defaultValue={image.alt} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <div className="flex space-x-2">
                <Input id="url" value={image.path} readOnly className="flex-1" />
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handleCopyUrl(image.path)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm text-gray-500">File Type</Label>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                  {image.mimetype}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-sm text-gray-500">File Size</Label>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                  {formatFileSize(image.size)}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm text-gray-500">Dimensions</Label>
                <div className="flex items-center">
                  <DimensionsIcon className="h-4 w-4 mr-2 text-gray-500" />
                  {image.width} × {image.height}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-sm text-gray-500">Uploaded On</Label>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  {formatDate(image.createdAt)}
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button className="w-full">Save Changes</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
