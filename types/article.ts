import { SysUser } from "@/types/user";
import { Category } from "./Category";
import { Tag } from "./Tag";

export type Article = {
  id: string;
  title: string;
  description?: string;
  img?: string;
  content: string;
  contentFormat: string;
  category: Category;
  author: string;
  tags?: string;
  readNum?: number;
  likeNum?: number;
  commentNum?: number;
  dislikeNum?: number;
  createTime: Date;
  updateTime: Date;
};

export type UserArticleLink = {
  id: string;
  userId: string;
  articleId: string;
  type: number;
};


export type ArticleRecords = {
  archiveDate: string;

  total: number;
}