import styles from '../styles/UserInfo.module.css';
import { Avatar, Space, Typography } from '@douyinfe/semi-ui';
import { SysUser } from '../types/user';
import cn from 'classnames';
import { Calendar } from 'antd';
import { Moment } from 'moment';
import { ReactNode } from 'react';
type UserInfoProps = {
  user: SysUser;
};
const { Paragraph, Title, Text } = Typography;

export default function ClockCalendar({ user }: UserInfoProps) {
  const dateRender = (dateString?: string) => {
    if (dateString === new Date(2022, 6, 8).toString()) {
      return <div style={{ backgroundColor: 'green' }} />;
    } else {
      return null;
    }
  };

  const dateCellRender = (date: Moment) => {
    return <div>{date.days()}</div>;
  };

  return (
    <>
      <Space
        className={cn(['white-back-box', `${styles.user_info}`])}
        vertical={true}
        align={'start'}
      >
        <Title heading={6}>
          已连续打卡<span style={{ color: 'green' }}>{5}</span>天
        </Title>
        <Calendar fullscreen={false} dateFullCellRender={dateCellRender} />
      </Space>
    </>
  );
}
