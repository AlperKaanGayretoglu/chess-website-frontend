import { GeneralBase, Main } from "./General.style";

import { ThemeProvider } from "@mui/material";
import Header from "../../components/Header/Header";
import { GLOBAL_THEME } from "../../global/globalTheme.style";

const General = ({ children }) => {
	return (
		<ThemeProvider theme={GLOBAL_THEME}>
			<GeneralBase>
				<Header />
				<Main>{children}</Main>
			</GeneralBase>
		</ThemeProvider>
	);
};

export default General;
