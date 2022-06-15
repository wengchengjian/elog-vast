// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Article } from "../../types/article";
import { Category } from "../../types/Category";
import { Tag } from "../../types/Tag";
import { Response } from "../../types";
import { wait } from '@/utils';
import Mock from "mockjs"

const Random = Mock.Random;


export function generate() {
  return Mock.mock({

    "id": Random.id(),
    "title": Random.title(4, 16),
    "description": Random.paragraph(16, 64),
    "img": "https://bing.ioliu.cn/v1/rand?w=200&h=100",
    "content": Random.paragraph(16, 64),
    "category": {
      "id": Random.id(),
      "name": Random.name(),
      "description": Random.paragraph(16, 64),
      "createTime": Random.datetime(),
      "updateTime": Random.datetime(),
    },
    "tags|1-2": [
      {
        "id": Random.id(),
        "name": Random.name(),
        "description": Random.paragraph(16, 64),
        "color": Random.color(),
        "createTime": Random.datetime(),
        "updateTime": Random.datetime(),
      }
    ],
    "readNum|+1": 1,
    "likeNum|+1": 1,
    "commentNum|+1": 1.,
    "createTime": Random.datetime(),
    "updateTime": Random.datetime(),
  })
}

export const articles: any[] = []


for (let i = 0; i < 20; i++) {
  articles.push(generate());
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<Article[]>>
) {

  await wait(3000);

  res.status(200).json({
    code: 0,
    msg: "成功",
    success: true,
    data: articles
  })
}
