import { SITE } from '../src/constants';
import { getAllBlog } from '../src/utils/blog';
import { Blog, MenuId } from '../src/typings';
import { Home as HomeBase } from '../src/pages';

export interface HomeProps {
  allBlogs: Blog[];
}

const Home: React.FC<HomeProps> = (props) => {
  return (<HomeBase {...props} />);
}

export const getStaticProps = async () => {
  const { pageSize } = SITE;
  const allBlogs = getAllBlog();
  const blogList = allBlogs.slice(0, pageSize);

  return {
    props: {
      allBlogs: blogList,
    }
  }
};

export default Home;