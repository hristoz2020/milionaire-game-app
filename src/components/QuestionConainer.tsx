import { FC } from "react";
import { RootState, useAppSelector } from "../redux/store";
import Options from "./Options";

type QuestionProps = {
	onSelectOption: (option: string) => void;
	backgroundSuccess: string;
	backgroundDanger: string;
	blinkingClass: string;
};

const QuestionConainer: FC<QuestionProps> = ({
	onSelectOption,
	backgroundSuccess,
	backgroundDanger,
	blinkingClass,
}) => {
	const { questions, currentQuestionIndex } = useAppSelector(
		(state: RootState) => state.questions
	);

	return (
		<div className="col-10 m-auto">
			<p className="d-flex justify-content-center bg-white text-center rounded-3 p-3">
				{questions[currentQuestionIndex]?.question}
			</p>
			<Options
				onSelectOption={onSelectOption}
				blinkingClass={blinkingClass}
				backgroundDanger={backgroundDanger}
				backgroundSuccess={backgroundSuccess}
			/>
		</div>
	);
};

export default QuestionConainer;
