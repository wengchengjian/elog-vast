import { SysUser } from "@/types/user";
import { Category } from "./Category";
import { Tag } from "./Tag";

export type Article = {
  id: string;
  title: string;
  description?: string;
  img?: string;
  content: string;
  category: Category;
  author: SysUser;
  tags?: Tag[];
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
