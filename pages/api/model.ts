// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs";
type Data = string[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let model: string[] = [];

  let files = fs.readdirSync('D:\\vsProject\\elog-vast\\public\\Resources');

  if (files && files.length !== 0) {
    model = files.filter((file) =>
      fs
        .statSync(`D:\\vsProject\\elog-vast\\public\\Resources\\${file}`)
        .isDirectory()
    );
  }
  res.status(200).json(model)
}
