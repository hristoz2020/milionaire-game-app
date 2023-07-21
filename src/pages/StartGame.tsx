import { FC, useEffect, useState } from "react";
import {
	getQuestions,
	setCurrentQuestionIndex,
	setIsResetTimer,
	setIsTimerVisible,
	setIsVisibleNexBtn,
	setSelectedOption,
} from "../redux/slices/questionsSlice";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import QuestionConainer from "../components/QuestionConainer";
import Loader from "../components/Loader";
import Timer from "../components/Timer";
import image from "../assets/images/image.webp";
import { playGameSound, stopGameSound } from "../helpers/soundsCommands";

const StartGame: FC = () => {
	const dispatch = useAppDispatch();
	const { isLoading, isVisibleNexBtn, isResetTimer, isTimerVisible } =
		useAppSelector((state: RootState) => state.questions);

	const [isVolumeActive, setIsVolumeActive] = useState<boolean>(false);

	useEffect(() => {
		void dispatch(getQuestions());
		dispatch(setIsResetTimer(true));
	}, [dispatch]);

	const handleNextQuestion = () => {
		dispatch(setCurrentQuestionIndex());
		dispatch(setSelectedOption(null));
		dispatch(setIsVisibleNexBtn(false));
		dispatch(setIsResetTimer(true));
		dispatch(setIsTimerVisible(true));
	};

	const handleSound = () => {
		if (isVolumeActive) {
			playGameSound();
			setIsVolumeActive(false);
		} else {
			stopGameSound();
			setIsVolumeActive(true);
		}
	};

	const handleSoundIcon = isVolumeActive
		? "fa-volume-xmark"
		: "fa-volume-high";

	return (
		<div className="game-page">
			<div className="d-flex flex-column align-items-center justify-content-center mb-1">
				<img
					src={image}
					className="w-25 mt-5 mb-3"
					alt="background-image"
				/>
				<button
					className={`position-absolute top-0 end-0 btn btn-light border-2 rounded m-2 p-2`}
					onClick={() => handleSound()}
				>
					<i className={`fa-solid ${handleSoundIcon}`}></i>
				</button>
				<div className="question-state-container d-flex align-items-center">
					{isTimerVisible && !isLoading && (
						<Timer isReset={isResetTimer} />
					)}
					<button
						className={`btn btn-dark rounded-5 p-2 text-decoration-none px-5 ${
							isVisibleNexBtn ? "" : "d-none"
						}`}
						onClick={() => handleNextQuestion()}
					>
						NEXT
					</button>
				</div>
			</div>
			{isLoading && <Loader />}
			{!isLoading && <QuestionConainer />}
		</div>
	);
};

export default StartGame;
