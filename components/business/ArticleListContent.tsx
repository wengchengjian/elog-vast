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
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
};

export default function ArticleListContent({
  data,
  page,
  pageSize,
  onPageChange,
  onSearchKeyChange,
}: ArticleListContentProps & ArticleCommonSearchProps) {

  const renderItem = (item: any) => {
    return (
      <List.Item
        align={'flex-start'}
        key={item.id}
        className={`${styles.article_item} white-back-box`}
        header={
          <div className={styles.article_img}>
            <Image
              src={item.img}
              width={250}
              height={150}
              alt="picture of the article"
            />
          </div>
        }
        main={<ArticleView article={item} />}
      />
    );
  };

  let visible = false;

  if (!data) {
    visible = true;
  }

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
                <Skeleton loading={visible} active placeholder={placeholder}>
                  <ListContent
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
