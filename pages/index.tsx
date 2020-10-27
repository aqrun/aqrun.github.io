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
} from '../src/components';
import {
  Global,
} from './index.styled';

const { Content, Sider, Footer } = Layout;

const Home = ({ allBlogs }) => {
  return (
    <>
      <Global />
      <Layout>
        <LayoutHeader />

        <LayoutMain>
          
          <List
            bordered
            dataSource={allBlogs}
            renderItem={(item: Blog) => {
              return (
                <List.Item>
                  <h4>{item.title}</h4>
                  <p>{item.excerpt}</p>
                  <div>
                    <Tag>{item.category['name']}</Tag>
                  </div>
                </List.Item>
              );
            }}
          />

        </LayoutMain>

        <LayoutFooter />
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allBlogs = getAllBlog();

  return {
    props: {
      allBlogs,
    }
  }
};

export default Home;