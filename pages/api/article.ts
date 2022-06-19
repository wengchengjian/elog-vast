// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Article } from "../../types/article";
import { Category } from "../../types/Category";
import { Tag } from "../../types/Tag";
import { Response } from "../../types";
import { wait } from '@/utils';
import Mock from "mockjs"
import { user } from './user';

const Random = Mock.Random;

const markdown = `

# A demo of \`react-markdown\`
## Table of Content
\`react-markdown\` is a markdown component for React.

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using \`dangerouslySetInnerHTML\`
* Lets you define your own components (to render \`MyHeading\` instead of \`h1\`)
* Has a lot of plugins

## Table of contents

Here is an example of a plugin in action
([\`remark-toc\`](https://github.com/remarkjs/remark-toc)).
This section is replaced by an actual table of contents.

## Syntax highlighting

Here is an example of a plugin to highlight code:
[\`rehype-highlight\`](https://github.com/rehypejs/rehype-highlight).

\`\`\`js
import React from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

ReactDOM.render(
  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{'# Your markdown here'}</ReactMarkdown>,
  document.querySelector('#content')
)
\`\`\`

Pretty neat, eh?

## GitHub flavored markdown (GFM)

For GFM, you can *also* use a plugin:
[\`remark-gfm\`](https://github.com/remarkjs/react-markdown#use).
It adds support for GitHub-specific extensions to the language:
tables, strikethrough, tasklists, and literal URLs.

These features **do not work by default**.
👆 Use the toggle above to add the plugin.

| Feature    | Support              |
| ---------: | :------------------- |
| CommonMark | 100%                 |
| GFM        | 100% w/ \`remark-gfm\` |

~~strikethrough~~

* [ ] task list
* [x] checked item

https://example.com

## HTML in markdown

⚠️ HTML in markdown is quite unsafe, but if you want to support it, you can
use [\`rehype-raw\`](https://github.com/rehypejs/rehype-raw).
You should probably combine it with
[\`rehype-sanitize\`](https://github.com/rehypejs/rehype-sanitize).

<blockquote>
  👆 Use the toggle above to add the plugin.
</blockquote>

## Components

You can pass components to change things:

\`\`\`js
import React from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown'
import MyFancyRule from './components/my-fancy-rule.js'

ReactDOM.render(
  <ReactMarkdown
    components={{
      // Use h2s instead of h1s
      h1: 'h2',
      // Use a component instead of hrs
      hr: ({node, ...props}) => <MyFancyRule {...props} />
    }}
  >
    # Your markdown here
  </ReactMarkdown>,
  document.querySelector('#content')
)
\`\`\`

## More info?

Much more info is available in the
[readme on GitHub](https://github.com/remarkjs/react-markdown)!

***

A component by [Espen Hovlandsdal](https://espen.codes/)
`;

export function generate() {
  return Mock.mock({

    "id": Random.id(),
    "title": Random.title(4, 16),
    "description": Random.paragraph(16, 64),
    "img": "https://bing.ioliu.cn/v1/rand?w=1200&h=600",
    "content": markdown,
    "author": user,
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
    "readNum": Random.integer(0, 1247),
    "likeNum": Random.integer(0, 1247),
    "commentNum": Random.integer(0, 1247),
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
  res: NextApiResponse<Response<any>>
) {
  // await wait(3000);

  res.status(200).json({
    code: 0,
    msg: "成功",
    success: true,
    data: {
      total: 42,
      list: articles
    }
  })
}
