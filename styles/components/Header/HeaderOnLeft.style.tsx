import styled from "@emotion/styled";
import { GLOBAL_THEME_VALUES } from "../../global/globalTheme.style";

export const HeaderOnLeftBase = styled.header`
	background-color: ${GLOBAL_THEME_VALUES.primary.dark};
	padding: 12px 0px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;

	width: 150px;
	max-height: 100vh;

	.MuiButtonBase-root > img {
		margin-left: 8px;
	}
`;

export const HeaderOnLeftContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	width: 80%;
	flex-grow: 1;
`;

export const TextLogo = styled.div`
	font-size: 32px;
	color: white;
	font-weight: bold;
	cursor: pointer;
	user-select: none;
`;

export const HeaderText = styled.div`
	margin: 20px;
	font-size: 24px;
	color: white;
	font-weight: bold;
	cursor: pointer;
	user-select: none;
`;
