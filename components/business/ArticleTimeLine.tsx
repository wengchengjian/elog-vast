import { Article } from '@/types/article';
import {
  TransformFormat,
  TransformItemFormat,
  TransformTimeMapType,
  transformToTimeMap,
} from '@/utils';
import { Collapse, Space, Timeline } from '@douyinfe/semi-ui';
import moment from 'moment';
import { useMemo, useState } from 'react';
import styles from '@/styles/timeline.module.css';
import { useRouter } from 'next/router';
export type ArticleTimeLineProps = {
  articles: Article[];
  type: TransformTimeMapType;
};

export default function ArticleTimeLine({
  articles,
  type,
}: ArticleTimeLineProps) {
  const router = useRouter();

  const timeLines = useMemo(() => {
    return transformToTimeMap(articles, type);
  }, [type, articles]);

  const handleClickTimelineItem = (id: string) => {
    // 跳转到文章详情页
    router.push({
      pathname: `/article/${id}`,
    });
  };
  return (
    <>
      <Timeline>
        <Collapse accordion>
          {Array.from(timeLines.keys()).map((timeKey) => {
            const thisLineArticles = timeLines.get(timeKey);
            return (
              <Timeline.Item key={timeKey.toString()}>
                <Collapse.Panel
                  header={
                    <Space>
                      <span>{timeKey}</span>
                      <span style={{ color: '#bc84a8' }}>
                        ({thisLineArticles?.length ?? 0})
                      </span>
                    </Space>
                  }
                  itemKey={timeKey}
                >
                  <Space align="start" vertical spacing={'medium'}>
                    {thisLineArticles?.map((article) => {
                      return (
                        <Space
                          key={article.id}
                          className={styles.time_line_item}
                        >
                          <span>
                            {moment(article.createTime).format(
                              TransformItemFormat[type]
                            )}
                            :
                          </span>

                          <span
                            onClick={() => handleClickTimelineItem(article.id)}
                          >
                            {article.title}
                          </span>
                        </Space>
                      );
                    })}
                  </Space>
                </Collapse.Panel>
              </Timeline.Item>
            );
          })}
        </Collapse>
      </Timeline>
    </>
  );
}
