import React from "react";
import useSWR from "swr";
import styles from "../../../styles/search.module.css";
import { TbEyeOff, TbEye } from "react-icons/tb";
import Flats from "@/components/flats";

const SearchDashBoard = () => {
    const { data } = useSWR("/api/flats?number=10&area=58");
    const [display, setDisplay] = React.useState(false);

    return (
        <section className={styles.searchPage}>
            <div className={styles.informationBox}>
                <div className={styles.information}>
                    <p className={styles.textAlignCenter}>
                        The <strong>{data.listings.length}</strong> most recent
                        adds in real time
                    </p>
                </div>
                <div>
                    <TbEye
                        color="#FFF"
                        className={`${styles.mapIcon} ${
                            display ? styles.noDisplay : ""
                        }`}
                        title="Show home picture"
                        size={35}
                        onClick={() => setDisplay((display) => !display)}
                    />
                    <TbEyeOff
                        color="#FFF"
                        className={`${styles.mapIcon} ${
                            !display ? styles.noDisplay : ""
                        }`}
                        title="Show map information"
                        size={35}
                        onClick={() => setDisplay((display) => !display)}
                    />
                </div>
            </div>

            <div className={styles.grid}>
                <Flats data={data.listings} display={display} />
            </div>
        </section>
    );
};

export default SearchDashBoard;
