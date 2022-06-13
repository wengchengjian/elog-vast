import { SysUser } from "./user";

export type BlogComment = {
  id: string;
  content: string;
  replyTo: string;
  level: number;
  creator: SysUser;
  createTime: Date;
  updateTime: Date;
}