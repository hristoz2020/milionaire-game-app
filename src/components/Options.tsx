import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { showModal } from "../redux/slices/modalSlice";
import { addPoint } from "../redux/slices/pointsSlice";
import {
	setIsResetTimer,
	setIsTimerVisible,
	setIsVisibleNexBtn,
	setSelectedOption,
} from "../redux/slices/questionsSlice";
import {
	playCorrectAnswerSound,
	playWrongAnswerSound,
	stopGameSound,
	stopWrongAnswerSound,
} from "../helpers/soundsCommands";
import { processedText } from "../helpers/processedText";

const Options: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [backgroundSuccess, setBackgroundSuccess] = useState<string>("");
	const [backgroundDanger, setBackgroundDanger] = useState<string>("");
	const [blinkingClass, setBlinkingClass] = useState<string>("");

	const {
		questions,
		currentQuestionIndex,
		selectedOption,
		isVisibleNexBtn,
		isVolumeActive,
	} = useAppSelector((state: RootState) => state.questions);
	const points = useAppSelector((state: RootState) => state.points.points);
	const options: string[] = [
		questions[currentQuestionIndex]?.incorrect_answers,
		questions[currentQuestionIndex]?.correct_answer,
	].flat();

	const checkCurrentOption = questions[
		currentQuestionIndex
	]?.incorrect_answers.find((answer) => answer === selectedOption);

	useEffect(() => {
		setBackgroundSuccess("");
		setBackgroundDanger("");
	}, [currentQuestionIndex]);

	useEffect(() => {
		if (points === 15) {
			dispatch(setIsVisibleNexBtn(false));
			setTimeout(() => {
				dispatch(showModal(true));
			}, 2000);
		}
	}, [points, dispatch]);

	const handleSelectOption = (option: string) => {
		dispatch(setSelectedOption(option));
		setBlinkingClass("blinking-class");

		setTimeout(() => {
			if (option !== questions[currentQuestionIndex].correct_answer) {
				setBackgroundSuccess("bg-success");
				setBackgroundDanger("bg-danger");
				setBlinkingClass("");
				isVolumeActive && stopGameSound();
				isVolumeActive && playWrongAnswerSound();
				setTimeout(() => {
					navigate("/score");
					stopWrongAnswerSound();
				}, 3000);
			}

			if (option === questions[currentQuestionIndex].correct_answer) {
				dispatch(addPoint());
				setBackgroundSuccess("bg-success");
				setBackgroundDanger("bg-danger");
				setBlinkingClass("");
				isVolumeActive && stopGameSound();
				isVolumeActive && playCorrectAnswerSound();
				dispatch(setIsVisibleNexBtn(true));
				dispatch(setIsTimerVisible(false));
			}

			dispatch(setIsResetTimer(false));
		}, 3000);
	};
	
	return (
		<div className="d-flex flex-wrap">
			{options.map((option, index) => {
				const checkOptions = selectedOption === option;
				const processedAnswer = processedText(option);

				return (
					<button
						key={index}
						className={`border-dark rounded-3 col-md-6 col-sm-12 col-12 p-3 mt-1 ${
							checkOptions ? blinkingClass : ""
						} ${
							option ===
							questions[currentQuestionIndex]?.correct_answer
								? backgroundSuccess
								: ""
						} ${
							option === checkCurrentOption && selectedOption
								? backgroundDanger
								: ""
						} 
                    `}
						disabled={isVisibleNexBtn || points === 15}
						onClick={() => handleSelectOption(option)}
					>
						{processedAnswer}
					</button>
				);
			})}
		</div>
	);
};

export default Options;
