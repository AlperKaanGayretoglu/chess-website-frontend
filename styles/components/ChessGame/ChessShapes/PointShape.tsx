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
		<div
			style={{
				position: "absolute",
				top: pixelCoordinates.y + radius / 1.25,
				left: pixelCoordinates.x + radius / 1.25,
				width: radius,
				height: radius,
				borderRadius: "100%",
				cursor: "pointer",
				backgroundColor: "rgba(0, 102, 17, 0.507)",
			}}
		></div>
	);
};

export default PointShape;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
