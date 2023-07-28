import { TextField, TextFieldProps, ThemeProvider } from "@mui/material";

import React from "react";
import { customInputTheme } from "./Input.style";

const TextInputRef = ({ ...rest }: TextFieldProps, ref: any) => {
	return (
		<ThemeProvider theme={customInputTheme}>
			<TextField type="text" {...rest} />
		</ThemeProvider>
	);
};

const TextInput = React.forwardRef(TextInputRef);
export default TextInput;
