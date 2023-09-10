import {
	ChessColor,
	ChessCoordinate,
	ChessPieceResponse,
	fromStringToChessCoordinate,
} from "../../../../data/api";

import { GetServerSidePropsContext } from "next";
import { redirectUser } from "../../../../utils/checkUser";
import ChessPiece from "./ChessPiece";

const ChessPieces = ({
	left,
	top,
	size,
	board,
	ghostLikePiece,
	whichPlayerColorPov = ChessColor.WHITE,
}: {
	left: number;
	top: number;
	size: number;
	board: Map<string, ChessPieceResponse>;
	ghostLikePiece: ChessCoordinate;
	whichPlayerColorPov?: ChessColor;
}) => {
	function calculateXandY(coordinates: ChessCoordinate) {
		return {
			x:
				whichPlayerColorPov === ChessColor.WHITE
					? left + coordinates.column * (size / 8)
					: left + (7 - coordinates.column) * (size / 8),
			y:
				whichPlayerColorPov === ChessColor.WHITE
					? top + coordinates.row * (size / 8)
					: top + (7 - coordinates.row) * (size / 8),
		};
	}

	return (
		<div>
			{Array.from(board?.entries()).map(([coordinate, chessPiece]) => {
				const chessCoordinate = fromStringToChessCoordinate(coordinate);

				const rowIndex = chessCoordinate.row;
				const columnIndex = chessCoordinate.column;

				const key = (rowIndex << 3) | columnIndex;
				return (
					<ChessPiece
						key={key}
						chessColor={chessPiece?.chessColor}
						chessPieceType={chessPiece?.chessPieceType}
						pixelCoordinates={calculateXandY(chessCoordinate)}
						size={size / 8}
						isGhostLike={
							ghostLikePiece?.row === rowIndex &&
							ghostLikePiece?.column === columnIndex
						}
					/>
				);
			})}
		</div>
	);
};

export default ChessPieces;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
