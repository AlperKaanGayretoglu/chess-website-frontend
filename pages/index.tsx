import {
	ButtonContainer,
	DefaultBase,
	DefaultContainer,
	Title,
} from "../styles/layouts/Default/Default.style";

import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { PrimaryButton } from "../styles/components/Button/Button";
import General from "../styles/layouts/General/General";
import { redirectUser } from "../utils/checkUser";

export default function Home() {
	const router = useRouter();

	return (
		<General>
			<DefaultBase>
				<DefaultContainer>
					<Title>Main Menu</Title>
					<ButtonContainer>
						<PrimaryButton onClick={() => router.push("/send_message")}>
							Create Chat
						</PrimaryButton>
					</ButtonContainer>
				</DefaultContainer>
			</DefaultBase>
		</General>
	);
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
