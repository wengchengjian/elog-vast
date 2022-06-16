import BlogArticleItemDetailContent from '@/components/layout/content/BlogArticleItemDetailContent';
import BlogFooter from '@/components/layout/footer/BlogFooter';
import BlogHeader from '@/components/layout/header/BlogHeadergHeader';
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
