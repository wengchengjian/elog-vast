import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {fetcher} from "../request";
import {SWRConfig} from "swr";
import {RecoilRoot} from "recoil";
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import ko_KR from '@douyinfe/semi-ui/lib/es/locale/source/ko_KR';
import ja_JP from '@douyinfe/semi-ui/lib/es/locale/source/ja_JP';
import vi_VN from '@douyinfe/semi-ui/lib/es/locale/source/vi_VN';
import ru_RU from '@douyinfe/semi-ui/lib/es/locale/source/ru_RU';
import id_ID from '@douyinfe/semi-ui/lib/es/locale/source/id_ID';
import ms_MY from '@douyinfe/semi-ui/lib/es/locale/source/ms_MY';
import th_TH from '@douyinfe/semi-ui/lib/es/locale/source/th_TH';
import tr_TR from '@douyinfe/semi-ui/lib/es/locale/source/tr_TR';
import pt_BR from '@douyinfe/semi-ui/lib/es/locale/source/pt_BR';
import zh_TW from '@douyinfe/semi-ui/lib/es/locale/source/zh_TW';
import ar from '@douyinfe/semi-ui/lib/es/locale/source/ar';
import es from '@douyinfe/semi-ui/lib/es/locale/source/es';
import { LocaleProvider } from '@douyinfe/semi-ui';

/**
 * TODO 国际化功能
 * @param Component
 * @param pageProps
 * @constructor
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  return <SWRConfig value={{
    refreshInterval: 3000,
    fetcher: fetcher,
  }}>
    <RecoilRoot>
      <LocaleProvider locale={zh_CN}>
        <Component {...pageProps}/>
      </LocaleProvider>
    </RecoilRoot>
  </SWRConfig>
}

