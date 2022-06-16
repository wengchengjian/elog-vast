import { Avatar, Space, Tag, Typography } from '@douyinfe/semi-ui';
import moment from 'moment';
import {
  IconComment,
  IconEyeOpened,
  IconLayers,
  IconLikeThumb,
} from '@douyinfe/semi-icons';
import styles from '@/styles/talk.module.css';

import { Num2ToStr } from '@/utils';
import { Talk } from '@/types/talk';
import Image from 'next/image';
const { Title, Text, Paragraph } = Typography;

export type TalkProps = {
  talk: Talk;
};
export default function TalkView({ talk }: TalkProps) {
  return (
    <>
      <Space vertical align={'start'}>
        <Space spacing={'loose'} align="start">
          <Avatar
            size="medium"
            alt={talk.createBy.nickname}
            src={talk.createBy.avatar}
            shape="circle"
          ></Avatar>
          <Space vertical align="start">
            <Title heading={4}>{talk.createBy.nickname}</Title>
            <span style={{ fontSize: '12px', fontWeight: '300' }}>
              {moment(talk.createTime).toNow()}
            </span>
          </Space>
        </Space>
        <Paragraph ellipsis={{ rows: 6 }}>{talk.content}</Paragraph>
        <div className={styles.talk_under_item}>
          <span>{talk.territory}</span>
          <span>浏览次数{talk.views}次</span>
        </div>
      </Space>
    </>
  );
}
