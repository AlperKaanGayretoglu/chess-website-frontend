import {
	ButtonContainer,
	DefaultBase,
	DefaultContainer,
	Title,
} from "../styles/layouts/Default/Default.style";

import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { createChat } from "../services/chatApi";
import { PrimaryButton } from "../styles/components/Button/Button";
import General from "../styles/layouts/General/General";
import { redirectUser } from "../utils/checkUser";
import { promiseToast } from "../utils/promiseToast";

export default function Home() {
	const router = useRouter();

	async function promptCreateChat() {
		const res = await promiseToast(
			createChat({
				userIds: [
					"f6dd3821-d79b-49e5-98a9-94783be7ab98",
					"cdf8d686-3bbb-4a64-a8ee-dd24df45e7d9",
				],
			}),
			"create_chat_toast_id",
			"Chat Created Successfully",
			"Chat Creation Failed"
		);
		router.push("/chat/" + res.chatId);
	}

	return (
		<General>
			<DefaultBase>
				<DefaultContainer>
					<Title>Main Menu</Title>
					<ButtonContainer>
						<PrimaryButton onClick={promptCreateChat}>
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
