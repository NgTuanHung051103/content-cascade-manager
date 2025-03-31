
import { v4 as uuidv4 } from "uuid";

// Types
export interface Language {
  id: string;
  code: string;
  name: string;
}

export interface CategoryLanguage {
  id: string;
  categoryId: string;
  languageId: string;
  name: string;
  description: string;
}

export interface Category {
  id: string;
  parentId: string | null;
  order: number;
  slug: string;
  imageId: string | null;
  createdAt: string;
  updatedAt: string;
  translations: CategoryLanguage[];
  children?: Category[];
}

export interface ContentLanguage {
  id: string;
  contentId: string;
  languageId: string;
  title: string;
  description: string;
}

export interface ContentDetail {
  id: string;
  contentId: string;
  type: string;
  value: string;
  order: number;
}

export interface ContentDetailLanguage {
  id: string;
  contentDetailId: string;
  languageId: string;
  title: string;
  description: string;
}

export interface Content {
  id: string;
  categoryId: string;
  slug: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  translations: ContentLanguage[];
  details: ContentDetail[];
  imageIds: string[];
}

export interface Image {
  id: string;
  path: string;
  filename: string;
  mimetype: string;
  size: number;
  width: number;
  height: number;
  alt: string;
  createdAt: string;
}

export interface ContentImage {
  contentId: string;
  imageId: string;
}

export interface ComponentContent {
  id: string;
  contentId: string;
  position: string;
}

export interface Component {
  id: string;
  pageId: string;
  type: string;
  name: string;
  order: number;
  settings: Record<string, any>;
  contents: ComponentContent[];
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  components: Component[];
}

// Mock data
export const languages: Language[] = [
  {
    id: "lang-1",
    code: "en",
    name: "English"
  },
  {
    id: "lang-2",
    code: "vi",
    name: "Vietnamese"
  },
  {
    id: "lang-3",
    code: "fr",
    name: "French"
  }
];

export const images: Image[] = [
  {
    id: "img-1",
    path: "https://images.unsplash.com/photo-1682687982167-d7fb3ed8541d",
    filename: "landscape-1.jpg",
    mimetype: "image/jpeg",
    size: 1024000,
    width: 1920,
    height: 1080,
    alt: "Beautiful landscape",
    createdAt: "2023-01-01T00:00:00Z"
  },
  {
    id: "img-2",
    path: "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1",
    filename: "city-1.jpg",
    mimetype: "image/jpeg",
    size: 2048000,
    width: 1920,
    height: 1080,
    alt: "City view",
    createdAt: "2023-01-02T00:00:00Z"
  },
  {
    id: "img-3",
    path: "https://images.unsplash.com/photo-1682695797221-8164ff1fafc9",
    filename: "food-1.jpg",
    mimetype: "image/jpeg",
    size: 1536000,
    width: 1920,
    height: 1080,
    alt: "Delicious food",
    createdAt: "2023-01-03T00:00:00Z"
  },
  {
    id: "img-4",
    path: "https://images.unsplash.com/photo-1682686581264-c47409bd8da5",
    filename: "technology-1.jpg",
    mimetype: "image/jpeg",
    size: 1228800,
    width: 1920,
    height: 1080,
    alt: "Modern technology",
    createdAt: "2023-01-04T00:00:00Z"
  },
  {
    id: "img-5",
    path: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538",
    filename: "people-1.jpg",
    mimetype: "image/jpeg",
    size: 1843200,
    width: 1920,
    height: 1080,
    alt: "Group of people",
    createdAt: "2023-01-05T00:00:00Z"
  }
];

export const categories: Category[] = [
  {
    id: "cat-1",
    parentId: null,
    order: 1,
    slug: "technology",
    imageId: "img-4",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
    translations: [
      {
        id: "cat-lang-1",
        categoryId: "cat-1",
        languageId: "lang-1",
        name: "Technology",
        description: "Latest technology news and updates"
      },
      {
        id: "cat-lang-2",
        categoryId: "cat-1",
        languageId: "lang-2",
        name: "Công nghệ",
        description: "Tin tức và cập nhật công nghệ mới nhất"
      }
    ],
    children: [
      {
        id: "cat-2",
        parentId: "cat-1",
        order: 1,
        slug: "gadgets",
        imageId: "img-4",
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-01T00:00:00Z",
        translations: [
          {
            id: "cat-lang-3",
            categoryId: "cat-2",
            languageId: "lang-1",
            name: "Gadgets",
            description: "Latest gadgets and devices"
          },
          {
            id: "cat-lang-4",
            categoryId: "cat-2",
            languageId: "lang-2",
            name: "Thiết bị",
            description: "Thiết bị và gadget mới nhất"
          }
        ]
      },
      {
        id: "cat-3",
        parentId: "cat-1",
        order: 2,
        slug: "software",
        imageId: null,
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-01T00:00:00Z",
        translations: [
          {
            id: "cat-lang-5",
            categoryId: "cat-3",
            languageId: "lang-1",
            name: "Software",
            description: "Software news and reviews"
          },
          {
            id: "cat-lang-6",
            categoryId: "cat-3",
            languageId: "lang-2",
            name: "Phần mềm",
            description: "Tin tức và đánh giá phần mềm"
          }
        ]
      }
    ]
  },
  {
    id: "cat-4",
    parentId: null,
    order: 2,
    slug: "food",
    imageId: "img-3",
    createdAt: "2023-01-02T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
    translations: [
      {
        id: "cat-lang-7",
        categoryId: "cat-4",
        languageId: "lang-1",
        name: "Food",
        description: "Delicious recipes and food news"
      },
      {
        id: "cat-lang-8",
        categoryId: "cat-4",
        languageId: "lang-2",
        name: "Ẩm thực",
        description: "Công thức nấu ăn ngon và tin tức ẩm thực"
      }
    ],
    children: []
  },
  {
    id: "cat-5",
    parentId: null,
    order: 3,
    slug: "travel",
    imageId: "img-1",
    createdAt: "2023-01-03T00:00:00Z",
    updatedAt: "2023-01-03T00:00:00Z",
    translations: [
      {
        id: "cat-lang-9",
        categoryId: "cat-5",
        languageId: "lang-1",
        name: "Travel",
        description: "Travel destinations and guides"
      },
      {
        id: "cat-lang-10",
        categoryId: "cat-5",
        languageId: "lang-2",
        name: "Du lịch",
        description: "Điểm đến và hướng dẫn du lịch"
      }
    ],
    children: []
  }
];

export const contents: Content[] = [
  {
    id: "content-1",
    categoryId: "cat-1",
    slug: "latest-smartphone-review",
    status: "published",
    createdAt: "2023-01-10T00:00:00Z",
    updatedAt: "2023-01-10T00:00:00Z",
    translations: [
      {
        id: "content-lang-1",
        contentId: "content-1",
        languageId: "lang-1",
        title: "Latest Smartphone Review",
        description: "A comprehensive review of the latest smartphone models"
      },
      {
        id: "content-lang-2",
        contentId: "content-1",
        languageId: "lang-2",
        title: "Đánh giá điện thoại thông minh mới nhất",
        description: "Đánh giá toàn diện về các mẫu điện thoại thông minh mới nhất"
      }
    ],
    details: [
      {
        id: "detail-1",
        contentId: "content-1",
        type: "text",
        value: "<p>This is a detailed review of the latest smartphone model. The phone features a stunning display, powerful processor, and excellent camera system.</p>",
        order: 1
      },
      {
        id: "detail-2",
        contentId: "content-1",
        type: "image",
        value: "img-4",
        order: 2
      }
    ],
    imageIds: ["img-4"]
  },
  {
    id: "content-2",
    categoryId: "cat-4",
    slug: "best-pasta-recipes",
    status: "published",
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-01-15T00:00:00Z",
    translations: [
      {
        id: "content-lang-3",
        contentId: "content-2",
        languageId: "lang-1",
        title: "Best Pasta Recipes",
        description: "Collection of the best pasta recipes from around the world"
      },
      {
        id: "content-lang-4",
        contentId: "content-2",
        languageId: "lang-2",
        title: "Công thức mì Ý ngon nhất",
        description: "Bộ sưu tập các công thức mì Ý ngon nhất từ khắp nơi trên thế giới"
      }
    ],
    details: [
      {
        id: "detail-3",
        contentId: "content-2",
        type: "text",
        value: "<p>Discover the best pasta recipes that will satisfy your cravings. From classic spaghetti to creamy fettuccine, we've got you covered.</p>",
        order: 1
      },
      {
        id: "detail-4",
        contentId: "content-2",
        type: "image",
        value: "img-3",
        order: 2
      }
    ],
    imageIds: ["img-3"]
  },
  {
    id: "content-3",
    categoryId: "cat-5",
    slug: "explore-bali",
    status: "published",
    createdAt: "2023-01-20T00:00:00Z",
    updatedAt: "2023-01-20T00:00:00Z",
    translations: [
      {
        id: "content-lang-5",
        contentId: "content-3",
        languageId: "lang-1",
        title: "Explore Bali: The Ultimate Guide",
        description: "Everything you need to know about visiting Bali"
      },
      {
        id: "content-lang-6",
        contentId: "content-3",
        languageId: "lang-2",
        title: "Khám phá Bali: Hướng dẫn toàn diện",
        description: "Tất cả những gì bạn cần biết về việc tham quan Bali"
      }
    ],
    details: [
      {
        id: "detail-5",
        contentId: "content-3",
        type: "text",
        value: "<p>Bali is a beautiful island with stunning beaches, lush rice terraces, and vibrant culture. This guide will help you plan your perfect Bali vacation.</p>",
        order: 1
      },
      {
        id: "detail-6",
        contentId: "content-3",
        type: "image",
        value: "img-1",
        order: 2
      }
    ],
    imageIds: ["img-1"]
  },
  {
    id: "content-4",
    categoryId: "cat-2",
    slug: "new-headphones-review",
    status: "draft",
    createdAt: "2023-01-25T00:00:00Z",
    updatedAt: "2023-01-25T00:00:00Z",
    translations: [
      {
        id: "content-lang-7",
        contentId: "content-4",
        languageId: "lang-1",
        title: "New Headphones Review",
        description: "A detailed review of the latest noise-cancelling headphones"
      },
      {
        id: "content-lang-8",
        contentId: "content-4",
        languageId: "lang-2",
        title: "Đánh giá tai nghe mới",
        description: "Đánh giá chi tiết về các tai nghe chống ồn mới nhất"
      }
    ],
    details: [
      {
        id: "detail-7",
        contentId: "content-4",
        type: "text",
        value: "<p>These new headphones offer exceptional noise cancellation, great sound quality, and all-day comfort. Perfect for travelers and music enthusiasts.</p>",
        order: 1
      }
    ],
    imageIds: []
  }
];

export const pages: Page[] = [
  {
    id: "page-1",
    title: "Homepage",
    slug: "home",
    status: "published",
    createdAt: "2023-02-01T00:00:00Z",
    updatedAt: "2023-02-01T00:00:00Z",
    components: [
      {
        id: "comp-1",
        pageId: "page-1",
        type: "hero",
        name: "Hero Banner",
        order: 1,
        settings: {
          background: "dark",
          height: "large"
        },
        contents: [
          {
            id: "comp-cont-1",
            contentId: "content-3",
            position: "main"
          }
        ]
      },
      {
        id: "comp-2",
        pageId: "page-1",
        type: "featured",
        name: "Featured Content",
        order: 2,
        settings: {
          columns: 3,
          showImage: true
        },
        contents: [
          {
            id: "comp-cont-2",
            contentId: "content-1",
            position: "item-1"
          },
          {
            id: "comp-cont-3",
            contentId: "content-2",
            position: "item-2"
          },
          {
            id: "comp-cont-4",
            contentId: "content-3",
            position: "item-3"
          }
        ]
      },
      {
        id: "comp-3",
        pageId: "page-1",
        type: "grid",
        name: "Content Grid",
        order: 3,
        settings: {
          columns: 2,
          rows: 2
        },
        contents: [
          {
            id: "comp-cont-5",
            contentId: "content-1",
            position: "item-1"
          },
          {
            id: "comp-cont-6",
            contentId: "content-2",
            position: "item-2"
          },
          {
            id: "comp-cont-7",
            contentId: "content-3",
            position: "item-3"
          },
          {
            id: "comp-cont-8",
            contentId: "content-4",
            position: "item-4"
          }
        ]
      }
    ]
  },
  {
    id: "page-2",
    title: "About",
    slug: "about",
    status: "published",
    createdAt: "2023-02-02T00:00:00Z",
    updatedAt: "2023-02-02T00:00:00Z",
    components: []
  }
];

// Utility function to find content by ID
export const findContentById = (id: string): Content | undefined => {
  return contents.find(content => content.id === id);
};

// Utility function to find category by ID
export const findCategoryById = (id: string): Category | undefined => {
  // Check top-level categories
  const category = categories.find(cat => cat.id === id);
  if (category) return category;
  
  // Check child categories
  for (const parentCat of categories) {
    if (parentCat.children) {
      const childCat = parentCat.children.find(child => child.id === id);
      if (childCat) return childCat;
    }
  }
  
  return undefined;
};

// Utility function to find image by ID
export const findImageById = (id: string): Image | undefined => {
  return images.find(image => image.id === id);
};

// Utility function to find language by ID
export const findLanguageById = (id: string): Language | undefined => {
  return languages.find(language => language.id === id);
};

// Utility to generate a new ID
export const generateId = (): string => {
  return uuidv4();
};
