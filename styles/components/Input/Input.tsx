import { TextField, TextFieldProps, ThemeProvider } from "@mui/material";

import React from "react";
import { customInputTheme } from "./Input.style";

const InputRef = ({ ...rest }: TextFieldProps, ref: any) => {
	return (
		<ThemeProvider theme={customInputTheme}>
			<TextField type="text" {...rest} />
		</ThemeProvider>
	);
};

const Input = React.forwardRef(InputRef);
export default Input;
