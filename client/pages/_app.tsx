import Nav from "@/components/Nav";
import "../styles/global.css";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";

const fetcher = async (uri: string) => {
    const resp = await fetch(uri)
    if (resp.ok) {
        return await resp.json()
    }
  }

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main>
      <SWRConfig value={{fetcher: fetcher}}>
        <Nav />
        <Component {...pageProps} />
      </SWRConfig>
    </main>
  );
}
