import type { ReactElement } from "react";
import Consent from "../consent";

type Props = {
    children: ReactElement;
};

export default function Layout({ children }: Props) {
    return (
        <>
            {children}
            <Consent />
        </>
    );
}
