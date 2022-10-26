// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    var myHeaders = new Headers();
    myHeaders.append(
        "cookie",
        '_ga=GA1.2.68893105.1660755100; daftCC="{\\"version\\":1,\\"createDate\\":1660755100398,\\"lastUpdated\\":1660755100398,\\"expires\\":1676656300398,\\"strictlyNecessary\\":true,\\"analytics\\":true,\\"functional\\":true,\\"advertising\\":true}"; NPS_215a2284_last_seen=1660755101358; _hjSessionUser_1177694=eyJpZCI6ImY2ZmU4Yzc3LTdmYzAtNWQ3NS05ZTE3LTY1YWNmZTE5MGRmYiIsImNyZWF0ZWQiOjE2NjA3NTUxMDE0ODAsImV4aXN0aW5nIjp0cnVlfQ==; _gaexp=GAX1.2.my2-2cRKSIGzFJlNm_wOcA.19306.4; daftMap=true; _gid=GA1.2.1394455285.1666680311; daftBB=true; _hjMinimizedPolls=849316; _hjSession_1177694=eyJpZCI6ImU2Njk4ODk1LTk4Y2ItNGUwMi1hOWE3LTViYjEzMmM2ZmY4YiIsImNyZWF0ZWQiOjE2NjY2OTc3NTgxNjIsImluU2FtcGxlIjpmYWxzZX0=; _gat_UA-1011713-17=1; session=eyJyZXR1cm5UbyI6Ii9zaGFyZS8xMy1jcmVzZW50LWF2ZW51ZS1saW1lcmljay1jaXR5LWNvLWxpbWVyaWNrLzQyNTQ5MzgiLCJwYXNzcG9ydCI6e30sInVzZXJTdWIiOiJjYjJmNWU4Mi00MmI4LTQ0MWUtOGQyZC00ZjEwYzgyNjJkODAiLCJsYXN0UmVmcmVzaCI6MTY2NjY5ODUyMzE5OH0=; session.sig=LzU0D403ACZCC2MerIIgHRitZ_0'
    );
    let requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
    };

    // Fetch access_token from user
    const responseOfUser = await fetch(
        "https://www.daft.ie/api/user",
        requestOptions
    );
    const dataOfUser = await responseOfUser.json();

    var myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${dataOfUser.access_token}`);
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
            storedShapeIds: ["37"], //17 county //37 city
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
            storedShapeIds: ["37"], //17 county //37 city
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
