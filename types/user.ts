import { BlogComment } from "./comment";

export type SysUser = {
  id: string;
  username: string;
  nickname: string;
  avatar?: string;
  description?: string;
  post?: string;
  email?: string;
  phone?: string;
  clockInDate?: string[];
  articleNum?: number;
  readNum?: number;
  likeNum?: number;
  recentComments?: BlogComment[];
}