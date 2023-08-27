import { useEffect, useRef } from "react";

export default function ChessBoardImage({ onResize }) {
	const elementRef = useRef(null);

	function handleResize() {
		const element = elementRef.current;
		if (element) {
			onResize({
				top: element.offsetTop,
				left: element.offsetLeft,
				size: element.offsetWidth,
			});
		}
	}

	useEffect(() => {
		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [onResize]);

	return (
		<div ref={elementRef} style={{ width: "750px", height: "750px" }}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 8 8"
				shapeRendering="crispEdges"
			>
				<g id="a">
					<g id="b">
						<g id="c">
							<g id="d">
								<rect width="1" height="1" fill="#f0d9b5" id="e" />
								<use x="1" y="1" href="#e" xlinkHref="#e" />
								<rect y="1" width="1" height="1" fill="#b58863" id="f" />
								<use x="1" y="-1" href="#f" xlinkHref="#f" />
							</g>
							<use x="2" href="#d" xlinkHref="#d" />
						</g>
						<use x="4" href="#c" xlinkHref="#c" />
					</g>
					<use y="2" href="#b" xlinkHref="#b" />
				</g>
				<use y="4" href="#a" xlinkHref="#a" />
			</svg>
		</div>
	);
}
