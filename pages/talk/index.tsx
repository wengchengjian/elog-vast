import BlogTalkContent from '@@/layout/content/BlogTalkContent';
import BlogFooter from '@@/layout/footer/BlogFooter';
import BlogHeader from '@@/layout/header/BlogHeader';
import MainLayout from '@@/layout/MainLayout';

export default function TalkPage() {
  return (
    <>
      <MainLayout
        header={<BlogHeader />}
        content={<BlogTalkContent />}
        footer={<BlogFooter />}
      />
    </>
  );
}
