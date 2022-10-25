import Image from "next/image";
import noImage600x600 from "public/no-image-600x600.jpg";
import useSWR, { SWRConfig } from "swr";

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

    const items = noDuplicatesList.map((item: any) => {
        const { listing } = item;
        return (
            <div key={listing.id}>
                <Image
                    width="600"
                    height="600"
                    src={
                        listing.media.totalImages > 0
                            ? listing.media.images?.[0].size600x600
                            : noImage600x600
                    }
                    alt={listing.title}
                />
                <div>Price : {listing.price}</div>
                <div>Title : {listing.title}</div>
                <div>Baths : {listing.numBathrooms}</div>
                <div>Rooms : {listing.numBedrooms}</div>
                <div>
                    Publish date: {new Date(listing.publishDate).toString()}
                </div>
            </div>
        );
    });
    return <SWRConfig value={{ fallback }}>{items} </SWRConfig>;
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
            }}
        >
            <Flats />
        </SWRConfig>
    );
}
