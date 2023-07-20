import { Link, useNavigate } from "react-router-dom";
import { rewardsList } from "../constants/rewards";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { resetPoints } from "../redux/slices/pointsSlice";
import { resetQuestions, setIsResetTimer } from "../redux/slices/questionSlice";
import { showModal } from "../redux/slices/modalSlice";

const RewardScale = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const points = useAppSelector((state: RootState) => state.points.points);


	const handlePlayAgainModal = () => {
		dispatch(resetPoints());
		dispatch(resetQuestions());
		dispatch(showModal(false));
		dispatch(setIsResetTimer(true))
		navigate("/start-game");
	};

	return (
		<div className="d-flex justify-content-center">
			<div className="modal fade show d-block" tabIndex={-1}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-body d-flex justify-content-center align-items-center flex-column">
							<div>
								{points >= 0 && points < 15 && (
									<h1 className="text-center">
										End of the game! You submitted a wrong
										answer or timed out. Your questions
										answered are {points}!
									</h1>
								)}
								{points === 15 && (
									<h1 className="text-center">
										Congratulations, you won 100 000 ! Your
										questions answered are {points}!
									</h1>
								)}
							</div>
							<ul className="list-unstyled w-50">
								{rewardsList.map((reward) => (
									<li
										className={`ps-3 pe-3 border rounded-4 ${
											reward.place === points
												? "bg-danger rounded-pill"
												: ""
										}`}
										key={reward.id}
									>
										{`${reward.place}:  ${reward.price}`}
									</li>
								))}
							</ul>
						</div>
						<div className="modal-footer">
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
			</div>
		</div>
	);
};

export default RewardScale;
