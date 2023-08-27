import { ChessColor, ChessPieceType } from "../../../../data/api";

import { GetServerSidePropsContext } from "next";
import ChessPieces from "../../../../images/chess/pieces/ChessPieceImages";
import { redirectUser } from "../../../../utils/checkUser";

const ChessPiece = ({
	chessColor,
	chessPieceType,
	pixelCoordinates,
	size,
}: {
	chessColor: ChessColor;
	chessPieceType: ChessPieceType;
	pixelCoordinates: {
		x: number;
		y: number;
	};
	size: number;
}) => {
	const color = chessColor?.charAt(0).toLowerCase();
	const piece =
		chessPieceType === "KNIGHT" ? "N" : chessPieceType?.charAt(0).toUpperCase();

	const pieceImage = ChessPieces[color + piece];
	return (
		<div
			style={{
				position: "absolute",
				top: pixelCoordinates.y,
				left: pixelCoordinates.x,
				width: size,
				height: size,
				cursor: "pointer",
			}}
		>
			{pieceImage}
		</div>
	);
};

export default ChessPiece;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
