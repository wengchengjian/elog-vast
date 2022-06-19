import { List, Pagination, Skeleton, Space } from '@douyinfe/semi-ui';
import { Tabs } from '@douyinfe/semi-ui';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import usePage from '@/hooks/usePage';
import ArticleView from '@@/business/ArticleView';
import styles from '@/styles/article.module.css';
import talkStyles from '@/styles/talk.module.css';
import ListContent, { ListContentProps } from '@@/base/ListContent';
import ArticlePlaceHolder from '@@/business/ArticlePlaceHolder';
import { Talk } from '@/types/talk';
import TalkView from './TalkView';
import { useRouter } from 'next/router';

const { TabPane } = Tabs;

export type TalkCommonSearchProps = {
  onSearchKeyChange: (keyword: string) => void;
};

export type TalkListContentProps = {
  data: any[];
  page: number;
  pageSize: number;
  total: number;
  loading: boolean;
  onPageChange: (page: number, pageSize: number) => void;
};

export default function TalkListContent({
  data,
  page,
  total,
  pageSize,
  onPageChange,
  loading,
}: TalkListContentProps) {
  const router = useRouter();

  const handleRouteToTalk = (talk: Talk) => {
    router.push(`/talk/${talk.id}`);
  };

  const renderItem = (item: Talk) => {
    return (
      <List.Item
        onClick={() => handleRouteToTalk(item)}
        align={'flex-start'}
        key={item.id}
        className={`white-back-box ${talkStyles.talk_list_item}`}
        main={<TalkView talk={item} />}
      />
    );
  };

  const placeholder = (
    <Space style={{ width: '100%' }} vertical spacing={'loose'}>
      <ArticlePlaceHolder />
      <ArticlePlaceHolder />
      <ArticlePlaceHolder />
      <ArticlePlaceHolder />
      <ArticlePlaceHolder />
    </Space>
  );
  return (
    <>
      <div style={{ width: '100%' }}>
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
      </div>
    </>
  );
}
