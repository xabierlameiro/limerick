import type { ReactElement } from "react";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import Coookies from "@/components/cookies";

type Props = {
    children: ReactElement;
};

export default function Layout({ children }: Props) {
    return (
        <>
            <Header />
            {children}
            <Footer />
            <Coookies />
        </>
    );
}
