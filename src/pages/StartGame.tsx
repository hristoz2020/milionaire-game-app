import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showModal } from "../redux/slices/modalSlice";
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
import QuestionConainer from "../components/QuestionConainer";
import Loader from "../components/Loader";
import Timer from "../components/Timer";
import image from "../assets/images/image.webp";
import {
	playWrongAnswerSound,
	stopGameSound,
	stopWrongAnswerSound,
} from "../helpers/soundsCommands";

const StartGame: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {
		questions,
		isLoading,
		isVisibleNexBtn,
		isResetTimer,
		currentQuestionIndex,
	} = useAppSelector((state: RootState) => state.questions);
	const isShowModal = useAppSelector(
		(state: RootState) => state.modal.isShow
	);
	const points = useAppSelector((state: RootState) => state.points.points);
	const [backgroundSuccess, setBackgroundSuccess] = useState<string>("");
	const [backgroundDanger, setBackgroundDanger] = useState<string>("");
	const [blinkingClass, setBlinkingClass] = useState<string>("");

	useEffect(() => {
		void dispatch(getQuestions());
		dispatch(setSelectedOption(null));
		dispatch(showModal(false));
		setBackgroundSuccess("");
		setBackgroundDanger("");
		dispatch(setIsResetTimer(true));
		dispatch(resetCurrentQuestionIndex());
		dispatch(setIsVisibleNexBtn(false));
	}, [dispatch]);

	useEffect(() => {
		if (points === 15) {
			dispatch(setIsVisibleNexBtn(false));
			setTimeout(() => {
				dispatch(showModal(true));
			}, 2000);
		}
	}, [points, dispatch]);

	useEffect(() => {
		isShowModal && navigate("/score");
	}, [isShowModal, navigate]);

	const handleSelectOption = (option: string) => {
		dispatch(setSelectedOption(option));

		setTimeout(() => {
			if (option !== questions[currentQuestionIndex].correct_answer) {
				setBackgroundSuccess("bg-success");
				setBackgroundDanger("bg-danger");
				setBlinkingClass("");
				stopGameSound();
				playWrongAnswerSound();
				setTimeout(() => {
					navigate("/score");
					stopWrongAnswerSound();
				}, 3000);
			}

			if (option === questions[currentQuestionIndex].correct_answer) {
				dispatch(addPoint());
				setBackgroundSuccess("bg-success");
				setBackgroundDanger("bg-danger");
				setBlinkingClass("");
				dispatch(setIsVisibleNexBtn(true));
			}
			dispatch(setIsResetTimer(false));
		}, 3000);
		setBlinkingClass("blinking-class");
	};

	const handleNextQuestion = () => {
		dispatch(setCurrentQuestionIndex());
		dispatch(setSelectedOption(null));
		dispatch(setIsVisibleNexBtn(false));
		dispatch(setIsResetTimer(true));

		setBackgroundSuccess("");
		setBackgroundDanger("");
	};

	const handleStopSounds = () => {
		stopGameSound();
		stopWrongAnswerSound();
	}

	return (
		<div className="game-page">
			<div className="d-flex flex-column align-items-center justify-content-center mb-1">
				<img
					src={image}
					className="w-25 mt-5 mb-3"
					alt="background-image"
				/>
				<Timer isReset={isResetTimer} />
				<button
					className={`position-absolute top-0 end-0 btn border-2 rounded m-2 p-2`}
					onClick={() => handleStopSounds()}
				>
					<i className="fa-solid fa-volume-xmark"></i>
				</button>
				<button
					className={`btn btn-dark rounded-5 p-1 text-decoration-none col-3 ${
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
		</div>
	);
};

export default StartGame;
