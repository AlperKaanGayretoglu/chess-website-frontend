import { ChessCoordinate, ChessSquareResponse } from "../../../data/api";

import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import ChessBoardImage from "../../../images/chess/board/ChessBoardImage";
import { redirectUser } from "../../../utils/checkUser";
import { Title } from "../../layouts/Default/Default.style";
import ChessPieces from "./ChessPieces/ChessPieces";
import ChessShapes from "./ChessShapes/ChessShapes";

const ChessBoard = ({
	board,
	isInGame,
	sendChessMove,
}: {
	board: ChessSquareResponse[][];
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

	const [shapes, setShapes] = useState<ChessCoordinate[]>([]);

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
		const y = event.clientY;
		const row = Math.floor((y - top) / (size / 8));
		const column = Math.floor((x - left) / (size / 8));

		if (!selectedCoordinates) {
			if (board[row][column]?.chessPiece) {
				setSelectedCoordinates({ row, column });
				setShapes([{ row, column }]);
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
				setShapes([]);
				return;
			}
			const chessMove = {
				fromRow: selectedCoordinates.row,
				fromColumn: selectedCoordinates.column,
				toRow: row,
				toColumn: column,
			};
			setSelectedCoordinates(null);
			setShapes([]);
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
		const y = event.clientY;

		const row = Math.floor((y - top) / (size / 8));
		const column = Math.floor((x - left) / (size / 8));

		if (!isDragging) {
			if (!board[row][column]?.chessPiece) {
				return;
			}
			setSelectedCoordinates(null);
			setShapes([]);
			setIsDragging(true);
			setStartCoordinates({ row, column });
		}
	}

	function handleMouseUp(event: { clientX: number; clientY: number }) {
		setIsMouseDown(false);

		if (!isDragging) {
			return;
		}

		const x = event.clientX;
		const y = event.clientY;

		const row = Math.floor((y - top) / (size / 8));
		const column = Math.floor((x - left) / (size / 8));

		const chessMove = {
			fromRow: startCoordinates.row,
			fromColumn: startCoordinates.column,
			toRow: row,
			toColumn: column,
		};

		setIsDragging(false);
		setStartCoordinates(null);

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
						<ChessShapes shapes={shapes} left={left} top={top} size={size} />
						<ChessPieces board={board} left={left} top={top} size={size} />
					</div>
					<Title>Send Move</Title>
					<div id="stomp-table"></div>
				</div>
			) : (
				<div>
					<div>
						<ChessBoardImage onResize={handleResize} />
						<ChessShapes shapes={shapes} left={left} top={top} size={size} />
						<ChessPieces board={board} left={left} top={top} size={size} />
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
