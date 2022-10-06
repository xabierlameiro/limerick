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
					content="We are Xabi and Maria and we are looking for accommodation in Limerick."
					/>
					<meta property="og:title" content="We are looking for accommodation in Limerick" />
					<meta
					property="og:description"
					content="We are looking for accommodation in Limerick"
					/>
					<meta
					property="og:image"
					content="/xabiymaria.jpg"
					/>
					<meta name="robots" content="all" />
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