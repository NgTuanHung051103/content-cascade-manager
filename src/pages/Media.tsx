
import React, { useState } from 'react';
import { 
  Upload, 
  Grid2X2, 
  List, 
  Search, 
  Trash2, 
  Copy, 
  Info, 
  MoreHorizontal 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { images } from '@/data/mockData';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { MediaDetailDialog } from '@/components/Media/MediaDetailDialog';
import { Image } from '@/data/mockData';
import { toast } from "@/components/ui/use-toast";

export const Media = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copied",
      description: "Image URL has been copied to clipboard",
      duration: 3000,
    });
  };
  
  const handleShowDetails = (image: Image) => {
    setSelectedImage(image);
    setDetailOpen(true);
  };
  
  // Format file size from bytes to KB/MB
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">Manage images and files used in your content</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Media</CardTitle>
              <CardDescription>
                View and manage your media files
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant={view === 'grid' ? 'default' : 'outline'} 
                size="icon" 
                onClick={() => setView('grid')}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button 
                variant={view === 'list' ? 'default' : 'outline'} 
                size="icon" 
                onClick={() => setView('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
            <Input type="text" placeholder="Search media..." />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {view === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {images.map(image => (
                <div key={image.id} className="group relative">
                  <div className="relative aspect-square overflow-hidden rounded-md border">
                    <img 
                      src={image.path}
                      alt={image.alt}
                      className="object-cover w-full h-full transition-all group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium truncate">{image.filename}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(image.size)}</p>
                  </div>
                  
                  {/* Actions overlay */}
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                    <div className="flex space-x-1">
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-8 w-8 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                        onClick={() => handleCopyUrl(image.path)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-8 w-8 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                        onClick={() => handleShowDetails(image)}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-8 w-8 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {images.map(image => (
                <div key={image.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-md overflow-hidden">
                      <img 
                        src={image.path} 
                        alt={image.alt}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{image.filename}</p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(image.size)} • {image.width}x{image.height}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleCopyUrl(image.path)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy URL
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShowDetails(image)}>
                        <Info className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <MediaDetailDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        image={selectedImage}
      />
    </div>
  );
};

export default Media;
