import type { ReactElement } from "react";
import Footer from "./footer";
import Header from "./header";
import Head from "next/head";

type Props = {
    children: ReactElement;
    meta: {
        title: string;
        nofollow: boolean;
    };
};

export default function Layout({ meta, children }: Props) {
    return (
        <>
            <Head>
                <title data-testid="meta-title">{meta.title}</title>
                {meta.nofollow && (
                    <meta name="robots" content="noindex, nofollow" />
                )}
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
