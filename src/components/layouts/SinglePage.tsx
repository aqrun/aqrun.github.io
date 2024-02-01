import Head from 'next/head';
import React from 'react';

import { Footer, Header, HeaderBg, SideBar } from '@/components/HomePage';

export interface SinglePageProps {
  title: string;
}

/**
 * 单页内容模板
 */
export const SinglePage: React.FC<React.PropsWithChildren<SinglePageProps>> = ({
  title,
  children,
}) => {
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
            className='flex flex-1 flex-col'
            style={{
              width: 'calc(100% - 22rem)',
            }}
          >
            <h1 className='text-[2.67rem] mb-[1.3rem] text-slate-800'>
              {title}
            </h1>
            <article className='prose lg:prose-lg'>{children}</article>
          </div>
          <div className='lg:w-80'>
            <SideBar />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};
