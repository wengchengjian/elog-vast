import { SysUser } from "@/types/user";
import { useSetRecoilState } from "recoil";
import { sxios } from "@/request/server";
import { Article, UserArticleLink } from "@/types/article";
import { Moment } from "moment";
import TurndownService from "turndown";

import {
  DEFAULT_TOKEN_NAME,
  DEFAULT_USER_AVATAR,
  GOSSIP_BLOG_TOKEN_KEY,
  SERVER_ADDRESS,
} from "../constants";
import moment from "moment";
import { curUserState } from "@/store";
import { BlogComment, UserCommentLink } from "@/types/comment";
import { Random } from "mockjs";

export function isLike(map: Map<string, number[]>, linkId: string) {
  if (map.get(linkId)) {
    return map.get(linkId).includes(1);
  }
  return false;
}
export function isDisLike(map: Map<string, number[]>, linkId: string) {
  if (map.get(linkId)) {
    return map.get(linkId).includes(0);
  }
  return false;
}

export function isView(map: Map<string, number[]>, linkId: string) {
  if (map.get(linkId)) {
    return map.get(linkId).includes(2);
  }
  return false;
}

export const turndownService = new TurndownService();

export function defaultAuthor(name: string) {
  return {
    id: Random.id(),
    nickname: name,
    username: name,
    avatar: "https://joeschmoe.io/api/v1/random",
    description: Random.paragraph(),
    post: "职位填充",
    email: Random.email(),
    articleNum: 0,
    readNum: 0,
    likeNum: 0,
  } as SysUser;
}

export async function initUser() {
  if (typeof window !== "undefined") {
    let token = localStorage.getItem(GOSSIP_BLOG_TOKEN_KEY);
    if (token) {
      const curUser: SysUser = await sxios.get("/v2/api/user/current");
      const userArticleLinks: Map<string, number> = await sxios.get(
        "/article/link"
      );
      const userCommentLinks: Map<string, number> = await sxios.get(
        "/comment/link"
      );
      return {
        curUser,
        userArticleLinks,
        userCommentLinks,
      };
    }
  }
}

export function Num2ToStr(num: number) {
  if (num < 10000) {
    return "" + num;
  } else {
    return (num / 10000).toFixed(2) + "w";
  }
}

export function getServerImage(uri: string) {
  if (!uri) {
    uri = DEFAULT_USER_AVATAR;
  }
  return uri.startsWith("http") ? uri : SERVER_ADDRESS + uri;
}

export function setToken(token: string) {
  localStorage.setItem(DEFAULT_TOKEN_NAME, token);
}

export function getToken() {
  return localStorage.getItem(DEFAULT_TOKEN_NAME);
}

export function formatDate(date: Date) {
  return;
}

export async function wait(time: number) {
  return new Promise((resolve) => setTimeout(() => resolve(null), time));
}

export type TransformTimeMapType = "month" | "day" | "year";

export const TransformFormat = {
  month: "YYYY-MM",
  day: "YYYY-MM-DD",
  year: "YYYY",
};

export const TransformItemFormat = {
  month: "MM-DD",
  day: "DD HH:mm:ss",
  year: "YYYY-MM",
};

export function transformToTimeMap(
  articles: Article[],
  type: TransformTimeMapType
) {
  const timeMap = new Map<string, Article[]>();
  articles.forEach((article) => {
    const oldTIme = moment(article.createTime);
    const time = oldTIme.format(TransformFormat[type]);
    if (timeMap.has(time)) {
      timeMap.get(time)?.push(article);
    } else {
      timeMap.set(time, [article]);
    }
  });
  return timeMap;
}
