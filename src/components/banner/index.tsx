import styles from "./banner.module.css";
import pictureRoute from "public/rent_share_limerick.jpg";
import Image from "next/image";

const Banner = () => (
    <figure>
        <section className={styles.imageWrapper}>
            <Image
                alt="Xabi and María looking home in Limerick city, find a rent Limerick"
                src={pictureRoute}
                priority
                className={styles.picture}
                layout="fill"
                objectFit="contain"
                placeholder="blur"
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
