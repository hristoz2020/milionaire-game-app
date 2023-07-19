import { FC, useEffect, useState } from "react";
import image from "../assets/images/image.webp";
import Loader from "../components/Loader";
import QuestionConainer from "../components/QuestionConainer";
import RewardScale from "../components/RewardScale";
import Timer from "../components/Timer";
import { addPoint } from "../redux/slices/pointsSlice";
import { getQuestions } from "../redux/slices/questionSlice";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";

const StartGame: FC = () => {
	const dispatch = useAppDispatch();
	const questions = useAppSelector(
		(state: RootState) => state.questions.questions
	);
	const isLoading = useAppSelector(
		(state: RootState) => state.questions.isLoading
	);
	const points = useAppSelector((state: RootState) => state.points.points);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [isNextBtnVisible, setIsNextBtnVisible] = useState<boolean>(false);
	const [isReset, setIsReset] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [backgroundClassName, setBackgroundClassName] = useState<string>("");
	const [backgroundClassDanger, setBackgroundClassDanger] =
		useState<string>("");
	const [blinkingClassDanger, setBlinkingClassDanger] = useState<string>("");

	useEffect(() => {
		void dispatch(getQuestions());
		setSelectedOption(null);
		setShowModal(false);
		setBackgroundClassName("");
		setBackgroundClassDanger("");
		setIsReset(true);
		setCurrentQuestionIndex(0);
	}, [dispatch, questions.length === 0]);

	useEffect(() => {
		if (points === 15) {
			setShowModal(true);
		}
	}, [points]);

	const handleSelectOption = (option: string) => {
		setSelectedOption(option);

		setTimeout(() => {
			if (option !== questions[currentQuestionIndex].correct_answer) {
				setBackgroundClassName("bg-success");
				setBackgroundClassDanger("bg-danger");
				setBlinkingClassDanger("");
				setShowModal(true);
			}

			if (option === questions[currentQuestionIndex].correct_answer) {
				dispatch(addPoint());
				setBackgroundClassName("bg-success");
				setBackgroundClassDanger("bg-danger");
				setBlinkingClassDanger("");
				setIsNextBtnVisible(true);
			}

			setIsReset(false);
		}, 3000);
		setBlinkingClassDanger("blinking-class");
	};

	const handleNextQuestion = () => {
		setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
		setSelectedOption(null);
		setIsNextBtnVisible(false);
		setSelectedOption(null);
		setIsReset(true);
		setBackgroundClassName("");
		setBackgroundClassDanger("");
	};

	return (
		<div className="game-page">
			<div className="d-flex flex-column align-items-center justify-content-center mb-5">
				<img
					src={image}
					className="w-25 mt-5 mb-3"
					alt="background-image"
				/>
				<Timer isReset={isReset} />
				<button
					className={`position-absolute top-0 end-0 border-2 rounded m-2 p-2 ${
						isNextBtnVisible ? "" : "d-none"
					}`}
					onClick={() => handleNextQuestion()}
				>
					NEXT
				</button>
			</div>
			{isLoading && <Loader />}
			{!isLoading && (
				<QuestionConainer
					currentQuestionIndex={currentQuestionIndex}
					selectedOption={selectedOption}
					onSelectOption={handleSelectOption}
					backgroundClass={backgroundClassName}
					backgroundClassDanger={backgroundClassDanger}
					blinkingClassDanger={blinkingClassDanger}
				/>
			)}
			{showModal && <RewardScale />}
		</div>
	);
};

export default StartGame;
