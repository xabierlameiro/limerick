// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const tokenRequest = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/token`
    );
    const { accessToken } = await tokenRequest.json();
    var myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${accessToken}`);
    myHeaders.append("brand", "daft");
    myHeaders.append("content-type", "application/json");
    myHeaders.append("platform", "web");

    let raw = JSON.stringify({
        section: "sharing",
        filters: [
            {
                name: "adState",
                values: ["published"],
            },
        ],
        andFilters: [],
        ranges: [],
        paging: {
            from: "0",
            pageSize: "10",
        },
        geoFilter: {
            storedShapeIds: ["37"], //17 county //37 city //58 city centre
            geoSearchType: "STORED_SHAPES",
        },
        terms: "",
        sort: "publishDateDesc",
    });

    let requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    const responseOfSharing = await fetch(
        "https://gateway.daft.ie/old/v1/listings",
        requestOptions
    );
    const resultOfSharing = await responseOfSharing.json();

    raw = JSON.stringify({
        section: "residential-to-rent",
        filters: [
            {
                name: "adState",
                values: ["published"],
            },
        ],
        andFilters: [],
        ranges: [],
        paging: {
            from: "0",
            pageSize: "10",
        },
        geoFilter: {
            storedShapeIds: ["37"], //17 county //37 city //58 city centre
            geoSearchType: "STORED_SHAPES",
        },
        terms: "",
        sort: "publishDateDesc",
    });

    requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    const responseOfRent = await fetch(
        "https://gateway.daft.ie/old/v1/listings",
        requestOptions
    );
    const resultOfRent = await responseOfRent.json();

    const data = {
        ...resultOfRent,
        listings: [...resultOfRent.listings, ...resultOfSharing.listings],
    };

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

    const NUM_OF_ELEMENTS = 10;

    res.status(200).json({
        size: sortListFromPublishDate.length,
        listings: sortListFromPublishDate.slice(0, NUM_OF_ELEMENTS),
    });
}
