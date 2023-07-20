import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { playWrongAnswerSound, stopGameSound } from "../helpers/soundsCommands";

const Timer = ({ isReset }: { isReset: boolean }) => {
	const navigate = useNavigate();
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
	const strokeDashOffset = circumference * (1 - seconds / 60);

	if (seconds === 0) {
		setTimeout(() => {
			navigate("/score");
			setSeconds(60);
			stopGameSound();
			playWrongAnswerSound();
		}, 3000);
	}

	return (
		<svg width="100" height="100">
			<circle
				cx="50"
				cy="50"
				r={radius}
				fill="transparent"
				stroke="white"
				strokeWidth="4"
				strokeDasharray={circumference}
				strokeDashoffset={strokeDashOffset}
			/>
			<text x="50" y="58" textAnchor="middle" stroke="white">
				{seconds}
			</text>
		</svg>
	);
};

export default Timer;
