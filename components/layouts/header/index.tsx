import styles from "./header.module.css";
import Link from "next/link";

const Header = () => {
    return (
        <nav className={styles.navBar}>
            <ul>
                <li>
                    <Link href="/">&#127968;</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Header;
