import { SysUser } from "@/types/user";
import { getServerImage } from "@/utils";
import { Avatar, List, Skeleton, Space } from "@douyinfe/semi-ui";
import ListContent from "../base/ListContent";
import CommentPlaceHolder from "./CommentPlaceHolder";
import CommentView from "./CommentView";

export type CommentListContentProps = {
  data: any[];
  page: number;
  loading: boolean;
  pageSize: number;
  total: number;
  author: SysUser;
  onPageChange: (page: number, pageSize: number) => void;
};

export default function CommentListContent({
  data,
  page,
  pageSize,
  loading,
  total,
  author,
  onPageChange,
}: CommentListContentProps) {
  const renderItem = (item: any) => {
    return (
      <List.Item
        align={"flex-start"}
        key={item.id}
        header={
          <div>
            <Avatar
              src={getServerImage(item.creator?.avatar)}
              alt="picture of the commentator"
            />
          </div>
        }
        style={{ width: "100%" }}
        main={
          <CommentView parentComment={item} comment={item} author={author} />
        }
      />
    );
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <ListContent
          loading={loading}
          total={total}
          data={data}
          page={page}
          pageSize={pageSize}
          onPageChange={onPageChange}
          renderItem={renderItem}
        />
      </div>
    </>
  );
}
