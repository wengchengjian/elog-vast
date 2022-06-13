import { List, Space, Typography } from '@douyinfe/semi-ui';
import { Avatar, Tooltip, Comment } from 'antd';
import { BlogComment as CommentType } from '@/types/comment';
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from '@ant-design/icons';
import { createElement, useState } from 'react';
import moment from 'moment';
export type RecentCommentProps = {
  comments: CommentType[];
};

const { Paragraph } = Typography;

export default function RecentComment({ comments }: RecentCommentProps) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<string | null>(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  return (
    <>
      <List
        dataSource={comments}
        emptyContent={<span>暂无回复</span>}
        renderItem={(item) => {
          return (
            <List.Item key={item.id}>
              <Comment
                author={<a>{item.creator.nickname}</a>}
                content={
                  <Paragraph ellipsis={{ rows: 1 }}>{item.content}</Paragraph>
                }
                datetime={
                  <Tooltip
                    title={moment(item.createTime).format(
                      'YYYY-MM-DD HH:mm:ss'
                    )}
                  >
                    <span>{moment(item.createTime).toNow()}</span>
                  </Tooltip>
                }
              />
            </List.Item>
          );
        }}
      />
    </>
  );
}
