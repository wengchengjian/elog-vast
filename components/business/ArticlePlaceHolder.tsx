import { Skeleton, Space } from '@douyinfe/semi-ui';
import styles from '@/styles/article.module.css';
export default function ArticlePlaceHolder() {
  return (
    <>
      <Space style={{ width: '100%' }} align="start">
        <Skeleton.Image className={styles.article_img} />
        <div style={{ width: '100%' }}>
          <Skeleton.Title></Skeleton.Title>
          <Skeleton.Paragraph rows={3}></Skeleton.Paragraph>
          <Skeleton.Paragraph rows={1}></Skeleton.Paragraph>
          <Skeleton.Paragraph rows={1}></Skeleton.Paragraph>
        </div>
      </Space>
    </>
  );
}
