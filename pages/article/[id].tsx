import BlogArticleItemDetailContent from '@/components/layout/BlogArticleItemDetailContent';
import BlogFooter from '@/components/layout/BlogFooter';
import BlogHeader from '@/components/layout/BlogHeader';
import MainLayout from '@/components/layout/MainLayout';

export default function ArticleItenDetailPage() {
  return (
    <>
      <MainLayout
        header={<BlogHeader />}
        footer={<BlogFooter />}
        content={<BlogArticleItemDetailContent />}
        leftSider={<ArticleItemDetailLeftSider />}
        rightSider={<ArticleItemDetailRightSider />}
      />
    </>
  );
}

export function ArticleItemDetailLeftSider() {
  return <>ArticleItemDetailLeftSider</>;
}

export function ArticleItemDetailRightSider() {
  return <>ArticleItemDetailRightSider</>;
}
