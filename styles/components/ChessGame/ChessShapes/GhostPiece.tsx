import { ChessColor, ChessPieceType } from "../../../../data/api";

import { GetServerSidePropsContext } from "next";
import { redirectUser } from "../../../../utils/checkUser";
import ChessPiece from "../ChessPieces/ChessPiece";

const GhostPiece = ({
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
	return (
		<div
			style={{
				position: "absolute",
				top: pixelCoordinates.y,
				left: pixelCoordinates.x,
				width: size,
				height: size,
				cursor: "pointer",
				zIndex: 100,
			}}
		>
			<ChessPiece
				chessColor={chessColor}
				chessPieceType={chessPieceType}
				pixelCoordinates={{
					x: 0,
					y: 0,
				}}
				size={size}
			/>
		</div>
	);
};

export default GhostPiece;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
