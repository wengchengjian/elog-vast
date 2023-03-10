import BlogArticleItemDetailContent from "@/components/layout/content/BlogArticleItemDetailContent";
import BlogFooter from "@/components/layout/footer/BlogFooter";
import BlogHeader from "@@/layout/header/BlogHeader";
import MainLayout from "@/components/layout/MainLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Article } from "@/types/article";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Space } from "@douyinfe/semi-ui";
import MarkDownNav from "@/components/business/MarkDownNav";
import { Button } from "antd";
import styles from "@/styles/article.module.css";
import {
  IconLikeThumb,
  IconComment,
  IconDislikeThumb,
} from "@douyinfe/semi-icons";
import { useRouter } from "next/router";
import { sxios } from "@/request/server";
import { SysUser } from "@/types/user";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { curUserState, loginVisible, userArticleLinksState } from "@/store";
import { GOSSIP_BLOG_TOKEN_KEY, WINDOW_SIZE_MODE } from "@/constants";
import { defaultAuthor, isDisLike, isLike } from "@/utils";
import useWindowSize from "@/hooks/useWindowSize";

export type ArticleItemPageProps = {
  article: Article;
  cur_author: SysUser;
};

export const getServerSideProps: GetServerSideProps<
  ArticleItemPageProps
> = async (context) => {
  const article: Article = await sxios.get(
    `/v1/api/article/${context.query.id}`
  );
  const cur_author: SysUser =
    (await sxios.get(`/v1/api/user/queryAuthorByName/${article.author}`)) ??
    defaultAuthor(article.author ?? "未知");
  return {
    props: {
      article,
      cur_author,
    },
  };
};

export default function ArticleItemDetailPage({
  article,
  cur_author,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <MainLayout
        header={<BlogHeader />}
        footer={<BlogFooter />}
        content={
          <BlogArticleItemDetailContent
            article={article}
            cur_author={cur_author}
          />
        }
        leftSider={
          <ArticleItemDetailLeftSider
            article={article}
            cur_author={cur_author}
          />
        }
        rightSider={<ArticleItemDetailRightSider article={article} />}
      />
    </>
  );
}

export type ArticleItemDetailLeftSideProps = {
  article: Article;
  cur_author: SysUser;
};

export function ArticleItemDetailLeftSider({
  article,
  cur_author,
}: ArticleItemDetailLeftSideProps) {
  const router = useRouter();

  const [cur_article, setCurArticle] = useState(article);

  useEffect(() => {
    setCurArticle(article);
  }, [article]);

  const setLoginVisible = useSetRecoilState(loginVisible);
  const handleClickLike = useCallback(
    async (type: number) => {
      let token = localStorage.getItem(GOSSIP_BLOG_TOKEN_KEY);

      if (token) {
        await sxios.get(`/article/link/${article?.id}/${type}`);
      } else {
        setLoginVisible(true);
      }
    },
    [article, setLoginVisible]
  );

  const handleCancelLike = useCallback(
    async (type: number) => {
      let token = localStorage.getItem(GOSSIP_BLOG_TOKEN_KEY);

      if (token) {
        await sxios.delete(`/article/link/${article?.id}/${type}`);
      } else {
        setLoginVisible(true);
      }
    },
    [article, setLoginVisible]
  );

  const curUser = useRecoilValue(curUserState);
  const [userArticleLinks, setUserArticleLinks] = useRecoilState(
    userArticleLinksState
  );

  const handleClickComment = useCallback(() => {
    router.replace("#basic-comment");
  }, [router]);
  return (
    <>
      <Space
        style={{ height: "100%", width: "100%", position: "relative" }}
        vertical
        spacing={"loose"}
        align="end"
      >
        <Space vertical spacing={"loose"} className={styles["button-sticky"]}>
          <Button
            onClick={() => {
              if (!isLike(userArticleLinks, article.id)) {
                handleClickLike(1);
                let token = localStorage.getItem(GOSSIP_BLOG_TOKEN_KEY);
                if (token) {
                  setCurArticle((val) => ({
                    ...val,
                    likeNum: (val?.likeNum ?? 0) + 1,
                  }));
                  setUserArticleLinks((val) => {
                    if (!val.get(article.id)) {
                      val.set(article.id, []);
                    }
                    val.get(article.id)?.push(1);

                    return new Map(val);
                  });
                }
              } else {
                handleCancelLike(1);
                let token = localStorage.getItem(GOSSIP_BLOG_TOKEN_KEY);
                if (token) {
                  setCurArticle((val) => ({
                    ...val,
                    likeNum: (val?.likeNum ?? 0) - 1,
                  }));
                  setUserArticleLinks((val) => {
                    let index = val.get(article.id)?.indexOf(1) ?? -1;
                    if (index != -1) {
                      val.get(article.id)?.splice(index, 1);
                    }
                    return new Map(val);
                  });
                }
              }
            }}
            data-badge={cur_article.likeNum}
            className={styles["icon-button"]}
            icon={
              <>
                <IconLikeThumb
                  style={{
                    color: isLike(userArticleLinks, article.id)
                      ? "DeepSkyBlue"
                      : "",
                  }}
                  className={styles["sprite-icon"]}
                />
              </>
            }
          />
          <Button
            onClick={() => {
              if (!isDisLike(userArticleLinks, article.id)) {
                handleClickLike(0);
                let token = localStorage.getItem(GOSSIP_BLOG_TOKEN_KEY);

                if (token) {
                  setCurArticle((val) => ({
                    ...val,
                    dislikeNum: (val?.dislikeNum ?? 0) + 1,
                  }));
                  setUserArticleLinks((val) => {
                    if (!val.get(article.id)) {
                      val.set(article.id, []);
                    }
                    val.get(article.id)?.push(0);
                    return new Map(val);
                  });
                }
              } else {
                handleCancelLike(0);
                let token = localStorage.getItem(GOSSIP_BLOG_TOKEN_KEY);

                if (token) {
                  setCurArticle((val) => ({
                    ...val,
                    dislikeNum: (val?.dislikeNum ?? 0) - 1,
                  }));
                  setUserArticleLinks((val) => {
                    let index = val.get(article.id)?.indexOf(0) ?? -1;
                    if (index != -1) {
                      val.get(article.id)?.splice(index, 1);
                    }
                    return new Map(val);
                  });
                }
              }
            }}
            data-badge={cur_article.dislikeNum}
            className={styles["icon-button"]}
            icon={
              <>
                <IconDislikeThumb
                  style={{
                    color: isDisLike(userArticleLinks, article.id)
                      ? "DeepSkyBlue"
                      : "",
                  }}
                  className={styles["sprite-icon"]}
                />
              </>
            }
          />

          <Button
            onClick={handleClickComment}
            data-badge={cur_article.commentNum}
            className={styles["icon-button"]}
            icon={
              <>
                <IconComment className={styles["sprite-icon"]} />
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
  const size = useWindowSize();
  const visible = useMemo(() => {
    return size.width >= WINDOW_SIZE_MODE.lg;
  }, [size.width]);

  return (
    <>
      <Space
        style={{ height: "100%", display: visible ? "" : "none" }}
        vertical
        spacing={"loose"}
      >
        <MarkDownNav article={article} />
      </Space>
    </>
  );
}
