import {
	DefaultBase,
	RowDirectionContainer,
} from "../../styles/layouts/Default/Default.style";

import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { COOKIE_NAMES } from "../../data/constants";
import ChessGame from "../../styles/components/ChessGame/ChessGame";
import General from "../../styles/layouts/General/General";
import { redirectUser } from "../../utils/checkUser";

export default function Home() {
	const param = useRouter().query;
	const { id } = param;
	const gameId = id as string;
	const username = getCookie(COOKIE_NAMES.username) as string;

	return (
		<General isHeaderOnLeft={true}>
			<DefaultBase>
				<RowDirectionContainer>
					<ChessGame gameId={gameId} username={username} />
				</RowDirectionContainer>
			</DefaultBase>
		</General>
	);
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
