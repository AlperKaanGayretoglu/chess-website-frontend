import { GeneralBase, GeneralBaseRowDirection, Main } from "./General.style";

import { ThemeProvider } from "@mui/material";
import Header from "../../components/Header/Header";
import { GLOBAL_THEME } from "../../global/globalTheme.style";

const General = ({ children, isHeaderOnLeft = false }) => {
	return (
		<ThemeProvider theme={GLOBAL_THEME}>
			{isHeaderOnLeft ? (
				<GeneralBaseRowDirection>
					<Header isOnLeft={true} />
					<Main>{children}</Main>
				</GeneralBaseRowDirection>
			) : (
				<GeneralBase>
					<Header />
					<Main>{children}</Main>
				</GeneralBase>
			)}
		</ThemeProvider>
	);
};

export default General;
