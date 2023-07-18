import { rewardsList } from "../constants/rewards";

const RewardScale = ({ points }: { points: number }) => {
	

	return (
		<div className="border-3 bg-light">
			<ul className="border rounded d-flex flex-column justify-content-center align-items-center bg-light mb-1 w-100">
				{rewardsList.map((reward) => (
					<li
						className={`list-unstyled ps-3 pe-3 ${
							reward.place === points ? "bg-danger" : ""
						}`}
						key={reward.id}
					>{`${reward.place}  ${reward.price}`}</li>
				))}
			</ul>
		</div>
	);
};

export default RewardScale;
