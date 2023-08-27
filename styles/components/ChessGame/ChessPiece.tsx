import { ChessColor, ChessPieceType } from "../../../data/api";

import { GetServerSidePropsContext } from "next";
import ChessPieces from "../../../images/chess/pieces/ChessPieceImages";
import { redirectUser } from "../../../utils/checkUser";

const ChessPiece = ({
	chessColor,
	chessPieceType,
	pixelCoordinates,
}: {
	chessColor: ChessColor;
	chessPieceType: ChessPieceType;
	pixelCoordinates: {
		x: number;
		y: number;
	};
}) => {
	const color = chessColor?.charAt(0).toLowerCase();
	const piece =
		chessPieceType === "KNIGHT" ? "N" : chessPieceType?.charAt(0).toUpperCase();

	return ChessPieces[color + piece];
};

export default ChessPiece;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
