import Head from "next/head";
import {Avatar, Dropdown, Nav, Space, Switch} from "@douyinfe/semi-ui";
import {
    IconHome,
    IconCloud,
    IconLink,
    IconBolt,
    IconAppCenter,
    IconSetting,
    IconMoon,
    IconLanguage
} from '@douyinfe/semi-icons';
import {OnSelectedData} from "@douyinfe/semi-ui/navigation";
import {useRecoilState} from "recoil";
import {darkMode, langMode} from "../store";
import cn from "classnames";
import { Tooltip } from '@douyinfe/semi-ui';
// 网站标题
const title = "天动万象";

// 菜单列表
const items = [
    {
        itemKey: 'home',
        text: '首页',
        icon: <IconHome />
    },
    {
        itemKey: 'category',
        text: '分类',
        icon: <IconAppCenter />,
    },
    {
        text: '归档',
        icon: <IconSetting />,
        itemKey: 'record',
    },
    {
        itemKey: "miscellaneous_talk",
        text: "杂谈",
        icon: <IconCloud />
    },
    {
        itemKey: "link",
        text: "友情链接",
        icon: <IconLink />
    },
    {
        itemKey: "experimental",
        text: "实验室",
        icon: <IconBolt />
    },
]

const onSelectKey = (data: OnSelectedData)=>{
    console.log(data);
}

const blogHeader = {
    logo: <img src={"https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/webcast_logo.svg"} />,
    text: "博客首页",
}



export default function BlogHeader (){

    const [darkModeState,setDarkMode] = useRecoilState(darkMode);

    const [langModeState,setLangMode] = useRecoilState(langMode);


    const handleClickMoon = ()=>{
        setDarkMode((cur)=>!cur);
        const body = document.body;
        if (body.hasAttribute('theme-mode')) {
            body.removeAttribute('theme-mode');
        } else {
            body.setAttribute('theme-mode', 'dark');
        }
    }

    const handleClickLang = ()=>{
        setLangMode((currVal)=>!currVal);
    }

    const footer = <>
        <Space>
            <Tooltip className={"can-click"} content={darkModeState ? "点击切换亮色模式" : "点击切换暗色模式"}>
                <IconMoon size={"extra-large"} onClick={handleClickMoon}/>
            </Tooltip>

            <Tooltip className={"can-click"} content={langModeState ? "切换到中文" : "切换到英语"}>
                <IconLanguage size={"extra-large"} onClick={handleClickLang}/>
            </Tooltip>
        </Space>
    </>

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div style={{ width : "100%"}}>
                <Nav mode={"horizontal"}
                     items={items}
                     onSelect={onSelectKey}
                     header={blogHeader}
                     footer={footer}>
                </Nav>
            </div>
        </>
    )
}