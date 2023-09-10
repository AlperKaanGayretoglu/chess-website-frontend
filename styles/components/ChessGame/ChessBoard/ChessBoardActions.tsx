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
	const [semiSquareShapes, setSemiSquareShapes] = useState<ChessCoordinate[]>(
		[]
	);
	const [ghostSquareShapes, setGhostSquareShapes] = useState<ChessCoordinate[]>(
		[]
	);

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

		if (!selectedCoordinates && !isMouseDown) {
			return;
		}

		const coordinates = getChessCoordinateFromMousePosition(event);

		if (selectedCoordinates) {
			createGhostSquaresWhereMouseIs(coordinates);
		}

		if (!isMouseDown) {
			return;
		}

		if (!isDragging) {
			startDraggingFrom(event, coordinates);
		}

		if (startCoordinates) {
			createGhostPieceUsing(event, startCoordinates);
			createGhostSquaresWhereMouseIs(coordinates);
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
		setGhostSquareShapes([]);
		setSemiSquareShapes([]);
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

		if (isOnSameSquare) {
			return;
		}

		if (isOnSameColorPiece) {
			selectPieceAt(coordinates);
		} else {
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

		return {
			row: playerColor === ChessColor.WHITE ? row : 7 - row,
			column: playerColor === ChessColor.WHITE ? column : 7 - column,
		};
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

	function createGhostSquaresWhereMouseIs(coordinates: ChessCoordinate) {
		const initialCoordinates = selectedCoordinates ?? startCoordinates;

		const isOnLegalMove = legalMoves.some((move) => {
			const playedMove = move.playedPieceMove;
			const from = playedMove.from;
			const to = playedMove.to;
			return (
				from.row === initialCoordinates.row &&
				from.column === initialCoordinates.column &&
				to.row === coordinates.row &&
				to.column === coordinates.column
			);
		});

		if (isOnLegalMove) {
			setGhostSquareShapes([coordinates]);
		} else {
			setGhostSquareShapes([]);
		}
	}

	function visualizeLegalMovesForPieceAt(coordinates: ChessCoordinate) {
		const { row, column } = coordinates;

		setPointShapes([]);
		setGhostSquareShapes([]);
		setSemiSquareShapes([]);
		legalMoves.forEach((move) => {
			const playedMove = move.playedPieceMove;

			const from = playedMove.from;
			const to = playedMove.to;

			if (from.row === row && from.column === column) {
				if (move.pieceCaptureMoves.length > 0) {
					setSemiSquareShapes((shapes) => {
						const alreadyExists = shapes.some(
							(shape) => shape.row === to.row && shape.column === to.column
						);
						if (alreadyExists) {
							return shapes;
						}
						return [...shapes, { row: to.row, column: to.column }];
					});
				} else {
					setPointShapes((shapes) => {
						const alreadyExists = shapes.some(
							(shape) => shape.row === to.row && shape.column === to.column
						);
						if (alreadyExists) {
							return shapes;
						}
						return [...shapes, { row: to.row, column: to.column }];
					});
				}
			}
		});
	}

	return {
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
		handleResize,
		handleClick,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
	};
}
