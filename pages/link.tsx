import BlogLinkContent from "@/components/layout/content/BlogLinkContent";
import BlogFooter from "@/components/layout/footer/BlogFooter";
import BlogHeader from "@/components/layout/header/BlogHeader";
import MainLayout from "@/components/layout/MainLayout";
import { Link } from "@/types/link";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { links } from "./api/link";


export type LinkPageProps = {
  links:Link[]
}

export const getServerSideProps: GetServerSideProps<LinkPageProps>= async ()=>{
  return {
    props:{
      links
    }
  }
}


export default function LinkPage({links}:InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  return (
    <>
      
    <MainLayout header={<BlogHeader/>} footer={<BlogFooter/>} content={<BlogLinkContent links={links}/>} spans={{content:16}} />
    </>
  );
}

