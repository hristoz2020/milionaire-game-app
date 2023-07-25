import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { playWrongAnswerSound, stopGameSound } from "../helpers/soundsCommands";
import { setIsDisabledAnswersBtns } from "../redux/slices/questionsSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const Timer = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isVolumeActive, isShouldTimerStopped } = useAppSelector(
		(state) => state.questions
	);
	const [seconds, setSeconds] = useState(60);

	useEffect(() => {
		if (seconds > 0 && !isShouldTimerStopped) {
			const timer = setInterval(() => {
				setSeconds((prevSeconds) => prevSeconds - 1);
			}, 1000);

			return () => clearInterval(timer);
		}
		if (seconds === 0) {
			dispatch(setIsDisabledAnswersBtns(true));
			setTimeout(() => {
				navigate("/score");
				setSeconds(60);
				isVolumeActive && stopGameSound();
				isVolumeActive && playWrongAnswerSound();
			}, 3000);
		}
	}, [seconds, isShouldTimerStopped, isVolumeActive, navigate, dispatch]);

	const radius = 35;
	const circumference = 2 * Math.PI * radius;
	const strokeDashOffset = circumference * (1 - seconds / 60);

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
