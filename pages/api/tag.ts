import { NextApiRequest, NextApiResponse } from "next";
import { Tag } from "../../types/Tag";

export const tags: Tag[] = [
  { id: 'java', name: 'java' },
  { id: 'javscript', name: 'javscript' },
  { id: 'C', name: 'C' },
  { id: 'C++', name: 'C++' },
  { id: 'fe', name: '前端' },
  { id: 'React', name: 'React' },
  { id: 'Vue', name: 'Vue' },
  { id: 'redux', name: 'redux' },
  { id: 'writing', name: '写作' },
  { id: 'programmer', name: '程序员' },
  { id: 'programme', name: '编程' },
]

export type TagResponse = {
  tags: Tag[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TagResponse>
) {
  res.status(200).json({ tags })
}
