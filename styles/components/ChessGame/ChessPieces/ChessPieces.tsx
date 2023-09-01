import {
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
}: {
	left: number;
	top: number;
	size: number;
	board: Map<string, ChessPieceResponse>;
	ghostLikePiece: ChessCoordinate;
}) => {
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
						chessColor={chessPiece.chessColor}
						chessPieceType={chessPiece.chessPieceType}
						pixelCoordinates={{
							x: left + columnIndex * (size / 8),
							y: top + rowIndex * (size / 8),
						}}
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
