import { FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { showScore } from "../redux/slices/scoreSlice";
import { addPoint } from "../redux/slices/pointsSlice";
import {
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

	const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(false);
	const [currentBtnClass, setCurrentBtnClass] = useState({
		backgroundSuccess: "",
		backgroundDanger: "",
		blinkingClass: "",
	});
	const { questions, currentQuestionIndex, selectedOption, isVolumeActive } =
		useAppSelector((state: RootState) => state.questions);
	const points = useAppSelector((state: RootState) => state.points.points);

	useEffect(() => {
		if (points === 15) {
			dispatch(setIsVisibleNexBtn(false));
			setTimeout(() => {
				dispatch(showScore(true));
			}, 2000);
		}
	}, [points, dispatch, currentQuestionIndex]);

	useEffect(() => {
		setIsDisabledBtn(false);
	}, [currentQuestionIndex]);

	const options: string[] = useMemo(() => {
		const shuffledOptions = [
			questions[currentQuestionIndex]?.incorrect_answers,
			questions[currentQuestionIndex]?.correct_answer,
		]
			.flat()
			.slice()
			.sort(() => Math.random() - 0.5);
		return shuffledOptions;
	}, [questions, currentQuestionIndex]);

	const checkSelectedWrongOption = questions[
		currentQuestionIndex
	]?.incorrect_answers.find((answer) => answer === selectedOption);

	const handleSelectOption = (option: string) => {
		dispatch(setSelectedOption(option));
		setCurrentBtnClass({
			backgroundSuccess: "",
			backgroundDanger: "",
			blinkingClass: "blinking-class",
		});
		setIsDisabledBtn(true);

		setTimeout(() => {
			if (option !== questions[currentQuestionIndex].correct_answer) {
				setCurrentBtnClass({
					backgroundSuccess: "bg-success",
					backgroundDanger: "bg-danger",
					blinkingClass: "",
				});
				isVolumeActive && stopGameSound();
				isVolumeActive && playWrongAnswerSound();
				setTimeout(() => {
					navigate("/score");
					stopWrongAnswerSound();
				}, 3000);
			}

			if (option === questions[currentQuestionIndex].correct_answer) {
				dispatch(addPoint());
				setCurrentBtnClass({
					backgroundSuccess: "bg-success",
					backgroundDanger: "bg-danger",
					blinkingClass: "",
				});
				isVolumeActive && stopGameSound();
				isVolumeActive && playCorrectAnswerSound();
				dispatch(setIsVisibleNexBtn(true));
			}
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
							checkOptions ? currentBtnClass.blinkingClass : ""
						} ${
							option ===
								questions[currentQuestionIndex]
									?.correct_answer && selectedOption
								? currentBtnClass.backgroundSuccess
								: ""
						} ${
							option === checkSelectedWrongOption &&
							selectedOption
								? currentBtnClass.backgroundDanger
								: ""
						} 
                    `}
						disabled={isDisabledBtn}
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
