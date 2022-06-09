import type { NextPage } from 'next'
import BlogHeader from "../components/BlogHeader";
import BlogHomeContent from "../components/BlogHomeContent";
import UserInfo from "../components/UserInfo";
import HomeSider from "../components/HomeSider";
import BlogFooter from "../components/BlogFooter";
import MainLayout from "../components/MainLayout";
import {SysUser} from "../types/user";
import {user} from "./api/user";
import {Space, Typography} from "@douyinfe/semi-ui";
import MusicPlayer from "../components/MusicPlayer";

const Home: NextPage = ({user}:any) => {
  return (
    <>
        <BlogHomeLayout user={user}/>
    </>
  )
}
const { Paragraph, Title, Text } = Typography;

export function BlogHomeLayout ({user}:{user:SysUser}){
    return <><MainLayout header={<BlogHeader/>}
                       content={<BlogHomeContent/>}
                       leftSider={<LeftSider user={user}/>}
                       rightSider={<HomeSider/>}
                       footer={<BlogFooter/>}></MainLayout>
    </>
}

export function LeftSider({user}: { user:SysUser }){
    return <>
        <Space spacing={"medium"} vertical={true} align={"start"}>
            <UserInfo user={user}/>
            <MusicPlayer/>
        </Space>
    </>
}

export async function getStaticProps() {
    return {
        props: {
            user
        }
    }
}

export default Home
