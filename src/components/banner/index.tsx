import styles from "./banner.module.css";
import pictureRoute from "public/rent_share_limerick.jpg";
import Image from "next/future/image";

const Banner = () => (
    <figure>
        <section className={styles.imageWrapper}>
            <Image
                fill
                priority
                alt="Xabi and María looking home in Limerick city, find a rent Limerick"
                placeholder="blur"
                sizes="100vw"
                src={pictureRoute}
                className={styles.picture}
            />
        </section>
        <span className={styles.badge}>
            <a title="Go to the contact information" href="#contact">
                Looking for tenants in limerick city?
            </a>
        </span>
    </figure>
);
export default Banner;
