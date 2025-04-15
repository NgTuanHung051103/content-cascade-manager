
// Extending the types to include the missing properties
declare module '@/data/mockData' {
  export interface Content {
    id: string;
    slug: string;
    status: 'draft' | 'published';
    categoryId: string | null;
    translations: {
      languageId: string;
      title: string;
      description: string;
      image?: string; // Added missing property
    }[];
    details: {
      id: string;
      type: string;
      value?: string;
      order: number;
      translations?: {
        languageId: string;
        title?: string;
        description?: string;
      }[];
    }[];
    imageIds: string[];
    createdAt: string;
    updatedAt: string;
    featured_image?: string; // Added missing property
    content_type?: string; // Added missing property
    isActive?: boolean;
    navigation?: {
      type: 'url' | 'content_detail';
      url?: string;
      contentId?: string;
    };
  }

  export interface Image {
    id: string;
    src: string; // Added missing property
    name: string; // Added missing property
    type: string; // Added missing property
    size: number;
    width: number;
    height: number;
    createdAt: string;
    updatedAt: string;
    path?: string;
    filename?: string;
    mimetype?: string;
    alt?: string;
  }
  
  export interface Page {
    id: string;
    title: string;
    slug: string;
    status: 'draft' | 'published';
    createdAt: string;
    updatedAt: string;
    components?: PageComponent[];
  }
  
  export interface PageComponent {
    id: string;
    type: string;
    contents?: { [key: string]: Content | null };
    settings?: any;
  }

  export interface ContentLanguage {
    id: string;
    contentId: string;
    languageId: string;
    title: string;
    description: string;
    image?: string;
  }
}
