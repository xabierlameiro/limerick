import React from "react";
import type { ReactElement } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import NProgress from "nprogress";
import Router from "next/router";
import Loading from "@/components/loading";

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
    children: ReactElement;
    title?: string;
};

export default function Layout({ title, children }: Props) {
    const [loading, setLoading] = React.useState(false);
    NProgress.configure({ showSpinner: false });

    React.useEffect(() => {
        const start = () => {
            setLoading(true);
            NProgress.start();
        };
        const end = () => {
            setLoading(false);
            NProgress.done();
        };
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);
        return () => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        };
    }, []);

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Header title={title} />
            </Suspense>
            {loading ? <Loading /> : children}
            <Suspense fallback={<Loading />}>
                <Footer />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <Coookies />
            </Suspense>
        </>
    );
}
