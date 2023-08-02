import { rewardsList } from "../constants/rewards";
import { RootState, useAppSelector } from "../redux/store";

const ResultScaleContainer = () => {
	const points = useAppSelector((state: RootState) => state.points.points);

	return (
		<>
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
						<h3>You are answered {points} questions correctly!</h3>
					</div>
				)}
			</div>
			<ul className="list-unstyled opacity border border-secondary rounded-3 p-4 px-5 mt-5">
				{rewardsList.map((reward) => {
					const currentPlace =
						reward.place === points ? "bg-light text-black" : "";
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
		</>
	);
};

export default ResultScaleContainer;
