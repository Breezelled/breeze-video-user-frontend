import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {RecoilRoot} from "recoil";
import {SessionProvider} from "next-auth/react";

export default function App ({ Component, pageProps }: AppProps) {
    return (
        // Higher Order Component
        <RecoilRoot>
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
        </RecoilRoot>

    )
}
