import type { ReactElement } from "react";
import Head from "next/head";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import Coookies from "@/components/cookies";

type Props = {
    cookies: boolean;
    children: ReactElement;
    meta: {
        title: string;
        nofollow: boolean;
        description: string;
    };
};

export default function LayoutWithSEO({ meta, cookies, children }: Props) {
    return (
        <>
            <Head>
                <title data-testid="meta-title">{meta.title}</title>
                <meta property="og:title" content={meta.title} />
                <meta name="description" content={meta.description} />
                <meta property="og:description" content={meta.description} />
                {meta.nofollow ? (
                    <meta name="robots" content="noindex, nofollow" />
                ) : (
                    <meta name="robots" content="all" />
                )}
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
            {cookies && <Coookies />}
        </>
    );
}
