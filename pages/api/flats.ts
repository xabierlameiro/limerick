// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const data = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/token`);
    const { accessToken } = await data.json();
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
            pageSize: "50",
        },
        geoFilter: {
            storedShapeIds: ["58"], //17 county //37 city //58 city centre
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
            pageSize: "50",
        },
        geoFilter: {
            storedShapeIds: ["58"], //17 county //37 city //58 city centre
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

    res.status(200).json({
        ...resultOfRent,
        listings: [...resultOfRent.listings, ...resultOfSharing.listings],
    });
}
