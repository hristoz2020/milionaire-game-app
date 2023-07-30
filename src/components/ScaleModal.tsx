import React, { useMemo } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import {
	setIsAskTheAudienceClicked,
	setIsAskTheAudienceUsed,
} from "../redux/slices/jokersSlice";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { answerTypes } from "../constants/selectedOptions";
import { generateFourNumbers } from "../helpers/scaleOperations";

type ScaleModalOptions = {
	options: string[];
};

const ScaleModal: React.FC<ScaleModalOptions> = ({ options }) => {
	const dispatch = useAppDispatch();
	const { questions, currentQuestionIndex } = useAppSelector(
		(state: RootState) => state.questions
	);
	const { isAskTheAudienceClicked, isAskTheAudienceUsed } = useAppSelector(
		(state: RootState) => state.jokers
	);
	const correctAnswer = options.filter(
		(option) => option === questions[currentQuestionIndex]?.correct_answer
	);

	const threeNumbers = useMemo(() => generateFourNumbers(), []);

	const uvOptions = (option: string) => {
		let uvValue;
		if (option === correctAnswer[0]) {
			uvValue = 600;
		} else {
			const index = options.indexOf(option);
			uvValue = threeNumbers[index];
		}
		return uvValue;
	};

	const data = options.map((option, index) => ({
		name: `${answerTypes[index]}`,
		uv: uvOptions(option),
	}));

	const closeModal = () => {
		dispatch(setIsAskTheAudienceClicked(!isAskTheAudienceClicked));
		dispatch(setIsAskTheAudienceUsed(!isAskTheAudienceUsed));
	};

	return (
		<div
			className={`modal fade opacity ${
				isAskTheAudienceClicked ? "show d-block" : "d-none"
			}`}
			id="scaleModal"
			tabIndex={-1}
			aria-labelledby="scaleModalLabel"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1
							className="modal-title fs-5 m-auto"
							id="scaleModalLabel"
						>
							Ask the Audience
						</h1>
					</div>
					<ResponsiveContainer height={400}>
						<BarChart data={data}>
							<XAxis dataKey="name" />
							<Bar dataKey="uv" fill="#0d6efd" />
						</BarChart>
					</ResponsiveContainer>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-primary m-auto"
							data-bs-dismiss="modal"
							onClick={closeModal}
						>
							Continue game
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ScaleModal;
