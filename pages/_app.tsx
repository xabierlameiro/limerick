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

    React.useEffect(() => {
        requestPermission();

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/firebase-messaging-sw.js").then(
                (registration) => {
                    console.log(
                        "Service worker registration succeeded:",
                        registration
                    );
                },
                (error) => {
                    console.error(
                        `Service worker registration failed: ${error}`
                    );
                }
            );
        } else {
            console.error("Service workers are not supported.");
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

            <Component {...pageProps} />
            <ToastContainer transition={Slide} />
        </>
    );
}

export default MyApp;
