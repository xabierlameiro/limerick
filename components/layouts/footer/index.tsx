import { AiOutlineLinkedin, AiOutlineFacebook } from "react-icons/ai";
import styles from "./footer.module.css";
import Link from "next/link";

const Footer = () => {
    return (
        <footer>
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
                        <Link href="/cookies-policy">Cookies policy</Link>
                    </li>
                    <li>
                        <Link href="/legal-notice">Legal notice</Link>
                    </li>
                    <li>
                        <Link href="/privacy-policy">Privacy policy</Link>
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
