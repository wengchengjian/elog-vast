import { SysUser } from "./user";

export type BlogComment = {
  id: string;
  content: string;
  replyTo: SysUser; // 给谁回复，给admin回复则是顶级评论
  type: number; // 1->文章评论 2->杂谈评论
  linkId: string;// 所关联的文章或者杂谈的id
  territory: string;// 回复的ip地域
  children?: BlogComment[]; // 子评论，只有顶级评论才有的属性
  likeNum: number;
  creator: SysUser;
  createTime: Date;
  updateTime: Date;
}