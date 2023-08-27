import { useEffect, useState } from "react";
import {
	ChessSquareResponse,
	PlayedChessMoveResponse,
} from "../../../data/api";

import { GetServerSidePropsContext } from "next";
import { useChessGame } from "../../../data/useChessGame";
import useChessMoveSocket from "../../../data/useChessMoveSocket";
import { redirectUser } from "../../../utils/checkUser";
import { Title } from "../../layouts/Default/Default.style";

const ChessBoard = ({
	gameId,
	username,
}: {
	gameId: string;
	username: string;
}) => {
	const chessMoveSocket = useChessMoveSocket(gameId, getChessMoveCallback).data
		.chessMoveSocket;

	const [board, setBoard] = useState([]);

	let game = useChessGame(gameId).data;
	const isInGame =
		game?.playerBlackUsername === username ||
		game?.playerWhiteUsername === username;

	useEffect(() => {
		if (game) {
			setBoard(game?.board?.board);
			console.log("Legal Moves:");
			console.log(game?.legalMovesForCurrentPlayer);
		}
	}, [game]);

	const [chessMove, setChessMove] = useState("");

	// Do this when a chessMove is received
	function getChessMoveCallback(chessMove: PlayedChessMoveResponse) {
		const chessMoveElement = document.createElement("div");
		chessMoveElement.innerHTML = `<p>${chessMove.currentPlayerUsername}</p>`;

		const mainElement = document.getElementById("stomp-table");

		if (mainElement) {
			mainElement.appendChild(chessMoveElement);
		}

		console.log("Played Chess Move:");
		console.log(chessMove);

		console.log("Board:");
		console.log(chessMove.chessBoard);

		console.log("New Legal Moves:");
		console.log(chessMove.legalMovesForCurrentPlayer);

		setBoard(chessMove.chessBoard.board);
	}

	function sendChessMove() {
		chessMoveSocket.sendMessage({
			username: username as string,
			chessMoveId: chessMove,
		});
	}

	return (
		<div>
			<div>
				{board?.map((row, rowIndex) => {
					return (
						<div key={rowIndex} style={{ display: "flex", margin: "2px" }}>
							{row.map((square: ChessSquareResponse, squareIndex: number) => {
								return (
									<div
										key={squareIndex}
										style={{
											display: "flex",
											margin: "2px",
											border: "1px solid black",
											width: "75px",
											height: "75px",
											justifyContent: "center",
											alignItems: "center",
											backgroundColor:
												square.chessColor === "BLACK" ? "gray" : "lightgray",
										}}
									>
										<p
											style={{
												color:
													square.chessPiece?.chessColor === "BLACK"
														? "black"
														: "white",
												fontWeight: "bold",
											}}
										>
											{square.chessPiece?.chessPieceType}
										</p>
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
			<Title>Send Move</Title>
			<div>
				{isInGame ? (
					<div>
						<input onChange={(event) => setChessMove(event.target.value)} />
						<button onClick={sendChessMove}>Send</button>
					</div>
				) : (
					<div>
						<input />
						<button>Send</button>
					</div>
				)}
			</div>
			<div id="stomp-table"></div>
		</div>
	);
};

export default ChessBoard;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
