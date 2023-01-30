import { Space, Tag, Typography } from '@douyinfe/semi-ui';
import moment from 'moment';
import {
  IconComment,
  IconEyeOpened,
  IconLayers,
  IconLikeThumb,
} from '@douyinfe/semi-icons';
import styles from '@/styles/article.module.css';
import { Article } from '@/types/article';
import { Num2ToStr } from '@/utils';
import {useRecoilValue} from "recoil";
import {cateStore, tagStore} from "@/store";
const { Title, Text, Paragraph } = Typography;

export type ArticleProps = {
  article: Article;
};
export default function ArticleView({ article }: ArticleProps) {

  const tags = useRecoilValue(tagStore);
  const categories = useRecoilValue(cateStore);

  return (
    <>
      <Space vertical={true} align={'start'}>
        <Title heading={4}>{article.title}</Title>
        <Paragraph ellipsis={{ rows: 3 }}>{article.description}</Paragraph>
        <Space>
          {(Array.from(new Set<string>(article.tags?.split(","))) ?? []).map((name, index) => {
            let tag = tags.get(name);
            return (
              <Tag key={tag?.id ?? index} style={{ color: tag?.color ?? 'blue' }}>
                {tag?.name ?? name}
              </Tag>
            );
          })}
        </Space>
        <div className={styles.article_view_footer}>
          <Space style={{ fontSize: 12, fontWeight: 300 }}>
            <span>{moment(article.updateTime).format('yyyy-MM-DD')}</span>
            <span>/</span>
            <span style={{ display: 'flex', alignItems: 'center',marginRight: 4 }}>
              <IconEyeOpened style={{ marginRight: 4 }} />
              {Num2ToStr(article.readNum ?? 0)}
            </span>
            <span>/</span>
            <span style={{ display: 'flex', alignItems: 'center',marginRight: 4 }}>
              <IconComment style={{ marginRight: 4 }} />
              {Num2ToStr(article.commentNum ?? 0)}
            </span>
            <span>/</span>
            <span style={{ display: 'flex', alignItems: 'center',marginRight: 8 }}>
              <IconLikeThumb style={{ marginRight: 4 }} />
              {Num2ToStr(article.likeNum ?? 0)}
            </span>
          </Space>
          <div>
            <span
              style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}
            >
              <IconLayers />
              &nbsp;&nbsp;{article?.category?.name ?? "未知" }
            </span>
          </div>
        </div>
      </Space>
    </>
  );
}
