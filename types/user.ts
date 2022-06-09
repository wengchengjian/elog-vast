export type SysUser = {
    id: string;
    username: string;
    avatar?: string;
    description?: string;
    post?: string;
    email?: string;
    phone?: string;
    
    articleNum?: number;
    readNum?: number;
    likeNum?: number;
}