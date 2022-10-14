import {Article} from '@/types/article';
import ReactMarkDown from 'react-markdown';
import markGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {okaidia as codeBackStyle} from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import dynamic from 'next/dynamic';
import {Avatar, Col, Row, Select, Space, Typography} from '@douyinfe/semi-ui';
import moment from 'moment';
import Image from 'next/image';
import remarkToc from 'remark-toc';
import {useCallback, useEffect, useMemo, useState} from 'react';
import rehypeRaw from 'rehype-raw';
import BaseComment from '@/components/base/BaseComment';
import MarkNav from 'markdown-navbar';
import CommentListContent from '@/components/business/CommentListContent';
import usePage from '@/hooks/usePage';
import useRequest from '@/hooks/useRequest';
import {sxios} from '@/request/server';
import {SysUser} from '@/types/user';
// const dark = dynamic(
//   () => import('react-syntax-highlighter/dist/esm/styles/prism'),
//   { ssr: false }
// );

// const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter'), {
//   ssr: false,
// });

export type BlogArticleItemDetailContentProps = {
    article: Article;
    cur_author: SysUser;
};

const {Paragraph, Title, Text} = Typography;

export default function BlogArticleItemDetailContent({
                                                         article,
                                                         cur_author
                                                     }: BlogArticleItemDetailContentProps) {
    const [commentValue, setComment] = useState('');
    /**
     * 1->最新,2->最热,默认最新
     */
    const [selectedKey, setSelectedKey] = useState('1');

    const {page, pageSize, setPage, setPageSize} = usePage();

    const [comments, setComments] = useState<any>();
    const handleTabChange = (key: string) => {
        setSelectedKey(key);
    };
    const [loading, setLoading] = useState(false);

    const onPageChange = useCallback((page: number, pageSize: number) => {
        setPage(page);
        setPageSize(pageSize);
    }, []);

    useEffect(() => {
        setLoading(true);
        sxios.post("/comment/queryCommentByPage",{
            current:page,
            pageSize,
            orderBy:selectedKey,
            linkId:article.id,
            orderDesc:true,
            enable:1
        }).then((res) => {
            setComments(res);
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    const getArticleContent = useCallback(() => {
        return (
            <Space vertical spacing={'loose'} align="start">
                <Title>{article.title}</Title>
                <Space>
                    <Avatar src={cur_author.avatar ?? 'https://bing.ioliu.cn/v1/rand?w=100&h=50'}></Avatar>
                    <Space vertical align="start">
                        <Text>{cur_author.nickname}</Text>
                        <span style={{fontSize: '14px', fontWeight: '300'}}>
              <span>
                {moment(article.createTime).format('yyyy年MM月DD日 HH:mm')}
              </span>
                            &nbsp;·&nbsp;
                            <span>浏览{article.readNum}</span>
            </span>
                    </Space>
                </Space>
                <Image
                    src={article.img ?? 'https://bing.ioliu.cn/v1/rand?w=200&h=100'}
                    width={1200}
                    height={400}
                    alt="picture of the article"
                />
                <div style={{maxWidth:"900px"}}>
                    <ReactMarkDown
                        components={{
                            code({node, inline, className, children, ...props}) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        children={String(children).replace(/\n$/, '')}
                                        style={codeBackStyle}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    />
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                        remarkPlugins={[markGfm, remarkMath, remarkToc]}
                        rehypePlugins={[rehypeKatex, rehypeRaw]}
                    >
                        {/* {article.content} */}
                        {article.content}
                    </ReactMarkDown>
                </div>
            </Space>
        );
    }, [article]);

    const getCommentComponent = useCallback(() => {
        return (
            <Space
                style={{width: '100%'}}
                vertical
                spacing={'medium'}
                align="start"
            >
                <Title heading={5}>评论</Title>
                <BaseComment
                    value={commentValue}
                    onChange={(val) => setComment(val)}
                    onFinish={() => {
                    }}
                />
            </Space>
        );
    }, [commentValue]);

    const getArticleComment = useCallback(() => {
        return (
            <Space
                style={{width: '100%'}}
                vertical
                spacing={'medium'}
                align="start"
            >
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    <Title heading={5}>全部评论</Title>
                    <Select
                        defaultValue={selectedKey}
                        onChange={(val) => setSelectedKey(val)}
                    >
                        <Select.Option value="create_time">最新</Select.Option>
                        <Select.Option value="like_num">最热</Select.Option>
                    </Select>
                </div>
                <CommentListContent
                    page={page}
                    total={comments?.total ?? 0}
                    pageSize={pageSize}
                    onPageChange={onPageChange}
                    data={comments?.records ?? []}
                    loading={loading}
                />
            </Space>
        );
    }, [comments, page, pageSize, onPageChange, loading, selectedKey]);

    return (
        <>
            <Space vertical spacing={'loose'} align="start">
                <div className={`white-back-box`}>{getArticleContent()}</div>
                <div id="basic-comment" className={`white-back-box`}>
                    {getCommentComponent()}
                </div>
                <div className={`white-back-box`}>{getArticleComment()}</div>
            </Space>
        </>
    );
}
