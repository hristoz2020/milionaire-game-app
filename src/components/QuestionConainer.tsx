import { FC } from "react";

type Props = {
	question: string;
	incorrectOptions: string[];
	correctOption: string;
	selectedOption: string | null;
	onSelectOption: (option: string) => void;
};

const QuestionConainer: FC<Props> = ({
	question,
	incorrectOptions,
	correctOption,
	selectedOption,
	onSelectOption,
}) => {
	const options: string[] = [...incorrectOptions, correctOption];

	return (
		<div>
			<p className="d-flex justify-content-center row bg-white p-4">
				{question}
			</p>
			<div className="row-cols-2 p-1 m-2">
				{options.map((option, index) => (
					<button
						key={index}
						type="button"
						className={`bg-light p-3 border-dark rounded ${
							option === selectedOption ? "blinking-class" : ""
						}`}
						onClick={() => onSelectOption(option)}
					>
						{option}
					</button>
				))}
			</div>
		</div>
	);
};

export default QuestionConainer;
