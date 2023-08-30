import { ChessMoveResponse, ChessSquareResponse } from "../../../../data/api";

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
	sendChessMove,
}: {
	board: ChessSquareResponse[][];
	legalMoves: ChessMoveResponse[];
	isInGame: boolean;
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
	} = getChessBoardActions(board, legalMoves, sendChessMove);

	const eventListeners = isInGame
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
				pointShapes={pointShapes}
				squareShapes={squareShapes}
				ghostPiece={ghostPiece}
				left={left}
				top={top}
				size={size}
			/>
			<ChessPieces
				board={board}
				left={left}
				top={top}
				size={size}
				ghostLikePiece={ghostLikePiece}
			/>
		</div>
	);
};

export default ChessBoard;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
