import BlogFooter from '@@/layout/footer/BlogFooter';
import BlogHeader from '@@/layout/header/BlogHeader';
import BlogRecordContent from '@@/layout/content/BlogRecordContent';
import {Article, ArticleRecords} from '@/types/article';
import MainLayout from '@@/layout/MainLayout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import axios from 'axios';
import {sxios} from "@/request/server";

export type RecordPageProps = {
    articleRecords: ArticleRecords[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  return {
    props: {
    },
  };
};

export default function RecordPage() {
  return (
    <>
      <MainLayout
        header={<BlogHeader />}
        content={<BlogRecordContent/>}
        footer={<BlogFooter />}
      />
    </>
  );
}
