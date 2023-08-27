import { useEffect, useState } from "react";
import {
	ChessMoveResponse,
	ChessSquareResponse,
	PlayedChessMoveResponse,
} from "../../../data/api";

import { GetServerSidePropsContext } from "next";
import { useChessGame } from "../../../data/useChessGame";
import useChessMoveSocket from "../../../data/useChessMoveSocket";
import { redirectUser } from "../../../utils/checkUser";
import { showErrorToast } from "../../../utils/promiseToast";
import { Title } from "../../layouts/Default/Default.style";

const ChessGame = ({
	gameId,
	username,
}: {
	gameId: string;
	username: string;
}) => {
	const chessMoveSocket = useChessMoveSocket(gameId, getChessMoveCallback).data
		.chessMoveSocket;

	let game = useChessGame(gameId).data;
	const isInGame =
		game?.playerBlackUsername === username ||
		game?.playerWhiteUsername === username;

	const [board, setBoard] = useState([]);
	const [coordinates, setCoordinates] = useState({
		fromRow: 0,
		fromColumn: 0,
		toRow: 0,
		toColumn: 0,
	});

	const [legalMoves, setLegalMoves] = useState<ChessMoveResponse[]>([]);

	useEffect(() => {
		if (game) {
			setBoard(game?.board?.board);
			setLegalMoves(game?.legalMovesForCurrentPlayer);

			console.log("Legal Moves:");
			console.log(game?.legalMovesForCurrentPlayer);
		}
	}, [game]);

	// Do this when a chessMove is received
	function getChessMoveCallback(chessMove: PlayedChessMoveResponse) {
		const chessMoveElement = document.createElement("div");
		chessMoveElement.innerHTML = `<p>${chessMove.currentPlayerUsername}</p>`;

		const mainElement = document.getElementById("stomp-table");

		if (mainElement) {
			mainElement.appendChild(chessMoveElement);
		}

		console.log("New Legal Moves:");
		console.log(chessMove.legalMovesForCurrentPlayer);

		setLegalMoves(chessMove.legalMovesForCurrentPlayer);
	}

	function sendChessMove() {
		const move = legalMoves.find((move) => {
			const playedMove = move.playedPieceMove;
			const from = playedMove.from;
			const to = playedMove.to;
			console.log(from, to);
			return (
				from.row === coordinates.fromRow &&
				from.column === coordinates.fromColumn &&
				to.row === coordinates.toRow &&
				to.column === coordinates.toColumn
			);
		});

		if (!move) {
			showErrorToast("chess_move_error", "Invalid Chess Move");
			return;
		}

		const from = move.playedPieceMove.from;
		const to = move.playedPieceMove.to;

		setBoard((board) => {
			const newBoard = [...board];
			newBoard[to.row][to.column] = newBoard[from.row][from.column];
			newBoard[from.row][from.column] = null;
			return newBoard;
		});

		chessMoveSocket.sendMessage({
			username: username as string,
			chessMoveId: move.id,
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
												square?.chessColor === "BLACK" ? "gray" : "lightgray",
										}}
									>
										<p
											style={{
												color:
													square?.chessPiece?.chessColor === "BLACK"
														? "black"
														: "white",
												fontWeight: "bold",
											}}
										>
											{square?.chessPiece?.chessPieceType}
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
						<div>
							<label>From Row</label>
							<input
								onChange={(event) =>
									setCoordinates({
										...coordinates,
										fromRow: parseInt(event.target.value),
									})
								}
							/>
						</div>
						<div>
							<label>From Column</label>
							<input
								onChange={(event) =>
									setCoordinates({
										...coordinates,
										fromColumn: parseInt(event.target.value),
									})
								}
							/>
						</div>
						<div>
							<label>To Row</label>
							<input
								onChange={(event) =>
									setCoordinates({
										...coordinates,
										toRow: parseInt(event.target.value),
									})
								}
							/>
						</div>
						<div>
							<label>To Column</label>
							<input
								onChange={(event) =>
									setCoordinates({
										...coordinates,
										toColumn: parseInt(event.target.value),
									})
								}
							/>
						</div>
						<button onClick={sendChessMove}>Send</button>
					</div>
				) : (
					<div>
						<div>
							<label>From Row</label>
							<input />
						</div>
						<div>
							<label>From Column</label>
							<input />
						</div>
						<div>
							<label>To Row</label>
							<input />
						</div>
						<div>
							<label>To Column</label>
							<input />
						</div>
						<button>Send</button>
					</div>
				)}
			</div>
			<div id="stomp-table"></div>
		</div>
	);
};

export default ChessGame;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
