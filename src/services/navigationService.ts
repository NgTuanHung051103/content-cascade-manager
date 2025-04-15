
import { Content, findContentById } from '@/data/mockData';
import { toast } from '@/components/ui/use-toast';

interface NavigationOptions {
  type: 'url' | 'content_detail' | 'none';
  url?: string;
  contentId?: string;
}

export const navigateToContent = (content: Content | null, options?: NavigationOptions) => {
  if (!content && !options) {
    return;
  }
  
  // First check explicit options from component settings
  if (options) {
    if (options.type === 'url' && options.url) {
      window.open(options.url, '_blank');
      return;
    }
    
    if (options.type === 'content_detail' && options.contentId) {
      const targetContent = findContentById(options.contentId);
      if (targetContent) {
        navigateToContentDetail(targetContent);
      } else {
        toast({
          title: "Navigation Error",
          description: "Content not found",
          variant: "destructive"
        });
      }
      return;
    }
  }
  
  // Fallback to content's own navigation settings
  if (content?.navigation) {
    if (content.navigation.type === 'url' && content.navigation.url) {
      window.open(content.navigation.url, '_blank');
      return;
    }
    
    if (content.navigation.type === 'content_detail' && content.navigation.contentId) {
      const targetContent = findContentById(content.navigation.contentId);
      if (targetContent) {
        navigateToContentDetail(targetContent);
      } else {
        navigateToContentDetail(content);
      }
      return;
    }
  }
  
  // Default behavior: navigate to content detail
  if (content) {
    navigateToContentDetail(content);
  }
};

const navigateToContentDetail = (content: Content) => {
  // In a real application, this would use router navigation
  // For now, we'll show a toast and console log
  toast({
    title: "Navigating to content",
    description: `Title: ${content.translations[0]?.title || 'Untitled content'}`
  });
  
  console.log('Navigating to content detail:', content);
  
  // Example of URL construction for content detail page:
  // const url = `/content/${content.content_type || 'detail'}/${content.slug}`;
  // history.push(url);
};
