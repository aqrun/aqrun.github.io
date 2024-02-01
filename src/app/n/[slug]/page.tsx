import { Metadata } from 'next';
import Head from 'next/head';
import React from 'react';

import { Footer, Header, HeaderBg } from '@/components/HomePage';

import { siteConfig } from '@/constant';
import { parseMdx } from '@/utils';
import { getAllNodes, getCategory } from '@/utils/blog';

export interface MetaProps {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string;
  };
}

export const generateMetadata = async (props: MetaProps): Promise<Metadata> => {
  const slug = props?.params?.slug;
  const all_nodes = getAllNodes();
  const node = all_nodes?.find((item) => {
    return item?.data?.slug === slug;
  });
  const category = getCategory(node?.data?.taxonomies?.categories);

  const meta: Metadata = {
    title: `${node?.data?.title} - ${category?.name}`,
    description: node?.data?.description || siteConfig?.description,
  };
  return meta;
};

export const generateStaticParams = () => {
  const all_nodes = getAllNodes();
  return all_nodes?.map((item) => {
    return {
      slug: item?.data?.slug,
    };
  });
};

export interface NodeDetailPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function NodeDetailPage(props: NodeDetailPageProps) {
  const slug = props?.params?.slug;
  const all_nodes = getAllNodes();
  const node = all_nodes?.find((item) => {
    return item?.data?.slug === slug;
  });
  const category = getCategory(node?.data?.taxonomies?.categories);

  const Content = await parseMdx(node?.content || '');

  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <Header />
      <HeaderBg />

      <section className='bg-white'>
        <div className='layout py-12 flex flex-row gap-8'>
          <div
            className='flex flex-1 flex-col overflow-auto'
            // style={{
            //   width: 'calc(100% - 22rem)',
            // }}
          >
            <h1 className='text-[1.8rem] lg:text-[2.67rem] mb-[1.3rem] text-slate-800 lg:leading-[2.67rem] lg:text-center'>
              {node?.data?.title}
            </h1>
            <div className='node-metas mb-10 text-gray-400 lg:text-center'>
              <a href={category?.href}>
                <i className='iconfont icon-benshubook122 mr-1' />
                {category?.name}
              </a>
              <span className='ml-4'>
                <i className='iconfont icon-date mr-1' />
                {node?.data?.date?.toLocaleDateString()}
              </span>
            </div>
            <article className='prose lg:prose-lg max-w-full'>
              <Content />
            </article>
          </div>
          {/* <div className='lg:w-80'>
            <SideBar />
          </div> */}
        </div>
      </section>

      <Footer />
    </main>
  );
}
