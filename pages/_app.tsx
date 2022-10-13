import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

import Layout from "../components/layout";
import { getCookie } from "cookies-next";

function MyApp({ Component, pageProps }: AppProps) {
    const consent = getCookie("cookies-consents");

    return (
        <>
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

            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp;
