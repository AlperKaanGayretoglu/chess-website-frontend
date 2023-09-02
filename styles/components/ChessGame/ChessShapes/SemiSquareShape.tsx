import { GetServerSidePropsContext } from "next";
import { redirectUser } from "../../../../utils/checkUser";

const SemiSquareShape = ({
	pixelCoordinates,
	size,
}: {
	pixelCoordinates: {
		x: number;
		y: number;
	};
	size: number;
}) => {
	return (
		<svg
			style={{
				position: "absolute",
				top: pixelCoordinates.y - 0.5,
				left: pixelCoordinates.x - 0.5,
				width: size + 1,
				height: size + 1,
			}}
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<mask id="squareWithHoleMask">
					<rect width="100%" height="100%" fill="white" />
					<circle cx="50%" cy="50%" r="52.5%" fill="black" />
				</mask>
			</defs>

			<rect
				width="100%"
				height="100%"
				fill="rgba(0, 102, 17, 0.507)"
				mask="url(#squareWithHoleMask)"
			/>
		</svg>
	);
};

export default SemiSquareShape;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
