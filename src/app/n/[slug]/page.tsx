import { Metadata } from 'next';
import React from 'react';

import { NodeDetailPage as BaseNodeDetailPage } from '@/components/layouts';

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
    <BaseNodeDetailPage
      hasArticleMeta
      title={node?.data?.title || ''}
      categoryName={category?.name}
      categoryUrl={category?.href}
      date={node?.data?.date?.toLocaleDateString()}
    >
      <Content />
    </BaseNodeDetailPage>
  );
}

