import { FC, useEffect, useState } from "react";
import image from "../assets/images/image.webp";
import QuestionConainer from "../components/QuestionConainer";
import Timer from "../components/Timer";
import { getQuestions } from "../redux/slices/questionSlice";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";

const StartGame: FC = () => {
	const dispatch = useAppDispatch();
	const questions = useAppSelector(
		(state: RootState) => state.questions.question
	);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);

	const handleSelectOption = (option: string) => {
		setSelectedOption(option);

		setTimeout(() => {
			if (option !== questions[currentQuestionIndex].correct_answer) {
				window.alert("wrong answer");
			}

			setSelectedOption(null);
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
		}, 3000);
	};
	
	useEffect(() => {
		dispatch(getQuestions());
	}, []);

	return (
		<div className="game-page">
			<div className="d-flex flex-column align-items-center justify-content-center mb-5">
				<img
					src={image}
					className="w-25 mt-5 mb-3"
					alt="background-image"
				/>
				<Timer />
			</div>
			<QuestionConainer
				question={questions[currentQuestionIndex].question}
				incorrectOptions={
					questions[currentQuestionIndex].incorrect_answers
				}
				correctOption={questions[currentQuestionIndex].correct_answer}
				selectedOption={selectedOption}
				onSelectOption={handleSelectOption}
			/>
		</div>
	);
};

export default StartGame;
