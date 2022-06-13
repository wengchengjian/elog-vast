import styles from '@/styles/UserInfo.module.css';
import { Avatar, Space, Typography } from '@douyinfe/semi-ui';
import { SysUser } from '@/types/user';
import cn from 'classnames';
import { Calendar } from 'antd';
import moment, { Moment } from 'moment';
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
    const today = moment(date.format('YYYY-MM-DD'));

    const clockDate = user.clockInDate ?? [];
    let res = <div>{date.date()}</div>;
    clockDate.forEach((item) => {
      if (moment(item).isSame(today)) {
        res = <div className="circular-green">{date.date()}</div>;
      }
    });
    return res;
  };

  return (
    <>
      <div>
        <Calendar
          mode="month"
          fullscreen={false}
          dateFullCellRender={dateCellRender}
        />
      </div>
    </>
  );
}
