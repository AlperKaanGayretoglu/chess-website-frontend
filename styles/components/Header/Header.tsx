import { useEffect, useState } from "react";
import { HeaderBase, HeaderContainer, TextLogo } from "./Header.style";

import { useRouter } from "next/router";
import { logout } from "../../../services/userApi";
import { checkIsLoggedIn } from "../../../utils/checkUser";
import { promiseToast } from "../../../utils/promiseToast";
import { SecondaryButton } from "../Button/Button";

const Header = () => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

	useEffect(() => {
		setIsLoggedIn(checkIsLoggedIn());
	}, []);

	const router = useRouter();

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
				<SecondaryButton onClick={handleLogout}>Logout</SecondaryButton>
			)}
		</HeaderBase>
	);
};

export default Header;
