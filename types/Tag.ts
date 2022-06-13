import { TagColor } from "@douyinfe/semi-ui/tag/interface";

export type Tag = {
  id: string;
  name: string;
  description?: string;
  color?: TagColor;
  createTime?: Date;
  updateTime?: Date;
}