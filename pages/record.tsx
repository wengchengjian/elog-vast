import BlogFooter from "@@/layout/footer/BlogFooter";
import BlogHeader from "@@/layout/header/BlogHeader";
import BlogRecordContent from "@@/layout/content/BlogRecordContent";
import { Article, ArticleRecords } from "@/types/article";
import MainLayout from "@@/layout/MainLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Space } from "@douyinfe/semi-ui";

export type RecordPageProps = {
  articleRecords: ArticleRecords[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export default function RecordPage() {
  return (
    <>
      <MainLayout
        header={<BlogHeader />}
        rightSider={<RightSider />}
        content={<BlogRecordContent />}
        footer={<BlogFooter />}
      />
    </>
  );
}

export type RightSiderProps = {};

export function RightSider({}: RightSiderProps) {
  return (
    <>
      <Space
        style={{ width: "100%" }}
        spacing={"medium"}
        vertical={true}
        align={"start"}
      ></Space>
    </>
  );
}
