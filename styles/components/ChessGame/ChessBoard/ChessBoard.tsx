import {
	ChessColor,
	ChessCoordinate,
	ChessMoveResponse,
	ChessPieceResponse,
} from "../../../../data/api";

import { GetServerSidePropsContext } from "next";
import ChessBoardImage from "../../../../images/chess/board/ChessBoardImage";
import { redirectUser } from "../../../../utils/checkUser";
import ChessPieceHighlights from "../ChessPieceHighlights/ChessPieceHighlights";
import ChessPieces from "../ChessPieces/ChessPieces";
import ChessShapes from "../ChessShapes/ChessShapes";
import getChessBoardActions from "./ChessBoardActions";

const ChessBoard = ({
	board,
	legalMoves,
	isInGame,
	isMyTurn,
	isWhiteInCheck,
	whiteKingCoordinates,
	isBlackInCheck,
	blackKingCoordinates,
	playerColor,
	sendChessMove,
}: {
	board: Map<string, ChessPieceResponse>;
	legalMoves: ChessMoveResponse[];
	isInGame: boolean;
	isMyTurn: boolean;
	isWhiteInCheck: boolean;
	whiteKingCoordinates: ChessCoordinate;
	isBlackInCheck: boolean;
	blackKingCoordinates: ChessCoordinate;
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
		semiSquareShapes,
		ghostSquareShapes,
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
			<ChessPieceHighlights
				left={left}
				top={top}
				size={size}
				isWhiteInCheck={isWhiteInCheck}
				whiteKingCoordinates={whiteKingCoordinates}
				isBlackInCheck={isBlackInCheck}
				blackKingCoordinates={blackKingCoordinates}
			/>
			<ChessShapes
				left={left}
				top={top}
				size={size}
				pointShapes={pointShapes}
				squareShapes={squareShapes}
				semiSquareShapes={semiSquareShapes}
				ghostSquareShapes={ghostSquareShapes}
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
