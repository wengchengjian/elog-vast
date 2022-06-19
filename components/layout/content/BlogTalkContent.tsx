import usePage from '@/hooks/usePage';
import useRequest from '@/hooks/useRequest';
import TalkListContent from '@@/business/TalkListContent';
import { Input, Space, Tooltip } from '@douyinfe/semi-ui';
import { IconSearch, IconHelpCircle } from '@douyinfe/semi-icons';
import { useState } from 'react';

export default function BlogTalkContent() {
  const { page, pageSize, setPage, setPageSize } = usePage();

  const [searchContent, setSearchContent] = useState('');

  const onPageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const handleCLickSearchHelpIcon = () => {};

  const { data, error, loading } = useRequest(
    `/api/talk?searchContent=${encodeURIComponent(
      searchContent
    )}&page=${page}&pageSize=${pageSize}`
  );

  if (error) {
    return <>暂无数据</>;
  }

  return (
    <>
      <Space vertical spacing={'loose'} style={{ width: '100%' }}>
        <Input
          style={{ width: '50%' }}
          prefix={<IconSearch />}
          suffix={
            <Tooltip content="搜索有关的杂谈">
              <IconHelpCircle />
            </Tooltip>
          }
          placeholder="搜索杂谈"
          showClear
          maxLength={50}
          onEnterPress={(e) => setSearchContent(e.currentTarget.value)}
        ></Input>
        <TalkListContent
          total={data?.total ?? 0}
          data={data?.list ?? []}
          onPageChange={onPageChange}
          page={page}
          pageSize={pageSize}
          loading={loading}
        />
      </Space>
    </>
  );
}
