import { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { RootState, useAppSelector } from "../redux/store";
import Options from "./Options";
import { processedText } from "../helpers/processedText";

const QuestionConainer: FC = () => {
	const navigate = useNavigate();

	const { questions, currentQuestionIndex } = useAppSelector(
		(state: RootState) => state.questions
	);
	const isShowScore = useAppSelector(
		(state: RootState) => state.score.isShowScore
	);

	useEffect(() => {
		isShowScore && navigate("/score");
	}, [isShowScore, navigate]);

	const processedQuestions = processedText(
		questions[currentQuestionIndex]?.question
	);

	return (
		<div className="col-10 m-auto">
			<p className="d-flex justify-content-center bg-white text-center rounded-5 p-3">
				{`${currentQuestionIndex + 1}. ${processedQuestions}`}
			</p>
			<Options />
		</div>
	);
};

export default QuestionConainer;
