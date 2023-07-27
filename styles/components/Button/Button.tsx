import { ButtonProps, Button as MUIButton } from "@mui/material";

export const PrimaryButton = ({ children, ...rest }: ButtonProps) => {
	return (
		<MUIButton variant="contained" size="large" color="primary" {...rest}>
			{children}
		</MUIButton>
	);
};

export const SecondaryButton = ({ children, ...rest }: ButtonProps) => {
	return (
		<MUIButton variant="contained" size="small" color="secondary" {...rest}>
			{children}
		</MUIButton>
	);
};
