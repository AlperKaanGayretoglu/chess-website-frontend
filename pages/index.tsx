import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { PrimaryButton } from "../styles/components/Button/Button";
import General from "../styles/layouts/General/General";
import { redirectUser } from "../utils/checkUser";

export default function Home() {
	const router = useRouter();

	return (
		<General>
			<PrimaryButton onClick={() => router.push("/send_message")}>
				Create Chat
			</PrimaryButton>
		</General>
	);
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
