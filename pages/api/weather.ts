// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    var myHeaders = new Headers();
    myHeaders.append("authority", "www.google.com");
    myHeaders.append(
        "accept",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
    );
    myHeaders.append("accept-language", "en-GB,en-US;q=0.9,en;q=0.8");
    myHeaders.append("cache-control", "no-cache");
    myHeaders.append(
        "cookie",
        "OTZ=6744092_52_56_123900_52_436380; CONSENT=PENDING+963; OGPC=19022622-1:; SID=QgjXMuPnO7qOhO963OmTpwhE9lAnjVUE-Wo_vZPLksFvrQywqJovQ9T0SPxWURl9Gxlgvw.; __Secure-1PSID=QgjXMuPnO7qOhO963OmTpwhE9lAnjVUE-Wo_vZPLksFvrQywvGT2i8HibyXng5aUNOtnXw.; __Secure-3PSID=QgjXMuPnO7qOhO963OmTpwhE9lAnjVUE-Wo_vZPLksFvrQyw35T_8PF01KC7TtDpowkfWQ.; HSID=AXgEW90ZMmbP5JrcP; SSID=AXHZFvXYqbnMcCdN_; APISID=Ju2Lvaxr_IcgGxMN/AZDCyHAa3hhCWXRY1; SAPISID=BM2dxHMltcm2JvSk/AbjQmpnUHHX1nG7cw; __Secure-1PAPISID=BM2dxHMltcm2JvSk/AbjQmpnUHHX1nG7cw; __Secure-3PAPISID=BM2dxHMltcm2JvSk/AbjQmpnUHHX1nG7cw; AEC=AakniGMV2r5BjzpVxvx8IagW3_z3bj4Jm41iqsq7pp7acT4_Amuv2HE3VkA; NID=511=PjxXLdBDThLWEa95tbVXFm0YZPHfSB9QHYLHR_m2wH64kr96XNULtpLhof67ypD9CR-aUIRVKOfhOm5D9mXPaC2uCndRoWqFI0CipFwNKxwY4N_gmRje1_kYeupgTkmn4A9ftvkCtPwO8oy6YibAKcavVN2cYr5jMBeECQA2ePJnFK873Orft40NoddvK-Pq0WzpMdmplmiFs5Ocohy3j8K5x-YvJfmZc93Lem02oRgDQ9eOkswMuL9IAbQnSwcjTEmxO-r9P2Y1cdjkFNBoVYM5PEbATMt5IscsVMd4c8djzhCxGoxwjg6eojG-p3I_BhnHcwPzdETatrYDNqizB5hxHJ7q7NJvSTKscOEgXOTSL6BaqZoSOdPkZHTc1IHcmdR0at88kTgXM-0BeIIPl6poeNp4AWo; __Secure-ENID=8.SE=SyKAt-4al_wHGry68TQdTKH5UhlNhZWHtf5H8_PpeyxYVJMaIpx_Ii6Avxi2Fb-n7TOtOYtuUIvDFGkrQl7hBHxOPvk9d2kIWKtTgJQfIECXx1JJ40fBUTv1FYVptYGS52XzOXGKcybfzngOB0bou7MU2lTX7pZRlqKiquMohH7r05F7xyiNcgj20xtDcfFENQZub5cN8CiLv1qot8ScgP6V9P_pFlbxNdAITIwSPW1_vkN_J2Ntxi3cn6dQOEZ4TPG9f2Iq1qn-AsPzQXEWXq1pVwkukljKqbVGl1EPYq26DcOCMzdEdIL4aR16CpvTWKyx_nRJhm8B6dk; 1P_JAR=2022-11-18-23; DV=M1tP2ZjsSVkYgIjjJVKBVqaBLeDSSBg; UULE=a+cm9sZTogMQpwcm9kdWNlcjogMTIKdGltZXN0YW1wOiAxNjY4ODE1OTE3ODA5MDAwCmxhdGxuZyB7CiAgbGF0aXR1ZGVfZTc6IDUyNjUyNTk3MgogIGxvbmdpdHVkZV9lNzogLTg2MjgwNDUwCn0KcmFkaXVzOiAxMDExNS4zMDAwMDAwMDAwMDEKcHJvdmVuYW5jZTogNgo=; SIDCC=AIKkIs0HVF7N32vsahfawg2qIkvnFeByMQrLWn2Yiqrv--f7GrGYEYJuF6whBXtyWlj63b3qUNs; __Secure-1PSIDCC=AIKkIs2GOkWepFlEAwH6jeSb9xGzhq0FhYzzK4FEhMb_NSFkGox31G_dtd9refTbXO9VZBYNb6H0; __Secure-3PSIDCC=AIKkIs1mWBXS6aEgopFcN_r_In0OYWJBJY89UpWxeDgzktGeyQdXGlQ6AGNsMWH1nFomjVlRsaOP; SIDCC=AIKkIs0FWnnY2_c48JtHqhEGhh6986gQbn64d_KirQvCel3ZdiK_-s2f8Yx7JB-jkSVGXD0Wd2c; __Secure-1PSIDCC=AIKkIs0eOhYevBLx8HHPw8dq-11wfM7gNyDJeg-bzFeLZKdKZf1biPwTldWGImnkRA72A0WI5ldz; __Secure-3PSIDCC=AIKkIs1oBtXQMU4CtBOfeEwXUou_tu9JAUFTiXlgJlHLAl--YplCo8Y0ODOY4Dk3k8RXQTBt7D5f"
    );
    myHeaders.append("dnt", "1");
    myHeaders.append("pragma", "no-cache");
    myHeaders.append("referer", "https://www.google.com/");
    myHeaders.append(
        "sec-ch-ua",
        '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"'
    );
    myHeaders.append("sec-ch-ua-arch", '"x86"');
    myHeaders.append("sec-ch-ua-bitness", '"64"');
    myHeaders.append("sec-ch-ua-full-version", '"107.0.5304.110"');
    myHeaders.append(
        "sec-ch-ua-full-version-list",
        '"Google Chrome";v="107.0.5304.110", "Chromium";v="107.0.5304.110", "Not=A?Brand";v="24.0.0.0"'
    );
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-model", '""');
    myHeaders.append("sec-ch-ua-platform", '"macOS"');
    myHeaders.append("sec-ch-ua-platform-version", '"12.6.0"');
    myHeaders.append("sec-ch-ua-wow64", "?0");
    myHeaders.append("sec-fetch-dest", "document");
    myHeaders.append("sec-fetch-mode", "navigate");
    myHeaders.append("sec-fetch-site", "same-origin");
    myHeaders.append("sec-fetch-user", "?1");
    myHeaders.append("upgrade-insecure-requests", "1");
    myHeaders.append(
        "user-agent",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
    );
    myHeaders.append(
        "x-client-data",
        "CIy2yQEIo7bJAQjDtskBCKmdygEIyvbKAQiWocsBCIbFzAEIwMbMAQi52MwBCOXrzAEI8e3MAQj28cwBCIz3zAEImPfMAQjN+cwBCOH5zAEI9PnMAQjC+swBCPD6zAEIp/vMAQio/MwBCMCKqwI="
    );

    var requestOptions: any = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const response = await fetch(
        "https://www.google.com/search?q=tiempo+limerick&rlz=1C5CHFA_enES940ES940&ei=lxt4Y5yyHt-ChbIP_4uasAQ&ved=0ahUKEwjc2ZGY97j7AhVfQUEAHf-FBkYQ4dUDCA8&uact=5&oq=tiempo+limerick&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCAAQgAQyBggAEAcQHjIICAAQBRAHEB4yCAgAEAUQBxAeMgYIABAHEB4yCAgAEAcQHhAPMggIABAFEAcQHjIICAAQBRAHEB4yBQgAEIYDMgUIABCGAzoKCAAQRxDWBBCwAzoHCAAQgAQQDToGCAAQHhANOggIABAeEA8QDToICAAQBRAeEA1KBAhBGABKBAhGGABQogVY3A1gpBBoAnABeACAAVKIAZcDkgEBNpgBAKABAcgBCMABAQ&sclient=gws-wiz-serp",
        requestOptions
    );
    const dataString = await response.text();

    const pre = dataString.substring(
        dataString.indexOf('id="wob_tm" style="display:inline">') + 33,
        dataString.indexOf('id="wob_tm" style="display:inline">') + 38
    );

    const grade = pre.substring(pre.indexOf(">") + 1, pre.indexOf("<"));

    const example2 = dataString.substring(
        dataString.indexOf('id="wob_tci"') - 2,
        dataString.indexOf('id="wob_tci"') - 80
    );
    const url = example2.substring(
        example2.indexOf("ssl.") + 4,
        example2.indexOf(".png") + 4
    );

    res.status(200).json({
        grade: `${grade}º`,
        url: `//${url}`,
    });
}
