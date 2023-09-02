import { GetServerSidePropsContext } from "next";
import { redirectUser } from "../../../../utils/checkUser";

const SquareShape = ({
	pixelCoordinates,
	size,
	isLight = false,
}: {
	pixelCoordinates: {
		x: number;
		y: number;
	};
	size: number;
	isLight?: boolean;
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
				backgroundColor: isLight
					? "rgba(0, 139, 23, 0.541)"
					: "rgba(0, 102, 17, 0.541)",
			}}
		></div>
	);
};

export default SquareShape;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
