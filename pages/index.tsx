import type { GetServerSideProps, NextPage } from 'next';
import BlogHeader from '@@/layout/header/BlogHeader';
import BlogHomeContent from '@@/layout/content/BlogHomeContent';
import UserInfo from '@@/business/UserInfo';
import BlogFooter from '@@/layout/footer/BlogFooter';
import MainLayout from '@@/layout/MainLayout';
import { SysUser } from '@/types/user';
import { GetStaticProps } from 'next';
import { Space, Typography } from '@douyinfe/semi-ui';
import ClockCalendar from '@@/business/ClockCalendar';
import TimeProgress from '@@/base/TimeProgress';
import { InferGetServerSidePropsType } from 'next';
import LifeCountDown from '@@/business/LifeCountDown';
import MusicAplayer, {
  AplayerAudioProps,
  AudioProps,
} from '@@/business/MusicAplayer';
import { MUSIC_CACHE, MUSIC_CACHE_STR } from '@/constants';
import { getMusic } from '@/request';
import ClickTagCloud from '@@/business/ClickTagCloud';
import { tags } from '@/pages/api/tag';
import SmallComponent from '@@/base/SmallComponent';
import Live2DComponent from '@@/business/Live2DComponent';
import RecentComment from '@@/business/RecentComment';
import { BlogComment as CommentType } from '@/types/comment';
import { sxios } from "@/request/server"

const Home: NextPage = ({ user, audio, model,statics }: any) => {
  return (
    <>
      <BlogHomeLayout user={user} statics={statics} />
    </>
  );
};

export type Statics = {
  statistics:{
    viewNum:number,
    likeNum:number,
    articleNum:number
  }
}

export type HomeProps = {
  user: SysUser;
  statics:Statics
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const user = (await sxios.get("/user/admin")) ?? null;
  const statics = (await sxios.get("/system/indexData")) ?? null;

  return {
    props: {
      user,
      statics
    },
  };
};

export function BlogHomeLayout({
  user,statics
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <MainLayout
        header={<BlogHeader />}
        content={<BlogHomeContent />}
        rightSider={<RightSider user={user} />}
        footer={<BlogFooter />}
      ></MainLayout>
    </>
  );
}

export type RightSiderProps = {
  user: SysUser;
};

export function RightSider({ user }: RightSiderProps) {
  return (
    <>
      <Space
        style={{ width: '100%' }}
        spacing={'medium'}
        vertical={true}
        align={'start'}
      >
        {/* 打卡感觉没啥必要 */}
        {/* <SmallComponent
          align="start"
          title={
            <>
              <span>日历</span>
              <span style={{ marginLeft: 5 }}>
                已打卡
                <span style={{ color: 'green' }}>
                  {(user.clockInDate ?? []).length}
                </span>
                天
              </span>
            </>
          }
          content={<ClockCalendar user={user} />}
        /> */}
        <SmallComponent
          align="start"
          title={<>人生倒计时</>}
          content={<LifeCountDown />}
        />
        {/* <SmallComponent
          title={<>标签云</>}
          content={<ClickTagCloud tags={tags} />}
        /> */}
      </Space>
    </>
  );
}

export type LeftSiderProps = {
  user: SysUser;
  comments: CommentType[];
  statics:Statics
};

export function LeftSider({ user, comments,statics }: LeftSiderProps) {
  return (
    <>
      <Space spacing={'medium'} vertical={true} align={'start'}>
        <SmallComponent
          title={<>个人介绍</>}
          content={<UserInfo user={user} statics={statics} />}
        />

        <SmallComponent
          align="start"
          title={<>最近回复</>}
          content={<RecentComment comments={comments} />}
        />
      </Space>
    </>
  );
}

export default Home;
