import { GetServerSidePropsContext } from "next";
import { redirectUser } from "../../../../utils/checkUser";

const ChessPieceHighlight = ({
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

	const c1 = "rgb(255, 0, 0)";
	const c2 = "rgb(231, 0, 0)";
	const c3 = "rgba(169, 0, 0, 0.001)";
	const c4 = "rgba(158, 0, 0, 0.001)";

	const percentage = 9.5;
	const r = size * (percentage / 10);

	const width = r;
	const height = r;

	const t = pixelCoordinates.y + (size / 2 - r / 2);
	const l = pixelCoordinates.x + (size / 2 - r / 2);

	return (
		<div>
			<div
				style={{
					position: "absolute",
					top: t,
					left: l,
					width: width,
					height: height,
					borderRadius: "50%",
					background: `radial-gradient(ellipse at center, ${c1} 0%, ${c2} 25%, ${c3} 90%, ${c4} 100%)`,
				}}
			></div>
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

export default ChessPieceHighlight;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
