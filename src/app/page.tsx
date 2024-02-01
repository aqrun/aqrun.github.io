import { Metadata } from 'next';
import React from 'react';

import { HOME_PAGE_SIZE } from '@/constant';
import { siteConfig } from '@/constant/config';
import { getNodes } from '@/utils';

import { HomePage as BaseHomePage } from './HomePage';

export const metadata: Metadata = {
  title: `子十个人博客 | ${siteConfig.title}`,
  description: siteConfig.description,
};

export default function HomePage() {
  const pageSize = HOME_PAGE_SIZE;
  const all_nodes = getNodes({
    orderBy: 'date',
  });
  const nodes = getNodes({
    page: 1,
    pageSize,
    orderBy: 'date',
  });

  return (
    <BaseHomePage
      nodes={nodes}
      page={1}
      pageSize={pageSize}
      total={all_nodes?.length}
    />
  );
}
