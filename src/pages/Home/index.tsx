import Head from 'next/head'
import Link from 'next/link';
import { Layout, List, Tag } from 'antd';
import { mainMenu, SITE } from '../../constants';
import { getAllBlog } from '../../utils/blog';
import { Blog, MenuId } from '../../typings';
import {
  LayoutHeader,
  LayoutFooter,
  LayoutMain,
  HtmlHead,
  ArticleList,
  SideBar,
  Header,
} from '../../components';
import {
  Global,
} from './index.styled';
import { url } from 'inspector';

const { Content, Sider, Footer } = Layout;

export interface HomeProps {
  allBlogs: Blog[];
}

export const Home: React.FC<HomeProps> = ({ allBlogs }) => {
  return (
    <>
      <Global />
      <HtmlHead />
      <Header menuId={MenuId.index} />
      <div
        className={`g-banner home-banner backend banner-theme-${SITE.themeColor}`}
        data-theme={SITE.themeColor}
        style={{
          background: 'url(/assets/img/banner1.jpg) no-repeat center center',
          backgroundSize: 'cover',
        }}
      >
        <h2>满江红·怒发冲冠</h2>
        <h3>怒发冲冠，凭阑处、潇潇雨歇。抬望眼，仰天长啸，壮怀激烈。三十功名尘与土，八千里路云和月。莫等闲、白了少年头，空悲切。<br/>靖康耻，犹未雪。臣子恨，何时灭。驾长车，踏破贺兰山缺。壮志饥餐胡虏肉，笑谈渴饮匈奴血。待从头、收拾旧山河，朝天阙。</h3>
      </div>

      <main className="g-container home-content">
        <ArticleList allBlogs={allBlogs} />
        <SideBar />
      </main>
      <LayoutFooter />
    </>
  )
}
