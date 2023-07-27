import "../styles/global/globals.css";

import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={inter.className}>
			<CssBaseline />
			<Toaster
				position="top-center"
				toastOptions={{
					style: {
						padding: "16px 24px",
						color: "black",
						fontSize: 16,
					},
					success: {
						style: {
							background: "#D2F6CC",
						},
					},
					error: {
						style: {
							background: "#FAE6E8",
						},
					},
					duration: 2000,
				}}
			/>
			<RecoilRoot>
				<Component {...pageProps} />
			</RecoilRoot>
		</main>
	);
}
