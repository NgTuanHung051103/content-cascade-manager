
import React, { useState } from 'react';
import { 
  ChevronRight, 
  FolderTree, 
  Plus, 
  Edit2, 
  Trash2, 
  MoreHorizontal, 
  ChevronDown
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
import { categories } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { CategoryDialog } from '@/components/Categories/CategoryDialog';
import { Category, CategoryLanguage } from '@/data/mockData';

export const Categories = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (expandedCategories.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsDialogOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsDialogOpen(true);
  };

  const renderCategoryRow = (category: Category, level = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.has(category.id);
    const englishTranslation = category.translations.find(
      (t) => t.languageId === 'lang-1'
    ) as CategoryLanguage;
    
    return (
      <React.Fragment key={category.id}>
        <TableRow className="tree-table-row">
          <TableCell className="relative">
            <div 
              style={{ paddingLeft: `${level * 20}px` }}
              className="flex items-center"
            >
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 mr-1"
                  onClick={() => toggleCategory(category.id)}
                >
                  <ChevronRight 
                    className={`h-4 w-4 tree-toggle-icon ${isExpanded ? 'rotate-90' : ''}`}
                  />
                </Button>
              )}
              {!hasChildren && <div className="w-7"></div>}
              <FolderTree className="h-4 w-4 mr-2 text-gray-500" />
              <span>{englishTranslation.name}</span>
              {category.children && category.children.length > 0 && (
                <Badge variant="outline" className="ml-2 text-xs">
                  {category.children.length}
                </Badge>
              )}
            </div>
          </TableCell>
          <TableCell>{category.slug}</TableCell>
          <TableCell>{category.translations.length}</TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
        
        {/* Render children if expanded */}
        {isExpanded && hasChildren && category.children!.map(child => 
          renderCategoryRow(child, level + 1)
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage your content categories and structure</p>
        </div>
        <Button onClick={handleAddCategory}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <CardDescription>
            Organize your content with hierarchical categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Languages</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map(category => renderCategoryRow(category))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CategoryDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        category={selectedCategory}
      />
    </div>
  );
};

export default Categories;
