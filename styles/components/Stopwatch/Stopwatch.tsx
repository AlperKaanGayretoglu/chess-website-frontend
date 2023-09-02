import { useEffect, useState } from "react";

const StopWatch = () => {
	const [isActive, setIsActive] = useState(false);
	const [isPaused, setIsPaused] = useState(true);
	const [time, setTime] = useState(0);

	useEffect(() => {
		let interval = null;

		if (isActive && !isPaused) {
			interval = setInterval(() => {
				setTime((time) => time + 10);
			}, 10);
		} else {
			clearInterval(interval);
		}
		return () => {
			clearInterval(interval);
		};
	}, [isActive, isPaused]);

	const handleStart = () => {
		setIsActive(true);
		setIsPaused(false);
	};

	const handlePause = () => {
		setIsPaused(true);
	};

	const handleReset = () => {
		setIsActive(false);
		setTime(0);
	};

	return {
		time,
		handleStart,
		handlePause,
		handleReset,
	};
};

export default StopWatch;
