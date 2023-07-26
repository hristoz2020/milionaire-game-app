import { FC, useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import {
	setCurrentQuestionIndex,
	setIsNextBtnVisible,
	setIsShouldTimerStopped,
	setIsVolumeActive,
	setSelectedOption,
} from "../redux/slices/questionsSlice";
import QuestionConainer from "../components/QuestionConainer";
import Loader from "../components/Loader";
import Timer from "../components/Timer";
import image from "../assets/images/image.webp";
import {
	playFiftyFiftySound,
	playGameSound,
	stopCorrectAnswerSound,
	stopGameSound,
} from "../helpers/soundsCommands";
import {
	setIsFiftyFiftyClicked,
	setIsFiftyFiftyUsed,
} from "../redux/slices/jokersSlice";

const StartGame: FC = () => {
	const dispatch = useAppDispatch();
	const { isLoading, isVisibleNexBtn, isVolumeActive } = useAppSelector(
		(state: RootState) => state.questions
	);
	const isFiftyFiftyUsed = useAppSelector(
		(state: RootState) => state.jokers.isFiftyFiftyUsed
	);

	useEffect(() => {
		isVolumeActive ? playGameSound() : stopGameSound();
	}, [isVolumeActive]);

	const handleNextQuestion = () => {
		dispatch(setCurrentQuestionIndex());
		dispatch(setSelectedOption(null));
		dispatch(setIsNextBtnVisible(false));
		dispatch(setIsShouldTimerStopped(false));
		dispatch(setIsFiftyFiftyClicked(false));

		isVolumeActive && stopCorrectAnswerSound();
		isVolumeActive && playGameSound();
	};

	const handleSound = () => {
		isVolumeActive ? stopGameSound() : playGameSound();
		dispatch(setIsVolumeActive(!isVolumeActive));
	};

	const handleSoundIcon = isVolumeActive
		? "fa-volume-high"
		: "fa-volume-xmark";

	const handleFiftyFifty = () => {
		isVolumeActive && playFiftyFiftySound();
		setTimeout(() => {
			dispatch(setIsFiftyFiftyClicked(true));
			dispatch(setIsFiftyFiftyUsed(true));
		}, 1400);
	};

	return (
		<div className="game-page">
			<div className="d-flex flex-column align-items-center justify-content-center mb-1">
				<img
					src={image}
					className="w-25 mt-4 mb-3"
					alt="background-image"
				/>
				<button
					className={`position-absolute top-0 end-0 btn btn-light border-2 rounded m-2 p-2`}
					onClick={() => handleSound()}
				>
					<i className={`fa-solid ${handleSoundIcon}`}></i>
				</button>
				<button
					className="btn btn-dark rounded-circle p-3 border-primary text-warning"
					onClick={handleFiftyFifty}
					disabled={isFiftyFiftyUsed}
				>
					50:50
				</button>
				<div className="question-state-container d-flex align-items-center">
					{!isVisibleNexBtn && !isLoading && <Timer />}
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
