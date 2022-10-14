import { List, Pagination } from '@douyinfe/semi-ui';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import styles from '@/styles/article.module.css';
import BlogPagination from '@@/business/BlogPagination';
import usePage from '@/hooks/usePage';
import ArticleListContent from '@@/business/ArticleListContent';
import useRequest from '@/hooks/useRequest';
import { sxios } from '@/request/server';
/**
 * Tab栏切换时，客户端渲染数据
 * @constructor
 */
export default function BlogHomeContent() {
  const [selectedKey, setSelectedKey] = useState('create_time');

  const { page, pageSize, setPage, setPageSize } = usePage();

  const [loading,setLoading] = useState(false);

  const handleTabChange = (key: string) => {
    setSelectedKey(key);
  };

  const [data,setData] = useState<any>();

  const onPageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  useEffect(()=>{
    setLoading(true)
    sxios.post("/article/queryArticleByPage",{
      current:page,
      pageSize,
      orderBy:selectedKey,
      orderDesc:true,
      publish:1
    }).then((res)=>{
      setData(res);
    }).finally(()=>{
      setLoading(false)
    })
  },[page,pageSize,selectedKey])


  return (
    <>
      <ArticleListContent
        total={data?.total ?? 0}
        data={data?.records ?? []}
        page={page}
        loading={loading}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onSearchKeyChange={handleTabChange}
      />
    </>
  );
}
