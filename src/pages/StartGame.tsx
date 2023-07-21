import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showModal } from "../redux/slices/modalSlice";
import {
	getQuestions,
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
import { playGameSound, stopGameSound } from "../helpers/soundsCommands";

const StartGame: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isLoading, isVisibleNexBtn, isResetTimer } = useAppSelector(
		(state: RootState) => state.questions
	);
	const isShowModal = useAppSelector(
		(state: RootState) => state.modal.isShow
	);
	const points = useAppSelector((state: RootState) => state.points.points);
	const [isVolumeActive, setIsVolumeActive] = useState<boolean>(false);

	useEffect(() => {
		void dispatch(getQuestions());
		dispatch(setIsResetTimer(true));
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

	const handleNextQuestion = () => {
		dispatch(setCurrentQuestionIndex());
		dispatch(setSelectedOption(null));
		dispatch(setIsVisibleNexBtn(false));
		dispatch(setIsResetTimer(true));
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
		? "fa-volume-high"
		: "fa-volume-xmark";

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
					className={`position-absolute top-0 end-0 btn btn-light border-2 rounded m-2 p-2`}
					onClick={() => handleSound()}
				>
					<i className={`fa-solid ${handleSoundIcon}`}></i>
				</button>
				<div className="next-btn-container">
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
