import { Space } from '@douyinfe/semi-ui';
import useTime from '@/hooks/useTime';
import TimeProgress from '@@/base/TimeProgress';
import { Typography } from '@douyinfe/semi-ui';

const { Title } = Typography;

export type Align = 'start' | 'center' | 'end' | 'baseline';

export type SmallComponentProps = {
  title: JSX.Element;
  content: JSX.Element;
  align?: Align;
};

export default function SmallComponent({
  title,
  content,
  align,
}: SmallComponentProps) {
  return (
    <>
      <Space
        align={align ?? 'center'}
        vertical
        className="white-back-box box_info"
      >
        <Title heading={6} style={{ borderBottom: '2px solid #ccc' }}>
          {title}
        </Title>
        {content}
      </Space>
    </>
  );
}
