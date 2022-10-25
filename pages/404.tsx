import Link from "next/link";
import Head from "next/head";

export default function Custom404() {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <header></header>
            <main>
                <h1>404 - Page Not Found</h1>
                <br />
                <Link href="/" title="Go to Home page">
                    Back to home
                </Link>
            </main>
            <footer></footer>
        </>
    );
}
