import { useState, useEffect } from "react";
import { showModal } from "../redux/slices/modalSlice";
import { useAppDispatch } from "../redux/store";

const Timer = ({ isReset }: { isReset: boolean }) => {
	const dispatch = useAppDispatch();
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
			dispatch(showModal());
			setSeconds(60);
		}, 2000);
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
				strokeDashoffset={strokeDashOffset}
			/>
			<text x="50" y="58" textAnchor="middle">
				{seconds}
			</text>
		</svg>
	);
};

export default Timer;
