import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { fetcher, getMusic } from "@/request";
import { SWRConfig } from "swr";
import { RecoilRoot } from "recoil";
import zh_CN from "@douyinfe/semi-ui/lib/es/locale/source/zh_CN";
import { LocaleProvider } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import Head from "next/head";
import { MUSIC_CACHE, MUSIC_CACHE_STR } from "@/constants";

// 网站标题
const title = "天动万象";

/**
 * TODO 国际化功能
 * @param Component
 * @param pageProps
 * @constructor
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  if (!show) {
    return null;
  }

  const oldAudio: AudioProps[] = MUSIC_CACHE.get(MUSIC_CACHE_STR) ?? [];

  return (
    <SWRConfig
      value={{
        refreshInterval: 60 * 1000,
        fetcher: fetcher,
        revalidateIfStale: true,
      }}
    >
      <RecoilRoot>
        <LocaleProvider locale={zh_CN}>
          <Head>
            <title>{title}</title>
          </Head>
          <Component {...pageProps} />
        </LocaleProvider>
      </RecoilRoot>
    </SWRConfig>
  );
}
