import type { ReactElement } from "react";
import Footer from "./footer";
import Header from "./header";
import Head from "next/head";

type Props = {
    children: ReactElement;
    meta: {
        title: string;
        nofollow: boolean;
        description: string;
    };
};

export default function Layout({ meta, children }: Props) {
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
        </>
    );
}
