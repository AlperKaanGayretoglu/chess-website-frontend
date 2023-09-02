import { useEffect, useState } from "react";
import {
	ChessColor,
	ChessMoveResponse,
	ChessPieceResponse,
	PlayedChessMoveResponse,
} from "../../../data/api";

import { GetServerSidePropsContext } from "next";
import { useChessGame } from "../../../data/useChessGame";
import useChessMoveSocket from "../../../data/useChessMoveSocket";
import { redirectUser } from "../../../utils/checkUser";
import { ChessBoardUpdater } from "../../../utils/chessBoardUpdater";
import { showErrorToast } from "../../../utils/promiseToast";
import StopWatch from "../Stopwatch/Stopwatch";
import ChessBoard from "./ChessBoard/ChessBoard";

const ChessGame = ({
	gameId,
	username,
}: {
	gameId: string;
	username: string;
}) => {
	// TODO: Remove after testing
	const { time, handleStart, handlePause, handleReset } = StopWatch();

	const chessMoveSocket = useChessMoveSocket(gameId, getChessMoveCallback).data
		.chessMoveSocket;

	let game = useChessGame(gameId).data;
	const isInGame =
		game?.playerBlackUsername === username ||
		game?.playerWhiteUsername === username;
	let playerColor = !isInGame
		? null
		: game?.playerWhiteUsername === username
		? ChessColor.WHITE
		: ChessColor.BLACK;

	const [isMyTurn, setIsMyTurn] = useState<boolean>(false);

	const [board, setBoard] = useState<Map<string, ChessPieceResponse>>(
		new Map()
	);
	const chessBoardUpdater = new ChessBoardUpdater(setBoard);

	const [legalMoves, setLegalMoves] = useState<ChessMoveResponse[]>([]);

	useEffect(() => {
		if (game) {
			setBoard(game?.board?.board);
			setLegalMoves(game?.legalMovesForCurrentPlayer);
			setIsMyTurn(game?.currentPlayerUsername === username);
		}
	}, [game]);

	// Do this when a chessMove is received
	function getChessMoveCallback(chessMoveResponse: PlayedChessMoveResponse) {
		handlePause();
		const chessMoveElement = document.createElement("div");
		chessMoveElement.innerHTML = `<p>${chessMoveResponse.currentPlayerUsername}</p>`;

		if (chessMoveResponse.currentPlayerUsername === username) {
			setIsMyTurn(true);
			setLegalMoves(chessMoveResponse.legalMovesForCurrentPlayer);

			chessBoardUpdater.executeChessMove(chessMoveResponse.playedChessMove);
		}
	}

	function sendChessMove(coordinates: {
		fromRow: number;
		fromColumn: number;
		toRow: number;
		toColumn: number;
	}) {
		handleReset();
		handleStart();
		const move = legalMoves.find((move) => {
			const playedMove = move.playedPieceMove;
			const from = playedMove.from;
			const to = playedMove.to;
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

		setIsMyTurn(false);
		chessBoardUpdater.executeChessMove(move);

		chessMoveSocket.sendMessage({
			username: username as string,
			chessMoveId: move.id,
		});
	}

	return (
		<>
			<div>
				<span>{Math.floor((time / 1000) % 60)}.</span>
				<span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
			</div>
			<br></br>
			<div>
				<ChessBoard
					board={board}
					legalMoves={legalMoves}
					isInGame={isInGame}
					isMyTurn={isMyTurn}
					playerColor={playerColor}
					sendChessMove={sendChessMove}
				/>
			</div>
		</>
	);
};

export default ChessGame;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
