import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
} from "next/document";

class MyDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }
    render() {
        return (
            <Html lang="en-IE">
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <link
                        href="/icons/favicon-16x16.png"
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                    />
                    <link
                        href="/icons/favicon-32x32.png"
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                    />
                    <link rel="icon" href="/favicon.svg" />
                    <link
                        rel="apple-touch-icon"
                        href="/looking_rent_limerick.png"
                    />
                    <meta name="theme-color" content="#ffffff" />
                    <meta
                        property="og:site_name"
                        content="couplelookinghomeinlimerick"
                    />
                    <meta property="og:type" content="website" />
                    <meta
                        property="og:image"
                        content="https://couplelookinghomeinlimerick.com/rent_share_limerick.jpg"
                    />
                    <meta
                        property="og:url"
                        content="https://couplelookinghomeinlimerick.com/"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
