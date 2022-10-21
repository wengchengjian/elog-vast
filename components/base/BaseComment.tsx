import { Skeleton, Space, TextArea } from "@douyinfe/semi-ui";
import _ from "lodash";
import { useCallback, useState } from "react";
export type BaseCommentProps = {
  onFinish: (val: string) => Promise<void>;
  visible: boolean;
};

export default function BaseComment({ onFinish, visible }: BaseCommentProps) {
  const [value, setValue] = useState("");

  const getBaseCommentComponent = useCallback(() => {
    return (
      <>
        <Space
          style={{ width: "100%", display: visible ? "" : "none" }}
          align="start"
          spacing={"loose"}
        >
          <Skeleton.Avatar></Skeleton.Avatar>
          <TextArea
            style={{
              backgroundColor: "#f2f3f5",

              minWidth: 500,
            }}
            placeholder="输入评论,Ctrl+Enter发送"
            value={value}
            onKeyDown={_.throttle((e) => {
              if (e.ctrlKey && e.keyCode == 13) {
                onFinish(value);
                setValue("");
              }
            }, 2000)}
            onChange={setValue}
            maxCount={100}
          ></TextArea>
        </Space>
      </>
    );
  }, [value, setValue, onFinish, visible]);

  return getBaseCommentComponent();
}
