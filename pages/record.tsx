import BlogFooter from '@@/layout/footer/BlogFooter';
import BlogHeader from '@@/layout/header/BlogHeader';
import BlogRecordContent from '@@/layout/content/BlogRecordContent';
import { Article } from '@/types/article';
import MainLayout from '@@/layout/MainLayout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import axios from 'axios';
import {sxios} from "@/request/server";

export type RecordPageProps = {
  articles: Article[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await sxios.get('/article/list');
  return {
    props: {
        articles: data
    },
  };
};

export default function RecordPage({articles}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  return (
    <>
      <MainLayout
        header={<BlogHeader />}
        content={<BlogRecordContent articles={articles} />}
        footer={<BlogFooter />}
      />
    </>
  );
}
