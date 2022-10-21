// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Article } from "../../types/article";
import { Category } from "../../types/Category";
import { Tag } from "../../types/Tag";
import { Response } from "../../types";
import { wait } from "@/utils";
import Mock from "mockjs";
import { user } from "./user";

const Random = Mock.Random;

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
      total: 42,
    },
  });
}
