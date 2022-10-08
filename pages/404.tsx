import Link from "next/link";
import Head from "next/head";

export default function Custom404() {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <h1>404 - Page Not Found</h1>
            <br />
            <Link href="/"> Back to home</Link>
        </>
    );
}
