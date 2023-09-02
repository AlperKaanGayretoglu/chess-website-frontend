import {
	ChessMoveResponse,
	ChessPieceResponse,
	PieceCaptureMoveResponse,
	PieceMoveResponse,
	fromChessCoordinateToString,
} from "../data/api";

import { SetStateAction } from "react";

export class ChessBoardUpdater {
	private readonly setBoard: (
		value: SetStateAction<Map<string, ChessPieceResponse>>
	) => void;

	constructor(
		setBoard: (value: SetStateAction<Map<string, ChessPieceResponse>>) => void
	) {
		this.setBoard = setBoard;
	}

	public executeChessMove(chessMoveResponse: ChessMoveResponse) {
		this.executePieceCaptureMoves(chessMoveResponse.pieceCaptureMoves);
		this.executeTriggeredPieceMoves(chessMoveResponse.triggeredPieceMoves);
		this.executePlayedPieceMove(chessMoveResponse.playedPieceMove);
	}

	private executePlayedPieceMove(pieceMoveResponse: PieceMoveResponse) {
		const from = fromChessCoordinateToString(pieceMoveResponse.from);
		const to = fromChessCoordinateToString(pieceMoveResponse.to);

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
}
