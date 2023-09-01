import {
	ChessColor,
	ChessMoveResponse,
	ChessPieceResponse,
} from "../../../../data/api";

import { GetServerSidePropsContext } from "next";
import ChessBoardImage from "../../../../images/chess/board/ChessBoardImage";
import { redirectUser } from "../../../../utils/checkUser";
import ChessPieces from "../ChessPieces/ChessPieces";
import ChessShapes from "../ChessShapes/ChessShapes";
import getChessBoardActions from "./ChessBoardActions";

const ChessBoard = ({
	board,
	legalMoves,
	isInGame,
	isMyTurn,
	playerColor,
	sendChessMove,
}: {
	board: Map<string, ChessPieceResponse>;
	legalMoves: ChessMoveResponse[];
	isInGame: boolean;
	isMyTurn: boolean;
	playerColor: ChessColor;
	sendChessMove: (chessMove: {
		fromRow: number;
		fromColumn: number;
		toRow: number;
		toColumn: number;
	}) => void;
}) => {
	const {
		// ------------------------------ STATES ------------------------------
		// SHAPE STATES
		pointShapes,
		squareShapes,
		// GHOST STATE
		ghostPiece,
		ghostLikePiece,
		// BOARD STATES
		left,
		top,
		size,
		// ------------------------------ EVENT HANDLERS ------------------------------
		handleClick,
		handleMouseDown,
		handleMouseUp,
		handleMouseMove,
		handleResize,
	} = getChessBoardActions(playerColor, board, legalMoves, sendChessMove);

	const eventListeners =
		isInGame && isMyTurn
			? {
					onClick: handleClick,
					onMouseDown: handleMouseDown,
					onMouseUp: handleMouseUp,
					onMouseMove: handleMouseMove,
			  }
			: {};

	return (
		<div {...eventListeners}>
			<ChessBoardImage onResize={handleResize} />
			<ChessShapes
				left={left}
				top={top}
				size={size}
				pointShapes={pointShapes}
				squareShapes={squareShapes}
				ghostPiece={ghostPiece}
			/>
			<ChessPieces
				left={left}
				top={top}
				size={size}
				board={board}
				ghostLikePiece={ghostLikePiece}
			/>
		</div>
	);
};

export default ChessBoard;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
