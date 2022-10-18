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
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/favicon.svg" />
                    <meta
                        property="og:site_name"
                        content="couplelookinghomeinlimerick"
                    />
                    <meta property="og:type" content="article" />

                    <meta
                        property="og:image"
                        content="https://couplelookinghomeinlimerick.com/rent_share_limerick.jpg"
                    />
                    <meta
                        property="og:url"
                        content=" http://www.couplelookinghomeinlimerick.com/"
                    />
                    <link
                        rel="canonical"
                        hrefLang="en"
                        href="https://couplelookinghomeinlimerick.com/"
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
