import Head from 'next/head'
import Link from 'next/link';
import { Layout, List, Tag } from 'antd';
import { mainMenu } from '../src/constants';
import { getAllBlog } from '../src/utils/blog';
import { Blog } from '../src/typings';
import {
  LayoutHeader,
  LayoutFooter,
  LayoutMain,
  ArticleListItem,
} from '../src/components';
import {
  Global,
} from './index.styled';

const { Content, Sider, Footer } = Layout;

export interface HomeProps {
  allBlogs: Blog[];
}

const Home: React.FC<HomeProps> = ({ allBlogs }) => {
  return (
    <>
      <Global />
      <Layout>
        <LayoutHeader />

        <LayoutMain>
          <div className="article-list">
            {allBlogs.map((item) => {
              return (
                <ArticleListItem
                  key={item.slug}
                  title={item.title}
                  url={`/blogs/${item.slug}`}
                  excerpt={item.excerpt}
                  tags={item.tags}
                />
              );
            })}
          </div>

        </LayoutMain>

        <LayoutFooter />
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allBlogs = getAllBlog();
  console.log('all', allBlogs)
  return {
    props: {
      allBlogs,
    }
  }
};

export default Home;