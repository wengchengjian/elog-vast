import { Space } from '@douyinfe/semi-ui';
import TagCloud from 'react3dtagcloud_withclick';
import { Tag } from '@/types/Tag';

export type TagCloudProps = {
  tags: Tag[];
};

export default function ClickTagCloud({ tags }: TagCloudProps) {
  const handleClick = (tag: Tag) => {
    console.log(tag);
  };

  return (
    <Space>
      <TagCloud
        tagName={tags}
        radius={100}
        speed={1}
        onClick={handleClick}
      ></TagCloud>
    </Space>
  );
}
