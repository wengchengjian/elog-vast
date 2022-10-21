import { Skeleton, Space } from "@douyinfe/semi-ui";

export default function CommentPlaceHolder() {
  return (
    <>
      <Space style={{ width: "100%", marginBottom: "10px" }} align="start">
        <Skeleton.Avatar />
        <div style={{ width: "100%" }}>
          <Skeleton.Title></Skeleton.Title>
          <Skeleton.Paragraph rows={1}></Skeleton.Paragraph>
        </div>
      </Space>
    </>
  );
}
