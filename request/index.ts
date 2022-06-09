import axios from 'axios';
import {Toast} from "@douyinfe/semi-ui";

// axios.defaults.baseURL = "http://localhost:7895/api";

axios.defaults.headers.common['Authorization'] = "adadadadadaddad";


export const fetcher = async (url: string) => {
    const res = await axios.get(url)

    // 如果状态码不在 200-299 的范围内，
    // 我们仍然尝试解析并抛出它。
    if (res.data.code!==0 || !res.data.success) {
        // 将额外的信息附加到错误对象上。
        const error = new Error(res.data.msg)

        Toast.error(res.data.msg);

        throw error
    }
    return res.data.data;
}