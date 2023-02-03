import { Article } from '@/types/article';
import {
  TransformFormat,
  TransformItemFormat,
  TransformTimeMapType,
  transformToTimeMap,
} from '@/utils';
import { Collapse, Space, Timeline } from '@douyinfe/semi-ui';
import moment from 'moment';
import { useMemo, useState } from 'react';
import styles from '@/styles/timeline.module.css';
import { useRouter } from 'next/router';
import { List, Avatar } from '@douyinfe/semi-ui';
import { InfiniteLoader, AutoSizer } from 'react-virtualized';
import VList from 'react-virtualized/dist/commonjs/List';

export type ArticleTimeLineProps = {
  articles: Article[];
  type: TransformTimeMapType;
};

export default function ArticleTimeLine({
  articles,
  type,
}: ArticleTimeLineProps) {
  const router = useRouter();

  const timeLines = useMemo(() => {
    return transformToTimeMap(articles, type);
  }, [type, articles]);

  const handleClickTimelineItem = (id: string) => {
    // 跳转到文章详情页
    router.push({
      pathname: `/article/${id}`,
    });
  };

  const fetchData = (startIndex:number, stopIndex:number) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        let dataSource = this.data.slice(startIndex, stopIndex + 1);
        res(dataSource);
      }, 1000);
    }).then(dataSource => {
      let newData = [...this.state.dataSource, ...dataSource];
      const { loadedRowsMap, loadingRowCount } = this.state;
      const increment = stopIndex - startIndex + 1;
      for (let i = startIndex; i <= stopIndex; i++) {
        loadedRowsMap[i] = this.statusLoaded;
      }
      this.setState({
        dataSource: newData,
        loadedRowsMap,
        loadingRowCount: loadingRowCount - increment,
      });
    });
  };

  const handleInfiniteOnLoad = ({ startIndex, stopIndex }:{startIndex:number, stopIndex:number}) {
    let { dataSource, loadedRowsMap, loadingRowCount } = this.state;
    const increment = stopIndex - startIndex + 1;
    if (stopIndex >= this.loadLimit || loadingRowCount > 0) {
      return;
    }
    for (let i = startIndex; i <= stopIndex; i++) {
      loadedRowsMap[i] = this.statusLoading;
    }
    this.setState({
      loadingRowCount: loadingRowCount + increment,
    });
    return this.fetchData(startIndex, stopIndex);
  }

  return (
    <>

    </>
  );
}
