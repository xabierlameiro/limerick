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
            <Script
                strategy="afterInteractive"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3537017956623483"
                crossOrigin="anonymous"
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
                id="Adsense-id"
                data-ad-client="ca-pub-3537017956623483"
                async
                strategy="afterInteractive"
                onError={(e) => {
                    console.error("Script failed to load", e);
                }}
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
