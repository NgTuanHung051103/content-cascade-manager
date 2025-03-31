
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart } from '@/components/ui/chart';
import { 
  FileText, 
  FolderTree, 
  Image as ImageIcon, 
  Layers,
  Users
} from 'lucide-react';
import { categories, contents, images, pages } from '@/data/mockData';

export const Dashboard = () => {
  // Count items
  const totalCategories = categories.length + categories.reduce((acc, cat) => acc + (cat.children?.length || 0), 0);
  const totalContents = contents.length;
  const totalMedia = images.length;
  const totalPages = pages.length;

  const statsCards = [
    { title: 'Categories', value: totalCategories, icon: FolderTree, color: 'text-purple-600' },
    { title: 'Content Items', value: totalContents, icon: FileText, color: 'text-blue-600' },
    { title: 'Media Files', value: totalMedia, icon: ImageIcon, color: 'text-green-600' },
    { title: 'Pages', value: totalPages, icon: Layers, color: 'text-amber-600' }
  ];

  // Chart data for content by category
  const contentByCategory = categories.map(cat => {
    const count = contents.filter(content => content.categoryId === cat.id).length;
    const name = cat.translations.find(t => t.languageId === 'lang-1')?.name || 'Unknown';
    return { name, value: count };
  });

  // Chart data for content status
  const contentStatus = [
    { name: 'Published', value: contents.filter(c => c.status === 'published').length },
    { name: 'Draft', value: contents.filter(c => c.status === 'draft').length }
  ];

  // Chart data for content over time (mocked data)
  const contentOverTime = [
    { name: 'Jan', value: 4 },
    { name: 'Feb', value: 7 },
    { name: 'Mar', value: 5 },
    { name: 'Apr', value: 9 },
    { name: 'May', value: 6 },
    { name: 'Jun', value: 10 },
    { name: 'Jul', value: 8 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your content management system</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card, i) => (
          <Card key={i}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                <h3 className="text-3xl font-bold">{card.value}</h3>
              </div>
              <div className={`p-2 rounded-full bg-gray-100 ${card.color}`}>
                <card.icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Content by Category</CardTitle>
            <CardDescription>Distribution of content across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={contentByCategory} 
              index="name"
              categories={['value']}
              colors={['violet']}
              valueFormatter={(value) => `${value} items`}
              className="h-80"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Content Status</CardTitle>
            <CardDescription>Published vs draft content</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <PieChart 
              data={contentStatus} 
              index="name"
              valueFormatter={(value) => `${value} items`}
              category="value"
              colors={['violet', 'gray']}
              className="h-80 w-80"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Growth</CardTitle>
          <CardDescription>New content added over time</CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart 
            data={contentOverTime}

            index="name"
            categories={['value']}
            colors={['violet']}
            valueFormatter={(value) => `${value} items`}
            className="h-96"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
