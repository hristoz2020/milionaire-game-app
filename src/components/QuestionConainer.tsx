import { FC } from "react";
import { RootState, useAppSelector } from "../redux/store";
import Options from "./Options";

const QuestionConainer: FC = () => {
	const { questions, currentQuestionIndex } = useAppSelector(
		(state: RootState) => state.questions
	);

	const processedQuestions = questions[currentQuestionIndex]?.question
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'");

	return (
		<div className="col-10 m-auto">
			<p className="d-flex justify-content-center bg-white text-center rounded-3 p-3">
				{processedQuestions}
			</p>
			<Options />
		</div>
	);
};

export default QuestionConainer;
