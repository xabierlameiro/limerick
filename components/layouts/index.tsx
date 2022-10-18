import type { ReactElement } from "react";
import Coookies from "../cookies";
import Footer from "./footer";
import Header from "./header";

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
