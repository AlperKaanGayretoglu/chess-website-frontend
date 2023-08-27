import { GetServerSidePropsContext } from "next";
import { ChessCoordinate } from "../../../../data/api";
import { redirectUser } from "../../../../utils/checkUser";
import ChessShape from "./ChessShape";

const ChessShapes = ({
	shapes,
	left,
	top,
	size,
}: {
	shapes: ChessCoordinate[];
	left: number;
	top: number;
	size: number;
}) => {
	return (
		<div>
			{shapes.map((shape: ChessCoordinate, index: number) => {
				return (
					<ChessShape
						key={index}
						pixelCoordinates={{
							x: left + shape.column * (size / 8),
							y: top + shape.row * (size / 8),
						}}
						size={size / 8}
					/>
				);
			})}
		</div>
	);
};

export default ChessShapes;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
