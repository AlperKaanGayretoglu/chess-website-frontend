import { GetServerSidePropsContext } from "next";
import { ChessSquareResponse } from "../../../../data/api";
import { redirectUser } from "../../../../utils/checkUser";
import ChessPiece from "./ChessPiece";

const ChessPieces = ({
	board,
	left,
	top,
	size,
}: {
	board: ChessSquareResponse[][];
	left: number;
	top: number;
	size: number;
}) => {
	const flattenedBoard = board?.flat();

	return (
		<div>
			{flattenedBoard.map((square: ChessSquareResponse, index: number) => {
				if (square?.chessPiece) {
					const rowIndex = Math.floor(index / 8);
					const columnIndex = index % 8;

					return (
						<ChessPiece
							key={index}
							chessColor={square?.chessPiece?.chessColor}
							chessPieceType={square?.chessPiece?.chessPieceType}
							pixelCoordinates={{
								x: left + columnIndex * (size / 8),
								y: top + rowIndex * (size / 8),
							}}
							size={size / 8}
						/>
					);
				}
			})}
		</div>
	);
};

export default ChessPieces;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
