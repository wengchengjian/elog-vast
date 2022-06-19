import { Skeleton, Space, TextArea } from '@douyinfe/semi-ui';
import { useCallback } from 'react';

export type BaseCommentProps = {
  value: string;
  onChange: (value: string) => void;
  onFinish: () => void;
};

export default function BaseComment({
  value,
  onChange,
  onFinish,
}: BaseCommentProps) {
  const handleClickKeyUp = (e: any) => {
    console.log(e.keyCode);
  };

  const getBaseCommentComponent = useCallback(() => {
    return (
      <>
        <Space style={{ width: '100%' }} align="start" spacing={'medium'}>
          <Skeleton.Avatar></Skeleton.Avatar>
          <TextArea
            style={{ backgroundColor: '#f2f3f5' }}
            placeholder="输入评论,Crtl+Enter发送"
            value={value}
            onChange={onChange}
            maxCount={100}
          ></TextArea>
        </Space>
      </>
    );
  }, [value, onChange]);

  return getBaseCommentComponent();
}
