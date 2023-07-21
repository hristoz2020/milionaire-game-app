import { Link, useNavigate } from "react-router-dom";
import { rewardsList } from "../constants/rewards";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { resetPoints } from "../redux/slices/pointsSlice";
import {
	resetCurrentQuestionIndex,
	resetQuestions,
	setIsResetTimer,
	setIsVisibleNexBtn,
} from "../redux/slices/questionsSlice";
import { showModal } from "../redux/slices/modalSlice";
import { playGameSound } from "../helpers/soundsCommands";

const RewardScale = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const points = useAppSelector((state: RootState) => state.points.points);

	const handlePlayAgain = () => {
		dispatch(resetPoints());
		dispatch(resetQuestions());
		dispatch(showModal(false));
		dispatch(setIsResetTimer(true));
		dispatch(resetCurrentQuestionIndex());
		dispatch(setIsVisibleNexBtn(false));
		navigate("/start-game");
		playGameSound();
	};

	return (
		<div className="reward-page">
			<div className="">
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
									You are answered {points} questions
									correctly!
								</h3>
							</div>
						)}
					</div>
					<ul className="list-unstyled shadow-lg rounded-3 p-4 px-5 mt-5">
						{rewardsList.map((reward) => (
							<li
								className={`rounded-3 text-left text-danger text-light px-2 m-auto ${
									reward.place === points
										? "bg-dark"
										: ""
								}`}
								key={reward.id}
							>
								{`${reward.place}:  ${reward.price}`}
							</li>
						))}
					</ul>
				</div>
				<div className="d-flex justify-content-center">
					<Link
						to={"/start-game"}
						type="button"
						className="btn btn-dark rounded-5 p-2 text-decoration-none col-4 col-sm-3"
						onClick={handlePlayAgain}
					>
						Play Again
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RewardScale;
