
import React, { useState } from 'react';
import { 
  Globe, 
  Plus, 
  Edit2, 
  Trash2, 
  MoreHorizontal, 
  Check
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
import { languages } from '@/data/mockData';
import { LanguageDialog } from '@/components/Languages/LanguageDialog';
import { Language } from '@/data/mockData';

export const Languages = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const handleAddLanguage = () => {
    setSelectedLanguage(null);
    setIsDialogOpen(true);
  };

  const handleEditLanguage = (language: Language) => {
    setSelectedLanguage(language);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Languages</h1>
          <p className="text-muted-foreground">Manage your website languages and translations</p>
        </div>
        <Button onClick={handleAddLanguage}>
          <Plus className="h-4 w-4 mr-2" />
          Add Language
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Languages</CardTitle>
          <CardDescription>
            View and manage available languages for your content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {languages.map(language => (
                <TableRow key={language.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-gray-500" />
                      {language.name}
                    </div>
                  </TableCell>
                  <TableCell>{language.code}</TableCell>
                  <TableCell>
                    {language.code === 'en' ? (
                      <Badge className="bg-green-500">
                        <Check className="h-3 w-3 mr-1" />
                        Default
                      </Badge>
                    ) : (
                      <Badge variant="outline">Active</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditLanguage(language)}>
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        {language.code !== 'en' && (
                          <DropdownMenuItem>
                            <Check className="h-4 w-4 mr-2" />
                            Set as Default
                          </DropdownMenuItem>
                        )}
                        {language.code !== 'en' && (
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <LanguageDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        language={selectedLanguage}
      />
    </div>
  );
};

export default Languages;
