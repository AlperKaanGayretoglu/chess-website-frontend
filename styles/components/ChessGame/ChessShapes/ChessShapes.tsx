import {
	ChessColor,
	ChessCoordinate,
	ChessPieceType,
} from "../../../../data/api";

import { GetServerSidePropsContext } from "next";
import { redirectUser } from "../../../../utils/checkUser";
import GhostPiece from "./GhostPiece";
import PointShape from "./PointShape";
import SemiSquareShape from "./SemiSquareShape";
import SquareShape from "./SquareShape";

const ChessShapes = ({
	left,
	top,
	size,
	pointShapes,
	squareShapes,
	semiSquareShapes,
	ghostSquareShapes,
	ghostPiece,
}: {
	left: number;
	top: number;
	size: number;
	pointShapes: ChessCoordinate[];
	squareShapes: ChessCoordinate[];
	semiSquareShapes: ChessCoordinate[];
	ghostSquareShapes: ChessCoordinate[];
	ghostPiece: {
		x: number;
		y: number;
		chessColor: ChessColor;
		chessPieceType: ChessPieceType;
	};
}) => {
	// TODO: If you decide there can only be 1 ghost square shape, then just retrive it instead of using an array
	const ghostSquareShape = ghostSquareShapes[0];
	function isCoordinatesSameAsGhostSquareShapeCoordinates(
		coordinates: ChessCoordinate
	) {
		if (!ghostSquareShape) {
			return false;
		}

		return (
			coordinates.row === ghostSquareShape.row &&
			coordinates.column === ghostSquareShape.column
		);
	}
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
			{semiSquareShapes.map((shape: ChessCoordinate, index: number) => {
				if (isCoordinatesSameAsGhostSquareShapeCoordinates(shape)) {
					return null;
				}

				return (
					<SemiSquareShape
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
				if (isCoordinatesSameAsGhostSquareShapeCoordinates(shape)) {
					return null;
				}

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
			{ghostSquareShapes.map((shape: ChessCoordinate, index: number) => {
				return (
					<SquareShape
						key={index}
						pixelCoordinates={{
							x: left + shape.column * (size / 8),
							y: top + shape.row * (size / 8),
						}}
						size={size / 8}
						isLight={true}
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
