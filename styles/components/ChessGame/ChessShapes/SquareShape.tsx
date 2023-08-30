import { GetServerSidePropsContext } from "next";
import { redirectUser } from "../../../../utils/checkUser";

const SquareShape = ({
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
		<div
			style={{
				position: "absolute",
				top: pixelCoordinates.y - 1,
				left: pixelCoordinates.x - 1,
				width: size + 2,
				height: size + 2,
				cursor: "pointer",
				backgroundColor: "rgba(0, 143, 24, 0.747)",
			}}
		></div>
	);
};

export default SquareShape;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
