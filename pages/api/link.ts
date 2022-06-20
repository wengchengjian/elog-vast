// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Link } from "@/types/link";
import { Category } from "@/types/Category";
import { Tag } from "@/types/Tag";
import { Response } from "@/types";
import { wait } from '@/utils';
import Mock from "mockjs"

const Random = Mock.Random;


export function generate() {
  return Mock.mock({
    "id": Random.id(),
    "content": Random.paragraph(16, 64),
    name:Random.name(),
    address:Random.url(),
    logo:"https://bing.ioliu.cn/v1/rand?w=300&h=400",
    description:Random.cparagraph(2,4),
    "createTime": Random.datetime(),
    "updateTime": Random.datetime(),
  })
}

export const links: any[] = []


for (let i = 0; i < 20; i++) {
  links.push(generate());
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<any>>
) {

  // await wait(3000);

  res.status(200).json({
    code: 0,
    msg: "成功",
    success: true,
    data: {
      total: 26,
      list: links,
    }
  })
}
