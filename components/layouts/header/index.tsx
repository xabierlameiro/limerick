import styles from "./header.module.css";
import Link from "next/link";

const Header = () => {
    return (
        <header>
            <nav className={styles.navBar}>
                <ul>
                    <li>
                        <Link href="/">&#127968;</Link>
                    </li>
                    <li>
                        <Link href="/rip-limerick">&#128214;</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
