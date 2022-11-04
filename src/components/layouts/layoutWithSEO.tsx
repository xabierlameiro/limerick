import type { ReactElement } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const Header = dynamic(
    () => import("@/components/layouts/header").then((mod) => mod),
    { suspense: true }
);

const Footer = dynamic(
    () => import("@/components/layouts/footer").then((mod) => mod),
    { suspense: true }
);

const Coookies = dynamic(
    () => import("@/components/cookies").then((mod) => mod),
    { suspense: true }
);

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
