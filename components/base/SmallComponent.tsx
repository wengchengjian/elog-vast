import { Space } from '@douyinfe/semi-ui';
import useTime from '@/hooks/useTime';
import TimeProgress from '@@/base/TimeProgress';
import { Typography } from '@douyinfe/semi-ui';
import { ReactElement, ReactNode } from 'react';

const { Title } = Typography;

export type Align = 'start' | 'center' | 'end' | 'baseline';

export type SmallComponentProps = {
  title: JSX.Element;
  content: JSX.Element;
  align?: Align;
  style?: React.CSSProperties;
};

export default function SmallComponent({
  title,
  content,
  align,
  style,
}: SmallComponentProps) {
  return (
    <>
      <Space
        style={style}
        align={align ?? 'center'}
        vertical
        className="white-back-box"
      >
        <Title heading={6} style={{ borderBottom: '2px solid #ccc' }}>
          {title}
        </Title>
        {content}
      </Space>
    </>
  );
}
