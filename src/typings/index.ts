export interface Blog {
  slug: string;
  date: string;
  file: string;
  filePath: string;
  title: string;
  tags: string[];
  excerpt: string;
  category: {
    name: string;
    dir: string; 
  };
  content?: string;
}