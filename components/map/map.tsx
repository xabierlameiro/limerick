import styles from "../../styles/Home.module.css";

export const Map = () => {
    return (
        <div className={styles.mapContainer}>
            <div className={styles.ribbon}>
                <span>
                    <a
                        title="Share in facebook"
                        href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcouplelookinghomeinlimerick.com%2F"
                        rel="noreferrer"
                        target="_blank"
                    >
                        please share
                    </a>
                </span>
            </div>
            <iframe
                title="This is the map where you can see the preferred zone in Limerick city."
                className={styles.map}
                src="https://maps.google.com/maps?q=52.65945039377984,%20-8.631359605893005&t=&z=13&ie=UTF8&iwloc=&output=embed"
            />
        </div>
    );
};
