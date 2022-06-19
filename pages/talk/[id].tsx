import BlogTalkItemDetailContent from '@/components/layout/content/BlogTalkItemDetailContent';
import BlogFooter from '@/components/layout/footer/BlogFooter';
import BlogHeader from '@@/layout/header/BlogHeader';
import MainLayout from '@/components/layout/MainLayout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { talks } from '../api/talk';
import MarkNav from 'markdown-navbar';
import { useCallback, useState } from 'react';
import { Space } from '@douyinfe/semi-ui';
import MarkDownNav from '@/components/business/MarkDownNav';
import { Button } from 'antd';
import styles from '@/styles/article.module.css';
import { IconLikeThumb, IconComment, IconForward } from '@douyinfe/semi-icons';
import { useRouter } from 'next/router';
import { Talk } from '@/types/talk';
export type TalkItemPageProps = {
  talk: Talk;
};

export const getServerSideProps: GetServerSideProps<TalkItemPageProps> = async (
  context
) => {
  //TODO 获取分类数据
  // const talk = await axios.get('/api/talk/${id}');
  // ...
  return {
    props: {
      talk: talks[0],
    },
  };
};

export default function TalkItenDetailPage({
  talk,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <MainLayout
        header={<BlogHeader />}
        footer={<BlogFooter />}
        content={<BlogTalkItemDetailContent talk={talk} />}
        leftSider={<TalkItemDetailLeftSider talk={talk} />}
      />
    </>
  );
}

export type TalkItemDetailLeftSiderProps = {
  talk: Talk;
};

export function TalkItemDetailLeftSider({
  talk,
}: TalkItemDetailLeftSiderProps) {
  const router = useRouter();

  const handleClickLike = useCallback(() => {
    console.log('点赞');
  }, []);

  const handleClickComment = useCallback(() => {
    router.replace('#basic-comment');
  }, [router]);

  return (
    <>
      <Space
        style={{ height: '100%', width: '100%', position: 'relative' }}
        vertical
        spacing={'loose'}
        align="end"
      >
        <Space vertical spacing={'loose'} className={styles['button-sticky']}>
          <Button
            onClick={handleClickLike}
            data-badge={talk?.likes ?? 0}
            className={styles['icon-button']}
            icon={
              <>
                <IconLikeThumb className={styles['sprite-icon']} />
              </>
            }
          />
          <Button
            onClick={handleClickComment}
            data-badge={talk?.commentsNum ?? 0}
            className={styles['icon-button']}
            icon={
              <>
                <IconComment className={styles['sprite-icon']} />
              </>
            }
          />
          <Button
            data-badge={talk?.shares ?? 0}
            className={styles['icon-button']}
            icon={
              <>
                <IconForward className={styles['sprite-icon']} />
              </>
            }
          />
        </Space>
      </Space>
    </>
  );
}
