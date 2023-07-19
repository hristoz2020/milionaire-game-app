import { FC } from "react";
import { RootState, useAppSelector } from "../redux/store";

type Props = {
	currentQuestionIndex: number;
	selectedOption: string | null;
	onSelectOption: (option: string) => void;
	backgroundClass: string;
	backgroundClassDanger: string;
	blinkingClassDanger: string
};

const QuestionConainer: FC<Props> = ({
	currentQuestionIndex,
	selectedOption,
	onSelectOption,
	backgroundClass,
	backgroundClassDanger,
	blinkingClassDanger
}) => {
	const questions = useAppSelector(
		(state: RootState) => state.questions.questions
	);
	const options: string[] = [
		questions[currentQuestionIndex]?.incorrect_answers,
		questions[currentQuestionIndex]?.correct_answer,
	].flat();

	const checkCurrentOption = questions[
		currentQuestionIndex
	]?.incorrect_answers.find((el) => el === selectedOption);

	return (
		<div>
			<p className="d-flex justify-content-center row bg-white p-4">
				{questions[currentQuestionIndex]?.question}
			</p>
			<div className="row-cols-2 p-1 m-2">
				{options.map((option, index) => {
					const checkOptions = selectedOption === option;

					return (
						<button
							key={index}
							type="button"
							className={`p-3 border-dark rounded ${
								checkOptions ? blinkingClassDanger : ""
							} ${
								option ===
								questions[currentQuestionIndex]?.correct_answer
									? backgroundClass
									: ""
							} ${(option === checkCurrentOption) && selectedOption ? backgroundClassDanger : ""}
							`}
							onClick={() => onSelectOption(option)}
						>
							{option}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default QuestionConainer;
