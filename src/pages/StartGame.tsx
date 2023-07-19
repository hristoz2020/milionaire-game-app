import { FC, useEffect, useState } from "react";
import image from "../assets/images/image.webp";
import Loader from "../components/Loader";
import QuestionConainer from "../components/QuestionConainer";
import RewardScale from "../components/RewardScale";
import Timer from "../components/Timer";
import { hideModal, showModal } from "../redux/slices/modalSlice";
import { addPoint } from "../redux/slices/pointsSlice";
import {
	getQuestions,
	resetCurrentQuestionIndex,
	setCurrentQuestionIndex,
	setIsResetTimer,
	setIsVisibleNexBtn,
	setSelectedOption,
} from "../redux/slices/questionSlice";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";

const StartGame: FC = () => {
	const dispatch = useAppDispatch();
	const {questions, isLoading, isVisibleNexBtn, isResetTimer} = useAppSelector(
		(state: RootState) => state.questions
	);
	const isShowModal = useAppSelector(
		(state: RootState) => state.showModal.isShow
	);
	const points = useAppSelector((state: RootState) => state.points.points);
	const currentQuestionIndex = useAppSelector(
		(state: RootState) => state.questions.currentQuestionIndex
	);
	const [backgroundSuccess, setBackgroundSuccess] = useState<string>("");
	const [backgroundDanger, setBackgroundDanger] =
		useState<string>("");
	const [blinkingClass, setBlinkingClass] = useState<string>("");

	useEffect(() => {
		void dispatch(getQuestions());
		dispatch(setSelectedOption(null));
		dispatch(hideModal());
		setBackgroundSuccess("");
		setBackgroundDanger("");
		dispatch(setIsResetTimer(true))
		dispatch(resetCurrentQuestionIndex());
		dispatch(setIsVisibleNexBtn(false));
	}, [dispatch, questions.length === 0]);

	useEffect(() => {
		if (points === 15) {
			setTimeout(() => {
				dispatch(showModal());
			}, 2000);
		}
	}, [points, dispatch]);

	const handleSelectOption = (option: string) => {
		dispatch(setSelectedOption(option));

		setTimeout(() => {
			if (option !== questions[currentQuestionIndex].correct_answer) {
				setBackgroundSuccess("bg-success");
				setBackgroundDanger("bg-danger");
				setBlinkingClass("");
				setTimeout(() => {
					dispatch(showModal());
				}, 2000);
			}

			if (option === questions[currentQuestionIndex].correct_answer) {
				dispatch(addPoint());
				setBackgroundSuccess("bg-success");
				setBackgroundDanger("bg-danger");
				setBlinkingClass("");
				dispatch(setIsVisibleNexBtn(true));

			}
			dispatch(setIsResetTimer(false))

		}, 3000);
		setBlinkingClass("blinking-class");
	};

	const handleNextQuestion = () => {
		dispatch(setCurrentQuestionIndex());
		dispatch(setSelectedOption(null));
		dispatch(setIsVisibleNexBtn(false));
		dispatch(setIsResetTimer(true))

		setBackgroundSuccess("");
		setBackgroundDanger("");
	};

	return (
		<div className="game-page">
			<div className="d-flex flex-column align-items-center justify-content-center mb-5">
				<img
					src={image}
					className="w-25 mt-5 mb-3"
					alt="background-image"
				/>
				<Timer isReset={isResetTimer} />
				<button
					className={`position-absolute top-0 end-0 border-2 rounded m-2 p-2 ${
						isVisibleNexBtn ? "" : "d-none"
					}`}
					onClick={() => handleNextQuestion()}
				>
					NEXT
				</button>
			</div>
			{isLoading && <Loader />}
			{!isLoading && (
				<QuestionConainer
					onSelectOption={handleSelectOption}
					backgroundSuccess={backgroundSuccess}
					backgroundDanger={backgroundDanger}
					blinkingClass={blinkingClass}
				/>
			)}
			{isShowModal && <RewardScale />}
		</div>
	);
};

export default StartGame;
