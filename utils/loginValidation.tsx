import * as yup from "yup";

export const emailValidation = yup
	.string()
	.required("E-mail is required")
	.email("Invalid Email")
	.matches(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
		"Email format is not correct"
	);

export const passwordValidation = yup.string().required("Password is required");
