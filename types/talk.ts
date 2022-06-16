import { SysUser } from '@/types/user';
export type Talk = {
  id: string;
  content: string;
  territory: string;
  views: number;
  createBy: SysUser;
  createTime: Date;
  updateTime: Date;
}