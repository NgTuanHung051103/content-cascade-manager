
import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  MoreHorizontal, 
  EyeIcon,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { contents, findCategoryById } from '@/data/mockData';
import { ContentDialog } from '@/components/Content/ContentDialog';
import { Content } from '@/data/mockData';

export const ContentPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  const handleAddContent = () => {
    setSelectedContent(null);
    setIsDialogOpen(true);
  };

  const handleEditContent = (content: Content) => {
    setSelectedContent(content);
    setIsDialogOpen(true);
  };

  // Format date from ISO string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content</h1>
          <p className="text-muted-foreground">Manage your content items and their translations</p>
        </div>
        <Button onClick={handleAddContent}>
          <Plus className="h-4 w-4 mr-2" />
          Add Content
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Content</CardTitle>
          <CardDescription>
            View and manage all content in your system
          </CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
            <Input type="text" placeholder="Search content..." />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contents.map(content => {
                const englishTitle = content.translations.find(
                  t => t.languageId === 'lang-1'
                )?.title || 'Untitled';
                
                const category = findCategoryById(content.categoryId);
                const categoryName = category?.translations.find(
                  t => t.languageId === 'lang-1'
                )?.name || 'Uncategorized';
                
                return (
                  <TableRow key={content.id}>
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
                        {content.status === 'published' ? (
                          <EyeIcon className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(content.updatedAt)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditContent(content)}>
                            <Edit2 className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <EyeIcon className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ContentDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        content={selectedContent}
      />
    </div>
  );
};

export default ContentPage;
