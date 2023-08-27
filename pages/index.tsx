import {
	ButtonContainer,
	DefaultBase,
	DefaultContainer,
	Title,
} from "../styles/layouts/Default/Default.style";

import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { COOKIE_NAMES } from "../data/constants";
import { createChessGame } from "../services/chessGameApi";
import { PrimaryButton } from "../styles/components/Button/Button";
import TextInput from "../styles/components/Input/TextInput";
import General from "../styles/layouts/General/General";
import { redirectUser } from "../utils/checkUser";
import { promiseToast } from "../utils/promiseToast";

export default function Home() {
	const router = useRouter();

	const username = getCookie(COOKIE_NAMES.username) as string;

	async function promptCreateChessGame() {
		const other_username = (
			document.getElementById("other_username") as HTMLInputElement
		).value;

		const res = await promiseToast(
			createChessGame({
				firstPlayerUsername: username,
				secondPlayerUsername: other_username,
			}),
			"create_chess_game_toast_id",
			"Chess Game Created Successfully",
			"Chess Game Creation Failed"
		);

		if (!res.message) {
			router.push("/game/" + res.gameId);
		}
	}

	return (
		<General>
			<DefaultBase>
				<DefaultContainer>
					<Title>Main Menu</Title>
					<ButtonContainer>
						<PrimaryButton onClick={promptCreateChessGame}>
							Create Chat
						</PrimaryButton>
						<TextInput
							id="other_username"
							label={"With:"}
							placeholder="Username"
						/>
					</ButtonContainer>
				</DefaultContainer>
			</DefaultBase>
		</General>
	);
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
