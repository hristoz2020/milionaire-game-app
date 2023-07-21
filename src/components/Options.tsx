import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	playWrongAnswerSound,
	stopGameSound,
	stopWrongAnswerSound,
} from "../helpers/soundsCommands";
import { addPoint } from "../redux/slices/pointsSlice";
import {
	setIsResetTimer,
	setIsVisibleNexBtn,
	setSelectedOption,
} from "../redux/slices/questionSlice";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";

const Options: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [backgroundSuccess, setBackgroundSuccess] = useState<string>("");
	const [backgroundDanger, setBackgroundDanger] = useState<string>("");
	const [blinkingClass, setBlinkingClass] = useState<string>("");

	const { questions, currentQuestionIndex, selectedOption, isVisibleNexBtn } =
		useAppSelector((state: RootState) => state.questions);
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

	const handleSelectOption = (option: string) => {
		dispatch(setSelectedOption(option));
		setBlinkingClass("blinking-class");

		setTimeout(() => {
			if (option !== questions[currentQuestionIndex].correct_answer) {
				setBackgroundSuccess("bg-success");
				setBackgroundDanger("bg-danger");
				setBlinkingClass("");
				stopGameSound();
				playWrongAnswerSound();
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
				dispatch(setIsVisibleNexBtn(true));
			}
			dispatch(setIsResetTimer(false));
		}, 3000);
	};
	
	return (
		<div className="d-flex flex-wrap">
			{options.map((option, index) => {
				const checkOptions = selectedOption === option;
				const processedAnswer = option
					?.replace(/&quot;/g, '"')
					.replace(/&#039;/g, "'");

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
						disabled={isVisibleNexBtn}
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
