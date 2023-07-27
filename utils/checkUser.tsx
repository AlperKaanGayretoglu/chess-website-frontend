import { getCookie, hasCookie } from "cookies-next";
import { ADMIN_ONLY_PAGES, COOKIE_NAMES } from "../data/constants";

import { GetServerSidePropsContext } from "next";

export const checkIsAdmin = (ctx?: GetServerSidePropsContext) => {
	return getCookie(COOKIE_NAMES.role, ctx)?.toString() === "ADMIN";
};

export const checkIsLoggedIn = () => {
	return hasCookie(COOKIE_NAMES.token);
};

export const redirectUser = (ctx: GetServerSidePropsContext) => {
	const isInLoginPage = ctx.resolvedUrl?.includes("/login");
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

	if (token && isInLoginPage) {
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
		};
	}

	if (!token && !isInLoginPage) {
		return {
			redirect: {
				permanent: false,
				destination: "/login",
			},
		};
	}

	return undefined;
};
