import DefaultProfilePhoto from "../../../images/default_profile_photo/DefaultProfilePhoto";

const PlayerNamePlate = ({
	playerName,
	isMyMove,
}: {
	playerName: string;
	isMyMove: boolean;
}) => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				backgroundColor: "#007464",
				border: "5px solid black",
				padding: "0.25em",
				width: "100%",
			}}
		>
			<DefaultProfilePhoto shouldHaveOutline={isMyMove} />
			<span
				style={{
					marginLeft: "0.5em",
					color: "white",
					fontSize: "1.5em",
					fontWeight: "bold",
				}}
			>
				{playerName}
			</span>
		</div>
	);
};

export default PlayerNamePlate;
