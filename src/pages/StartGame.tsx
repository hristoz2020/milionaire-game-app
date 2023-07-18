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
	const points = useAppSelector((state: RootState) => state.points.points);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [isNextBtnVisible, setIsNextBtnVisible] = useState<boolean>(false);
	const [isReset, setIsReset] = useState<boolean>(false);

	useEffect(() => {
		void dispatch(getQuestions());
	}, [dispatch]);

	const handleSelectOption = (option: string) => {
		setSelectedOption(option);

		setTimeout(() => {
			if (option !== questions[currentQuestionIndex].correct_answer) {
				window.alert(`Wrong answer! Your score is ${points}`);
				setCurrentQuestionIndex(0);
				dispatch(addPoint());
				return;
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
					question={questions[currentQuestionIndex]?.question}
					incorrectOptions={
						questions[currentQuestionIndex]?.incorrect_answers
					}
					correctOption={
						questions[currentQuestionIndex]?.correct_answer
					}
					selectedOption={selectedOption}
					onSelectOption={handleSelectOption}
				/>
			)}
		</div>
	);
};

export default StartGame;
