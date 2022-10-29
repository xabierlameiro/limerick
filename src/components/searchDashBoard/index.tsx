import React from "react";
import useSWR from "swr";
import styles from "../../../styles/search.module.css";
import Image from "next/image";
import { TbMapSearch, TbHome } from "react-icons/tb";
import Flats from "@/components/flats";
import { toast } from "react-toastify";

const SearchDashBoard = () => {
    const { data } = useSWR("/api/flats");
    const [display, setDisplay] = React.useState(false);

    React.useEffect(() => {
        const img = "/looking_rent_limerick.png";
        const text = `It has been updated, there are now ${data.size}`;
        try {
            new Notification("Attention, urgent!!", {
                body: text,
                icon: img,
            });
        } catch (err) {
            toast.error((err as Error).message, {
                position: "top-center",
            });
        }
    }, [data.size]);

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
                <p className={styles.icon}>
                    <Image
                        width={40}
                        height={40}
                        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2026%2037%22%3E%3Cg%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M13%200C5.817%200%200%205.773%200%2012.918c0%207.655%205.59%2010.526%209.555%2017.16C12.09%2034.321%2011.342%2037%2013%2037c1.723%200%20.975-2.743%203.445-6.858C20.085%2023.86%2026%2020.605%2026%2012.918%2026%205.773%2020.183%200%2013%200z%22%20fill%3D%22%23C5221F%22/%3E%3Cpath%20d%3D%22M13.017%2035c-.233%200-.3-.065-.7-1.275-.332-1.046-.832-2.648-2.13-4.61-1.265-1.928-2.596-3.498-3.861-5.002C3.363%2020.517%201%2017.706%201%2012.64%201.033%206.199%206.393%201%2013.017%201S25%206.23%2025%2012.639c0%205.067-2.33%207.911-5.326%2011.507-1.232%201.504-2.53%203.073-3.795%204.97-1.265%201.928-1.797%203.498-2.13%204.544-.4%201.275-.5%201.34-.732%201.34z%22%20fill%3D%22%23EA4335%22/%3E%3Ctext%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%20x%3D%2213%22%20y%3D%2214%22%20font-family%3D%22Roboto%2C%20Arial%2C%20sans-serif%22%20font-size%3D%2216px%22%20fill%3D%22%23FFF%22%3EA%3C/text%3E%3C/g%3E%3C/svg%3E"
                        alt="hola"
                    />
                    Location of the property
                </p>
                <p className={styles.icon}>
                    RightWord Institute{" "}
                    <Image
                        width={40}
                        height={40}
                        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2026%2037%22%3E%3Cg%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M13%200C5.817%200%200%205.773%200%2012.918c0%207.655%205.59%2010.526%209.555%2017.16C12.09%2034.321%2011.342%2037%2013%2037c1.723%200%20.975-2.743%203.445-6.858C20.085%2023.86%2026%2020.605%2026%2012.918%2026%205.773%2020.183%200%2013%200z%22%20fill%3D%22%23C5221F%22/%3E%3Cpath%20d%3D%22M13.017%2035c-.233%200-.3-.065-.7-1.275-.332-1.046-.832-2.648-2.13-4.61-1.265-1.928-2.596-3.498-3.861-5.002C3.363%2020.517%201%2017.706%201%2012.64%201.033%206.199%206.393%201%2013.017%201S25%206.23%2025%2012.639c0%205.067-2.33%207.911-5.326%2011.507-1.232%201.504-2.53%203.073-3.795%204.97-1.265%201.928-1.797%203.498-2.13%204.544-.4%201.275-.5%201.34-.732%201.34z%22%20fill%3D%22%23EA4335%22/%3E%3Ctext%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%20x%3D%2213%22%20y%3D%2214%22%20font-family%3D%22Roboto%2C%20Arial%2C%20sans-serif%22%20font-size%3D%2216px%22%20fill%3D%22%23FFF%22%3EB%3C/text%3E%3C/g%3E%3C/svg%3E"
                        alt="hola"
                    />
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
