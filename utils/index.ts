import { Moment } from "moment";
import { DEFAULT_TOKEN_NAME } from "../constants";

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