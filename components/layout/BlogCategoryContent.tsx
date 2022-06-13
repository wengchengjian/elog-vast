import { List, Pagination, Space, Input, TagGroup } from '@douyinfe/semi-ui';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import styles from '@/styles/article.module.css';
import BlogPagination from '@@/business/BlogPagination';
import usePage from '@/hooks/usePage';
import { IconSearch } from '@douyinfe/semi-icons';
import ArticleListContent from '@@/business/ArticleListContent';
import { Category } from '@/types/Category';
import TagList from '@@/base/TagList';

export type CategoryContentProps = {
  categories: Category[];
};

/**
 * Tab栏切换时，客户端渲染数据
 * @constructor
 */
export default function BlogCategoryContent({
  categories,
}: CategoryContentProps) {
  const [selectedKey, setSelectedKey] = useState('recentCreateArticle');

  const { page, pageSize, setPage, setPageSize } = usePage();

  const [selectCategory, setCategory] = useState('all');

  const [searchContent, setSearchContent] = useState('');

  const handleTabChange = (key: string) => {
    setSelectedKey(key);
  };

  const onPageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const { data, error } = useSWR(
    `/api/article?type=${
      encodeURIComponent(selectedKey) ?? 'recentCreateArticle'
    }&category=${encodeURIComponent(
      selectCategory
    )}&searchContent=${encodeURIComponent(
      searchContent
    )}&page=${page}&pageSize=${pageSize}`
  );

  if (error) {
    return <>出现错误</>;
  }

  return (
    <>
      <Space vertical spacing={'loose'} style={{ width: '100%' }}>
        <Input
          style={{ width: '50%' }}
          suffix={<IconSearch />}
          placeholder="搜索文章"
          showClear
          maxLength={50}
          onEnterPress={(e) => setSearchContent(e.currentTarget.value)}
        ></Input>
        <TagList tags={categories} onClick={(tag) => setCategory(tag.name)} />
        <ArticleListContent
          data={data}
          page={page}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onSearchKeyChange={handleTabChange}
        />
      </Space>
    </>
  );
}
