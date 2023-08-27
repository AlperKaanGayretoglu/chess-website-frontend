// ----------------------------------------- ChatController -----------------------------------------

// GET /chat/{chatId}/messages
export type ChatResponse = {
	chatId: string;
	userIds: string[];
};

// GET /chat/{chatId}/messages
export type ChatMessages = {
	messages: MessageOutput[];
};

// POST /chat
export type CreateChatRequest = {
	usernames: string[];
};

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

// ----------------------------------------- MessageController -----------------------------------------

// MESSAGE MAPPING /secured/chatting
export type MessageInput = {
	fromUserId: string;
	text: string;
};

// SEND TO /secured/chat_messages
export type MessageOutput = {
	username: string;
	text: string;
	time: string;
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
	board: ChessSquareResponse[][];
};

export type ChessSquareResponse = {
	chessColor: ChessColor;
	chessPiece: ChessPieceResponse;
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
	chessBoard: ChessBoardResponse;
};

export type ChessMoveResponse = {
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