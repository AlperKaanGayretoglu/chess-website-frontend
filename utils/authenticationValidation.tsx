import * as yup from "yup";

export const usernameValidation = yup
	.string()
	.required("Username is required")
	.matches(
		/^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/,
		"Username can only contain letters, numbers, underscores, spaces, and hyphens"
	);

export const emailValidation = yup
	.string()
	.required("E-mail is required")
	.email("Invalid Email")
	.matches(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
		"Email format is not correct"
	);

export const passwordValidation = yup.string().required("Password is required");
