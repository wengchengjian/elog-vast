import BlogFooter from '@/components/layout/BlogFooter';
import BlogHeader from '@/components/layout/BlogHeader';
import BlogRecordContent from '@/components/layout/BlogRecordContent';
import { Article } from '@/types/article';
import MainLayout from '@@/layout/MainLayout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { articles } from '@/pages/api/article';
import axios from 'axios';

export type RecordPageProps = {
  articles: Article[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const data = await axios.get('/api/article');
  return {
    props: {},
  };
};

export default function RecordPage({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  return (
    <>
      <MainLayout
        header={<BlogHeader />}
        content={<BlogRecordContent />}
        footer={<BlogFooter />}
      />
    </>
  );
}
