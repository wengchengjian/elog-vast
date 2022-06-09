// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Article} from "../../types/article";
import {Category} from "../../types/Category";
import {Tag} from "../../types/Tag";
import {Response} from "../../types";

const articleTag:Tag[] = [
    {
        id: "asaaaaaaaasaa",
        name: "Java",
        description: "adAs a",
        createTime: new Date(),
        updateTime: new Date(),
    }
        ,
    {
        id: "asaaaadaaaaaa",
        name: "Spring",
        description: "adAs a",
        createTime: new Date(),
        updateTime: new Date(),
    },
    {
        id: "asaasdaaaaaaaaa",
        name: "Mybatis",
        description: "adAs a",
        createTime: new Date(),
        updateTime: new Date(),
    }
]

const articleCategory: Category =
    {
        id: "asaaaaaaaaasada",
        name: "后端",
        description: "adAases a",
        createTime: new Date(),
        updateTime: new Date(),
    }


export const articles:Article[] = [1,2,3,4,5,6,7,8,9].map(item=>{
    return {
        id: "asdasd42asda" + item,
        title: "【后端-Spring】一、初识Spring中核心知识点"+item,
        description: "光看这三行代码，其实并不能体现出来Spring的强大之处，也不能理解为什么需要ClassPathXmlApplicationCon" +
            "text和getBean()方法，随着课程的深入将会改变你此时的观念，而对于上面的这些疑问，也会随着课程深入逐步得到解决。对于这三行代码，" +
            "你现在可以认为：如果你要用Spring，你就得这么写。就像你要用Mybatis，你就得写各种Mapper接口。光看这三行代码，其实并不能体现出来Spring的强大之处，也不能理解为什么需要ClassPathXmlApplicationCon" +
            "text和getBean()方法，随着课程的深入将会改变你此时的观念，而对于上面的这些疑问，也会随着课程深入逐步得到解决。对于这三行代码，" +
            "你现在可以认为：如果你要用Spring，你就得这么写。就像你要用Mybatis，你就得写各种Mapper接口。"+item,
        img: "https://bing.ioliu.cn/v1/rand?w=200&h=100",
        content: "Asdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadadsaddddddddddddddddddddd",
        category: articleCategory,
        tags: articleTag,
        readNum: item,
        likeNum: item,
        commentNum: item,
        createTime:new Date(),
        updateTime:new Date(),
    }
})

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response<Article[]>>
) {
    res.status(200).json({
        code:0,
        msg:"成功",
        success:true,
        data: articles
    })
}
