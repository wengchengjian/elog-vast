import { List, Pagination } from '@douyinfe/semi-ui';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import styles from '@/styles/article.module.css';
import BlogPagination from '@@/business/BlogPagination';
import usePage from '@/hooks/usePage';
import ArticleListContent from '@@/business/ArticleListContent';
import useRequest from '@/hooks/useRequest';
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
  const { data, error, loading } = useRequest(
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
        total={data?.total ?? 0}
        data={data?.list ?? []}
        page={page}
        loading={loading}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onSearchKeyChange={handleTabChange}
      />
    </>
  );
}
