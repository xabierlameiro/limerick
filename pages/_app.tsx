import React from "react";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import Head from "next/head";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ToastContainer, Slide } from "react-toastify";
import { requestPermission } from "@/firebase";
import { MapPolygonsProvider } from "@/context/MapPolygonsContext";
import { Wrapper } from "@googlemaps/react-wrapper";
import { SWRConfig } from "swr";
import Loading from "@/components/loading";
import "nprogress/nprogress.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const consent = getCookie("cookies-consents");
    const router = useRouter();
    const getLayout = Component.getLayout ?? ((page) => page);
    const canonicalUrl = `${process.env.NEXT_PUBLIC_DOMAIN}${router.asPath}`;
    const notRegistered = React.useRef(true);

    React.useEffect(() => {
        if (notRegistered.current) {
            requestPermission();
            notRegistered.current = false;
        }
    }, []);

    return getLayout(
        <>
            <Head>
                <link rel="canonical" href={canonicalUrl} />
            </Head>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <Script id="ga-script" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                        page_path: window.location.pathname,
                        });
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADDS}');    
                    gtag('consent', 'default', {
                        'ad_storage': 'denied',
                        'analytics_storage': 'denied'
                    });
                  `}
            </Script>
            {consent === true && (
                <Script id="consupd" strategy="afterInteractive">
                    {`   
                        gtag('consent', 'update', {
                            'ad_storage': 'granted',
                            'analytics_storage': 'granted'
                            });
                    `}
                </Script>
            )}

            <>
                <Wrapper
                    apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}&libraries=drawing`}
                    render={() => <Loading />}
                >
                    <MapPolygonsProvider>
                        <SWRConfig
                            value={{
                                fetcher: (arg: any, ...args: any) =>
                                    fetch(arg, ...args).then((res) =>
                                        res.json()
                                    ),
                            }}
                        >
                            <Component {...pageProps} />
                        </SWRConfig>
                    </MapPolygonsProvider>
                </Wrapper>
                <ToastContainer transition={Slide} />
            </>
        </>
    );
}

export default MyApp;
