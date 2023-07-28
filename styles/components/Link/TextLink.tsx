import { Link, LinkProps } from "@mui/material";

export const TextLink = ({ href, children, ...rest }: LinkProps) => {
	return <Link href={href}>{children}</Link>;
};

export default Link;
