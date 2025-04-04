
import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Plus, 
  Edit2, 
  Trash2, 
  MoreHorizontal, 
  Eye, 
  Copy, 
  Clock,
  AlertTriangle
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
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { pages } from '@/data/mockData';
import { PageDialog } from '@/components/Pages/PageDialog';
import { Page } from '@/data/mockData';
import { PageBuilder } from '@/components/Pages/PageBuilder';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

export const Pages = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Reset selected page when dialogs close
  useEffect(() => {
    if (!isDialogOpen && !isBuilderOpen && !isDeleteDialogOpen) {
      // Give time for animations to complete before clearing the state
      const timeout = setTimeout(() => {
        setSelectedPage(null);
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [isDialogOpen, isBuilderOpen, isDeleteDialogOpen]);

  const handleAddPage = () => {
    setSelectedPage(null);
    setIsDialogOpen(true);
  };

  const handleEditPage = (page: Page) => {
    setSelectedPage(page);
    setIsDialogOpen(true);
  };
  
  const handleOpenBuilder = (page: Page) => {
    setSelectedPage(page);
    setIsBuilderOpen(true);
  };

  const handleDeletePage = (page: Page) => {
    setSelectedPage(page);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeletePage = () => {
    // In a real application, this would call an API to delete the page
    toast({
      title: "Page Deleted",
      description: `${selectedPage?.title} has been deleted successfully.`,
    });
    setIsDeleteDialogOpen(false);
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

  // Get component count badge with color
  const getComponentCountBadge = (count: number) => {
    if (count === 0) {
      return (
        <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Empty
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline" className="border-violet-200 bg-violet-50 text-violet-700">
        {count}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pages</h1>
          <p className="text-muted-foreground">Manage your website pages and layouts</p>
        </div>
        <Button onClick={handleAddPage}>
          <Plus className="h-4 w-4 mr-2" />
          Add Page
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Pages</CardTitle>
          <CardDescription>
            View and manage your website pages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Components</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map(page => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Layers className="h-4 w-4 mr-2 text-gray-500" />
                      {page.title}
                    </div>
                  </TableCell>
                  <TableCell>/{page.slug}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={page.status === 'published' ? 'default' : 'secondary'}
                      className={page.status === 'published' ? 'bg-green-500' : ''}
                    >
                      {page.status === 'published' ? (
                        <Eye className="h-3 w-3 mr-1" />
                      ) : (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{getComponentCountBadge(page.components.length)}</TableCell>
                  <TableCell>{formatDate(page.updatedAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuItem onClick={() => handleEditPage(page)}>
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenBuilder(page)}>
                          <Layers className="h-4 w-4 mr-2" />
                          Page Builder
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeletePage(page)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Page Dialog */}
      <PageDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        page={selectedPage}
      />
      
      {/* Page Builder */}
      <PageBuilder
        open={isBuilderOpen}
        onOpenChange={setIsBuilderOpen}
        page={selectedPage}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the page "{selectedPage?.title}". 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeletePage}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Pages;
