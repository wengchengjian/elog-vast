import { Category } from '@/types/Category';

import { v4 as uuidv4 } from 'uuid';

export const categories: Category[] = [
  {
    id: uuidv4(),
    name: "前端",
    description: "前端大杂烩",
    createTime: new Date(),
    updateTime: new Date(),
  },
  {
    id: uuidv4(),
    name: "后端",
    description: "后端大杂烩",
    createTime: new Date(),
    updateTime: new Date(),
  },
  {
    id: uuidv4(),
    name: "Java",
    description: "Java大杂烩",
    createTime: new Date(),
    updateTime: new Date(),
  },
  {
    id: uuidv4(),
    name: "Go",
    description: "Go大杂烩",
    createTime: new Date(),
    updateTime: new Date(),
  },
  {
    id: uuidv4(),
    name: "Rust",
    description: "Rust大杂烩",
    createTime: new Date(),
    updateTime: new Date(),
  },
  {
    id: uuidv4(),
    name: "开发工具",
    description: "开发工具大杂烩",
    createTime: new Date(),
    updateTime: new Date(),
  },
  {
    id: uuidv4(),
    name: "iOS",
    description: "iOS大杂烩",
    createTime: new Date(),
    updateTime: new Date(),
  },
  {
    id: uuidv4(),
    name: "代码人生",
    description: "代码闲聊",
    createTime: new Date(),
    updateTime: new Date(),
  },
  {
    id: uuidv4(),
    name: "人工智能",
    description: "人工智能",
    createTime: new Date(),
    updateTime: new Date(),
  },
] 