import { Talk } from '@/types/talk';
import ReactMarkDown from 'react-markdown';
import markGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import dynamic from 'next/dynamic';
import { Avatar, Col, Row, Select, Space, Typography } from '@douyinfe/semi-ui';
import moment from 'moment';
import Image from 'next/image';
import remarkToc from 'remark-toc';
import { useCallback, useMemo, useState } from 'react';
import rehypeRaw from 'rehype-raw';
import BaseComment from '@/components/base/BaseComment';
import CommentListContent from '@/components/business/CommentListContent';
import usePage from '@/hooks/usePage';
import useRequest from '@/hooks/useRequest';

export type BlogTalkItemDetailContentProps = {
  talk: Talk;
};

const { Paragraph, Title, Text } = Typography;

export default function BlogTalkItemDetailContent({
  talk,
}: BlogTalkItemDetailContentProps) {
  const [commentValue, setComment] = useState('');
  /**
   * 1->最新,2->最热,默认最新
   */
  const [selectedKey, setSelectedKey] = useState('1');

  const { page, pageSize, setPage, setPageSize } = usePage();

  const handleTabChange = (key: string) => {
    setSelectedKey(key);
  };

  const onPageChange = useCallback((page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  }, []);

  const { data, error, loading } = useRequest(
    `/api/comment?selectedKey=${selectedKey}&linkId=${
      talk.id
    }&type=${2}&page=${page}&pageSize=${pageSize}`
  );

  const getTalkContent = useCallback(() => {
    return (
      <Space vertical spacing={'loose'} align="start">
        <Space>
          <Avatar src={talk.createBy.avatar}></Avatar>
          <Space vertical align="start">
            <div>
              <Text>{talk.createBy.nickname}</Text>
              <span className="ip_style">IP: {talk.territory}</span>
            </div>
            <span style={{ fontSize: '14px', fontWeight: '300' }}>
              <span>
                {moment(talk.createTime).format('yyyy年MM月DD日 HH:mm')}
              </span>
              &nbsp;·&nbsp;
              <span>浏览{talk.views}</span>
            </span>
          </Space>
        </Space>

        <div>
          <Paragraph
            ellipsis={{
              rows: 6,
              expandable: true,
              collapsible: true,
              collapseText: '折叠我吧',
              onExpand: (bool, e) => console.log(bool, e),
            }}
          >
            {talk.content}
          </Paragraph>
        </div>
      </Space>
    );
  }, [talk]);

  const getCommentComponent = useCallback(() => {
    return (
      <Space
        style={{ width: '100%' }}
        vertical
        spacing={'medium'}
        align="start"
      >
        <Title heading={5}>评论</Title>
        <BaseComment
          value={commentValue}
          onChange={(val) => setComment(val)}
          onFinish={() => {}}
        />
      </Space>
    );
  }, [commentValue]);

  const getTalkComment = useCallback(() => {
    return (
      <Space
        style={{ width: '100%' }}
        vertical
        spacing={'medium'}
        align="start"
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Title heading={5}>全部评论</Title>
          <Select
            defaultValue={selectedKey}
            onChange={(val) => setSelectedKey(val)}
          >
            <Select.Option value="1">最新</Select.Option>
            <Select.Option value="2">最热</Select.Option>
          </Select>
        </div>
        <CommentListContent
          page={page}
          total={data?.total ?? 0}
          pageSize={pageSize}
          onPageChange={onPageChange}
          data={data?.list ?? []}
          loading={loading}
        />
      </Space>
    );
  }, [data, page, pageSize, onPageChange, loading, selectedKey]);

  if (error) {
    return <>出现错误</>;
  }
  return (
    <>
      <Space vertical spacing={'loose'} align="start">
        <div className={`white-back-box`}>{getTalkContent()}</div>
        <div id="basic-comment" className={`white-back-box`}>
          {getCommentComponent()}
        </div>
        <div className={`white-back-box`}>{getTalkComment()}</div>
      </Space>
    </>
  );
}
