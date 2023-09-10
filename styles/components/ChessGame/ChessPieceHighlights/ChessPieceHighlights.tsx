import { ChessColor, ChessCoordinate } from "../../../../data/api";

import { GetServerSidePropsContext } from "next";
import { redirectUser } from "../../../../utils/checkUser";
import ChessPieceHighlight from "./ChessPieceHighlight";

const ChessPieceHighlights = ({
	left,
	top,
	size,
	isWhiteInCheck,
	whiteKingCoordinates,
	isBlackInCheck,
	blackKingCoordinates,
	whichPlayerColorPov,
}: {
	left: number;
	top: number;
	size: number;
	isWhiteInCheck: boolean;
	whiteKingCoordinates: ChessCoordinate;
	isBlackInCheck: boolean;
	blackKingCoordinates: ChessCoordinate;
	whichPlayerColorPov: ChessColor;
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
			{isWhiteInCheck && whiteKingCoordinates && (
				<ChessPieceHighlight
					pixelCoordinates={calculateXandY(whiteKingCoordinates)}
					size={size / 8}
				/>
			)}
			{isBlackInCheck && blackKingCoordinates && (
				<ChessPieceHighlight
					pixelCoordinates={calculateXandY(blackKingCoordinates)}
					size={size / 8}
				/>
			)}
		</div>
	);
};

export default ChessPieceHighlights;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
