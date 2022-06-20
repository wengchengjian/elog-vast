import { Link } from '@/types/link';
import {
  Card,
  CardGroup,
  Collapsible,
  Space,
  Typography,
} from '@douyinfe/semi-ui';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import styles from '@/styles/link.module.css';
import { IconInfoCircle } from '@douyinfe/semi-icons';
export type BlogLinkContentProps = {
  links: Link[];
};
const { Meta } = Card;
const { Paragraph, Title, Text } = Typography;

export default function BlogLinkContent({ links }: BlogLinkContentProps) {
  const router = useRouter();

  const [isOpen, setOpen] = useState(false);

  const handleClickRouteToBlog = useCallback(
    (link: Link) => {
      router.push(link.address);
    },
    [router]
  );

  const getLinkList = useCallback(() => {
    return (
      <>
        <Collapsible collapseHeight={600} isOpen={isOpen}>
          <CardGroup spacing={30}>
            {links.map((link) => {
              return (
                <>
                  <div
                    className={styles['card_style']}
                    onClick={() => handleClickRouteToBlog(link)}
                  >
                    <Card
                      cover={
                        <Image
                          width={300}
                          height={200}
                          alt="友链"
                          src={link.logo}
                        />
                      }
                    >
                      <Meta
                        title={
                          <Title
                            ellipsis={{ rows: 1, showTooltip: true }}
                            heading={4}
                          >
                            {link.name}
                          </Title>
                        }
                        description={
                          <Paragraph ellipsis={{ rows: 3 }}>
                            {link.description}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </div>
                </>
              );
            })}
          </CardGroup>
        </Collapsible>
      </>
    );
  }, [links, isOpen, handleClickRouteToBlog]);

  const more = useCallback(() => {
    return (
      <>
        <a
          onClick={(e) => {
            e.preventDefault();
            setOpen(!isOpen);
          }}
          className={styles['more_link']}
        >
          {isOpen ? '收起' : '更多友链'}
        </a>
      </>
    );
  }, [isOpen]);
  return (
    <>
      <Space
        className="white-back-box"
        vertical
        spacing={'loose'}
        align="start"
      >
        <div style={{ position: 'relative' }}>
          <Title heading={5} style={{ marginBottom: '20px' }}>
            友链列表
          </Title>
          {getLinkList()}
          {more()}
        </div>
        <div style={{ width: '100%' }}>
          <Title heading={5} style={{ marginBottom: '20px' }}>
            申请友链
          </Title>
          <div className={styles['link-help-box']}>
            <Space
              style={{ width: '100%' }}
              vertical
              align="start"
              className={styles['link-help']}
            >
              <IconInfoCircle className={styles['link-icon']} />
              <div
                className={styles['link-help-title']}
              >{`< 博客名称 + 博客地址 + 博客Logo + 博客简介 >`}</div>
              <div>
                {`博客名称：WengChengJian's Blog | 翁丞健的博客 | java golang 前端 全栈 网络 运维工程师 程序员 的 技术分享平台`}
              </div>
              <div>
                <span>{'博客地址: '}</span>
                <span className={styles['link-target']}>
                  https://localhost:3000
                </span>
              </div>

              <div>
                <span>{'博客Logo：'}</span>
                <span className={styles['link-target']}>
                  https://localhost:3000/logo
                </span>
              </div>

              <div>{`博客简介：技术分享！`}</div>
              <div>{`(大家在评论中留言即可，或者将申请发我邮箱)`}</div>
            </Space>
          </div>
        </div>
      </Space>
    </>
  );
}
