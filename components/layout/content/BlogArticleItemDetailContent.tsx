import {Article} from "@/types/article";
import {Avatar, Col, Row, Select, Space, Typography} from "@douyinfe/semi-ui";
import moment from "moment";
import Image from "next/image";
import {useCallback, useEffect, useMemo, useState} from "react";
import BaseComment from "@/components/base/BaseComment";
import MarkNav from "markdown-navbar";
import CommentListContent from "@/components/business/CommentListContent";
import usePage from "@/hooks/usePage";
import useRequest from "@/hooks/useRequest";
import {sxios} from "@/request/server";
import {SysUser} from "@/types/user";
import {getServerImage, turndownService} from "@/utils";
import {useRecoilValue} from "recoil";
import {curUserState} from "@/store";
import {BlogComment} from "@/types/comment";


import 'juejin-markdown-themes/dist/cyanosis.min.css';
import 'bytemd/dist/index.css';
import {Viewer} from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import math from '@bytemd/plugin-math';
import gemoji from '@bytemd/plugin-gemoji';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import 'highlight.js/styles/vs.css';
import zhHans from 'bytemd/locales/zh_Hans.json';
import _ from "lodash";

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
const plugins = [
    gfm(),
    highlight(),
    math(),
    gemoji(),
    mediumZoom(),
    // Add more plugins here
];

const {Paragraph, Title, Text} = Typography;

export default function BlogArticleItemDetailContent({
                                                         article,
                                                         cur_author,
                                                     }: BlogArticleItemDetailContentProps) {
    /**
     * 1->最新,2->最热,默认最新
     */
    const [selectedKey, setSelectedKey] = useState("like_num");

    const {page, pageSize, setPage, setPageSize} = usePage();
    const curUser = useRecoilValue(curUserState);
    const [comments, setComments] = useState<any>();
    const handleTabChange = (key: string) => {
        setSelectedKey(key);
    };
    const [loading, setLoading] = useState(false);
    const [reloading, setReloading] = useState(false);
    const onPageChange = useCallback((page: number, pageSize: number) => {
        setPage(page);
        setPageSize(pageSize);
    }, []);

    useEffect(() => {
        setLoading(true);
        sxios
            .post("/v1/api/comment/queryCommentByPage", {
                current: page,
                pageSize,
                orderBy: selectedKey,
                linkId: article.id,
                orderDesc: true,
                enable: 1,
            })
            .then((res) => {
                setComments(res);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [page, pageSize, selectedKey, article.id, reloading]);

    const getArticleContent = useCallback(() => {
        return (
            <Space vertical spacing={"loose"} align="start">
                <Title>{article.title}</Title>
                <Space>
                    <Avatar
                        src={
                            getServerImage(cur_author.avatar ?? "") ??
                            "https://bing.ioliu.cn/v1/rand?w=100&h=50"
                        }
                    ></Avatar>
                    <Space vertical align="start">
                        <Text>{cur_author.nickname}</Text>
                        <span style={{fontSize: "14px", fontWeight: "300"}}>
              <span>
                {moment(article.createTime).format("yyyy年MM月DD日 HH:mm")}
              </span>
                            &nbsp;·&nbsp;
                            <span>浏览{article.readNum}</span>
            </span>
                    </Space>
                </Space>
                <Image
                    src={article.img ?? "https://bing.ioliu.cn/v1/rand?w=200&h=100"}
                    width={800}
                    height={400}
                    alt="picture of the article"
                />
                <div style={{maxWidth: 900}}>
                    <Viewer
                        plugins={plugins}
                        value={article?.content ?? turndownService.turndown(article.contentFormat ?? '')}
                    />
                </div>
            </Space>
        );
    }, [article, cur_author.avatar, cur_author.nickname]);

    const getCommentComponent = useCallback(() => {
        return (
            <Space
                style={{width: "100%"}}
                vertical
                spacing={"medium"}
                align="start"
            >
                <Title heading={5}>评论</Title>
                <BaseComment
                    visible={true}
                    onFinish={async (val) => {
                        await sxios.post("/comment/add", {
                            linkId: article.id,
                            content: val,
                            type: 1,
                        } as BlogComment);

                        setReloading((val) => !val);
                    }}
                />
            </Space>
        );
    }, [article.id]);

    const getArticleComment = useCallback(() => {
        return (
            <Space
                style={{width: "100%"}}
                vertical
                spacing={"medium"}
                align="start"
            >
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
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
                    author={cur_author}
                    loading={loading}
                />
            </Space>
        );
    }, [
        comments,
        page,
        pageSize,
        onPageChange,
        loading,
        selectedKey,
        cur_author,
    ]);

    return (
        <>
            <Space vertical spacing={"loose"} align="start">
                <div className={`white-back-box`}>{getArticleContent()}</div>
                <div id="basic-comment" className={`white-back-box`}>
                    {getCommentComponent()}
                </div>
                <div className={`white-back-box`}>{getArticleComment()}</div>
            </Space>
        </>
    );
}
