
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
    featured_image?: string;
    content_type?: string;
  }

  export interface Image {
    id: string;
    src: string;
    name: string;
    type: string;
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
}
