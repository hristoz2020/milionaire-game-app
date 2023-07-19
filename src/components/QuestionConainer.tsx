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
		<div>
			<p className="d-flex justify-content-center row bg-white p-4">
				{questions[currentQuestionIndex]?.question}
			</p>
			<div className="row-cols-2 p-1 m-2">
				<Options
					onSelectOption={onSelectOption}
					blinkingClass={blinkingClass}
					backgroundDanger={backgroundDanger}
					backgroundSuccess={backgroundSuccess}
				/>
			</div>
		</div>
	);
};

export default QuestionConainer;
