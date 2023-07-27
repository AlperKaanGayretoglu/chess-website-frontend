import { TextField, TextFieldProps, ThemeProvider } from "@mui/material";

import React from "react";
import { customInputTheme } from "./Input.style";

const MailInputRef = ({ ...rest }: TextFieldProps, ref: any) => {
	return (
		<ThemeProvider theme={customInputTheme}>
			<TextField
				id="chess_website_email"
				name="chess_website_email"
				autoComplete="true"
				type="text"
				{...rest}
			/>
		</ThemeProvider>
	);
};

const MailInput = React.forwardRef(MailInputRef);
export default MailInput;
