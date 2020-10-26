// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import path from 'path';

export default (req, res) => {
  
  const dir = path.join(process.cwd(), 'posts');

  console.log('dir========', dir);
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
