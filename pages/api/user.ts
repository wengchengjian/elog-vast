import moment from 'moment';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { SysUser } from "../../types/user";

export const user: SysUser = {
  id: "1454546764474",
  username: "wengchengjian",
  readNum: 12442524,
  articleNum: 425,
  likeNum: 75457,
  email: "473991883@qq.com",
  post: "Java开发工程师",
  clockInDate: ["2022-6-8", "2022-6-9", "2022-6-10", "2022-6-7"],
  description: "真打算大声道阿萨德收到阿阿萨德收到阿萨德按时打算算大声道阿萨德收到阿" +
    "阿萨德收到阿萨德按时打算打萨德按时打阿萨德收撒大声地到阿萨德按时打算打算打阿萨德收到阿萨德打萨德按" +
    "时打阿萨德收撒大声地到阿萨德按时算大声道阿萨德收到阿阿萨德收到阿萨德按时打算打萨德按时打阿萨德收撒大声地到阿萨" +
    "德按时打算打算打阿萨德收到阿萨德打算打算打阿萨德收到阿萨德按时打算打算。"

}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SysUser>
) {
  res.status(200).json(user)
}


