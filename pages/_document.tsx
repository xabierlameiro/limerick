import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
	DocumentInitialProps,
} from 'next/document'

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
		const initialProps = await Document.getInitialProps(ctx)

		return initialProps
	}
	render() {
		return (
			<Html lang="en">
				<Head>
				<link rel="icon" href="/favicon.svg" />
				<meta
					name="description"
					content="Xabi and Maria and we are looking for accommodation in Limerick city, if you are interested please contact us."
					/>
					<meta property="og:title" content="We are a couple looking for housing in Limerick city, I am a programmer and my girlfriend is a teacher. We are serious, friendly and do not smoke." />
					<meta
					property="og:description"
					content="We are looking for accommodation in Limerick"
					/>
					<meta
					property="og:image"
					content="/xabiymaria.jpg"
					/>
					<meta name="robots" content="all" />
					<link rel="canonical" hrefLang="en" href="https://couplelookinghomeinlimerick.com/" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument