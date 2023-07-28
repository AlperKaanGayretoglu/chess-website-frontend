import { createTheme } from "@mui/material";

export const GLOBAL_THEME_VALUES = {
	primary: {
		main: "#00a18c",
		dark: "#007464",
		light: "#00a18b97",
	},
	secondary: {
		main: "#57dcf3",
		dark: "#0098b3",
		light: "#57dcf37d",
	},
	background: {
		main: "#f8f8f8",
	},
};

export const GLOBAL_THEME = createTheme({
	palette: {
		primary: {
			main: GLOBAL_THEME_VALUES.primary.main,
			dark: GLOBAL_THEME_VALUES.primary.dark,
			light: GLOBAL_THEME_VALUES.primary.light,
		},
		secondary: {
			main: GLOBAL_THEME_VALUES.secondary.main,
			dark: GLOBAL_THEME_VALUES.secondary.dark,
			light: GLOBAL_THEME_VALUES.secondary.light,
		},
		background: {
			default: GLOBAL_THEME_VALUES.background.main,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					borderRadius: "8px",
				},

				contained: {
					height: "40px",
					fontSize: "20px",
				},
				containedPrimary: {
					backgroundColor: GLOBAL_THEME_VALUES.primary.main,
					"&:hover": {
						backgroundColor: GLOBAL_THEME_VALUES.primary.light,
					},
				},
				containedSecondary: {
					backgroundColor: GLOBAL_THEME_VALUES.secondary.main,
					"&:hover": {
						backgroundColor: GLOBAL_THEME_VALUES.secondary.light,
					},
				},
				containedSizeLarge: {
					height: "60px",
				},

				outlinedPrimary: {},

				textPrimary: {
					color: "white",
				},
				textSizeLarge: {
					fontSize: "20px",
				},
			},
		},
		MuiLink: {
			styleOverrides: {
				root: {
					"&:hover": {
						cursor: "pointer",
					},
				},
			},
		},
	},
});
