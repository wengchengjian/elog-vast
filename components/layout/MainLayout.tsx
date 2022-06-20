import { Layout, Typography } from '@douyinfe/semi-ui';
const { Header, Sider, Content, Footer } = Layout;
import styles from '@/styles/MainLayout.module.css';
import { Col, Row } from '@douyinfe/semi-ui';
import Head from 'next/head';
import Script from 'next/script';
import MusicAplayer, { AudioProps } from '@/components/business/MusicAplayer';
import Live2DComponent from '@@/business/Live2DComponent';
type LayoutProps = {
  header: JSX.Element;
  leftSider?: JSX.Element;
  rightSider?: JSX.Element;
  content: JSX.Element;
  footer: JSX.Element;
  spans?:{
    [key:string]:number
  }
};
const { Paragraph, Title, Text } = Typography;

// 博客主要结构
export default function MainLayout({
  header,
  leftSider,
  rightSider,
  content,
  footer,
  spans={}
}: LayoutProps) {
  const audio: AudioProps[] = [];
  const model: string[] = [];

  return (
    <>
      <Layout>
        <Header>{header}</Header>
        <Layout hasSider={false} className="back_img_style">
          <Row
            gutter={{ xs: 8, sm: 16, md: 24 }}
            type={'flex'}
            justify={'center'}
            style={{ margin: '8px' }}
          >
            <Col span={spans.leftSider ?? 4}>
              {leftSider ? (
                <Sider style={{ height: '100%' }}>{leftSider}</Sider>
              ) : null}
            </Col>
            <Col span={spans.content ?? 12}>
              <Content>{content}</Content>
            </Col>
            <Col span={spans.rightSider ?? 4}>
              {rightSider ? (
                <Sider style={{ height: '100%' }}>{rightSider}</Sider>
              ) : null}
            </Col>
          </Row>
        </Layout>

        <Footer>{footer}</Footer>
        <MusicAplayer />
        <Live2DComponent />
      </Layout>
      <Script type="text/javascript" src="/js/canvas-nest.min.js"></Script>
      <Script src="/js/live2dcubismcore.min.js"></Script>
    </>
  );
}
