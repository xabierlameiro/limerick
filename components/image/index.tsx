import NextImage from "next/image";
import type ImageProps from "next";

import styles from "./image.module.css";

type StaticImageData = {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
};

type props = typeof ImageProps & { src: string | StaticImageData; alt: string };

const Image = (props: props) => {
    return (
        <figure className={styles.imageWrapper}>
            <NextImage {...props} />
        </figure>
    );
};

export default Image;
