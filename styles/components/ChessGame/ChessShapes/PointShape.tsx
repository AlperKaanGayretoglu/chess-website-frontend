import { GetServerSidePropsContext } from "next";
import { redirectUser } from "../../../../utils/checkUser";

const PointShape = ({
	pixelCoordinates,
	size,
}: {
	pixelCoordinates: {
		x: number;
		y: number;
	};
	size: number;
}) => {
	const radius = size / 2.5;
	return (
		<div>
			<div
				style={{
					position: "absolute",
					top: pixelCoordinates.y,
					left: pixelCoordinates.x,
					width: size,
					height: size,
					cursor: "pointer",
				}}
			></div>
			<div
				style={{
					position: "absolute",
					top: pixelCoordinates.y + radius / 1.25,
					left: pixelCoordinates.x + radius / 1.25,
					width: radius,
					height: radius,
					borderRadius: "100%",
					backgroundColor: "rgba(0, 102, 17, 0.541)",
					cursor: "pointer",
				}}
			></div>
		</div>
	);
};

export default PointShape;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
