import {
	InputAdornment,
	TextField,
	TextFieldProps,
	ThemeProvider,
} from "@mui/material";
import React, { useState } from "react";
import { TogglePassword, customInputTheme } from "./Input.style";

import EyeClosed from "../../../icons/EyeClosed";
import EyeOpen from "../../../icons/EyeOpen";

const PasswordInputRef = ({ ...rest }: TextFieldProps, ref: any) => {
	const [isPassword, setIsPassword] = useState(true);

	return (
		<ThemeProvider theme={customInputTheme}>
			<TextField
				id="chess_website_password"
				name="chess_website_password"
				autoComplete="true"
				type={isPassword ? "password" : "text"}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<TogglePassword onClick={() => setIsPassword(!isPassword)}>
								{isPassword ? <EyeClosed /> : <EyeOpen />}
							</TogglePassword>
						</InputAdornment>
					),
				}}
				{...rest}
			/>
		</ThemeProvider>
	);
};

const PasswordInput = React.forwardRef(PasswordInputRef);
export default PasswordInput;
