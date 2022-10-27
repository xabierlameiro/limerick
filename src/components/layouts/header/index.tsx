import styles from "./header.module.css";
import Link from "next/link";

const Header = () => {
    return (
        <header>
            <nav className={styles.navBar}>
                <ul>
                    <li>
                        <Link href="/" title="Go to home page">
                            &#127968;
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/rip-limerick"
                            title="Go to rip limerick post"
                        >
                            &#128214;
                        </Link>
                    </li>
                    <li>
                        <Link href="/search" title="Go to search page">
                            &#128269;
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
