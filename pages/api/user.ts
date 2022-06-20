import moment from 'moment';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { SysUser } from "../../types/user";
import Mock from "mockjs"

const Random = Mock.Random;


export function generate() {
  return Mock.mock({
    id: Random.id(),
    username: Random.name(),
    nickname: Random.cname(),
    readNum: Random.integer(0, 121121214),
    avatar: "https://bing.ioliu.cn/v1/rand?w=200&h=100",
    articleNum: Random.integer(0, 121121214),
    likeNum: Random.integer(0, 121121214),
    email: Random.email(),
    post: "Java开发工程师",
    clockInDate: ["2022-6-8", "2022-6-9", "2022-6-10", "2022-6-7"],
    description: Random.cparagraph(3, 6)
  });
}

export const user: SysUser = generate();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SysUser>
) {
  res.status(200).json(user)
}


