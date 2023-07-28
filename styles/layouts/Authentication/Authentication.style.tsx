import styled from "@emotion/styled";

export const AuthenticationBase = styled.div`
	width: 100%;
`;

export const AuthenticationContainer = styled.div`
	width: 80%;
	height: 100%;
	max-width: 1440px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 96px 48px 48px; // TODO: Fix this
`;

export const Title = styled.div`
	font-size: 48px;
	color: #161718;
`;

export const Form = styled.form`
	margin-top: 24px;
	display: flex;
	flex-direction: column;
	gap: 24px;
	width: 300px;
`;
