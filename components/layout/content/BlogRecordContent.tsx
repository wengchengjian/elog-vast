import {Skeleton, Timeline, Select, Space, List, Avatar, Collapse} from '@douyinfe/semi-ui';
import SmallComponent from '../../base/SmallComponent';
import {IconClock} from '@douyinfe/semi-icons';
import ArticleTimeLine from '../../business/ArticleTimeLine';
import {Article, ArticleRecords} from '@/types/article';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {TransformItemFormat, TransformTimeMapType} from '@/utils';
import useSWR from 'swr';
import ArticlePlaceHolder from '@@/business/ArticlePlaceHolder';
import useRequest from '@/hooks/useRequest';
import {RecordPageProps} from "@/pages/record";
import {InfiniteLoader, AutoSizer, IndexRange} from 'react-virtualized';
import VList from 'react-virtualized/dist/commonjs/List';
import {sxios} from "@/request/server";
import moment from "moment";
import {ar} from "date-fns/locale";
import styles from "@/styles/timeline.module.css";
import {useRouter} from "next/router";

const Option = Select.Option;

export const TypeToCh = {
    month: '月',
    year: '年',
    day: '日',
};

export default function BlogRecordContent() {

    const router = useRouter();

    const [type, setType] = useState<TransformTimeMapType>('month');

    const handleTypeChange = (value: any) => {
        setType(value as TransformTimeMapType);
    };

    const [loadingRowCount, setLoadingRowCount] = useState(0);

    const [loading, setLoading] = useState(false);

    const [date, setSelectDate] = useState('');

    const statusLoading = 0;

    const statusLoaded = 0;

    const [loadedRowsMap, setLoadingRowMap] = useState<number[]>([])

    const [recordArticles, setRecords] = useState<ArticleRecords[]>([]);

    const [articles, setArticles] = useState<Map<string, Article[]>>(new Map<string, Article[]>());

    // useEffect(() => {
    //     if (date) {
    //         console.log(articles)
    //         handleInfiniteOnLoad({startIndex: 1, stopIndex: 10}, 100)
    //     }
    // }, [date])

    // 统计归档数据
    useEffect(() => {
        sxios.get("/article/records", {params: {type}}).then(res => {
            setRecords(res as unknown as ArticleRecords[])
        })
    }, [type]);

    const fetchData = useCallback(async (start: number, end: number) => {
        const newArticles: Article[] = await sxios.get("/article/queryRecordArticle", {
            params: {
                type,
                start,
                end,
                date: transformDate(date)
            }
        })
        let newData = (articles.get(date ?? moment().format("yyyy-MM")) ?? []).concat(newArticles);
        articles.set(date ?? moment().format("yyyy-MM"), newData);
        const increment = end - start + 1;
        for (let i = start; i <= end; i++) {
            loadedRowsMap[i] = statusLoaded;
        }
        setLoadingRowCount(loadingRowCount - increment);
        setLoadingRowMap([...loadedRowsMap]);
        setArticles(structuredClone(articles));

    }, [articles, date, loadedRowsMap, loadingRowCount, type]);

    const transformDate = useCallback((datetime: string) => {
        if (type === 'month') {
            let month = datetime.split('-').map(item => parseInt(item));
            if(month[1] !== 0) {
                month[1]-=1
            }
            return moment(month.concat([1])).format('yyyy-MM-DD')
        } else if (type === 'year') {
            return moment(datetime.split('-').map(item => parseInt(item)).concat([0, 1])).format('yyyy-MM-DD')
        } else {
            return datetime;
        }
    }, [type]);

    const handleInfiniteOnLoad = useCallback(async ({startIndex, stopIndex}: IndexRange, loadLimit: number) => {
        const increment = stopIndex - startIndex + 1;
        if (stopIndex >= loadLimit || loadingRowCount > 0) {
            return;
        }
        for (let i = startIndex; i <= stopIndex; i++) {
            loadedRowsMap[i] = statusLoading;
        }
        setLoadingRowCount(loadingRowCount + increment);

        return fetchData(startIndex, stopIndex);
    }, [fetchData, loadedRowsMap, loadingRowCount]);

    const isRowLoaded = useCallback(({index}: { index: number }) => {
        return !!loadedRowsMap[index];
    }, [loadedRowsMap]);

    const renderItem = useCallback(({index, key, style}: {
        index: number,
        key: string,
        style: React.CSSProperties
    }) => {
        const item = (articles.get(date ?? moment().format("yyyy-MM")) ?? [])[index];
        if (!item) {
            return;
        }
        const content = (
            <List.Item
                key={key}
                style={{...style}}
                main={
                    <div style={{
                        cursor: "pointer",
                    }} onClick={() => {
                        router.push(`/article/${item.id}`);
                    }}>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <span style={{color: 'var(--semi-color-text-0)', fontWeight: 500}}>{item.title}</span>
                            <span style={{color: 'var(--semi-color-text-0)', fontWeight: 500}}>{moment(item.createTime).format('yyyy-MM-DD')}</span>
                        </div>
                        <p style={{color: 'var(--semi-color-text-2)', margin: '4px 0'}}>
                            {item.description}
                        </p>
                    </div>
                }
            />
        );
        return content;
    }, [articles])
    return (
        <>
            <SmallComponent
                title={
                    <Space>
                        <IconClock/>
                        <span style={{marginLeft: 5}}>时间轴({TypeToCh[type]})</span>
                        <Select
                            defaultValue={'month'}
                            onChange={(value) => handleTypeChange(value)}
                        >
                            <Option value="month">月</Option>
                            <Option value="year">年</Option>
                        </Select>
                    </Space>
                }
                align="start"
                style={{width: '100%'}}
                content={
                    <Timeline>
                        <Collapse accordion>
                            {recordArticles.map((record) => {
                                return (
                                    <Timeline.Item key={record.archiveDate.toString()}
                                                   onClick={() => setSelectDate(record.archiveDate)}>
                                        <Collapse.Panel
                                            header={
                                                <Space>
                                                    <span>{record.archiveDate}</span>
                                                    <span style={{color: '#bc84a8'}}>({record?.total ?? 0})</span>
                                                </Space>
                                            }
                                            itemKey={record.archiveDate}
                                        >
                                            <List
                                                style={{border: '1px solid var(--semi-color-border)', padding: 10}}>
                                                <InfiniteLoader
                                                    isRowLoaded={isRowLoaded}
                                                    loadMoreRows={(range: IndexRange) => handleInfiniteOnLoad(range, record?.total ?? 0)}
                                                    rowCount={record?.total ?? 0}
                                                >
                                                    {({onRowsRendered, registerChild}) => (
                                                        <AutoSizer disableHeight>
                                                            {({width}) => (
                                                                <VList
                                                                    ref={registerChild}
                                                                    height={500}
                                                                    onRowsRendered={onRowsRendered}
                                                                    rowCount={record?.total ?? 0}
                                                                    rowHeight={118}
                                                                    rowRenderer={renderItem}
                                                                    width={width}
                                                                />
                                                            )}
                                                        </AutoSizer>
                                                    )}
                                                </InfiniteLoader>
                                            </List>
                                        </Collapse.Panel>
                                    </Timeline.Item>
                                );
                            })}
                        </Collapse>
                    </Timeline>
                }
            ></SmallComponent>
        </>
    );
}
