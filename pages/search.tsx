import Image from "next/image";
import noImage600x600 from "public/no-image-600x600.jpg";
import useSWR, { SWRConfig } from "swr";
import hash from "stable-hash";
import styles from "../styles/search.module.css";

function Flats({ fallback }: any) {
    const { data } = useSWR("/api/flats");

    const uniqueIds = new Set();

    const noDuplicatesList = data.listings.filter((element: any) => {
        const [altitute, latitude] = element.listing.point.coordinates;
        const isDuplicate = uniqueIds.has(altitute + latitude);

        uniqueIds.add(altitute + latitude);

        if (!isDuplicate) {
            return true;
        }

        return false;
    });

    const sortListFromPublishDate = noDuplicatesList.sort(
        (a: any, b: any) => b.listing.publishDate - a.listing.publishDate
    );

    const items = sortListFromPublishDate.map((item: any) => {
        const { listing } = item;
        return (
            <div className={styles.card} key={listing.id}>
                <Image
                    src={
                        listing.media.totalImages > 0
                            ? listing.media.images?.[0].size600x600
                            : noImage600x600
                    }
                    alt={listing.title}
                    fill
                />
                <div> {listing.title}</div>
                <div className={styles.price}>Price {listing.price}</div>
                <div>Id : {listing.id}</div>
                <div>Category : {listing.category}</div>
                <div>
                    Baths : {listing.numBathrooms ?? "No info"} | Room :{" "}
                    {listing.numBedrooms}
                </div>
                <div>
                    Publish date:{" "}
                    {new Date(listing.publishDate).toLocaleString()}
                </div>
            </div>
        );
    });
    return (
        <SWRConfig value={{ fallback }}>
            <div className={styles.grid}>{items}</div>{" "}
        </SWRConfig>
    );
}

export async function getServerSideProps() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/flats`);
    const result = await response.json();

    return {
        props: {
            fallback: {
                "/api/flats": result,
            },
        },
    };
}

export default function Page({ fallback }: any) {
    return (
        <SWRConfig
            value={{
                fallback,
                fetcher: (arg: any, ...args: any) =>
                    fetch(arg, ...args).then((res) => res.json()),
                refreshInterval: 20000,
                refreshWhenHidden: true,
                refreshWhenOffline: true,
            }}
        >
            <Flats />
        </SWRConfig>
    );
}
