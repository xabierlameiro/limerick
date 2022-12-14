import React from "react";
import Head from "next/head";
import { SWRConfig } from "swr";
import Layout from "@/components/layouts";
import type { ReactElement } from "react";
import dynamic from "next/dynamic";

const SearchDashBoard = dynamic(() => import("@/components/searchDashBoard"), {
    suspense: true,
});

function logger(useSWRNext: any) {
    return (key: any, fetcher: any, config: any) => {
        return useSWRNext(key, fetcher, config);
    };
}

export default function Page({ fallback }: any) {
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

            <SWRConfig
                value={{
                    fallback,
                    fetcher: (arg: any, ...args: any) =>
                        fetch(arg, ...args).then((res) => res.json()),
                    refreshInterval: 300000,
                    refreshWhenHidden: true,
                    refreshWhenOffline: true,
                    // use: [logger],
                }}
            >
                <SearchDashBoard />
            </SWRConfig>
        </>
    );
}

Page.getLayout = function getLayout(page: ReactElement) {
    return <Layout title="Limerick city centre home finder">{page}</Layout>;
};

export async function getServerSideProps() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/flats?number=10&area=58`
    );
    const result = await response.json();

    return {
        props: {
            fallback: {
                "/api/flats?number=10&area=58": result,
            },
        },
    };
}
