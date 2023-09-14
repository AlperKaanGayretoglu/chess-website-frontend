import DefaultProfilePhoto from "../../../images/default_profile_photo/DefaultProfilePhoto";

const PlayerNamePlate = ({
	playerName,
	shouldHaveOutline: shouldHaveOutline,
}: {
	playerName: string;
	shouldHaveOutline: boolean;
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
				// disable user select:
				userSelect: "none",
			}}
		>
			<DefaultProfilePhoto shouldHaveOutline={shouldHaveOutline} />
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
