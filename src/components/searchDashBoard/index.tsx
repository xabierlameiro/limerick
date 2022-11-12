import React from "react";
import useSWR from "swr";
import styles from "../../../styles/search.module.css";
import Image from "next/image";
import { TbMapSearch, TbHome } from "react-icons/tb";
import Flats from "@/components/flats";

const SearchDashBoard = () => {
    const { data } = useSWR("/api/flats");
    const [display, setDisplay] = React.useState(false);

    return (
        <section>
            <h1>Limerick city centre home finder</h1>
            <div className={styles.information}>
                <p className={styles.textAlignCenter}>
                    Adverts available in limerick city centre:{" "}
                    <strong>{data.size}</strong>
                </p>
                <p className={styles.textAlignCenter}>
                    Showing the <strong>{data.listings.length}</strong> most
                    recent adds
                </p>
            </div>

            <div className={styles.grid}>
                <Flats data={data.listings} display={display} />
            </div>
            <TbHome
                color="#FFF"
                className={`${styles.mapIcon} ${
                    display ? styles.noDisplay : ""
                }`}
                title="Show home picture"
                size={35}
                onClick={() => setDisplay((display) => !display)}
            />
            <TbMapSearch
                color="#FFF"
                className={`${styles.mapIcon} ${
                    !display ? styles.noDisplay : ""
                }`}
                title="Show map information"
                size={35}
                onClick={() => setDisplay((display) => !display)}
            />
        </section>
    );
};

export default SearchDashBoard;
