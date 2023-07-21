import { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { RootState, useAppSelector } from "../redux/store";
import { processedText } from "../helpers/processedText";
import Options from "./Options";

const QuestionConainer: FC = () => {
	const navigate = useNavigate();

	const { questions, currentQuestionIndex } = useAppSelector(
		(state: RootState) => state.questions
	);
	const isShowModal = useAppSelector(
		(state: RootState) => state.modal.isShow
	);

	useEffect(() => {
		isShowModal && navigate("/score");
	}, [isShowModal, navigate]);

	const processedQuestions = processedText(
		questions[currentQuestionIndex]?.question
	);

	return (
		<div className="col-10 m-auto">
			<p className="d-flex justify-content-center bg-white text-center rounded-3 p-3">
				{`${currentQuestionIndex + 1}. ${processedQuestions}`}
			</p>
			<Options />
		</div>
	);
};

export default QuestionConainer;
