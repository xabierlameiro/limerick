import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
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
                  `}
            </Script>
            <Script
                async
                id="Adsense-id"
                data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT}
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                strategy="afterInteractive"
                onError={(e) => {
                    console.error("Script failed to load", e);
                }}
            />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
