import { ChessColor, ChessPieceType } from "../../../../data/api";

import { GetServerSidePropsContext } from "next";
import ChessPieces from "../../../../images/chess/pieces/ChessPieceImages";
import { redirectUser } from "../../../../utils/checkUser";

const ChessPiece = ({
	chessColor,
	chessPieceType,
	pixelCoordinates,
	size,
	isGhostLike = false,
}: {
	chessColor: ChessColor;
	chessPieceType: ChessPieceType;
	pixelCoordinates: {
		x: number;
		y: number;
	} | null;
	size: number | string;
	isGhostLike?: boolean;
}) => {
	const color = chessColor?.charAt(0).toLowerCase();
	const piece =
		chessPieceType === "KNIGHT" ? "N" : chessPieceType?.charAt(0).toUpperCase();

	const pieceImage = ChessPieces[color + piece];
	return (
		<div
			style={{
				position: pixelCoordinates ? "absolute" : "relative",
				top: pixelCoordinates ? pixelCoordinates.y : 0,
				left: pixelCoordinates ? pixelCoordinates.x : 0,
				width: size,
				height: size,
				cursor: "pointer",
				opacity: isGhostLike ? 0.5 : 1,
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
