import { FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { showScore } from "../redux/slices/scoreSlice";
import { addPoint } from "../redux/slices/pointsSlice";
import {
	setIsDisabledAnswersBtns,
	setIsNextBtnVisible,
	setIsShouldTimerStopped,
	setSelectedOption,
} from "../redux/slices/questionsSlice";
import {
	playCorrectAnswerSound,
	playWrongAnswerSound,
	stopGameSound,
	stopWrongAnswerSound,
} from "../helpers/soundsCommands";
import { processedText } from "../helpers/processedText";
import { answerTypes } from "../constants/selectedOptions";

const Options: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [currentBtnClass, setCurrentBtnClass] = useState({
		backgroundSuccess: "",
		backgroundDanger: "",
		blinkingClass: "",
	});
	const {
		questions,
		currentQuestionIndex,
		selectedOption,
		isVolumeActive,
		isDisabledAnswersBtns,
	} = useAppSelector((state: RootState) => state.questions);
	const points = useAppSelector((state: RootState) => state.points.points);
	const { isFiftyFiftyClicked } = useAppSelector(
		(state: RootState) => state.jokers
	);

	useEffect(() => {
		if (points === 15) {
			dispatch(setIsNextBtnVisible(false));
			setTimeout(() => {
				dispatch(showScore(true));
			}, 2000);
		}
	}, [points, dispatch, currentQuestionIndex]);

	useEffect(() => {
		dispatch(setIsDisabledAnswersBtns(false));
	}, [currentQuestionIndex, dispatch]);

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
		dispatch(setIsShouldTimerStopped(true));
		setCurrentBtnClass({
			backgroundSuccess: "",
			backgroundDanger: "",
			blinkingClass: "blinking-class",
		});
		dispatch(setIsDisabledAnswersBtns(true));

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
				dispatch(setIsNextBtnVisible(true));
			}
		}, 3000);
	};

	const optionClassName = `d-flex btn btn-light rounded-5 border-2 border-dark col-md-6 col-sm-12 col-12 p-3 mt-1 ${
		isDisabledAnswersBtns ? "disabled-btn" : ""
	}`;

	return (
		<div className="d-flex flex-wrap">
			{options.map((option, index) => {
				const checkOptions = selectedOption === option;
				const processedAnswer = processedText(option);
				const clickedHalfOption = questions[
					currentQuestionIndex
				]?.incorrect_answers
					.slice(0, 2)
					.includes(option)
					? "text-light disabled-btn"
					: "";

				return (
					<button
						key={index}
						className={`${optionClassName} ${
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
						} ${isFiftyFiftyClicked ? clickedHalfOption : ""}`}
						onClick={() => handleSelectOption(option)}
					>
						{answerTypes[index]}
						{processedAnswer}
					</button>
				);
			})}
		</div>
	);
};

export default Options;
