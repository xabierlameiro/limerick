import type { ReactElement } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
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
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Header title={title} />
            </Suspense>
            {children}
            <Suspense fallback={<Loading />}>
                <Footer />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <Coookies />
            </Suspense>
        </>
    );
}
