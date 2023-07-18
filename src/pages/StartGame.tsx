import { FC, useEffect } from "react";
import image from "../assets/images/image.webp";
import Timer from "../components/Timer";
import { getQuestions } from "../redux/slices/questionSlice";
import { useAppDispatch } from "../redux/store";

const StartGame: FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getQuestions());
	}, []);

	
	return (
		<div className="game-page">
			<div className="d-flex flex-column align-items-center justify-content-center mb-5">
				<img src={image} className="w-25 mt-5 mb-3" alt="background-image" />
				<Timer />
			</div>
		</div>
	);
};

export default StartGame;
