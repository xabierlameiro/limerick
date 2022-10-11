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
                        name="description"
                        content="We are a couple looking for rent, share, housing in limerick city, I am a programmer and my girlfriend is a teacher. We are serious, friendly and do not smoke."
                    />
                    <meta
                        property="og:site_name"
                        content="couplelookinghomeinlimerick"
                    ></meta>
                    <meta property="og:type" content="article" />
                    <meta
                        property="og:title"
                        content="We are looking for accommodation, rent in Limerick city center"
                    />
                    <meta
                        property="og:description"
                        content="We are a couple looking for rent, share, housing in limerick city, I am a programmer and my girlfriend is a teacher. We are serious, friendly and do not smoke."
                    />
                    <meta
                        property="og:image"
                        content="https://couplelookinghomeinlimerick.com/xabiymaria.jpg"
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
