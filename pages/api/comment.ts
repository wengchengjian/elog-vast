import { BlogComment } from '@/types/comment';
import { SysUser } from '@/types/user';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Article } from "../../types/article";
import { Category } from "../../types/Category";
import { Tag } from "../../types/Tag";
import { Response } from "../../types";
import { wait } from '@/utils';
import Mock from "mockjs"
import { user } from './user';
import { generate as generateUser } from './user';
const Random = Mock.Random;


export function generate(type: number, linkId: string, replyTo?: SysUser) {
  return Mock.mock({
    id: Random.id(),
    content: Random.cparagraph(2, 4),
    replyTo: replyTo ?? generateUser(),
    creator: generateUser(),
    children: [],
    territory: Random.city(true),
    type,
    linkId,
    createTime: Random.datetime(),
    updateTime: Random.datetime(),
  })
}




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<any>>
) {

  // await wait(3000);

  const comments: BlogComment[] = []

  // 生成四条主评论
  for (let i = 0; i < 4; i++) {
    comments.push(generate(1, "xxad"));
  }

  for (let comment of comments) {
    // 生成四条子评论
    for (let i = 0; i < 4; i++) {
      comment.children?.push(generate(1, "xxad", comment.creator));
    }

  }

  res.status(200).json({
    code: 0,
    msg: "成功",
    success: true,
    data: {
      total: 24,
      list: comments
    }
  })
}
