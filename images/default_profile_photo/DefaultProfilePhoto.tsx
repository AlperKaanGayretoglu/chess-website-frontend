import styled from "@emotion/styled";
import Image from "next/image";

export default function DefaultProfilePhoto({ shouldHaveOutline = false }) {
	const DefaultPhoto = styled(Image)``;
	const size = 40;
	return (
		<div
			style={{
				border: shouldHaveOutline
					? `${size * 0.15}px solid #00d300`
					: `${size * 0.15}px solid #503e3e`,
				background: "white",
			}}
		>
			<DefaultPhoto
				width={size}
				height={size}
				src="/default_photo.png"
				alt=""
			/>
		</div>
	);
}
