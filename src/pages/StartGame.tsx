import { FC, useEffect, useState } from "react";
import image from "../assets/images/image.webp";
import QuestionConainer from "../components/QuestionConainer";
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
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [isNextBtnVisible, setIsNextBtnVisible] = useState<boolean>(false);
	const [isReset, setIsReset] = useState<boolean>(false);
	const [backgroundClassName, setBackgroundClassName] = useState<string>("");

	useEffect(() => {
		void dispatch(getQuestions());
	}, [dispatch]);

	const handleSelectOption = (option: string) => {
		setSelectedOption(option);

		setTimeout(() => {
			if (option !== questions[currentQuestionIndex].correct_answer) {
				// window.alert(`Wrong answer! Your score is ${points}`);
				setBackgroundClassName("bg-danger");
				dispatch(addPoint());
			}

			if (option === questions[currentQuestionIndex].correct_answer) {
				setBackgroundClassName("bg-success");
			} 

			setSelectedOption(null);
			setIsNextBtnVisible(true);
			setIsReset(false);
			dispatch(addPoint());
		}, 3000);

		
	};

	const handleNextQuestion = () => {
		setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
		setIsNextBtnVisible(false);
		setSelectedOption(null);
		setIsReset(true);
		setBackgroundClassName("");
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
			{isLoading && <h1>Loading.....</h1>}
			{!isLoading && (
				<QuestionConainer
					currentQuestionIndex={currentQuestionIndex}
					selectedOption={selectedOption}
					onSelectOption={handleSelectOption}
					backgroundClass={backgroundClassName}
				/>
			)}
		</div>
	);
};

export default StartGame;
