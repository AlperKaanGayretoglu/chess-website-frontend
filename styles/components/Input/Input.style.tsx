import styled from "@emotion/styled";
import { createTheme } from "@mui/material";

export const TogglePassword = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;

	svg {
		width: 24px;
		height: 24px;
		color: #737373;

		&:hover {
			color: #000000de;
		}
	}
`;

export const customInputTheme = createTheme({
	components: {
		MuiInputLabel: {
			styleOverrides: {
				outlined: {
					"&.Mui-focused:not(:empty)": {
						color: "#373737",
					},
				},
				root: {
					color: "#373737",
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					borderRadius: "8px",
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: "black",
					},
				},
			},
		},
		MuiInputAdornment: {
			styleOverrides: {
				root: {
					marginLeft: 0,
				},
			},
		},
	},
});
