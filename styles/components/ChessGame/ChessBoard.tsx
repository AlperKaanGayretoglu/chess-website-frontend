import {
	ChessColor,
	ChessCoordinate,
	ChessMoveResponse,
	ChessPieceType,
	ChessSquareResponse,
} from "../../../data/api";

import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import ChessBoardImage from "../../../images/chess/board/ChessBoardImage";
import { redirectUser } from "../../../utils/checkUser";
import { Title } from "../../layouts/Default/Default.style";
import ChessPieces from "./ChessPieces/ChessPieces";
import ChessShapes from "./ChessShapes/ChessShapes";

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
	const [left, setLeft] = useState(0);
	const [top, setTop] = useState(0);
	const [size, setSize] = useState(0);

	const [pointShapes, setPointShapes] = useState<ChessCoordinate[]>([]);
	const [squareShapes, setSquareShapes] = useState<ChessCoordinate[]>([]);
	const [ghostPiece, setGhostPiece] = useState<{
		x: number;
		y: number;
		chessColor: ChessColor;
		chessPieceType: ChessPieceType;
	}>(null);
	const [ghostLikePiece, setGhostLikePiece] = useState<ChessCoordinate>(null);

	const [selectedCoordinates, setSelectedCoordinates] = useState<{
		row: number;
		column: number;
	}>(null);

	const [isDragging, setIsDragging] = useState(false);
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [startCoordinates, setStartCoordinates] = useState<{
		row: number;
		column: number;
	}>(null);

	function handleResize(newPosition: {
		left: number;
		top: number;
		size: number;
	}) {
		setLeft(newPosition.left);
		setTop(newPosition.top);
		setSize(newPosition.size);
	}

	function handleClick(event: { clientX: number; clientY: number }) {
		if (isDragging) {
			return;
		}

		const x = event.clientX;
		const y = event.clientY + window.scrollY;
		const row = Math.floor((y - top) / (size / 8));
		const column = Math.floor((x - left) / (size / 8));

		if (!selectedCoordinates) {
			if (board[row][column]?.chessPiece) {
				setSelectedCoordinates({ row, column });
				setSquareShapes([{ row, column }]);
				setPointShapes([]);
				legalMoves.forEach((move) => {
					const playedMove = move.playedPieceMove;
					const from = playedMove.from;
					const to = playedMove.to;
					if (from.row === row && from.column === column) {
						setPointShapes((shapes) => [
							...shapes,
							{ row: to.row, column: to.column },
						]);
					}
				});
			}
		} else {
			if (
				(selectedCoordinates.row === row &&
					selectedCoordinates.column === column) ||
				board[row][column]?.chessPiece?.chessColor ===
					board[selectedCoordinates.row][selectedCoordinates.column]?.chessPiece
						?.chessColor
			) {
				setSelectedCoordinates(null);
				setSquareShapes([]);
				setPointShapes([]);
				setGhostLikePiece(null);
				return;
			}
			const chessMove = {
				fromRow: selectedCoordinates.row,
				fromColumn: selectedCoordinates.column,
				toRow: row,
				toColumn: column,
			};
			setSelectedCoordinates(null);
			setSquareShapes([]);
			setPointShapes([]);
			setGhostLikePiece(null);
			sendChessMove(chessMove);
		}
	}

	function handleMouseDown() {
		setIsMouseDown(true);
	}

	function handleMouseMove(event: {
		clientX: number;
		clientY: number;
		preventDefault: () => void;
	}) {
		event.preventDefault();

		if (!isMouseDown) {
			return;
		}

		const x = event.clientX;
		const y = event.clientY + window.scrollY;

		const row = Math.floor((y - top) / (size / 8));
		const column = Math.floor((x - left) / (size / 8));

		if (!isDragging) {
			if (!board[row][column]?.chessPiece) {
				return;
			}
			setSelectedCoordinates(null);
			setSquareShapes([]);
			setPointShapes([]);
			legalMoves.forEach((move) => {
				const playedMove = move.playedPieceMove;
				const from = playedMove.from;
				const to = playedMove.to;
				if (from.row === row && from.column === column) {
					setPointShapes((shapes) => [
						...shapes,
						{ row: to.row, column: to.column },
					]);
					setGhostLikePiece({ row, column });
					setSquareShapes([{ row, column }]);
				}
			});
			setIsDragging(true);
			setStartCoordinates({ row, column });
		} else {
			setGhostPiece({
				x: x,
				y: y,
				chessColor:
					board[startCoordinates.row][startCoordinates.column].chessPiece
						.chessColor,
				chessPieceType:
					board[startCoordinates.row][startCoordinates.column].chessPiece
						.chessPieceType,
			});
		}
	}

	function handleMouseUp(event: { clientX: number; clientY: number }) {
		setIsMouseDown(false);
		setGhostLikePiece(null);

		if (!isDragging) {
			return;
		}

		const x = event.clientX;
		const y = event.clientY + window.scrollY;

		const row = Math.floor((y - top) / (size / 8));
		const column = Math.floor((x - left) / (size / 8));

		if (startCoordinates.row === row && startCoordinates.column === column) {
			setIsDragging(false);
			setStartCoordinates(null);
			setPointShapes([]);
			setSquareShapes([]);
			setGhostLikePiece(null);
			setGhostPiece(null);
			return;
		}

		const chessMove = {
			fromRow: startCoordinates.row,
			fromColumn: startCoordinates.column,
			toRow: row,
			toColumn: column,
		};

		setIsDragging(false);
		setStartCoordinates(null);
		setPointShapes([]);
		setSquareShapes([]);
		setGhostPiece(null);

		sendChessMove(chessMove);
	}

	return (
		<div>
			{isInGame ? (
				<div>
					<div
						onClick={handleClick}
						onMouseDown={handleMouseDown}
						onMouseUp={handleMouseUp}
						onMouseMove={handleMouseMove}
					>
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
					<Title>Send Move</Title>
					<div id="stomp-table"></div>
				</div>
			) : (
				<div>
					<div>
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
					<Title>Send Move</Title>
					<div id="stomp-table"></div>
				</div>
			)}
		</div>
	);
};

export default ChessBoard;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
