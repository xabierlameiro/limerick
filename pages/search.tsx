import React from "react";
import Head from "next/head";
import useSWR, { SWRConfig } from "swr";
import styles from "../styles/search.module.css";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Card from "@/components/card";
import { TbMapSearch, TbHome } from "react-icons/tb";
import Layout from "@/components/layouts";
import type { ReactElement } from "react";

const Delayed = ({ children, index }: any) => {
    const [isShown, setIsShown] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsShown(true);
        }, index * 2000);
        return () => clearTimeout(timer);
    }, [index]);
    return isShown ? children : null;
};

export { Delayed };

const items = (data: any, display: boolean) =>
    data.map((item: any, index: any) => {
        const { listing } = item;
        const ref = React.useRef<HTMLDivElement>(null);
        return (
            <Delayed key={listing.id} index={index}>
                <Card
                    display={display}
                    key={listing.id}
                    mapReference={ref}
                    listing={listing}
                    index={index}
                    item={item}
                >
                    <div
                        className={` ${display ? styles.noDisplay : ""}`}
                        ref={ref}
                    />
                </Card>
            </Delayed>
        );
    });

function Flats({ fallback }: any) {
    const { data } = useSWR("/api/flats");
    const [display, setDisplay] = React.useState(false);
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

    return (
        <section>
            <h1>Limerick city centre home finder</h1>
            <div className={styles.grid}>
                {items(sortListFromPublishDate, display)}
            </div>
            <TbHome
                className={`${styles.mapIcon} ${
                    display ? styles.noDisplay : ""
                }`}
                title="Show home picture"
                size="4em"
                onClick={() => setDisplay((display) => !display)}
            />
            <TbMapSearch
                className={`${styles.mapIcon} ${
                    !display ? styles.noDisplay : ""
                }`}
                title="Show map information"
                size="4em"
                onClick={() => setDisplay((display) => !display)}
            />
        </section>
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
    const render = (status: Status) => {
        return <span>{status}</span>;
    };
    return (
        <>
            <Head>
                <title>Limerick city centre home finder</title>
                <meta
                    name="description"
                    content="Limerick city centre home finder is a tool to find accommodation in Limerick city centre created by me."
                />
                <meta
                    property="og:title"
                    content="Limerick city centre home finder
                city or share"
                />
                <meta
                    property="og:description"
                    content="Limerick city centre home finder is a tool to find accommodation in Limerick city centre created by me."
                />
                <meta name="robots" content="all" />
            </Head>

            <Wrapper apiKey={`${process.env.google_maps_key}`} render={render}>
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
            </Wrapper>
        </>
    );
}

Page.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
