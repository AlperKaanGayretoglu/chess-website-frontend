import styled from "@emotion/styled";
import { GLOBAL_THEME_VALUES } from "../../global/globalTheme.style";

export const GeneralBase = styled.div`
	display: flex;
	background-color: ${GLOBAL_THEME_VALUES.background.main};
	height: 100%;
	min-height: 100vh;
	flex-direction: column;
`;

export const Main = styled.main`
	display: flex;
	align-items: stretch;
	flex-grow: 1;
`;
