import { SITE } from '../../src/constants';
import { getAllBlog } from '../../src/utils/blog';
import { Home } from '../../src/pages';

export const IndexPage = (props) => {

  return (<Home {...props} />)
};

export const getStaticPaths = async () => {
  const allBlogs = getAllBlog();
  const { pageSize } = SITE;
  const totalCount = allBlogs.length;
  const totalPage = Math.ceil(totalCount / pageSize)

  let paths = [];
  for (let i = 1; i <= totalPage; i++) {
    paths.push(`/page/${i}`);
  }

  return { paths, fallback: false }
};

export const getStaticProps = async ({ params }) => {
  const page = Number(params.page || 1);
  const { pageSize } = SITE;
  const allBlogs = getAllBlog();
  const blogList = allBlogs.slice((page - 1) * pageSize, (page * pageSize));
console.log('bloglsit======',blogList)
  return {
    props: {
      allBlogs: blogList,
    },
  };
};

export default IndexPage;