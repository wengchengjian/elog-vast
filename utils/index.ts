import { articles } from './../pages/api/article';
import { Article } from "@/types/article";
import { Moment } from "moment";
import { DEFAULT_TOKEN_NAME } from "../constants";
import moment from 'moment';

export function Num2ToStr(num: number) {
  if (num < 10000) {
    return '' + num;
  } else {
    return ((num / 10000).toFixed(2)) + 'w';
  }
}

export function setToken(token: string) {
  localStorage.setItem(DEFAULT_TOKEN_NAME, token);
}

export function getToken() {
  return localStorage.getItem(DEFAULT_TOKEN_NAME);
}

export function formatDate(date: Date) {
  return
}

export async function wait(time: number) {
  return new Promise(resolve => setTimeout(() => resolve(null), time))
}

export type TransformTimeMapType = "month" | "day" | "year";

export const TransformFormat = {
  "month": "YYYY-MM",
  "day": "YYYY-MM-DD",
  "year": "YYYY"
}

export const TransformItemFormat = {
  "month": "MM-DD",
  "day": "DD HH:mm:ss",
  "year": "YYYY-MM"
}

export function transformToTimeMap(articles: Article[], type: TransformTimeMapType) {
  const timeMap = new Map<string, Article[]>();
  articles.forEach(article => {
    const oldTIme = moment(article.createTime);
    const time = oldTIme.format(TransformFormat[type])
    if (timeMap.has(time)) {
      timeMap.get(time)?.push(article);
    } else {
      timeMap.set(time, [article]);
    }
  });
  return timeMap;
}