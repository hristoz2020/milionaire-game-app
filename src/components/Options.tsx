import { FC } from "react";
import { RootState, useAppSelector } from "../redux/store";

type OptionProps = {
	onSelectOption: (option: string) => void;
	backgroundSuccess: string;
	backgroundDanger: string;
	blinkingClass: string;
};

const Options: FC<OptionProps> = ({
	onSelectOption,
	blinkingClass,
	backgroundSuccess,
	backgroundDanger,
}) => {
	const { questions, currentQuestionIndex, selectedOption } = useAppSelector(
		(state: RootState) => state.questions
	);
	const options: string[] = [
		questions[currentQuestionIndex]?.incorrect_answers,
		questions[currentQuestionIndex]?.correct_answer,
	].flat();

	const checkCurrentOption = questions[
		currentQuestionIndex
	]?.incorrect_answers.find((answer) => answer === selectedOption);

	return (
		<div className="d-flex flex-wrap">
			{options.map((option, index) => {
				const checkOptions = selectedOption === option;

				return (
					<button
						key={index}
						type="button"
						className={`border-dark rounded-3 col-md-6 col-sm-12 col-12 p-3 mt-1 ${
							checkOptions ? blinkingClass : ""
						} ${
							option ===
							questions[currentQuestionIndex]?.correct_answer
								? backgroundSuccess
								: ""
						} ${
							option === checkCurrentOption && selectedOption
								? backgroundDanger
								: ""
						}
                    `}
						onClick={() => onSelectOption(option)}
					>
						{option}
					</button>
				);
			})}
		</div>
	);
};

export default Options;
