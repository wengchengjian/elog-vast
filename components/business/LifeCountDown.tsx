import { Space } from '@douyinfe/semi-ui';
import moment from 'moment';
import { useEffect, useState } from 'react';
import useTime from '@/hooks/useTime';
import TimeProgress from '@/components/base/TimeProgress';
import { Typography } from '@douyinfe/semi-ui';

const { Title } = Typography;
export default function LifeCountDown() {
  /**
   * @description 60秒倒计时更新
   */
  const date = useTime(60);

  return (
    <>
      <Space vertical style={{ width: '100%' }} align="start">
        <TimeProgress
          titlePrefix="今日"
          titleSuffix="小时"
          value={date.hour()}
          total={24}
          color={'#bde6ff'}
        />
        <TimeProgress
          titlePrefix="这周"
          titleSuffix="天"
          value={date.isoWeekday()}
          total={7}
          color={'#ffd980'}
        />
        <TimeProgress
          titlePrefix="本月"
          titleSuffix="天"
          value={date.date()}
          total={date.daysInMonth()}
          color={'#ffa9a9'}
        />
        <TimeProgress
          titlePrefix="今年"
          titleSuffix="月"
          value={date.month() + 1}
          total={12}
          color={'#bde6ff'}
        />
      </Space>
    </>
  );
}
