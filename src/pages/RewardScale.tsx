import { Link, useNavigate } from "react-router-dom";
import { rewardsList } from "../constants/rewards";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { resetPoints } from "../redux/slices/pointsSlice";
import { resetQuestions, setIsResetTimer } from "../redux/slices/questionSlice";
import { showModal } from "../redux/slices/modalSlice";
import { playGameSound } from "../constants/soundsCommands";

const RewardScale = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const points = useAppSelector((state: RootState) => state.points.points);

	const handlePlayAgainModal = () => {
		dispatch(resetPoints());
		dispatch(resetQuestions());
		dispatch(showModal(false));
		dispatch(setIsResetTimer(true));
		navigate("/start-game");
		playGameSound();
	};

	return (
		<div className="reward-page">
			<div className="">
				<div className="d-flex justify-content-center align-items-center flex-column">
					<div className="mt-4">
						{points >= 0 && points < 15 && (
							<h1 className="text-center text-light">
								End of the game! You submitted a wrong answer or
								timed out. Your questions answered are {points}!
							</h1>
						)}
						{points === 15 && (
							<h1 className="text-center text-light">
								Congratulations, you won 100 000 ! Your
								questions answered are {points}!
							</h1>
						)}
					</div>
					<ul className="list-unstyled rounded-3 bg-secondary p-4 px-5 mt-5">
						{rewardsList.map((reward) => (
							<li
								className={`rounded text-left text-danger text-light ps-3 m-auto ${
									reward.place === points
										? "border border-dark "
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
						className="btn btn-secondary"
						onClick={handlePlayAgainModal}
					>
						Play Again
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RewardScale;
