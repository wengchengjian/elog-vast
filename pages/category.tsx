import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next";
import BlogHeader from "@@/layout/header/BlogHeader";
import BlogCategoryContent from "@@/layout/content/BlogCategoryContent";
import BlogFooter from "@@/layout/footer/BlogFooter";
import MainLayout from "@@/layout/MainLayout";
import { Category } from "@/types/Category";
import { sxios } from "@/request/server";
import { Space } from "@douyinfe/semi-ui";

export type CategoryPageProps = {
  categories: Category[];
};

export const getServerSideProps: GetServerSideProps<CategoryPageProps> = async (
  context
) => {
  //TODO 获取分类数据
  const categories = await sxios.post("/v1/api/category/list");
  return {
    props: {
      categories,
    },
  };
};
const CategoryPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ categories }) => {
  return (
    <>
      <BlogCategoryLayout categories={categories} />
    </>
  );
};
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

export function BlogCategoryLayout({ categories }: CategoryPageProps) {
  return (
    <>
      <MainLayout
        header={<BlogHeader />}
        rightSider={<RightSider />}
        content={<BlogCategoryContent categories={categories} />}
        footer={<BlogFooter />}
      ></MainLayout>
    </>
  );
}

export default CategoryPage;
