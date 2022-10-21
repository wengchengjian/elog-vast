import { BlogComment } from "@/types/comment";
import {
  Avatar,
  Collapsible,
  List,
  Space,
  TextArea,
  Typography,
} from "@douyinfe/semi-ui";
import {
  IconLikeThumb,
  IconComment,
  IconSmallTriangleRight,
} from "@douyinfe/semi-icons";
import { useCallback, useMemo, useState } from "react";
import styles from "@/styles/comment.module.css";
import { SysUser } from "@/types/user";
import { getServerImage } from "@/utils";
import BaseComment from "../base/BaseComment";
import { sxios } from "@/request/server";

export type CommentViewProps = {
  comment: BlogComment;
  author: SysUser;
  parentComment?: BlogComment;
};

const { Paragraph, Title } = Typography;

export default function CommentView({
  comment,
  author,
  parentComment,
}: CommentViewProps) {
  const [isOpen, setOpen] = useState(false);

  const [isComment, setIsComment] = useState(false);

  const maskStyle = useMemo(
    () =>
      isOpen
        ? {}
        : {
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0.2) 80%, transparent 100%)",
          },
    [isOpen]
  );

  const toggle = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen]);

  const showMore = useMemo(() => {
    return (
      <a onClick={toggle} className={styles["more_comment"]}>
        {!isOpen ? "展开更多回复" : "收起"}
      </a>
    );
  }, [isOpen, toggle]);

  const renderItem = useCallback(
    (item: any) => {
      return (
        <List.Item
          align={"flex-start"}
          key={item.id}
          header={
            <div>
              <Avatar
                src={getServerImage(item.create_user_avatar)}
                alt="picture of the commentator"
              />
            </div>
          }
          main={
            <CommentView
              parentComment={comment}
              comment={item}
              author={author}
            />
          }
        />
      );
    },
    [author, comment]
  );

  const collapsed = useMemo(() => {
    return (
      <List
        style={{ backgroundColor: "rgba(247, 248, 250, 0.7)" }}
        dataSource={comment.children}
        renderItem={renderItem}
      />
    );
  }, [comment, renderItem]);

  const handleClickLike = useCallback(() => {
    console.log("like");
  }, []);

  const handleClickComment = useCallback(() => {
    setIsComment((val) => !val);
  }, []);

  return (
    <>
      <Space
        style={{ position: "relative", width: "100%" }}
        vertical
        align="start"
      >
        <div
          style={{
            display: "flex",
            fontWeight: 300,
            alignItems: "center",
          }}
        >
          <span>{comment.createNickname}</span>·
          <span>
            {comment?.username === author?.username ? "(作者) ·" : null}
          </span>
          <span className="ip_style">IP: {comment.territory}</span>
          {/* 如果是子评论，显示回复的人 */}
          {comment.replyToNickname ? (
            <>
              ·
              <IconSmallTriangleRight />
              <span>{comment.replyToNickname}</span>
            </>
          ) : null}
        </div>
        <Paragraph
          ellipsis={{
            rows: 3,
            expandable: true,
            collapsible: true,
            collapseText: "折叠我吧",
          }}
        >
          {comment.content}
        </Paragraph>
        <Space spacing={"medium"}>
          <div className="action_btn" onClick={() => handleClickLike()}>
            <Space>
              <IconLikeThumb />
              <span>{comment.likeNum ?? 0}</span>
            </Space>
          </div>
          <div className="action_btn" onClick={() => handleClickComment()}>
            <Space>
              <IconComment />
              <span>{comment.children?.length ?? "回复"}</span>
            </Space>
          </div>
        </Space>
        <BaseComment
          visible={isComment}
          onFinish={async (val) => {
            await sxios.post("/comment/add", {
              linkId: parentComment?.id,
              content: val,
              replyId: comment.id,
              type: 1,
              replyToNickname: comment.createNickname,
            } as BlogComment);
          }}
        />

        {(comment.children?.length ?? 0) > 0 ? (
          <>
            <Collapsible
              keepDOM
              isOpen={isOpen}
              collapseHeight={300}
              duration={250}
              style={{ ...maskStyle, width: "100%" }}
            >
              {collapsed}
            </Collapsible>
            {showMore}
          </>
        ) : null}
      </Space>
    </>
  );
}
