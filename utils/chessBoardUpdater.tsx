import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
	ChessColor,
	ChessCoordinate,
	ChessMoveResponse,
	ChessPieceResponse,
	ChessPieceType,
	PieceCaptureMoveResponse,
	PieceMoveResponse,
	PieceTransformationMoveResponse,
	fromChessCoordinateToString,
	fromStringToChessCoordinate,
} from "../data/api";

export class ChessBoardUpdater {
	private readonly board: Map<string, ChessPieceResponse>;
	private readonly setBoard: (
		value: SetStateAction<Map<string, ChessPieceResponse>>
	) => void;

	public readonly whiteKingCoordinates: ChessCoordinate;
	private readonly setWhiteKingCoordinates: Dispatch<
		SetStateAction<ChessCoordinate>
	>;

	public readonly blackKingCoordinates: ChessCoordinate;
	private readonly setBlackKingCoordinates: Dispatch<
		SetStateAction<ChessCoordinate>
	>;

	constructor(
		board: Map<string, ChessPieceResponse>,
		setBoard: (value: SetStateAction<Map<string, ChessPieceResponse>>) => void
	) {
		this.board = board;
		this.setBoard = setBoard;

		const [whiteKingCoordinates, setWhiteKingCoordinates] =
			useState<ChessCoordinate>(
				this.findKingCoordinatesForColor(ChessColor.WHITE)
			);
		const [blackKingCoordinates, setBlackKingCoordinates] =
			useState<ChessCoordinate>(
				this.findKingCoordinatesForColor(ChessColor.BLACK)
			);

		this.whiteKingCoordinates = whiteKingCoordinates;
		this.setWhiteKingCoordinates = setWhiteKingCoordinates;

		this.blackKingCoordinates = blackKingCoordinates;
		this.setBlackKingCoordinates = setBlackKingCoordinates;

		useEffect(() => {
			this.setWhiteKingCoordinates(
				this.findKingCoordinatesForColor(ChessColor.WHITE)
			);
			this.setBlackKingCoordinates(
				this.findKingCoordinatesForColor(ChessColor.BLACK)
			);
		}, [board]);
	}

	private findKingCoordinatesForColor(chessColor: ChessColor) {
		const item = Array.from(this.board?.entries()).find(([, chessPiece]) => {
			return (
				chessPiece.chessColor === chessColor &&
				chessPiece.chessPieceType === ChessPieceType.KING
			);
		});
		if (item) {
			return fromStringToChessCoordinate(item[0]);
		}
	}

	public executeChessMove(chessMoveResponse: ChessMoveResponse) {
		this.executePieceCaptureMoves(chessMoveResponse.pieceCaptureMoves);
		this.executeTriggeredPieceMoves(chessMoveResponse.triggeredPieceMoves);
		this.executePlayedPieceMove(chessMoveResponse.playedPieceMove);
		this.executePieceTransformationMove(
			chessMoveResponse.pieceTransformationMove
		);
	}

	private executePlayedPieceMove(pieceMoveResponse: PieceMoveResponse) {
		const from = fromChessCoordinateToString(pieceMoveResponse.from);
		const to = fromChessCoordinateToString(pieceMoveResponse.to);

		const chessPiece = this.board.get(from);
		if (chessPiece?.chessPieceType === ChessPieceType.KING) {
			if (chessPiece?.chessColor === ChessColor.WHITE) {
				this.setWhiteKingCoordinates(pieceMoveResponse.to);
			} else {
				this.setBlackKingCoordinates(pieceMoveResponse.to);
			}
		}

		this.setBoard((board) => {
			const newBoard = new Map(board);
			newBoard.set(to, newBoard.get(from));
			newBoard.delete(from);
			return newBoard;
		});
	}

	private executeTriggeredPieceMoves(triggeredPieceMoves: PieceMoveResponse[]) {
		triggeredPieceMoves.forEach((triggeredPieceMove) => {
			this.executePlayedPieceMove(triggeredPieceMove);
		});
	}

	private executePieceCaptureMoves(
		pieceCaptureMoves: PieceCaptureMoveResponse[]
	) {
		pieceCaptureMoves.forEach((pieceCaptureMove) => {
			const from = fromChessCoordinateToString(pieceCaptureMove.from);
			this.setBoard((board) => {
				const newBoard = new Map(board);
				newBoard.delete(from);
				return newBoard;
			});
		});
	}

	private executePieceTransformationMove(
		pieceTransformationMove: PieceTransformationMoveResponse | null
	) {
		if (pieceTransformationMove) {
			const at = fromChessCoordinateToString(pieceTransformationMove.at);
			const toPiece = pieceTransformationMove.transformTo;

			this.setBoard((board) => {
				const newBoard = new Map(board);
				const chessPiece = newBoard.get(at);
				if (chessPiece) {
					newBoard.delete(at);
					newBoard.set(at, {
						chessColor: toPiece.chessColor,
						chessPieceType: toPiece.chessPieceType,
					});
				}
				return newBoard;
			});
		}
	}
}
