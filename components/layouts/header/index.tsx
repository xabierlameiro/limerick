import styles from "./header.module.css";
import Link from "next/link";

const Header = () => {
    return (
        <header>
            <nav className={styles.navBar}>
                <ul>
                    <li>
                        <Link href="/">
                            <a title="Go to home page">&#127968;</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/rip-limerick">
                            <a title="Go to rip limerick post">&#128214;</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
