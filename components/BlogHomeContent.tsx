import {List, Pagination} from "@douyinfe/semi-ui";
import { Tabs, TabPane } from '@douyinfe/semi-ui';
import {useEffect, useMemo, useState} from "react";
import useSWR from "swr";
import Image from "next/image";
import ArticleView from "./ArticleView";
import styles from "../styles/article.module.css";
/**
 * Tab栏切换时，客户端渲染数据
 * @constructor
 */

const tabs = [
    {
        tab:"最新文章",
        itemKey:"recentCreateArticle"
    },
    {
        tab:"热门文章",
        itemKey:"hotArticle"
    },
    {
        tab:"最近更新",
        itemKey:"recentUpdateArticle"
    },
    {
        tab:"最多点赞",
        itemKey:"mostLikeArticle"
    }
];

const pageSizeOpts = [5,10,20,40,100];

export default function BlogHomeContent (){
    const [pageSize,setPageSize] = useState(5);

    const [page,setPage] = useState(1)

    const [selectedKey,setSelectedKey] = useState("recentCreateArticle");

    const {data,error} = useSWR(`/api/article?type=${selectedKey ?? "recentCreateArticle"}&page=${page}&pageSize=${pageSize}`);

    if(error){
        return <div>暂无数据</div>
    }

    const getArticleList = ()=>{
        return <>
            <List dataSource={data ?? []} renderItem={(item)=>{
                return <List.Item align={"flex-start"} key={item.id} className={`${styles.article_item} white-back-box`}
                                  header={<div className={styles.article_img}><Image  src={item.img} width={250}  height={150} alt="picture of the article" /></div>}
                                  main={<ArticleView article={item} />}/>
            }}/>
            <Pagination showTotal showSizeChanger showQuickJumper  style={{ width: '100%', flexBasis: '100%', justifyContent: 'center' }}
                        pageSize={pageSize} total={200}
                        currentPage={page} onChange={cPage => onPageChange(cPage)}
                        onPageSizeChange={onPageSizeChange}
                        pageSizeOpts={pageSizeOpts}/>
        </>
    }
    const onPageSizeChange = (pageSize:number)=>{
        setPageSize(pageSize);
    }

    const onPageChange = (page:number)=>{
        setPage(page);
    }

    const handleTabChange = (key:string)=>{
        setSelectedKey(key);
    }

    return <>
        <div>
            <Tabs lazyRender keepDOM={false} type={"line"} onChange={handleTabChange}>
                {
                    tabs.map((item)=>{
                        return <TabPane tab={item.tab} itemKey={item.itemKey} key={item.itemKey}>
                            {
                                getArticleList()
                            }
                        </TabPane>
                    })
                }
            </Tabs>
        </div>
    </>
}