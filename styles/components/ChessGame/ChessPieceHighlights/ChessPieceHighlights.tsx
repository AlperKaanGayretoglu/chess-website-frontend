import { GetServerSidePropsContext } from "next";
import { ChessCoordinate } from "../../../../data/api";
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
}: {
	left: number;
	top: number;
	size: number;
	isWhiteInCheck: boolean;
	whiteKingCoordinates: ChessCoordinate;
	isBlackInCheck: boolean;
	blackKingCoordinates: ChessCoordinate;
}) => {
	return (
		<div>
			{isWhiteInCheck && whiteKingCoordinates && (
				<ChessPieceHighlight
					pixelCoordinates={{
						x: left + whiteKingCoordinates.column * (size / 8),
						y: top + whiteKingCoordinates.row * (size / 8),
					}}
					size={size / 8}
				/>
			)}
			{isBlackInCheck && blackKingCoordinates && (
				<ChessPieceHighlight
					pixelCoordinates={{
						x: left + blackKingCoordinates.column * (size / 8),
						y: top + blackKingCoordinates.row * (size / 8),
					}}
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
