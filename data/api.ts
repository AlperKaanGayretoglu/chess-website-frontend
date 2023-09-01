// ----------------------------------------- AuthenticationController -----------------------------------------

// POST /auth/login
export type LoginForm = {
	username: string;
	password: string;
};

// POST /auth/register
export type RegisterForm = {
	username: string;
	email: string;
	password: string;
};

// POST /auth
export type AuthenticationResponse = {
	id: string;
	username: string;
	userRole: string;
	token: string;
};

// ----------------------------------------- ChessGameController -----------------------------------------
// GET /game/{gameId}
export type ChessGameResponse = {
	gameId: string;
	board: ChessBoardResponse;
	playerWhiteUsername: string;
	playerBlackUsername: string;
	currentPlayerUsername: string;
	legalMovesForCurrentPlayer: ChessMoveResponse[];
};

export type ChessBoardResponse = {
	board: Map<string, ChessPieceResponse>;
};

export type ChessPieceResponse = {
	chessPieceType: ChessPieceType;
	chessColor: ChessColor;
};

export enum ChessPieceType {
	PAWN = "PAWN",
	KNIGHT = "KNIGHT",
	BISHOP = "BISHOP",
	ROOK = "ROOK",
	QUEEN = "QUEEN",
	KING = "KING",
}

export enum ChessColor {
	WHITE = "WHITE",
	BLACK = "BLACK",
}

// POST /game
export type CreateChessGameRequest = {
	firstPlayerUsername: string;
	secondPlayerUsername: string;
};

// ----------------------------------------- ChessGameSocketController -----------------------------------------
export type PlayChessMoveRequest = {
	username: string;
	chessMoveId: string;
};

export type PlayedChessMoveResponse = {
	playedChessMove: ChessMoveResponse;
	currentPlayerUsername: string;
	legalMovesForCurrentPlayer: ChessMoveResponse[];
};

export type ChessMoveResponse = {
	id: string;
	playedPieceMove: PieceMoveResponse;
	triggeredPieceMoves: PieceMoveResponse[];
};

export type PieceMoveResponse = {
	from: ChessCoordinate;

	to: ChessCoordinate;
};

export type ChessCoordinate = {
	row: number;
	column: number;
};

export function fromStringToChessCoordinate(
	coordinate: string
): ChessCoordinate {
	const rowMatch = coordinate.match(/row=(\d+)/);
	const columnMatch = coordinate.match(/column=(\d+)/);
	return {
		row: rowMatch ? parseInt(rowMatch[1]) : 0,
		column: columnMatch ? parseInt(columnMatch[1]) : 0,
	};
}

export function fromChessCoordinateToString(
	coordinate: ChessCoordinate
): string {
	return `row=${coordinate.row},column=${coordinate.column}`;
}
