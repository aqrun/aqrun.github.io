import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Blog } from '../typings';

export const generateSlug = (file: string) => {
  const fileArr = file.split('.');
  fileArr.pop();
  const fileData = fileArr.join('.').split('-');
  const year = fileData.shift();
  const month = fileData.shift();
  const day = fileData.shift();
  const title = fileData.join('-').replace(/[\.+\s]+/ig, '-');

  return {
    slug: `${year}/${month}/${day}/${title}`,
    date: `${year}-${month}-${day}`,
  }
};

export const getAllBlog = () => {
  const categorys = [
    { name: 'backend', dir: 'blog/backend/_posts' },
    { name: 'frontend', dir: 'blog/frontend/_posts' },
    { name: 'rust', dir: 'blog/rust/_posts' },
    { name: 'server', dir: 'blog/server/_posts' },
    { name: 'diary', dir: 'blog/diary/_posts' },
  ];
  let allBlogs: Blog[] = [];
  
  categorys.forEach((category) => {
    const dir = path.join(process.cwd(), category.dir);
    const dirFiles = fs.readdirSync(dir);
    
    const blogs: Blog[] = dirFiles.map((file) => {
      const filePath = path.join(dir, file);
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const fileDataObj = matter(fileData);

      const { slug, date } = generateSlug(file);

      return {
        slug,
        date,
        file,
        filePath: filePath,
        title: fileDataObj.data.title || '',
        category,
        tags: (fileDataObj.data.tags || '').split(' '),
        excerpt: fileDataObj.data.excerpt || '',
      };
    });

    allBlogs = allBlogs.concat(blogs);
  });

  allBlogs.sort((a, b) => {
    return (new Date(b.date)).getTime() - (new Date(a.date)).getTime();
  });

  return allBlogs;
};
