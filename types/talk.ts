import { SysUser } from '@/types/user';
import { BlogComment } from './comment';
export type Talk = {
  id: string;
  content: string;
  territory: string;
  views: number;
  likes: number;
  comments: BlogComment[];
  commentsNum: number;
  shares: number;
  createBy: SysUser;
  createTime: Date;
  updateTime: Date;
}