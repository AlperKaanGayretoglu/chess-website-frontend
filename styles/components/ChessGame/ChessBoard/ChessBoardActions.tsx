import {
	ChessColor,
	ChessCoordinate,
	ChessMoveResponse,
	ChessPieceResponse,
	ChessPieceType,
	fromChessCoordinateToString,
} from "../../../../data/api";

import { useState } from "react";

export default function getChessBoardActions(
	playerColor: ChessColor,
	board: Map<string, ChessPieceResponse>,
	legalMoves: ChessMoveResponse[],
	sendChessMove: (chessMove: {
		fromRow: number;
		fromColumn: number;
		toRow: number;
		toColumn: number;
	}) => void
) {
	// ------------------------------ STATES ------------------------------
	// BOARD STATES
	const [left, setLeft] = useState(0);
	const [top, setTop] = useState(0);
	const [size, setSize] = useState(0);

	// SHAPE STATES
	const [pointShapes, setPointShapes] = useState<ChessCoordinate[]>([]);
	const [squareShapes, setSquareShapes] = useState<ChessCoordinate[]>([]);

	// GHOST STATE
	const [ghostPiece, setGhostPiece] = useState<{
		x: number;
		y: number;
		chessColor: ChessColor;
		chessPieceType: ChessPieceType;
	}>(null);
	const [ghostLikePiece, setGhostLikePiece] = useState<ChessCoordinate>(null);

	// SELECTED STATE
	const [selectedCoordinates, setSelectedCoordinates] =
		useState<ChessCoordinate>(null);

	// DRAGGING STATE
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [startCoordinates, setStartCoordinates] = useState<{
		row: number;
		column: number;
	}>(null);

	// ------------------------------ HANDLE EVENTS ------------------------------
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

		const coordinates = getChessCoordinateFromMousePosition(event);

		if (!selectedCoordinates) {
			selectPieceAt(coordinates);
		} else {
			movePieceTo(coordinates);
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

		const coordinates = getChessCoordinateFromMousePosition(event);

		if (!isDragging) {
			startDraggingFrom(event, coordinates);
		}

		if (startCoordinates) {
			createGhostPieceUsing(event, startCoordinates);
		}
	}

	function handleMouseUp(event: { clientX: number; clientY: number }) {
		setIsMouseDown(false);
		setGhostLikePiece(null);

		if (isDragging) {
			const coordinates = getChessCoordinateFromMousePosition(event);
			dropPieceOnTo(coordinates);
		}
	}

	// ------------------------------ PIECE MOVEMENTS ------------------------------
	function selectPieceAt(coordinates: ChessCoordinate) {
		if (doesChessPieceExistsAtAndIsMyColor(coordinates)) {
			setSelectedCoordinates(coordinates);
			setSquareShapes([coordinates]);

			visualizeLegalMovesForPieceAt(coordinates);
		}
	}

	function startDraggingFrom(
		event: { clientX: number; clientY: number },
		coordinates: ChessCoordinate
	) {
		if (!doesChessPieceExistsAtAndIsMyColor(coordinates)) {
			return;
		}

		setSelectedCoordinates(null);
		setSquareShapes([coordinates]);

		setIsDragging(true);
		setStartCoordinates(coordinates);

		setGhostLikePiece(coordinates);
		createGhostPieceUsing(event, coordinates);

		visualizeLegalMovesForPieceAt(coordinates);
	}

	function dropPiece() {
		setSelectedCoordinates(null);
		setPointShapes([]);
		setSquareShapes([]);

		setIsDragging(false);
		setStartCoordinates(null);

		setGhostLikePiece(null);
		setGhostPiece(null);
	}

	function dropPieceOnTo(coordinates: ChessCoordinate) {
		const { row, column } = coordinates;

		const chessMove = {
			fromRow: startCoordinates.row,
			fromColumn: startCoordinates.column,
			toRow: row,
			toColumn: column,
		};

		const isOnSameSquare =
			startCoordinates.row === row && startCoordinates.column === column;

		dropPiece();

		if (!isOnSameSquare) {
			sendChessMove(chessMove);
		}
	}

	function movePieceTo(coordinates: ChessCoordinate) {
		const { row, column } = coordinates;

		const chessMove = {
			fromRow: selectedCoordinates.row,
			fromColumn: selectedCoordinates.column,
			toRow: row,
			toColumn: column,
		};

		const isOnSameSquare =
			selectedCoordinates.row === row && selectedCoordinates.column === column;

		const isOnSameColorPiece = doesChessPieceExistsAtAndIsMyColor(coordinates);

		dropPiece();

		if (!(isOnSameSquare || isOnSameColorPiece)) {
			sendChessMove(chessMove);
		}
	}

	// ------------------------------ UTILS ------------------------------
	function getChessPieceAt(coordinates: ChessCoordinate) {
		return board.get(fromChessCoordinateToString(coordinates));
	}

	function doesChessPieceExistsAtAndIsMyColor(coordinates: ChessCoordinate) {
		const chessPiece = getChessPieceAt(coordinates);
		return chessPiece && chessPiece.chessColor === playerColor;
	}

	function getChessCoordinateFromMousePosition(event: {
		clientX: number;
		clientY: number;
	}): ChessCoordinate {
		const x = event.clientX;
		const y = event.clientY + window.scrollY;

		const row = Math.floor((y - top) / (size / 8));
		const column = Math.floor((x - left) / (size / 8));

		return { row, column };
	}

	function createGhostPieceUsing(
		event: { clientX: number; clientY: number },
		coordinates: ChessCoordinate
	) {
		const x = event.clientX;
		const y = event.clientY + window.scrollY;

		const stringCoordinates = fromChessCoordinateToString(coordinates);

		setGhostPiece({
			x: x,
			y: y,
			chessColor: board.get(stringCoordinates)?.chessColor,
			chessPieceType: board.get(stringCoordinates)?.chessPieceType,
		});
	}

	function visualizeLegalMovesForPieceAt(coordinates: ChessCoordinate) {
		const { row, column } = coordinates;

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

	return {
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
		handleResize,
		handleClick,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
	};
}