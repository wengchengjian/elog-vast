import {
  List,
  Pagination,
  Space,
  Input,
  TagGroup,
  Tooltip,
} from '@douyinfe/semi-ui';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import styles from '@/styles/article.module.css';
import BlogPagination from '@@/business/BlogPagination';
import usePage from '@/hooks/usePage';
import { IconSearch, IconHelpCircle } from '@douyinfe/semi-icons';
import ArticleListContent from '@@/business/ArticleListContent';
import { Category } from '@/types/Category';
import TagList from '@@/base/TagList';
import { useRouter } from 'next/router';
import useRequest from '@/hooks/useRequest';

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
  const router = useRouter();

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

  const { data, error, loading } = useRequest(
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

  const handleCLickSearchHelpIcon = () => {
    router.push('/help/search');
  };

  return (
    <>
      <Space vertical spacing={'loose'} style={{ width: '100%' }}>
        <Input
          style={{ width: '50%' }}
          prefix={<IconSearch />}
          suffix={
            <Tooltip content="搜索有关的帮助">
              <IconHelpCircle
                onClick={handleCLickSearchHelpIcon}
                style={{ cursor: 'pointer' }}
              />
            </Tooltip>
          }
          placeholder="搜索文章"
          showClear
          maxLength={50}
          onEnterPress={(e) => setSearchContent(e.currentTarget.value)}
        ></Input>
        <TagList tags={categories} onClick={(tag) => setCategory(tag.name)} />
        <ArticleListContent
          total={data?.total ?? 0}
          data={data?.list ?? []}
          page={page}
          loading={loading}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onSearchKeyChange={handleTabChange}
        />
      </Space>
    </>
  );
}
