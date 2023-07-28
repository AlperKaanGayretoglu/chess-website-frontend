import styled from "@emotion/styled";

export const DefaultBase = styled.div`
	width: 100%;
`;

export const DefaultContainer = styled.div`
	width: 80%;
	height: 100%;
	max-width: 1440px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 96px 48px 48px; // TODO: Fix this
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Title = styled.div`
	font-size: 48px;
	color: #161718;
	margin-bottom: 24px;
`;
