import { Dispatch, SetStateAction } from "react";

import { GetServerSidePropsContext } from "next";
import { ChessSquareResponse } from "../../../data/api";
import { redirectUser } from "../../../utils/checkUser";
import { Title } from "../../layouts/Default/Default.style";
import ChessPiece from "./ChessPiece";

const ChessBoard = ({
	board,
	isInGame,
	coordinates,
	setCoordinates,
	sendChessMove,
}: {
	board: ChessSquareResponse[][];
	isInGame: boolean;
	coordinates: {
		fromRow: number;
		fromColumn: number;
		toRow: number;
		toColumn: number;
	};
	setCoordinates: Dispatch<
		SetStateAction<{
			fromRow: number;
			fromColumn: number;
			toRow: number;
			toColumn: number;
		}>
	>;
	sendChessMove: () => void;
}) => {
	const squareSideLength = 85;

	return (
		<div>
			<div>
				{board?.map((row, rowIndex) => {
					return (
						<div key={rowIndex} style={{ display: "flex" }}>
							{row.map((square: ChessSquareResponse, columnIndex: number) => {
								return (
									<div
										key={columnIndex}
										style={{
											width: squareSideLength,
											height: squareSideLength,
											backgroundColor:
												square?.chessColor === "BLACK" ? "gray" : "lightgray",
										}}
										onClick={() => {
											console.log(rowIndex + " " + columnIndex);
										}}
									>
										<ChessPiece
											chessColor={square?.chessPiece?.chessColor}
											chessPieceType={square?.chessPiece?.chessPieceType}
											pixelCoordinates={{
												x: columnIndex + squareSideLength / 3,
												y: rowIndex + squareSideLength / 3,
											}}
										/>
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
			<Title>Send Move</Title>
			<div>
				{isInGame ? (
					<div>
						<div>
							<label>From Row</label>
							<input
								onChange={(event) =>
									setCoordinates({
										...coordinates,
										fromRow: parseInt(event.target.value),
									})
								}
							/>
						</div>
						<div>
							<label>From Column</label>
							<input
								onChange={(event) =>
									setCoordinates({
										...coordinates,
										fromColumn: parseInt(event.target.value),
									})
								}
							/>
						</div>
						<div>
							<label>To Row</label>
							<input
								onChange={(event) =>
									setCoordinates({
										...coordinates,
										toRow: parseInt(event.target.value),
									})
								}
							/>
						</div>
						<div>
							<label>To Column</label>
							<input
								onChange={(event) =>
									setCoordinates({
										...coordinates,
										toColumn: parseInt(event.target.value),
									})
								}
							/>
						</div>
						<button onClick={sendChessMove}>Send</button>
					</div>
				) : (
					<div>
						<div>
							<label>From Row</label>
							<input />
						</div>
						<div>
							<label>From Column</label>
							<input />
						</div>
						<div>
							<label>To Row</label>
							<input />
						</div>
						<div>
							<label>To Column</label>
							<input />
						</div>
						<button>Send</button>
					</div>
				)}
			</div>
			<div id="stomp-table"></div>
		</div>
	);
};

export default ChessBoard;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
