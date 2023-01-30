import {Skeleton, Timeline, Select, Space} from '@douyinfe/semi-ui';
import SmallComponent from '../../base/SmallComponent';
import {IconClock} from '@douyinfe/semi-icons';
import ArticleTimeLine from '../../business/ArticleTimeLine';
import {Article} from '@/types/article';
import {useMemo, useState} from 'react';
import {TransformTimeMapType} from '@/utils';
import useSWR from 'swr';
import ArticlePlaceHolder from '@@/business/ArticlePlaceHolder';
import useRequest from '@/hooks/useRequest';
import {RecordPageProps} from "@/pages/record";

const Option = Select.Option;

export const TypeToCh = {
    month: '月',
    year: '年',
    day: '日',
};

export default function BlogRecordContent({articles}: RecordPageProps) {
    const [type, setType] = useState<TransformTimeMapType>('month');

    const handleTypeChange = (value: any) => {
        setType(value as TransformTimeMapType);
    };

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
                    <ArticleTimeLine articles={articles ?? []} type={type}/>
                }
            ></SmallComponent>
        </>
    );
}
