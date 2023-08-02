import { Link } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { resetPoints } from "../redux/slices/pointsSlice";
import {
	resetCurrentQuestionIndex,
	setIsShouldTimerStopped,
	setSelectedOption,
} from "../redux/slices/questionsSlice";
import { showScore } from "../redux/slices/scoreSlice";
import { playGameSound } from "../helpers/soundsCommands";
import {
	setIsAskTheAudienceClicked,
	setIsAskTheAudienceUsed,
	setIsCallAFrendClicked,
	setIsCallAFrendUsed,
	setIsFiftyFiftyClicked,
	setIsFiftyFiftyUsed,
} from "../redux/slices/jokersSlice";
import ResultScaleContainer from "../components/ResultScaleContainer";

const RewardScale = () => {
	const dispatch = useAppDispatch();
	const isVolumeActive = useAppSelector(
		(state: RootState) => state.questions.isVolumeActive
	);

	const resetJokers = () => {
		dispatch(setIsFiftyFiftyClicked(false));
		dispatch(setIsFiftyFiftyUsed(false));
		dispatch(setIsCallAFrendClicked(false));
		dispatch(setIsCallAFrendUsed(false));
		dispatch(setIsAskTheAudienceClicked(false));
		dispatch(setIsAskTheAudienceUsed(false));
	};

	const handlePlayAgain = () => {
		dispatch(resetPoints());
		dispatch(showScore(false));
		dispatch(resetCurrentQuestionIndex());
		dispatch(setSelectedOption(null));
		dispatch(setIsShouldTimerStopped(false));
		resetJokers();
		isVolumeActive && playGameSound();
	};

	return (
		<div className="reward-page">
			<div className="d-flex justify-content-center align-items-center flex-column">
				<ResultScaleContainer />
			</div>
			<div className="d-flex justify-content-center">
				<Link
					to={"/"}
					type="button"
					className="btn btn-dark rounded-5 p-2 text-decoration-none col-4 col-sm-3"
					onClick={handlePlayAgain}
				>
					Play Again
				</Link>
			</div>
		</div>
	);
};

export default RewardScale;
