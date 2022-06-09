import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {fetcher} from "../request";
import {SWRConfig} from "swr";


export default function MyApp({ Component, pageProps }: AppProps) {
  return <SWRConfig value={{
    refreshInterval: 3000,
    fetcher: fetcher,
  }}>
    <Component {...pageProps}/>
  </SWRConfig>
}

