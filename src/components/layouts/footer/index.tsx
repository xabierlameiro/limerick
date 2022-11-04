import { AiOutlineLinkedin, AiOutlineFacebook } from "react-icons/ai";
import Link from "next/link";

import styles from "./footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <nav className={styles.media}>
                <a
                    title="Linkedin profile"
                    onClick={() =>
                        (window as any).gtag("event", "Linkedin", {
                            event_category: "click",
                            event_label: "Go to Xabier Linkedin profile",
                        })
                    }
                    href="https://www.linkedin.com/in/xlameiro/"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.icon}
                >
                    <AiOutlineLinkedin
                        title="Link to the developer Xabier's Linkedin profile"
                        size="2em"
                    />
                </a>
                <a
                    title="Facebook network"
                    onClick={() =>
                        (window as any).gtag("event", "Facebook", {
                            event_category: "click",
                            event_label: "Go to Maria Facebook profile",
                        })
                    }
                    href="https://www.facebook.com/mariajose.oteroces"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.icon}
                >
                    <AiOutlineFacebook
                        title="Link to Maria Facebook profile"
                        size="2em"
                    />
                </a>
            </nav>
            <nav className={styles.policies}>
                <ul>
                    <li>
                        <Link
                            href="/cookies-policy"
                            title="Go to Cookies policy page"
                        >
                            Cookies policy
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/legal-notice"
                            title="Go to Legal notice page"
                        >
                            Legal notice
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/privacy-policy"
                            title="Go to Privacy policy page"
                        >
                            Privacy policy
                        </Link>
                    </li>
                </ul>
            </nav>
            <span className={styles.copyright}>
                Copyright © 2022 Xabier Lameiro. All rights reserved.
            </span>
        </footer>
    );
};

export default Footer;
