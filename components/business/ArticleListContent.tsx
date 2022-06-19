import { List, Pagination, Skeleton, Space } from '@douyinfe/semi-ui';
import { Tabs } from '@douyinfe/semi-ui';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import usePage from '@/hooks/usePage';
import ArticleView from '@@/business/ArticleView';
import styles from '@/styles/article.module.css';
import ListContent, { ListContentProps } from '@@/base/ListContent';
import ArticlePlaceHolder from '@@/business/ArticlePlaceHolder';
import { useRouter } from 'next/router';
import { Article } from '@/types/article';

/**
 * Tab栏切换时，客户端渲染数据
 * @constructor
 */
const tabs = [
  {
    tab: '最新文章',
    itemKey: 'recentCreateArticle',
  },
  {
    tab: '热门文章',
    itemKey: 'hotArticle',
  },
  {
    tab: '最近更新',
    itemKey: 'recentUpdateArticle',
  },
  {
    tab: '最多点赞',
    itemKey: 'mostLikeArticle',
  },
];

const { TabPane } = Tabs;

export type ArticleCommonSearchProps = {
  onSearchKeyChange: (keyword: string) => void;
};

export type ArticleListContentProps = {
  data: any[];
  page: number;
  loading: boolean;
  pageSize: number;
  total: number;
  onPageChange: (page: number, pageSize: number) => void;
};

export default function ArticleListContent({
  data,
  page,
  pageSize,
  loading,
  onPageChange,
  onSearchKeyChange,
  total,
}: ArticleListContentProps & ArticleCommonSearchProps) {
  const router = useRouter();

  const handleRouteToArticle = (article: Article) => {
    router.push(`/article/${article.id}`);
  };

  const renderItem = (item: any) => {
    return (
      <List.Item
        onClick={() => handleRouteToArticle(item)}
        align={'flex-start'}
        key={item.id}
        className={`white-back-box ${styles.article_list_item}`}
        header={
          <div className={styles.article_img}>
            <Image
              src={item.img}
              width={400}
              height={275}
              alt="picture of the article"
            />
          </div>
        }
        main={<ArticleView article={item} />}
      />
    );
  };

  const placeholder = (
    <div>
      <ArticlePlaceHolder />
      <ArticlePlaceHolder />
      <ArticlePlaceHolder />
      <ArticlePlaceHolder />
      <ArticlePlaceHolder />
    </div>
  );
  return (
    <>
      <div style={{ width: '100%' }}>
        <Tabs
          lazyRender
          keepDOM={false}
          type={'line'}
          onChange={onSearchKeyChange}
        >
          {tabs.map((item) => {
            return (
              <TabPane tab={item.tab} itemKey={item.itemKey} key={item.itemKey}>
                <Skeleton loading={loading} active placeholder={placeholder}>
                  <ListContent
                    total={total}
                    data={data}
                    page={page}
                    pageSize={pageSize}
                    onPageChange={onPageChange}
                    renderItem={renderItem}
                  />
                </Skeleton>
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    </>
  );
}
