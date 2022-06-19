import { List, Tabs } from '@douyinfe/semi-ui';
import { useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import styles from '@/styles/article.module.css';
import BlogPagination from '@@/business/BlogPagination';

export type QueryResponse = {
  data: any[];
  total: number;
};

export type ListContentProps = {
  data: any[];
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number, pageSize: number) => void;
  renderItem: (item: any) => React.ReactNode;
};

export default function ListContent({
  data,
  page,
  pageSize,
  onPageChange,
  renderItem,
  total,
}: ListContentProps) {
  return (
    <>
      <List dataSource={data ?? []} renderItem={renderItem} />
      <BlogPagination
        total={total}
        page={page}
        pageSize={pageSize}
        onChange={onPageChange}
      />
    </>
  );
}
