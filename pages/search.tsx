import React from "react";
import Head from "next/head";
import { SWRConfig } from "swr";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Layout from "@/components/layouts";
import type { ReactElement } from "react";
import dynamic from "next/dynamic";
import hash from "stable-hash";
import useFirstRender from "@/hooks/useFirstRender";
import { toast } from "react-toastify";
import Loading from "@/components/loading";

const SearchDashBoard = dynamic(() => import("@/components/searchDashBoard"), {
    suspense: true,
});

function logger(useSWRNext: any) {
    return (key: any, fetcher: any, config: any) => {
        const laggyDataRef = React.useRef();
        const { firstRender } = useFirstRender();

        const swr = useSWRNext(key, fetcher, config);

        React.useEffect(() => {
            if (swr.data !== undefined) {
                if (hash(laggyDataRef.current) !== hash(swr.data)) {
                    try {
                        const text = `It has been updated, there are now ${swr?.data?.size}`;
                        const title = "New change Available!!";
                        const options = {
                            body: text,
                            vibrate: [200, 100, 200],
                            image: "/rent_share_limerick.jpg",
                            tag: Math.floor(Math.random() * 1000).toString(),
                        };
                        if (!firstRender) {
                            navigator.serviceWorker.ready.then(
                                (registration) => {
                                    registration.showNotification(
                                        title,
                                        options
                                    );
                                }
                            );
                        }
                    } catch (err) {
                        toast.error((err as Error).message, {
                            position: "top-center",
                        });
                    }
                }

                laggyDataRef.current = swr.data;
            }
        }, [swr.data, firstRender]);

        return useSWRNext(key, fetcher, config);
    };
}

export default function Page({ fallback }: any) {
    const render = () => {
        return <Loading />;
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
                        use: [logger],
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
