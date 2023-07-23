import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/images/image.webp";
import {
	categoriesTypes,
	difficultiesTypes,
} from "../constants/selectedOptions";
import { stopGameSound } from "../helpers/soundsCommands";
import {
	getQuestions,
	setQuestionsCategory,
	setQuestionsDifficulty,
} from "../redux/slices/questionsSlice";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";

const Home: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { questionsCategory, questionsDifficulty } = useAppSelector(
		(state: RootState) => state.questions
	);

	useEffect(() => {
		stopGameSound();
	}, []);

	const handleCategorySelect = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		dispatch(setQuestionsCategory(event.target.value));
	};

	const handleDifficultySelect = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		dispatch(setQuestionsDifficulty(event.target.value));
	};

	const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		void dispatch(
			getQuestions({
				category: questionsCategory,
				difficulty: questionsDifficulty,
			})
		);

		navigate("/start-game");
	};

	return (
		<div className="home-page">
			<div className="d-flex align-items-center justify-content-center">
				<img
					src={image}
					className="w-25 mt-4 mb-3"
					alt="background-image"
				/>
			</div>

			<form onSubmit={onSubmitHandler}>
				<div className="d-flex align-items-center flex-column justify-content-center">
					<h4 className="text-light pt-3">Category:</h4>
					<select
						className="rounded-5 btn btn-dark p-3 col-5 col-sm-4"
						defaultValue={questionsCategory}
						onChange={handleCategorySelect}
					>
						{Object.values(categoriesTypes).map(
							(category, index) => (
								<option key={index}>{category}</option>
							)
						)}
					</select>
					<h4 className="text-light  pt-3">Difficulty:</h4>
					<select
						className="rounded-5 btn btn-dark p-3 col-5 col-sm-4"
						defaultValue={questionsDifficulty}
						onChange={handleDifficultySelect}
					>
						{difficultiesTypes.map((difficulty, index) => (
							<option key={index}>{difficulty}</option>
						))}
					</select>
					<input
						type="submit"
						value="Start Game"
						className="btn btn-dark rounded-5 p-3 mt-4 text-decoration-none col-5 col-sm-4"
					/>
				</div>
			</form>
		</div>
	);
};

export default Home;
