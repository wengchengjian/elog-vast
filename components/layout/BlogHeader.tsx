import Head from 'next/head';
import { Nav, Space } from '@douyinfe/semi-ui';
import {
  IconHome,
  IconCloud,
  IconLink,
  IconBolt,
  IconAppCenter,
  IconSetting,
  IconMoon,
  IconLanguage,
  IconResso,
  IconAlertTriangle,
} from '@douyinfe/semi-icons';
import { OnSelectedData } from '@douyinfe/semi-ui/navigation';
import { useRecoilState } from 'recoil';
import { darkMode, langMode } from '@/store';
import cn from 'classnames';
import { Tooltip } from '@douyinfe/semi-ui';
import CurrentTimer from '@/components/business/CurrentTimer';
import { useCallback, useMemo } from 'react';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';


// 菜单列表
const items = [
  {
    itemKey: 'home',
    text: '首页',
    icon: <IconHome />,
    path: '/home',
  },
  {
    itemKey: 'category',
    text: '分类',
    icon: <IconAppCenter />,
    path: '/category',
  },
  {
    text: '归档',
    icon: <IconSetting />,
    itemKey: 'record',
    path: '/record',
  },
  {
    itemKey: 'miscellaneous_talk',
    text: '杂谈',
    icon: <IconCloud />,
    path: '/talk',
  },
  {
    itemKey: 'link',
    text: '友情链接',
    icon: <IconLink />,
    path: '/link',
  },
  {
    itemKey: 'experimental',
    text: '实验室',
    icon: <IconBolt />,
    items: [
      {
        itemKey: 'resources',
        text: '资源',
        icon: <IconResso />,
        path: '/resources',
      },
      {
        itemKey: 'logs',
        text: '日志',
        icon: <IconAlertTriangle />,
        path: '/logs',
      },
    ],
  },
];

export default function BlogHeader() {
  const router = useRouter();

  const [darkModeState, setDarkMode] = useRecoilState(darkMode);

  const [langModeState, setLangMode] = useRecoilState(langMode);

  const handleClickMoon = useCallback(
    () => () => {
      setDarkMode((cur) => !cur);
      const body = document.body;
      if (body.hasAttribute('theme-mode')) {
        body.removeAttribute('theme-mode');
      } else {
        body.setAttribute('theme-mode', 'dark');
      }
    },
    []
  );

  const onSelectKey = (selectData: OnSelectedData) => {
    router.push(selectData.selectedItems[0].path);
  };

  const blogHeader = {
    logo: (
      <Image src={'/images/blog_logo.svg'} width={60} height={60} alt="logo" />
    ),
    text: '博客首页',
  };

  const handleClickLang = useCallback(
    () => () => {
      setLangMode((currVal) => !currVal);
    },
    []
  );

  const footer = useMemo(
    () => (
      <>
        <Space>
          <CurrentTimer />

          <Tooltip
            className={'can-click'}
            content={darkModeState ? '点击切换亮色模式' : '点击切换暗色模式'}
          >
            <IconMoon size={'extra-large'} onClick={handleClickMoon} />
          </Tooltip>

          <Tooltip
            className={'can-click'}
            content={langModeState ? '切换到中文' : '切换到英语'}
          >
            <IconLanguage size={'extra-large'} onClick={handleClickLang} />
          </Tooltip>
        </Space>
      </>
    ),
    [langModeState, darkModeState, handleClickMoon, handleClickLang]
  );

  return (
    <>
      
      <div style={{ width: '100%' }}>
        <Nav
          mode={'horizontal'}
          items={items}
          onSelect={onSelectKey}
          header={blogHeader}
          footer={footer}
        ></Nav>
      </div>
    </>
  );
}
