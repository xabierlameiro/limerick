// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    error?: Error;
    message?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const data = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/token`);
    const { accessToken } = await data.json();

    var myHeaders = new Headers();
    myHeaders.append("authority", "gateway.daft.ie");
    myHeaders.append("accept", "application/json");
    myHeaders.append("accept-language", "es-ES,es;q=0.9,en;q=0.8");
    myHeaders.append("authorization", `Bearer ${accessToken}`);
    myHeaders.append("brand", "daft");
    myHeaders.append("cache-control", "no-cache, no-store");
    myHeaders.append("content-type", "application/json");
    myHeaders.append("dnt", "1");
    myHeaders.append("expires", "0");
    myHeaders.append("origin", "https://www.daft.ie");
    myHeaders.append("platform", "web");
    myHeaders.append("pragma", "no-cache");
    myHeaders.append("referer", "https://www.daft.ie/");
    myHeaders.append(
        "sec-ch-ua",
        '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"'
    );
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", '"macOS"');
    myHeaders.append("sec-fetch-dest", "empty");
    myHeaders.append("sec-fetch-mode", "cors");
    myHeaders.append("sec-fetch-site", "same-site");
    myHeaders.append(
        "user-agent",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
    );

    const { query } = req;
    const { id } = query;

    var raw = JSON.stringify({
        adId: id,
        name: "Xabier Lameiro",
        email: "xabier.lameiro@gmail.com",
        message:
            "Hello!!! My name is Xabier and I have seen your rental ad. I am a senior web developer working and living with my partner in Limerick,\n" +
            " with a Irish family who can give references. I also have a letter of recommendation from my company and my last landlady.\n" +
            " We are looking for accommodation for a long stay, if you want we can talk by WhatsApp and meet to see the house.\n" +
            " Please get in touch if you need more information. Thanks",
        phone: "+353 85 883 8479",
    });

    var requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    try {
        await fetch("https://gateway.daft.ie/old/v1/reply", requestOptions);
        res.status(200).json({ message: "OK" });
    } catch (err: any) {
        res.status(500).json({ error: err });
    }
}
