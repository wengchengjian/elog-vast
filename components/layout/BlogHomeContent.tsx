import { List, Pagination } from '@douyinfe/semi-ui';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import styles from '@/styles/article.module.css';
import BlogPagination from '@@/business/BlogPagination';
import usePage from '@/hooks/usePage';
import ArticleListContent from '@@/business/ArticleListContent';
/**
 * Tab栏切换时，客户端渲染数据
 * @constructor
 */
export default function BlogHomeContent() {
  const [selectedKey, setSelectedKey] = useState('recentCreateArticle');

  const { page, pageSize, setPage, setPageSize } = usePage();

  const handleTabChange = (key: string) => {
    setSelectedKey(key);
  };

  const onPageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };
  const { data, error } = useSWR(
    `/api/article?type=${
      selectedKey ?? 'recentCreateArticle'
    }&page=${page}&pageSize=${pageSize}`
  );

  if (error) {
    return <>暂无数据</>;
  }

  return (
    <>
      <ArticleListContent
        data={data}
        page={page}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onSearchKeyChange={handleTabChange}
      />
    </>
  );
}
