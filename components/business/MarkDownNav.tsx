import { useState } from 'react';
import styles from '@/styles/markdown.module.css';
import { Article } from '@/types/article';
import MarkNav from 'markdown-navbar';
import {turndownService} from "@/utils";
export type MarkDownNavProps = {
  article: Article;
};

export default function MarkDownNav({ article }: MarkDownNavProps) {
  const [navVisible, setNavVisible] = useState(true);

  return (
    <>
      <div className={`${styles['nav-container']} `}>
        <MarkNav source={article.content ?? turndownService.turndown(article.contentFormat ?? "")} />
      </div>
    </>
  );
}
