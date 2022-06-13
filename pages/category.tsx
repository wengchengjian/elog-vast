import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next';
import axios from 'axios';
import BlogHeader from '@@/layout/BlogHeader';
import BlogCategoryContent from '@@/layout/BlogCategoryContent';
import BlogFooter from '@@/layout/BlogFooter';
import MainLayout from '@@/layout/MainLayout';
import { Category } from '@/types/Category';
import { categories } from '@/pages/api/category';

export type CategoryPageProps = {
  categories: Category[];
};

export const getServerSideProps: GetServerSideProps<CategoryPageProps> = async (
  context
) => {
  //TODO 获取分类数据
  // const categories = await axios.get('/api/category');
  // ...
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

export function BlogCategoryLayout({ categories }: CategoryPageProps) {
  return (
    <>
      <MainLayout
        header={<BlogHeader />}
        content={<BlogCategoryContent categories={categories} />}
        footer={<BlogFooter />}
      ></MainLayout>
    </>
  );
}

export default CategoryPage;
