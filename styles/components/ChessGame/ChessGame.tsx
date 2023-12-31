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
import PlayerNamePlate from "../PlayerNamePlate/PlayerNamePlate";
import Popup from "../Popup/Popup";
import StopWatch from "../Stopwatch/Stopwatch";
import ChessBoard from "./ChessBoard/ChessBoard";
import ChessPiece from "./ChessPieces/ChessPiece";

const ChessGame = ({
	gameId,
	username,
}: {
	gameId: string;
	username: string;
}) => {
	// TODO: Remove after testing
	const { time, handleStart, handlePause, handleReset } = StopWatch();

	const [isEndgamePopupOpen, setIsEndgamePopupOpen] = useState(false);
	const [endgamePopupMessage, setEndgamePopupMessage] = useState<string>("");
	const [winnerUsername, setWinnerUsername] = useState<string>(null);

	const [isPawnPromotionPopupOpen, setIsPawnPromotionPopupOpen] =
		useState(false);
	const [pawnPromotionPopupMoves, setPawnPromotionPopupMoves] = useState<
		ChessMoveResponse[]
	>([]);

	const chessMoveSocket = useChessMoveSocket(gameId, getChessMoveCallback).data
		.chessMoveSocket;

	let game = useChessGame(gameId).data;
	const isInGame =
		game?.playerBlackUsername === username ||
		game?.playerWhiteUsername === username;
	const playerColor = !isInGame
		? null
		: game?.playerWhiteUsername === username
		? ChessColor.WHITE
		: ChessColor.BLACK;

	const [isMyTurn, setIsMyTurn] = useState<boolean>(false);

	const [board, setBoard] = useState<Map<string, ChessPieceResponse>>(
		new Map()
	);
	const chessBoardUpdater = new ChessBoardUpdater(board, setBoard);

	const [legalMoves, setLegalMoves] = useState<ChessMoveResponse[]>([]);

	const [isWhiteInCheck, setIsWhiteInCheck] = useState<boolean>(false);
	const [isBlackInCheck, setIsBlackInCheck] = useState<boolean>(false);

	// TODO: Figure out if this is necessary
	useEffect(() => {
		setIsWhiteInCheck(false);
		setIsBlackInCheck(false);

		setIsEndgamePopupOpen(false);
		setEndgamePopupMessage("");
		setWinnerUsername("");

		setIsPawnPromotionPopupOpen(false);
		setPawnPromotionPopupMoves([]);
	}, []);

	useEffect(() => {
		if (game) {
			setBoard(game?.board?.board);
			setLegalMoves(game?.legalMovesForCurrentPlayer);
			setIsMyTurn(game?.currentPlayerUsername === username);

			if (game?.whiteInCheck) {
				setIsWhiteInCheck(true);
			} else {
				setIsWhiteInCheck(false);
			}

			if (game?.blackInCheck) {
				setIsBlackInCheck(true);
			} else {
				setIsBlackInCheck(false);
			}

			if (game?.hasGameEnded) {
				setIsEndgamePopupOpen(true);
				setEndgamePopupMessage(
					game?.chessGameStatus.toString().replace(/_/g, " ")
				);
				setWinnerUsername(game?.winnerUsername);
			} else {
				setIsEndgamePopupOpen(false);
				setEndgamePopupMessage("");
				setWinnerUsername("");
			}
		}
	}, [game]);

	// Do this when a chessMove is received
	function getChessMoveCallback(chessMoveResponse: PlayedChessMoveResponse) {
		handlePause();

		setIsWhiteInCheck(false);
		setIsBlackInCheck(false);

		if (chessMoveResponse.currentPlayerInCheck) {
			if (
				chessMoveResponse.currentPlayerUsername ===
				chessMoveResponse.whitePlayerUsername
			) {
				setIsWhiteInCheck(true);
			}
			if (
				chessMoveResponse.currentPlayerUsername ===
				chessMoveResponse.blackPlayerUsername
			) {
				setIsBlackInCheck(true);
			}
		}

		const isMyTurn = chessMoveResponse.currentPlayerUsername === username;
		const isInGame =
			chessMoveResponse.whitePlayerUsername === username ||
			chessMoveResponse.blackPlayerUsername === username;

		if (isMyTurn) {
			setIsMyTurn(true);
			setLegalMoves(chessMoveResponse.legalMovesForCurrentPlayer);
		}

		if (isMyTurn || !isInGame) {
			chessBoardUpdater.executeChessMove(chessMoveResponse.playedChessMove);
		}

		if (chessMoveResponse.hasGameEnded) {
			setIsEndgamePopupOpen(true);
			setEndgamePopupMessage(
				chessMoveResponse.chessGameStatus.toString().replace(/_/g, " ")
			);
			setWinnerUsername(chessMoveResponse.winnerUsername);
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

		const moves = legalMoves.filter((move) => {
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

		if (moves.length === 0) {
			showErrorToast("chess_move_error", "Invalid Chess Move");
			return;
		}

		if (moves.length == 1) {
			processChessMoveThatIsConfirmedValid(moves[0]);
		} else {
			setPawnPromotionPopupMoves(moves);
			setIsPawnPromotionPopupOpen(true);
		}
	}

	function processChessMoveThatIsConfirmedValid(chessMove: ChessMoveResponse) {
		setIsWhiteInCheck(false);
		setIsBlackInCheck(false);

		setIsMyTurn(false);
		chessBoardUpdater.executeChessMove(chessMove);

		setIsPawnPromotionPopupOpen(false);
		setPawnPromotionPopupMoves([]);

		chessMoveSocket.sendMessage({
			username: username as string,
			chessMoveId: chessMove.id,
		});
	}

	return (
		<div
			style={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<br></br>
			<PlayerNamePlate
				playerName={
					playerColor === null
						? game?.playerBlackUsername
						: playerColor === ChessColor.WHITE
						? game?.playerBlackUsername
						: game?.playerWhiteUsername
				}
				shouldHaveOutline={!isMyTurn}
			/>
			<div>
				<ChessBoard
					board={board}
					legalMoves={legalMoves}
					isInGame={isInGame}
					isMyTurn={isMyTurn}
					playerColor={playerColor === null ? ChessColor.WHITE : playerColor}
					isWhiteInCheck={isWhiteInCheck}
					whiteKingCoordinates={chessBoardUpdater.whiteKingCoordinates}
					isBlackInCheck={isBlackInCheck}
					blackKingCoordinates={chessBoardUpdater.blackKingCoordinates}
					sendChessMove={sendChessMove}
				/>
			</div>
			<PlayerNamePlate
				playerName={playerColor === null ? game?.playerWhiteUsername : username}
				shouldHaveOutline={isMyTurn}
			/>

			<div>
				<span>{Math.floor((time / 1000) % 60)}.</span>
				<span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
			</div>

			<Popup isOpen={isEndgamePopupOpen} setIsOpen={setIsEndgamePopupOpen}>
				<div
					style={{
						padding: "3em",
						fontSize: "1.5em",
						fontWeight: "bold",
						color: "white",
					}}
				>
					{winnerUsername ? (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								flexDirection: "column",
							}}
						>
							<div
								style={{
									fontSize: "2em",
								}}
							>
								{winnerUsername === username
									? "You Won!"
									: isInGame
									? "You Lost!"
									: winnerUsername === game?.playerWhiteUsername
									? "White Won!"
									: "Black Won!"}
							</div>
							<br />
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<PlayerNamePlate
									playerName={game?.playerWhiteUsername}
									shouldHaveOutline={
										game?.playerWhiteUsername === winnerUsername
									}
								/>
								<span
									style={{
										margin: "0 1em",
									}}
								>
									{" "}
									vs{" "}
								</span>
								<PlayerNamePlate
									playerName={game?.playerBlackUsername}
									shouldHaveOutline={
										game?.playerBlackUsername === winnerUsername
									}
								/>
							</div>
						</div>
					) : (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								flexDirection: "column",
							}}
						>
							<div
								style={{
									fontSize: "2em",
									textAlign: "center",
								}}
							>
								DRAW!
							</div>
							<br />
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<PlayerNamePlate
									playerName={game?.playerWhiteUsername}
									shouldHaveOutline={false}
								/>
								<span
									style={{
										margin: "0 1em",
									}}
								>
									{" "}
									vs{" "}
								</span>
								<PlayerNamePlate
									playerName={game?.playerBlackUsername}
									shouldHaveOutline={false}
								/>
							</div>
						</div>
					)}
					<br />
					<div
						style={{
							textAlign: "center",
						}}
					>
						{endgamePopupMessage}
					</div>
				</div>
			</Popup>
			<Popup
				isOpen={isPawnPromotionPopupOpen}
				setIsOpen={setIsPawnPromotionPopupOpen}
			>
				<div
					style={{
						padding: "1em",
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{pawnPromotionPopupMoves
						.sort(
							(a, b) =>
								a.pieceTransformationMove.transformTo.chessPieceType
									.toString()
									.charCodeAt(0) -
								b.pieceTransformationMove.transformTo.chessPieceType
									.toString()
									.charCodeAt(0)
						)
						.map((move, index) => {
							const piece = move.pieceTransformationMove.transformTo;
							const size = "5em";

							return (
								<div
									onClick={() => processChessMoveThatIsConfirmedValid(move)}
									key={index}
									style={{
										margin: "1em",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<ChessPiece
										key={index}
										chessColor={piece.chessColor}
										chessPieceType={piece.chessPieceType}
										size={size}
										pixelCoordinates={null}
									/>
								</div>
							);
						})}
				</div>
			</Popup>
		</div>
	);
};

export default ChessGame;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
