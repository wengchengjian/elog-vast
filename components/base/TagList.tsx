import { Tag as TagType } from "@/types/Tag";
import { Space, Tag } from "@douyinfe/semi-ui";
import { useState } from "react";

export type TagListProps = {
  tags: TagType[];
  onClick: (tag: TagType) => void;
  onCancel: () => void;
};

export default function TagList({ tags, onClick, onCancel }: TagListProps) {
  const [selectedKey, setSelectedKey] = useState("");

  const handleClick = (tag: TagType) => {
    if (tag.id === selectedKey) {
      setSelectedKey("");
      onCancel();
    } else {
      onClick(tag);
      setSelectedKey(tag.id);
    }
  };

  return (
    <>
      <Space>
        {tags?.map((tag) => {
          return (
            <Tag
              color="blue"
              type={selectedKey === tag.id ? "solid" : "light"}
              size="large"
              key={tag.id}
              style={{
                cursor: "pointer",
              }}
              onClick={() => handleClick(tag)}
            >
              {tag.name}
            </Tag>
          );
        })}
      </Space>
    </>
  );
}
