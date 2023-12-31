import { getCookie, hasCookie } from "cookies-next";
import { ADMIN_ONLY_PAGES, COOKIE_NAMES } from "../data/constants";

import { GetServerSidePropsContext } from "next";

export const checkIsAdmin = (ctx?: GetServerSidePropsContext) => {
	return getCookie(COOKIE_NAMES.userRole, ctx)?.toString() === "ADMIN";
};

export const checkIsLoggedIn = () => {
	return hasCookie(COOKIE_NAMES.token);
};

export const redirectUser = (ctx: GetServerSidePropsContext) => {
	const isInAuthenticationPage =
		ctx.resolvedUrl?.includes("/login") ||
		ctx.resolvedUrl?.includes("/register");

	const isAdmin = checkIsAdmin(ctx);
	const token = getCookie(COOKIE_NAMES.token, ctx);

	if (!isAdmin) {
		for (const pageUrl of ADMIN_ONLY_PAGES) {
			if (ctx.resolvedUrl.includes(pageUrl)) {
				return {
					redirect: {
						permanent: false,
						destination: "/",
					},
				};
			}
		}
	}

	if (token && isInAuthenticationPage) {
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
		};
	}

	if (!token && !isInAuthenticationPage) {
		return {
			redirect: {
				permanent: false,
				destination: "/login",
			},
		};
	}

	return undefined;
};
