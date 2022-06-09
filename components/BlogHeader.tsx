import Head from "next/head";
import {Avatar, Dropdown, Nav} from "@douyinfe/semi-ui";
import { IconHome, IconCloud,IconLink,IconBolt,IconAppCenter, IconSetting } from '@douyinfe/semi-icons';
import {OnSelectedData} from "@douyinfe/semi-ui/navigation";

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

const footer =
    <>
        <Dropdown position={"bottomRight"}
                  render={
                <Dropdown.Menu>
                    <Dropdown.Item>进入后台</Dropdown.Item>
                    <Dropdown.Item>退出</Dropdown.Item>
                </Dropdown.Menu>
                }>
            <Avatar size={"small"} color={"light-blue"} style={{ margin : 4 }}>BD</Avatar>
            <span>Bytedancer</span>
        </Dropdown>
    </>

export default function BlogHeader (){
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