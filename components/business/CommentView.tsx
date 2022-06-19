import { BlogComment } from '@/types/comment';
import {
  Avatar,
  Collapsible,
  List,
  Space,
  TextArea,
  Typography,
} from '@douyinfe/semi-ui';
import {
  IconLikeThumb,
  IconComment,
  IconSmallTriangleRight,
} from '@douyinfe/semi-icons';
import { useCallback, useMemo, useState } from 'react';
export type CommentViewProps = {
  comment: BlogComment;
};

const { Paragraph, Title } = Typography;

export default function CommentView({ comment }: CommentViewProps) {
  const [isOpen, setOpen] = useState(false);

  const [isComment, setIsComment] = useState(false);

  const maskStyle = useMemo(
    () =>
      isOpen
        ? {}
        : {
            WebkitMaskImage:
              'linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0.2) 80%, transparent 100%)',
          },
    [isOpen]
  );

  const toggle = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen]);

  const linkStyle = useMemo(
    () => ({
      position: 'absolute',
      left: 10,
      right: 0,
      bottom: -5,
      color: '#2d2e36',
      fontWeight: 300,
      cursor: 'pointer',
    }),
    []
  );

  const showMore = useMemo(() => {
    return (
      <a onClick={toggle} style={{ ...linkStyle }}>
        {!isOpen ? '展开更多回复' : '收起'}
      </a>
    );
  }, [isOpen, toggle, linkStyle]);

  const renderItem = useCallback((item: any) => {
    return (
      <List.Item
        align={'flex-start'}
        key={item.id}
        header={
          <div>
            <Avatar
              src={item.creator.avatar}
              alt="picture of the commentator"
            />
          </div>
        }
        main={<CommentView comment={item} />}
      />
    );
  }, []);

  const collapsed = useMemo(() => {
    return (
      <List
        style={{ backgroundColor: 'rgba(247, 248, 250, 0.7)' }}
        dataSource={comment.children}
        renderItem={renderItem}
      />
    );
  }, [comment, renderItem]);

  const handleClickLike = useCallback(() => {
    console.log('like');
  }, []);

  const handleClickComment = useCallback(() => {
    setIsComment((val) => !val);
  }, []);

  return (
    <>
      <Space style={{ position: 'relative' }} vertical align="start">
        <div
          style={{
            display: 'flex',
            fontWeight: 300,
            alignItems: 'center',
          }}
        >
          <span>{comment.creator.nickname}</span>&nbsp;·
          <span>
            {comment.creator.username === 'admin' ? '(作者) ·' : null}
          </span>
          <span className="ip_style">IP: {comment.territory}</span>
          {/* 如果是子评论，显示回复的人 */}
          {(comment.children?.length ?? 0) === 0 ? (
            <>
              &nbsp;·
              <IconSmallTriangleRight />
              <span>{comment.replyTo.nickname}</span>
            </>
          ) : null}
        </div>
        <Paragraph
          ellipsis={{
            rows: 3,
            expandable: true,
            collapsible: true,
            collapseText: '折叠我吧',
          }}
        >
          {comment.content}
        </Paragraph>
        <Space spacing={'medium'}>
          <div className="action_btn" onClick={() => handleClickLike()}>
            <Space>
              <IconLikeThumb />
              <span>{comment.likeNum ?? 0}</span>
            </Space>
          </div>
          <div className="action_btn" onClick={() => handleClickComment()}>
            <Space>
              <IconComment />
              <span>{comment.children?.length ?? '回复'}</span>
            </Space>
          </div>
        </Space>
        <TextArea
          style={{ display: isComment ? 'block' : 'none' }}
          maxCount={100}
          placeholder="输入评论,Crtl+Enter发送"
        />
        {(comment.children?.length ?? 0) > 0 ? (
          <>
            <Collapsible
              keepDOM
              isOpen={isOpen}
              collapseHeight={300}
              duration={250}
              style={{ ...maskStyle }}
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
