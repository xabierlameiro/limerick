import React from "react";
import Head from "next/head";
import { SWRConfig } from "swr";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Layout from "@/components/layouts";
import type { ReactElement } from "react";
import SearchDashBoard from "@/components/searchDashBoard";

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

            <Wrapper
                apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}`}
                render={render}
            >
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
                    <SearchDashBoard />
                </SWRConfig>
            </Wrapper>
        </>
    );
}

Page.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

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
