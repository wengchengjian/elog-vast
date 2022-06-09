import {Category} from "./Category";
import {Tag} from "./Tag";

export type Article = {
    id: string;
    title: string;
    description?: string;
    img?: string;
    content: string;
    category: Category;
    tags?: Tag[];
    readNum?: number;
    likeNum?: number;
    commentNum?: number;
    createTime:Date;
    updateTime:Date;
}
