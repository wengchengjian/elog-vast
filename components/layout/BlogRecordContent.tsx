import { Skeleton, Timeline } from '@douyinfe/semi-ui';
import SmallComponent from '../base/SmallComponent';
import { IconClock } from '@douyinfe/semi-icons';
import ArticleTimeLine from '../business/ArticleTimeLine';
import { Article } from '@/types/article';
import { useMemo, useState } from 'react';
import { TransformTimeMapType } from '@/utils';
import useSWR from 'swr';
import ArticlePlaceHolder from '@@/business/ArticlePlaceHolder';

export default function BlogRecordContent() {
  const [type, setType] = useState<TransformTimeMapType>('month');

  const { data, error } = useSWR('/api/article');

  const placeholder = useMemo(() => {
    return (
      <div>
        <ArticlePlaceHolder />
        <ArticlePlaceHolder />
        <ArticlePlaceHolder />
      </div>
    );
  }, []);

  if (error) {
    return <>暂无数据</>;
  }

  let visible = false;

  if (!data) {
    visible = true;
  }
  return (
    <>
      <SmallComponent
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconClock />
            <span style={{ marginLeft: 5 }}>时间轴(月)</span>
          </div>
        }
        align="start"
        style={{ width: '100%' }}
        content={
          <Skeleton loading={visible} active placeholder={placeholder}>
            <ArticleTimeLine articles={data ?? []} type={type} />
          </Skeleton>
        }
      ></SmallComponent>
    </>
  );
}
