import Document, { Head, Html, Main, NextScript } from "next/document";

import { GetServerSidePropsContext } from "next";
import { redirectUser } from "../utils/checkUser";

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="tr">
				<Head></Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
