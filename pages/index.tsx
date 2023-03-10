import type { GetServerSideProps, NextPage } from "next";
import BlogHeader from "@@/layout/header/BlogHeader";
import BlogHomeContent from "@@/layout/content/BlogHomeContent";
import UserInfo from "@@/business/UserInfo";
import BlogFooter from "@@/layout/footer/BlogFooter";
import MainLayout from "@@/layout/MainLayout";
import { SysUser } from "@/types/user";
import { Space } from "@douyinfe/semi-ui";
import { InferGetServerSidePropsType } from "next";
import SmallComponent from "@@/base/SmallComponent";
import RecentComment from "@@/business/RecentComment";
import { BlogComment as CommentType } from "@/types/comment";
import { sxios } from "@/request/server";

const Home: NextPage = ({ statics }: any) => {
  return (
    <>
      <BlogHomeLayout statics={statics} />
    </>
  );
};

export type Statics = {
  statistics: {
    viewNum: number;
    likeNum: number;
    articleNum: number;
  };
};

export type HomeProps = {
  statics: Statics;
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const statics = (await sxios.get("/v1/api/system/indexData")) ?? null;

  return {
    props: {
      statics,
    },
  };
};

export function BlogHomeLayout({
  statics,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <MainLayout
        header={<BlogHeader />}
        content={<BlogHomeContent />}
        rightSider={<RightSider />}
        footer={<BlogFooter />}
      ></MainLayout>
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
        {/* <SmallComponent
          align="start"
          title={<>人生倒计时</>}
          content={<LifeCountDown />}
        /> */}
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
  statics: Statics;
};

export function LeftSider({ user, comments, statics }: LeftSiderProps) {
  return (
    <>
      <Space spacing={"medium"} vertical={true} align={"start"}>
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
