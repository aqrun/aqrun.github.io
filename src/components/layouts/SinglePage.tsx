import React from 'react';

import { Footer, Header, HeaderBg } from '@/components/HomePage';

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
              {title}
            </h1>
            <article className='prose lg:prose-lg max-w-full break-words'>{children}</article>
          </div>
          {/* <div className='lg:w-80'>
            <SideBar />
          </div> */}
        </div>
      </section>

      <Footer />
    </main>
  );
};
