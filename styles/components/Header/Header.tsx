import { useEffect, useState } from "react";
import {
	HeaderBase,
	HeaderContainer,
	HeaderText,
	TextLogo,
} from "./Header.style";

import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { COOKIE_NAMES } from "../../../data/constants";
import { logout } from "../../../services/authenticationApi";
import { checkIsLoggedIn } from "../../../utils/checkUser";
import { promiseToast } from "../../../utils/promiseToast";
import { SecondaryButton } from "../Button/Button";

const Header = () => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

	useEffect(() => {
		setIsLoggedIn(checkIsLoggedIn());
	}, []);

	const router = useRouter();

	const username = getCookie(COOKIE_NAMES.username) as string;

	const handleLogout = () => {
		if (
			promiseToast(
				logout(),
				"register_login_logout_toast_id",
				"Logout Successful",
				"Logout Failed"
			)
		) {
			router.push("/");
		}
	};

	return (
		<HeaderBase>
			<HeaderContainer>
				<TextLogo onClick={() => router.push("/")}>Chess Website</TextLogo>
			</HeaderContainer>
			{isLoggedIn && (
				<>
					<HeaderText>{username}</HeaderText>
					<SecondaryButton onClick={handleLogout}>Logout</SecondaryButton>
				</>
			)}
		</HeaderBase>
	);
};

export default Header;
