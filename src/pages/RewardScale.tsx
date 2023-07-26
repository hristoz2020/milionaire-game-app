import { Link } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { resetPoints } from "../redux/slices/pointsSlice";
import {
	resetCurrentQuestionIndex,
	setIsShouldTimerStopped,
	setSelectedOption,
} from "../redux/slices/questionsSlice";
import { showScore } from "../redux/slices/scoreSlice";
import { rewardsList } from "../constants/rewards";
import { playGameSound } from "../helpers/soundsCommands";
import { setIsFiftyFiftyClicked, setIsFiftyFiftyUsed } from "../redux/slices/jokersSlice";

const RewardScale = () => {
	const dispatch = useAppDispatch();
	const points = useAppSelector((state: RootState) => state.points.points);
	const isVolumeActive = useAppSelector(
		(state) => state.questions.isVolumeActive
	);

	const handlePlayAgain = () => {
		dispatch(resetPoints());
		dispatch(showScore(false));
		dispatch(resetCurrentQuestionIndex());
		dispatch(setSelectedOption(null));
		dispatch(setIsShouldTimerStopped(false));
		dispatch(setIsFiftyFiftyClicked(false));
		dispatch(setIsFiftyFiftyUsed(false));
		isVolumeActive && playGameSound();
	};

	return (
		<div className="reward-page">
			<div className="d-flex justify-content-center align-items-center flex-column">
				<div className="mt-4">
					{points >= 0 && points < 15 && (
						<div className="text-center text-light">
							<h1>End of the game!</h1>
							<h3>Submitted wrong answer or timed out.</h3>
							<h4>Answered questions : {points}</h4>
						</div>
					)}
					{points === 15 && (
						<div className="text-center text-light">
							<h1>Congratulations, you won 100 000!</h1>
							<h3>
								You are answered {points} questions correctly!
							</h3>
						</div>
					)}
				</div>
				<ul className="list-unstyled opacity border border-secondary rounded-3 p-4 px-5 mt-5">
					{rewardsList.map((reward) => {
						const currentPlace =
							reward.place === points
								? "bg-light text-black"
								: "";
						return (
							<li
								className={`${reward.className} ${currentPlace}`}
								key={reward.id}
							>
								{`${reward.place}:  ${reward.price}`}
							</li>
						);
					})}
				</ul>
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
