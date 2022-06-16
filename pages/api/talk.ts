// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Talk } from "../../types/article";
import { Category } from "../../types/Category";
import { Tag } from "../../types/Tag";
import { Response } from "../../types";
import { wait } from '@/utils';
import Mock from "mockjs"

const Random = Mock.Random;


export function generate() {
  return Mock.mock({
    "id": Random.id(),
    "content": Random.paragraph(16, 64),
    territory: Random.city(true),
    views: Random.integer(1, 100),
    createBy: {
      id: Random.id(),
      username: Random.name(),
      nickname: Random.name(),
      avatar: Random.image('200x100'),
      description: Random.paragraph(16, 64),
      post: "Java开发工程师",
      email: Random.email(),
    },
    "createTime": Random.datetime(),
    "updateTime": Random.datetime(),
  })
}

export const talks: any[] = []


for (let i = 0; i < 20; i++) {
  talks.push(generate());
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<Talk[]>>
) {

  await wait(3000);

  res.status(200).json({
    code: 0,
    msg: "成功",
    success: true,
    data: talks
  })
}
