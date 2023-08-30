import {
	ChessColor,
	ChessCoordinate,
	ChessPieceType,
} from "../../../../data/api";

import { GetServerSidePropsContext } from "next";
import { redirectUser } from "../../../../utils/checkUser";
import GhostPiece from "./GhostPiece";
import PointShape from "./PointShape";
import SquareShape from "./SquareShape";

const ChessShapes = ({
	pointShapes,
	squareShapes,
	ghostPiece,
	left,
	top,
	size,
}: {
	pointShapes: ChessCoordinate[];
	squareShapes: ChessCoordinate[];
	ghostPiece: {
		x: number;
		y: number;
		chessColor: ChessColor;
		chessPieceType: ChessPieceType;
	};
	left: number;
	top: number;
	size: number;
}) => {
	return (
		<div>
			{squareShapes.map((shape: ChessCoordinate, index: number) => {
				return (
					<SquareShape
						key={index}
						pixelCoordinates={{
							x: left + shape.column * (size / 8),
							y: top + shape.row * (size / 8),
						}}
						size={size / 8}
					/>
				);
			})}
			{pointShapes.map((shape: ChessCoordinate, index: number) => {
				return (
					<PointShape
						key={index}
						pixelCoordinates={{
							x: left + shape.column * (size / 8),
							y: top + shape.row * (size / 8),
						}}
						size={size / 8}
					/>
				);
			})}
			{ghostPiece && (
				<GhostPiece
					chessColor={ghostPiece.chessColor}
					chessPieceType={ghostPiece.chessPieceType}
					pixelCoordinates={{
						x: ghostPiece.x - size / 16,
						y: ghostPiece.y - size / 16,
					}}
					size={size / 8}
				/>
			)}
		</div>
	);
};

export default ChessShapes;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
