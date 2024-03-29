import styles from '@/styles/UserInfo.module.css';
import { Avatar, Space, Typography } from '@douyinfe/semi-ui';
import { SysUser } from '@/types/user';
import {getServerImage, Num2ToStr } from '@/utils';
import { Statics } from '@/pages';

type UserInfoProps = {
  user: SysUser;
  statics: Statics
};
const { Paragraph, Title, Text } = Typography;

export default function UserInfo({ user,statics }: UserInfoProps) {
  console.log(statics)
  return (
    <>
      <Space spacing={'loose'} vertical={true} align={'center'}>
        {user?.avatar ? (
          <Avatar
            size={'extra-large'}
              src={getServerImage(user.avatar)}
            style={{ margin: 4 }}
          />
        ) : (
          <Avatar size={'extra-large'} style={{ margin: 4 }}>
            {user?.username}
          </Avatar>
        )}
        <Text>
          <span className={styles.username}>@{user?.username}</span>
          <br />
          <span className={styles.post}>{user?.title}</span>
        </Text>
        <Paragraph
          size={'small'}
          ellipsis={{
            rows: 3,
            expandable: true,
            collapsible: true,
            collapseText: '折叠我吧',
            onExpand: (bool, e) => console.log(bool, e),
          }}
        >
          {user?.description ?? "描述"}
        </Paragraph>
        <Space spacing={'loose'}>
          <RecordTag name={'文章数'} num={statics?.statistics?.articleNum ?? 0} />
          <RecordTag name={'阅读量'} num={statics?.statistics?.viewNum ?? 0} />
          <RecordTag name={'点赞量'} num={statics?.statistics?.likeNum ?? 0} />
        </Space>
      </Space>
    </>
  );
}

export function RecordTag({ name, num }: { name: string; num: number }) {
  return (
    <>
      <div>
        <div style={{ fontWeight: 300 }}>{name}</div>
        <div style={{ fontWeight: 500 }}>{Num2ToStr(num)}</div>
      </div>
    </>
  );
}
