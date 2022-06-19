import { Pagination } from '@douyinfe/semi-ui';

export type PaginationProps = {
  pageSize: number;
  page: number;
  total: number;
  onChange?: (currentPage: number, pageSize: number) => void;
};

const pageSizeOpts = [5, 10, 20, 40, 100];

export default function BlogPagination({
  page,
  pageSize,
  total,
  onChange,
}: PaginationProps) {
  return (
    <Pagination
      showTotal
      showSizeChanger
      hideOnSinglePage
      popoverPosition="topLeft"
      showQuickJumper
      style={{ width: '100%', flexBasis: '100%', justifyContent: 'center' }}
      pageSize={pageSize}
      total={total}
      currentPage={page}
      onChange={onChange}
      pageSizeOpts={pageSizeOpts}
    />
  );
}
