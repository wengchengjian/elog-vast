import {
  List,
  Pagination,
  Space,
  Input,
  TagGroup,
  Tooltip,
} from "@douyinfe/semi-ui";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import styles from "@/styles/article.module.css";
import BlogPagination from "@@/business/BlogPagination";
import usePage from "@/hooks/usePage";
import { IconSearch, IconHelpCircle } from "@douyinfe/semi-icons";
import ArticleListContent from "@@/business/ArticleListContent";
import { Category } from "@/types/Category";
import TagList from "@@/base/TagList";
import { useRouter } from "next/router";
import useRequest from "@/hooks/useRequest";
import { sxios } from "@/request/server";
import {Tag} from "@/types/Tag";
import {cateStore, tagStore} from "@/store";
import {useSetRecoilState} from "recoil";

export type CategoryContentProps = {
  categories: Category[];
};

/**
 * Tab栏切换时，客户端渲染数据
 * @constructor
 */
export default function BlogCategoryContent({
  categories,
}: CategoryContentProps) {
  const router = useRouter();

  const [selectedKey, setSelectedKey] = useState("create_time");

  const { page, pageSize, setPage, setPageSize } = usePage();

  const [selectCategory, setCategory] = useState("");

  const [searchContent, setSearchContent] = useState("");

  const handleTabChange = (key: string) => {
    setSelectedKey(key);
  };
  const [loading, setLoading] = useState(false);
  const onPageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const [data, setData] = useState<any>();

  const setTagStore = useSetRecoilState(tagStore);
  useEffect(()=>{
    // 查询所有标签
    sxios.get("/tag/list").then(tagRes=>{
      let tags = tagRes as unknown as Tag[];
      let map = new Map<string, Tag>();
      for(let tag of tags) {
        map.set(tag.name, tag);
      }
      setTagStore(map);
    });
  },[setTagStore])

  useEffect(() => {
    setLoading(true);
    sxios
      .post("/article/queryArticleByPage", {
        current: page,
        pageSize,
        orderBy: selectedKey,
        categoryName: selectCategory,
        orderDesc: true,
        publish: 1,
      })
      .then((res) => {
        setData(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, pageSize, selectedKey, selectCategory]);

  const handleCLickSearchHelpIcon = () => {
    router.push("/help/search");
  };

  return (
    <>
      <Space vertical spacing={"loose"} style={{ width: "100%" }}>
        <Input
          style={{ width: "50%" }}
          prefix={<IconSearch />}
          suffix={
            <Tooltip content="搜索有关的帮助">
              <IconHelpCircle
                onClick={handleCLickSearchHelpIcon}
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
          }
          placeholder="搜索文章"
          showClear
          maxLength={50}
          onEnterPress={(e) => setSearchContent(e.currentTarget.value)}
        ></Input>
        <TagList
          onCancel={() => {
            setCategory("");
          }}
          tags={categories}
          onClick={(tag, nowTag) => {
            setCategory(tag.name);
          }}
        />
        <ArticleListContent
          total={data?.total ?? 0}
          data={data?.records ?? []}
          page={page}
          loading={loading}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onSearchKeyChange={handleTabChange}
        />
      </Space>
    </>
  );
}
