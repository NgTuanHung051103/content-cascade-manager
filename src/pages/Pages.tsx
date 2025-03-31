
import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  Edit2, 
  Trash2, 
  MoreHorizontal, 
  Eye, 
  Copy, 
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
import { Badge } from '@/components/ui/badge';
import { pages } from '@/data/mockData';
import { PageDialog } from '@/components/Pages/PageDialog';
import { Page } from '@/data/mockData';
import { PageBuilder } from '@/components/Pages/PageBuilder';

export const Pages = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);

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
                  <TableCell>{page.components.length}</TableCell>
                  <TableCell>{formatDate(page.updatedAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
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
                        <DropdownMenuItem className="text-red-600">
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

      <PageDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        page={selectedPage}
      />
      
      <PageBuilder
        open={isBuilderOpen}
        onOpenChange={setIsBuilderOpen}
        page={selectedPage}
      />
    </div>
  );
};

export default Pages;
