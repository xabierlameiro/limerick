import React, { useEffect, useState } from "react";
import Link from "next/link";
import { setCookie, hasCookie } from "cookies-next";

import styles from "./cookies.module.css";

function Coookies() {
    const [consent, setConsent] = useState(true);

    useEffect(() => {
        setConsent(hasCookie("cookies-consents"));
    }, []);

    useEffect(() => {
        if (!consent) {
            document.body.style.overflow = "hidden";
        }
        return () => availableScroll();
    }, [consent]);

    const availableScroll = () => {
        document.body.style.overflow = "unset";
    };

    const acceptCookie = () => {
        setConsent(true);
        setCookie("cookies-consents", "true", { maxAge: 60 * 60 * 24 * 365 });
        availableScroll();
        (window as any).gtag("consent", "update", {
            ad_storage: "granted",
            analytics_storage: "granted",
        });
    };

    const denyCookie = () => {
        availableScroll();
        setConsent(true);
        setCookie("cookies-consents", "false", { maxAge: 60 * 60 * 24 * 365 });
    };

    if (consent) return null;

    return (
        <dialog open className={styles.cookies}>
            <div className={styles.cookies_content}>
                <header>🍪</header>
                <main>
                    We use cookies to enhance your browsing experience and
                    analyze our traffic. By clicking &quot;Accept All&quot;, you
                    consent to our use of{" "}
                    <Link href="/cookies-policy">
                        <a title="Go to Cookies policy">Cookies</a>
                    </Link>
                    .
                </main>
                <footer>
                    <button onClick={() => denyCookie()}>Deny All</button>
                    <button
                        className={styles.success}
                        onClick={() => acceptCookie()}
                    >
                        Accept All
                    </button>
                </footer>
            </div>
        </dialog>
    );
}

export default Coookies;
