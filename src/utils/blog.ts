import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const getAllBlog = () => {
  const categorys = [
    { name: 'backend', dir: 'blog/backend/_posts' },
    { name: 'frontend', dir: 'blog/frontend/_posts' },
    { name: 'rust', dir: 'blog/rust/_posts' },
    { name: 'server', dir: 'blog/server/_posts' },
    { name: 'diary', dir: 'blog/diary/_posts' },
  ];
  let allBlogs = [];
  
  categorys.forEach((category) => {
    const dir = path.join(process.cwd(), category.dir);
    const dirFiles = fs.readdirSync(dir);
    
    const blogs = dirFiles.map((file) => {
      const filePath = path.join(dir, file);
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const fileDataObj = matter(fileData);

      return {
        title: fileDataObj.data.title || '',
        category,
        tags: (fileDataObj.data.tags || '').split(' '),
        excerpt: fileDataObj.data.excerpt || '',
      };
    });

    allBlogs = allBlogs.concat(blogs);
  });

  return allBlogs;
};
