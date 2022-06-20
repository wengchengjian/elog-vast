import { Link } from "@/types/link"
import { Card, CardGroup, Space,Typography } from "@douyinfe/semi-ui"
import Image from "next/image"
import { useRouter } from "next/router"
import { useCallback } from "react"
import styles from "@/styles/link.module.css";
export type BlogLinkContentProps = {
    links:Link[]
}
const { Meta } = Card;
const { Paragraph, Title, Text } = Typography;

export default function BlogLinkContent({links}:BlogLinkContentProps){

    const router = useRouter();

    const handleClickRouteToBlog = (link:Link)=>{
        router.push(link.address);
    }

    const getLinkList = useCallback(()=>{
        return <>
            <CardGroup spacing={30}>
                {
                    links.map((link)=>{
                        return <>
                        <div className={styles['card_style']} onClick={()=>handleClickRouteToBlog(link)}>
                        <Card
                            
                            cover={<Image
                                width={300}
                                height={200} 
                    alt="友链" 
                    src={link.logo} 
                />} >
                        <Meta title={<Title ellipsis={{rows:1,showTooltip:true}} heading={4}>{link.name}</Title>} description={<Paragraph ellipsis={{rows:3}}>{link.description}</Paragraph>} />
                            </Card>
                        </div>
                            
                        </>
                    })
                }
            </CardGroup>
        </>
    },[links]);

    return <>
        <Space className="white-back-box" vertical spacing={"loose"} align="start">
            <div style={{width:"100%"}}>
                <Title heading={5} style={{marginBottom:"20px"}}>
                    友链列表
                </Title>
                {
                    getLinkList()
                }
            </div>
        </Space>
    </>
}