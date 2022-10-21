import { AiOutlineInfoCircle } from "react-icons/ai";
import styles from "./tooltip.module.css";

const Tooltip = () => {
    return (
        <div className={`${styles.tooltip} ${styles.left}`}>
            <AiOutlineInfoCircle />
            <span className={styles.tiptext}>Minimum six months</span>
        </div>
    );
};

export default Tooltip;
