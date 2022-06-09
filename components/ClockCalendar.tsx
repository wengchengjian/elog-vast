import styles from "../styles/UserInfo.module.css";
import {Avatar, Calendar, Space, Typography} from "@douyinfe/semi-ui";
import {SysUser} from "../types/user";
import {Num2ToStr} from "../utils";
import cn from "classnames";
import exp from "constants";
type UserInfoProps = {
    user: SysUser;
}
const { Paragraph, Title, Text } = Typography;

export default function ClockCalendar ({user}: UserInfoProps){

    const dailyEventStyle = {
        position: 'absolute',
        left: '0',
        right: '0',
        borderRadius: '3px',
        boxSizing: 'border-box',
        border: 'var(--semi-color-primary) 1px solid',
        padding: '10px',
        backgroundColor: 'var(--semi-color-primary-light-default)',
        overflow: 'hidden',
    };

    const dateRender = (dateString:string) => {
        if (dateString === new Date(2022, 6, 9).toString()) {
            return (
                <>
                    <div style={{ ...dailyEventStyle, top: '500px', height: 50 }}>吃饭 🍰</div>
                    <div style={{ ...dailyEventStyle, top: '0', height: 400 }}>睡觉 😪</div>
                    <div style={{ ...dailyEventStyle, top: '700px', height: 100 }}>打豆豆 🎮</div>
                </>
            );
        } else {
            return null;
        }
    };

    return <>
        <Space spacing={"loose"} className={cn(["white-back-box",`${styles.user_info}`])} vertical={true} align={"center"}>
            <Title heading={3}>已连续打卡<span style={{color:"green"}}>{5}</span>天</Title>
            <Calendar dateGridRender={dateRender} markWeekend mode={"month"} height={300}/>
        </Space>
    </>
}