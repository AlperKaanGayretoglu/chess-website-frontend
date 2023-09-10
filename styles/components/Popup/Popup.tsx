import { Dispatch, SetStateAction } from "react";

const Popup = ({
	children,
	isOpen,
	setIsOpen,
}: {
	children: React.ReactNode;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		isOpen && (
			<div
				style={{
					position: "fixed",
					top: "0",
					left: "0",
					width: "100%",
					height: "100%",
					backgroundColor: "rgba(0, 0, 0, 0.5)",
				}}
			>
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						width: "fit-content",
						height: "fit-content",
						transform: "translate(-50%, -50%)",
						backgroundColor: "white",
						padding: "1rem",
						borderRadius: "1rem",
						border: "5px solid black",
					}}
				>
					<div
						style={{
							position: "relative",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
							height: "100%",
						}}
					>
						{children}
						<div
							style={{
								position: "absolute",
								top: "0",
								right: "0",
								width: "2rem",
								height: "2rem",
								borderRadius: "50%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "gray",
								fontSize: "1.5rem",
								cursor: "pointer",
								userSelect: "none",
							}}
							onClick={() => setIsOpen(false)}
						>
							x
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default Popup;
