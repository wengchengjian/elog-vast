import { SysUser } from "./user";

export type BlogComment = {
  id: string;
  content: string;
  username: string;
  replyId: string;
  createNickname: string;
  createUserAvatar: string;
  replyToNickname: string;
  dislikeNum: number;
  type: number; // 1->文章评论 2->杂谈评论
  linkId: string; // 所关联的文章或者杂谈的id
  territory: string; // 回复的ip地域
  children?: BlogComment[]; // 子评论，只有顶级评论才有的属性
  likeNum: number;
  creator: SysUser;
  createTime: Date;
  updateTime: Date;
};

export type UserCommentLink = {
  id: string;
  type: number;
  userId: string; //
  commentId: string; //
  territory: string; // 回复的ip地域
  children?: BlogComment[]; // 子评论，只有顶级评论才有的属性
  likeNum: number;
  creator: SysUser;
  createTime: Date;
  updateTime: Date;
};
