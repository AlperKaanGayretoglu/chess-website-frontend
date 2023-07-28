import styled from "@emotion/styled";
import { GLOBAL_THEME_VALUES } from "../../global/globalTheme.style";

export const HeaderBase = styled.header`
	background-color: ${GLOBAL_THEME_VALUES.primary.dark};
	padding: 12px 50px;
	display: flex;
	align-items: center;

	.MuiButtonBase-root > img {
		margin-left: 8px;
	}
`;

export const HeaderContainer = styled.div`
	width: 80%;
	margin: 0 auto;
	flex-grow: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const TextLogo = styled.div`
	font-size: 32px;
	color: white;
	font-weight: bold;
	cursor: pointer;
	user-select: none;
`;
