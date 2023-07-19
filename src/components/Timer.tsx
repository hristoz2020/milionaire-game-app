import { useState, useEffect } from "react";
import RewardScale from "./RewardScale";

const Timer = ({ isReset }: { isReset: boolean }) => {
	const [seconds, setSeconds] = useState(60);

	useEffect(() => {
		if (seconds > 0) {
			const timer = setInterval(() => {
				setSeconds((prevSeconds) => prevSeconds - 1);
			}, 1000);

			return () => clearInterval(timer);
		}
	}, [seconds]);

	useEffect(() => {
		if (isReset) {
			setSeconds(60);
		}
	}, [isReset]);

	const radius = 35;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference * (1 - seconds / 60);

	if (seconds === 0) {
		return <RewardScale />;
	}

	return (
		<svg width="100" height="100">
			<circle
				cx="50"
				cy="50"
				r={radius}
				fill="transparent"
				stroke="#000"
				strokeWidth="4"
				strokeDasharray={circumference}
				strokeDashoffset={strokeDashoffset}
			/>
			<text x="50" y="58" textAnchor="middle">
				{seconds}
			</text>
		</svg>
	);
};

export default Timer;
