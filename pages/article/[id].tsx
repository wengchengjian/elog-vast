import BlogArticleItemDetailContent from '@/components/layout/content/BlogArticleItemDetailContent';
import BlogFooter from '@/components/layout/footer/BlogFooter';
import BlogHeader from '@@/layout/header/BlogHeader';
import MainLayout from '@/components/layout/MainLayout';
import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {Article} from '@/types/article';
import {useCallback, useState} from 'react';
import {Space} from '@douyinfe/semi-ui';
import MarkDownNav from '@/components/business/MarkDownNav';
import {Button} from 'antd';
import styles from '@/styles/article.module.css';
import {IconLikeThumb, IconComment, IconForward} from '@douyinfe/semi-icons';
import {useRouter} from 'next/router';
import {sxios} from '@/request/server';
import {SysUser} from '@/types/user';

export type ArticleItemPageProps = {
    article: Article;
    cur_author: SysUser;
};

export const getServerSideProps: GetServerSideProps<ArticleItemPageProps> = async (context) => {
    const article: Article = await sxios.get(`/article/${context.query.id}`);
    const cur_author: SysUser = await sxios.get(`/user/queryAuthorByName/${article.author}`)
    return {
        props: {
            article,
            cur_author
        },
    };
};

export default function ArticleItenDetailPage({
                                                  article,
                                                  cur_author
                                              }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <MainLayout
                header={<BlogHeader/>}
                footer={<BlogFooter/>}
                content={<BlogArticleItemDetailContent article={article} cur_author={cur_author}/>}
                leftSider={<ArticleItemDetailLeftSider article={article}/>}
                rightSider={<ArticleItemDetailRightSider article={article}/>}
            />
        </>
    );
}

export type ArticleItemDetailLeftSiderProps = {
    article: Article;
};

export function ArticleItemDetailLeftSider({
                                               article,
                                           }: ArticleItemDetailLeftSiderProps) {
    const router = useRouter();

    const handleClickLike = useCallback(() => {
        console.log('点赞');
    }, []);

    const handleClickComment = useCallback(() => {
        router.replace('#basic-comment');
    }, []);
    return (
        <>
            <Space
                style={{height: '100%', width: '100%', position: 'relative'}}
                vertical
                spacing={'loose'}
                align="end"
            >
                <Space vertical spacing={'loose'} className={styles['button-sticky']}>
                    <Button
                        onClick={handleClickLike}
                        data-badge={article.likeNum}
                        className={styles['icon-button']}
                        icon={
                            <>
                                <IconLikeThumb className={styles['sprite-icon']}/>
                            </>
                        }
                    />
                    <Button
                        onClick={handleClickComment}
                        data-badge={article.commentNum}
                        className={styles['icon-button']}
                        icon={
                            <>
                                <IconComment className={styles['sprite-icon']}/>
                            </>
                        }
                    />
                    <Button
                        data-badge={article.likeNum}
                        className={styles['icon-button']}
                        icon={
                            <>
                                <IconForward className={styles['sprite-icon']}/>
                            </>
                        }
                    />
                </Space>
            </Space>
        </>
    );
}

export type ArticleItemDetailRightSiderProps = {
    article: Article;
};

export function ArticleItemDetailRightSider({
                                                article,
                                            }: ArticleItemDetailRightSiderProps) {
    return (
        <>
            <Space style={{height: '100%'}} vertical spacing={'loose'}>
                <MarkDownNav article={article}/>
            </Space>
        </>
    );
}
